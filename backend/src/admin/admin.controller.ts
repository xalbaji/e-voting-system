import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { Vote } from '../votes/vote.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Election)
    private electionRepository: Repository<Election>,
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  // ==================== DASHBOARD ====================
  @Get('dashboard')
  async getDashboard(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };

    const totalVoters = await this.userRepository.count({ where: { role: 'voter' } });
    const pendingApprovals = await this.userRepository.count({ where: { status: 'pending', role: 'voter' } });
    const activeElections = await this.electionRepository.count({ where: { status: 'ongoing' } });
    const completedElections = await this.electionRepository.count({ where: { status: 'completed' } });

    return { totalVoters, pendingApprovals, activeElections, completedElections };
  }

  // ==================== ELECTIONS CRUD ====================
  @Get('elections')
  async getElections(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    return this.electionRepository.find({ 
      relations: ['positions'],
      order: { created_at: 'DESC' }
    });
  }

  @Get('elections/:id')
  async getElection(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    return this.electionRepository.findOne({ 
      where: { id },
      relations: ['positions', 'positions.candidates']
    });
  }

  @Post('elections')
  async createElection(@Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const election = this.electionRepository.create({
      title: body.title,
      description: body.description,
      start_date: body.start_date,
      end_date: body.end_date,
      status: body.status || 'upcoming',
      created_by_id: req.user.id,
    });
    
    const saved = await this.electionRepository.save(election);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Created election',
      details: `Created election: ${body.title}`,
    });
    
    return saved;
  }

  @Put('elections/:id')
  async updateElection(@Param('id') id: number, @Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    await this.electionRepository.update(id, body);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Updated election',
      details: `Updated election ID: ${id}`,
    });
    
    return { success: true };
  }

  @Delete('elections/:id')
  async deleteElection(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const election = await this.electionRepository.findOne({ where: { id } });
    if (!election) return { error: 'Election not found' };

    await this.electionRepository.delete(id);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Deleted election',
      details: `Deleted election: ${election.title}`,
    });
    
    return { success: true };
  }

  // ==================== POSITIONS CRUD ====================
  @Get('positions')
  async getPositions(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    return this.positionRepository.find({ 
      relations: ['election'],
      order: { created_at: 'DESC' }
    });
  }

  @Get('positions/:id')
  async getPosition(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    return this.positionRepository.findOne({ 
      where: { id },
      relations: ['election', 'candidates']
    });
  }

  @Post('positions')
  async createPosition(@Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const position = this.positionRepository.create({
      election_id: body.election_id,
      position_name: body.position_name,
      description: body.description,
      max_votes: body.max_votes || 1
    });
    
    const saved = await this.positionRepository.save(position);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Created position',
      details: `Created position: ${body.position_name}`,
    });
    
    return saved;
  }

  @Put('positions/:id')
  async updatePosition(@Param('id') id: number, @Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    await this.positionRepository.update(id, body);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Updated position',
      details: `Updated position ID: ${id}`,
    });
    
    return { success: true };
  }

  @Delete('positions/:id')
  async deletePosition(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const position = await this.positionRepository.findOne({ where: { id } });
    if (!position) return { error: 'Position not found' };

    await this.positionRepository.delete(id);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Deleted position',
      details: `Deleted position: ${position.position_name}`,
    });
    
    return { success: true };
  }

  // ==================== CANDIDATES CRUD ====================
  @Get('candidates')
  async getCandidates(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    return this.candidateRepository.find({ 
      relations: ['position'],
      order: { created_at: 'DESC' }
    });
  }

  @Get('candidates/:id')
  async getCandidate(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    return this.candidateRepository.findOne({ 
      where: { id },
      relations: ['position']
    });
  }

  @Post('candidates')
  async createCandidate(@Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const candidate = this.candidateRepository.create({
      position_id: body.position_id,
      first_name: body.first_name,
      last_name: body.last_name,
      biography: body.biography,
      photo: body.photo,
      status: body.status || 'active'
    });
    
    const saved = await this.candidateRepository.save(candidate);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Created candidate',
      details: `Created candidate: ${body.first_name} ${body.last_name}`,
    });
    
    return saved;
  }

  @Put('candidates/:id')
  async updateCandidate(@Param('id') id: number, @Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    await this.candidateRepository.update(id, body);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Updated candidate',
      details: `Updated candidate ID: ${id}`,
    });
    
    return { success: true };
  }

  @Delete('candidates/:id')
  async deleteCandidate(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const candidate = await this.candidateRepository.findOne({ where: { id } });
    if (!candidate) return { error: 'Candidate not found' };

    await this.candidateRepository.delete(id);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Deleted candidate',
      details: `Deleted candidate: ${candidate.first_name} ${candidate.last_name}`,
    });
    
    return { success: true };
  }

  // ==================== VOTERS MANAGEMENT ====================
  @Get('voters')
  async getVoters(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const { status, search } = req.query;
    
    let queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: 'voter' });
    
    if (status && status !== 'all') {
      queryBuilder = queryBuilder.andWhere('user.status = :status', { status });
    }
    
    if (search) {
      queryBuilder = queryBuilder.andWhere(
        '(user.first_name LIKE :search OR user.last_name LIKE :search OR user.email LIKE :search OR user.voter_id LIKE :search)',
        { search: `%${search}%` }
      );
    }
    
    return queryBuilder
      .orderBy('user.created_at', 'DESC')
      .select(['user.id', 'user.first_name', 'user.last_name', 'user.email', 'user.voter_id', 'user.status', 'user.created_at'])
      .getMany();
  }

  @Put('voters/:id')
  async updateVoter(@Param('id') id: number, @Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    await this.userRepository.update(id, {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      status: body.status
    });
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Updated voter',
      details: `Updated voter ID: ${id}`,
    });
    
    return { success: true };
  }

  @Post('voters/:id/approve')
  async approveVoter(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    await this.userRepository.update(id, { status: 'approved' });
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Approved voter',
      details: `Approved voter ID: ${id}`,
    });
    
    return { success: true };
  }

  // ==================== STAFF MANAGEMENT ====================
  @Get('staff')
  async getStaff(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    return this.userRepository.find({
      where: { role: 'staff' },
      select: ['id', 'first_name', 'last_name', 'email', 'status', 'created_at'],
      order: { created_at: 'DESC' }
    });
  }

  @Post('staff')
  async createStaff(@Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const existingUser = await this.userRepository.findOne({ where: { email: body.email } });

    if (existingUser) {
      if (existingUser.role === 'voter') {
        existingUser.role = 'staff';
        existingUser.status = 'approved';
        await this.userRepository.save(existingUser);
        
        await this.auditLogRepository.save({
          user_id: req.user.id,
          user_email: req.user.email,
          action: 'Promoted voter to staff',
          details: `Promoted ${body.email} to staff`,
        });
        
        const { password, ...result } = existingUser;
        return { ...result, message: 'Voter promoted to staff successfully' };
      }
      return { error: 'User already exists with different role' };
    }

    const hashedPassword = await bcrypt.hash(body.password || 'staff123', 10);
    
    const staff = this.userRepository.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: hashedPassword,
      role: 'staff',
      status: 'approved',
      voter_id: `STAFF${Date.now().toString().slice(-6)}`,
    });
    
    const saved = await this.userRepository.save(staff);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Created staff',
      details: `Created new staff: ${body.email}`,
    });
    
    const { password, ...result } = saved;
    return { ...result, message: 'Staff created successfully' };
  }

  @Put('staff/:id')
  async updateStaff(@Param('id') id: number, @Body() body: any, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    await this.userRepository.update(id, {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      status: body.status
    });
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Updated staff',
      details: `Updated staff ID: ${id}`,
    });
    
    return { success: true };
  }

  @Delete('staff/:id')
  async deleteStaff(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const staff = await this.userRepository.findOne({ where: { id, role: 'staff' } });
    if (!staff) return { error: 'Staff member not found' };

    await this.userRepository.delete(id);
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Deleted staff',
      details: `Deleted staff: ${staff.email}`,
    });
    
    return { success: true };
  }

  // ==================== REPORTS ====================
  @Get('reports/elections')
  async getElectionReports(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const elections = await this.electionRepository.find({ where: { status: 'completed' } });
    const totalVotes = await this.voteRepository.count();
    const totalVoters = await this.userRepository.count({ where: { role: 'voter', status: 'approved' } });
    
    return {
      totalElections: elections.length,
      completedElections: elections.length,
      totalVotesCast: totalVotes,
      avgTurnout: totalVoters > 0 ? (totalVotes / totalVoters) * 100 : 0,
    };
  }

  @Get('reports/election/:id')
  async getElectionReport(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    const election = await this.electionRepository.findOne({
      where: { id },
      relations: ['positions', 'positions.candidates'],
    });
    
    if (!election) return { error: 'Election not found' };
    
    const votes = await this.voteRepository.find({ where: { election_id: id } });
    const voters = await this.userRepository.count({ where: { role: 'voter', status: 'approved' } });
    
    const results = [];
    for (const position of election.positions) {
      const positionVotes = votes.filter(v => v.position_id === position.id);
      const candidates = [];
      
      for (const candidate of position.candidates) {
        const candidateVotes = positionVotes.filter(v => v.candidate_id === candidate.id).length;
        candidates.push({
          name: `${candidate.first_name} ${candidate.last_name}`,
          votes: candidateVotes,
          percentage: positionVotes.length > 0 ? (candidateVotes / positionVotes.length) * 100 : 0,
        });
      }
      
      results.push({
        position_name: position.position_name,
        candidates: candidates.sort((a, b) => b.votes - a.votes),
      });
    }
    
    return {
      election: { title: election.title, start_date: election.start_date, end_date: election.end_date },
      stats: { totalVoters: voters, totalVotes: votes.length, turnout: voters > 0 ? (votes.length / voters) * 100 : 0 },
      results,
    };
  }

  // ==================== AUDIT LOGS ====================
  @Get('audit-logs')
  async getAuditLogs(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    return this.auditLogRepository.find({
      order: { created_at: 'DESC' },
      take: 100,
    });
  }

  @Get('audit-logs/recent')
  async getRecentAuditLogs(@Req() req) {
    if (req.user.role !== 'admin') return { error: 'Unauthorized' };
    
    return this.auditLogRepository.find({
      order: { created_at: 'DESC' },
      take: 10,
    });
  }
}