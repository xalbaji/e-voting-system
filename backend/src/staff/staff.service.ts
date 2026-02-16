import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { User } from '../users/user.entity';
import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { Vote } from '../users/votes/vote.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';

// Export interfaces for use in controller
export interface CandidateStats {
  id: number;
  name: string;
  votes: number;
}

export interface PositionStats {
  id: number;
  name: string;
  max_votes: number;
  candidates: CandidateStats[];
}

export interface ElectionStats {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  turnout: number;
  total_voters: number;
  votes_cast: number;
  positions: PositionStats[];
}

export interface UpcomingElectionStats extends ElectionStats {
  days_until_start: number;
}

export interface CandidateReport {
  id: number;
  name: string;
  votes: number;
  percentage: number;
}

export interface PositionReport {
  id: number;
  name: string;
  max_votes: number;
  total_votes: number;
  candidates: CandidateReport[];
  winner: CandidateReport | null;
}

export interface ElectionReport {
  election: {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    status: string;
    duration: string;
  };
  stats: {
    total_voters: number;
    total_votes_cast: number;
    turnout_percentage: number;
  };
  positions: PositionReport[];
}

export interface DashboardStats {
  activeElections: number;
  pendingApprovals: number;
  todaysVotes: number;
  totalVoters: number;
}

@Injectable()
export class StaffService {
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

  // Dashboard Methods
  async getDashboardStats(): Promise<DashboardStats> {
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

    return {
      activeElections,
      pendingApprovals,
      todaysVotes,
      totalVoters,
    };
  }

  // Voter Management Methods
  async getVoterRequests(limit: number = 10): Promise<User[]> {
    return this.userRepository.find({
      where: { status: 'pending', role: 'voter' },
      order: { created_at: 'DESC' },
      take: limit,
    });
  }

