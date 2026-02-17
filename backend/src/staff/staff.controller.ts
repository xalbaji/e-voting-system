import { Controller, Get, Post, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { User } from '../users/user.entity';
import { Election } from '../elections/election.entity';
import { Vote } from '../votes/vote.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';

@Controller('staff')
@UseGuards(AuthGuard('jwt'))
export class StaffController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Election)
    private electionRepository: Repository<Election>,
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  @Get('dashboard')
  async getDashboard(@Req() req) {
    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
      return { error: 'Unauthorized' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [activeElections, pendingApprovals, todaysVotes, totalVoters] = await Promise.all([
      this.electionRepository.count({ where: { status: 'ongoing' } }),
      this.userRepository.count({ where: { status: 'pending', role: 'voter' } }),
      this.voteRepository.count({ where: { voted_at: Between(today, tomorrow) } }),
      this.userRepository.count({ where: { role: 'voter', status: 'approved' } }),
    ]);

    return { activeElections, pendingApprovals, todaysVotes, totalVoters };
  }

  @Get('voters')
  async getVoters(@Query('search') search: string, @Query('status') status: string, @Req() req) {
    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
      return { error: 'Unauthorized' };
    }

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: 'voter' });

    if (status && status !== 'all') {
      queryBuilder.andWhere('user.status = :status', { status });
    }

    if (search) {
      queryBuilder.andWhere(
        '(user.first_name LIKE :search OR user.last_name LIKE :search OR user.email LIKE :search OR user.voter_id LIKE :search)',
        { search: `%${search}%` }
      );
    }

    return queryBuilder.orderBy('user.created_at', 'DESC').getMany();
  }

  @Post('voters/:id/approve')
  async approveVoter(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
      return { error: 'Unauthorized' };
    }

    await this.userRepository.update(id, { status: 'approved' });
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Approved voter registration',
      ip_address: req.ip,
    });

    return { success: true };
  }

  @Post('voters/:id/reject')
  async rejectVoter(@Param('id') id: number, @Body() body: { reason: string }, @Req() req) {
    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
      return { error: 'Unauthorized' };
    }

    await this.userRepository.update(id, { status: 'rejected' });
    
    await this.auditLogRepository.save({
      user_id: req.user.id,
      user_email: req.user.email,
      action: 'Rejected voter registration',
      ip_address: req.ip,
      details: body.reason,
    });

    return { success: true };
  }

  @Get('elections-with-stats')
  async getElectionsWithStats(@Req() req) {
    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
      return { error: 'Unauthorized' };
    }

    const elections = await this.electionRepository.find({
      relations: ['positions'],
      order: { created_at: 'DESC' }
    });

    const active = [];
    const upcoming = [];
    const completed = [];

    for (const election of elections) {
      const totalVoters = await this.userRepository.count({ where: { role: 'voter', status: 'approved' } });
      const votesCast = await this.voteRepository.count({ where: { election_id: election.id } });

      const electionData = {
        id: election.id,
        title: election.title,
        description: election.description,
        start_date: election.start_date,
        end_date: election.end_date,
        status: election.status,
        turnout: totalVoters > 0 ? (votesCast / totalVoters) * 100 : 0,
        total_voters: totalVoters,
        votes_cast: votesCast,
      };

      if (election.status === 'ongoing') active.push(electionData);
      else if (election.status === 'upcoming') upcoming.push(electionData);
      else if (election.status === 'completed') completed.push(electionData);
    }

    return { active, upcoming, completed };
  }

  @Get('recent-activities')
  async getRecentActivities(@Req() req) {
    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
      return { error: 'Unauthorized' };
    }
    return this.auditLogRepository.find({
      order: { created_at: 'DESC' },
      take: 10,
    });
  }
}