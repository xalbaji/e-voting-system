import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { Vote } from '../votes/vote.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';
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
export declare class StaffService {
    private userRepository;
    private electionRepository;
    private positionRepository;
    private candidateRepository;
    private voteRepository;
    private auditLogRepository;
    constructor(userRepository: Repository<User>, electionRepository: Repository<Election>, positionRepository: Repository<Position>, candidateRepository: Repository<Candidate>, voteRepository: Repository<Vote>, auditLogRepository: Repository<AuditLog>);
    getDashboardStats(): Promise<DashboardStats>;
    getVoterRequests(limit?: number): Promise<User[]>;
    getVoters(search?: string, status?: string): Promise<User[]>;
    approveVoter(id: number, staffId: number, staffEmail: string, ipAddress: string): Promise<{
        success: boolean;
        message: string;
    }>;
    rejectVoter(id: number, reason: string, staffId: number, staffEmail: string, ipAddress: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllElections(): Promise<Election[]>;
    getElectionsWithStats(): Promise<{
        active: ElectionStats[];
        upcoming: UpcomingElectionStats[];
        completed: ElectionStats[];
    }>;
    getCompletedElections(): Promise<Election[]>;
    getElectionReport(electionId: number): Promise<ElectionReport>;
    getRecentActivities(limit?: number): Promise<AuditLog[]>;
}