  async getVoters(search: string = '', status: string = 'all'): Promise<User[]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: 'voter' });

    if (status !== 'all') {
      queryBuilder.andWhere('user.status = :status', { status });
    }

    if (search) {
      queryBuilder.andWhere(
        '(user.first_name LIKE :search OR user.last_name LIKE :search OR user.email LIKE :search OR user.voter_id LIKE :search)',
        { search: `%${search}%` }
      );
    }

    return queryBuilder
      .orderBy('user.created_at', 'DESC')
      .getMany();
  }

  async approveVoter(id: number, staffId: number, staffEmail: string, ipAddress: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userRepository.findOne({ where: { id, role: 'voter' } });
    
    if (!user) {
      throw new NotFoundException('Voter not found');
    }

    await this.userRepository.update(id, { status: 'approved' });
    
    // Log action
    await this.auditLogRepository.save({
      user_id: staffId,
      user_email: staffEmail,
      action: 'Approved voter registration',
      ip_address: ipAddress,
      details: `Approved voter ID: ${id} - ${user.first_name} ${user.last_name}`,
    });

    return { success: true, message: 'Voter approved successfully' };
  }

  async rejectVoter(id: number, reason: string, staffId: number, staffEmail: string, ipAddress: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userRepository.findOne({ where: { id, role: 'voter' } });
    
    if (!user) {
      throw new NotFoundException('Voter not found');
    }

    await this.userRepository.update(id, { status: 'rejected' });
    
    // Log action
    await this.auditLogRepository.save({
      user_id: staffId,
      user_email: staffEmail,
      action: 'Rejected voter registration',
      ip_address: ipAddress,
      details: `Rejected voter ID: ${id} - ${user.first_name} ${user.last_name}. Reason: ${reason}`,
    });

    return { success: true, message: 'Voter rejected successfully' };
  }

  // Election Monitoring Methods
  async getAllElections(): Promise<Election[]> {
    return this.electionRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async getElectionsWithStats(): Promise<{
    active: ElectionStats[];
    upcoming: UpcomingElectionStats[];
    completed: ElectionStats[];
  }> {
    const elections = await this.electionRepository.find({
      relations: ['positions', 'positions.candidates'],
      order: { created_at: 'DESC' },
    });

    const active: ElectionStats[] = [];
    const upcoming: UpcomingElectionStats[] = [];
    const completed: ElectionStats[] = [];

    for (const election of elections) {
      const totalVoters = await this.userRepository.count({ 
        where: { status: 'approved', role: 'voter' } 
      });
      
      const votesCast = await this.voteRepository.count({ 
        where: { election_id: election.id } 
      });

      const positions: PositionStats[] = await Promise.all(election.positions.map(async (position) => {
        const candidates: CandidateStats[] = await Promise.all(position.candidates.map(async (candidate) => {
          const votes = await this.voteRepository.count({
            where: {
              election_id: election.id,
              position_id: position.id,
              candidate_id: candidate.id,
            },
          });
          return {
            id: candidate.id,
            name: `${candidate.first_name} ${candidate.last_name}`,
            votes,
          };
        }));

        return {
          id: position.id,
          name: position.position_name,
          max_votes: position.max_votes,
          candidates: candidates.sort((a, b) => b.votes - a.votes),
        };
      }));

      const electionData: ElectionStats = {
        id: election.id,
        title: election.title,
        description: election.description,
        start_date: election.start_date,
        end_date: election.end_date,
        status: election.status,
        turnout: totalVoters > 0 ? (votesCast / totalVoters) * 100 : 0,
        total_voters: totalVoters,
        votes_cast: votesCast,
        positions,
      };

      if (election.status === 'ongoing') {
        active.push(electionData);
      } else if (election.status === 'upcoming') {
        const daysUntilStart = Math.ceil(
          (new Date(election.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        upcoming.push({
          ...electionData,
          days_until_start: daysUntilStart > 0 ? daysUntilStart : 0,
        });
      } else if (election.status === 'completed') {
        completed.push(electionData);
      }
    }

    return { active, upcoming, completed };
  }

  // Reports Methods
  async getCompletedElections(): Promise<Election[]> {
    return this.electionRepository.find({
      where: { status: 'completed' },
      order: { created_at: 'DESC' },
    });
  }

  async getElectionReport(electionId: number): Promise<ElectionReport> {
    const election = await this.electionRepository.findOne({
      where: { id: electionId },
      relations: ['positions', 'positions.candidates'],
    });

    if (!election) {
      throw new NotFoundException('Election not found');
    }

    const totalVoters = await this.userRepository.count({ 
      where: { status: 'approved', role: 'voter' } 
    });
    
    const totalVotesCast = await this.voteRepository.count({ 
      where: { election_id: electionId } 
    });

    const positions: PositionReport[] = await Promise.all(election.positions.map(async (position) => {
      const totalPositionVotes = await this.voteRepository.count({
        where: { election_id: electionId, position_id: position.id },
      });

      const candidates: CandidateReport[] = await Promise.all(position.candidates.map(async (candidate) => {
        const votes = await this.voteRepository.count({
          where: {
            election_id: electionId,
            position_id: position.id,
            candidate_id: candidate.id,
          },
        });

        return {
          id: candidate.id,
          name: `${candidate.first_name} ${candidate.last_name}`,
          votes,
          percentage: totalPositionVotes > 0 ? (votes / totalPositionVotes) * 100 : 0,
        };
      }));

      const sortedCandidates = candidates.sort((a, b) => b.votes - a.votes);

      return {
        id: position.id,
        name: position.position_name,
        max_votes: position.max_votes,
        total_votes: totalPositionVotes,
        candidates: sortedCandidates,
        winner: sortedCandidates.length > 0 ? sortedCandidates[0] : null,
      };
    }));

    return {
      election: {
        id: election.id,
        title: election.title,
        description: election.description,
        start_date: election.start_date,
        end_date: election.end_date,
        status: election.status,
        duration: `${new Date(election.start_date).toLocaleDateString()} to ${new Date(election.end_date).toLocaleDateString()}`,
      },
      stats: {
        total_voters: totalVoters,
        total_votes_cast: totalVotesCast,
        turnout_percentage: totalVoters > 0 ? (totalVotesCast / totalVoters) * 100 : 0,
      },
      positions,
    };
  }

  // Recent Activities
  async getRecentActivities(limit: number = 10): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      order: { created_at: 'DESC' },
      take: limit,
    });
  }
}