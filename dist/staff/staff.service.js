"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const election_entity_1 = require("../elections/election.entity");
const position_entity_1 = require("../positions/position.entity");
const candidate_entity_1 = require("../candidates/candidate.entity");
const vote_entity_1 = require("../votes/vote.entity");
const audit_log_entity_1 = require("../audit-logs/audit-log.entity");
let StaffService = class StaffService {
    userRepository;
    electionRepository;
    positionRepository;
    candidateRepository;
    voteRepository;
    auditLogRepository;
    constructor(userRepository, electionRepository, positionRepository, candidateRepository, voteRepository, auditLogRepository) {
        this.userRepository = userRepository;
        this.electionRepository = electionRepository;
        this.positionRepository = positionRepository;
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;
        this.auditLogRepository = auditLogRepository;
    }
    async getDashboardStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const [activeElections, pendingApprovals, todaysVotes, totalVoters] = await Promise.all([
            this.electionRepository.count({ where: { status: 'ongoing' } }),
            this.userRepository.count({ where: { status: 'pending', role: 'voter' } }),
            this.voteRepository.count({ where: { voted_at: (0, typeorm_2.Between)(today, tomorrow) } }),
            this.userRepository.count({ where: { role: 'voter', status: 'approved' } }),
        ]);
        return {
            activeElections,
            pendingApprovals,
            todaysVotes,
            totalVoters,
        };
    }
    async getVoterRequests(limit = 10) {
        return this.userRepository.find({
            where: { status: 'pending', role: 'voter' },
            order: { created_at: 'DESC' },
            take: limit,
        });
    }
    async getVoters(search = '', status = 'all') {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .where('user.role = :role', { role: 'voter' });
        if (status !== 'all') {
            queryBuilder.andWhere('user.status = :status', { status });
        }
        if (search) {
            queryBuilder.andWhere('(user.first_name LIKE :search OR user.last_name LIKE :search OR user.email LIKE :search OR user.voter_id LIKE :search)', { search: `%${search}%` });
        }
        return queryBuilder
            .orderBy('user.created_at', 'DESC')
            .getMany();
    }
    async approveVoter(id, staffId, staffEmail, ipAddress) {
        const user = await this.userRepository.findOne({ where: { id, role: 'voter' } });
        if (!user) {
            throw new common_1.NotFoundException('Voter not found');
        }
        await this.userRepository.update(id, { status: 'approved' });
        await this.auditLogRepository.save({
            user_id: staffId,
            user_email: staffEmail,
            action: 'Approved voter registration',
            ip_address: ipAddress,
            details: `Approved voter ID: ${id} - ${user.first_name} ${user.last_name}`,
        });
        return { success: true, message: 'Voter approved successfully' };
    }
    async rejectVoter(id, reason, staffId, staffEmail, ipAddress) {
        const user = await this.userRepository.findOne({ where: { id, role: 'voter' } });
        if (!user) {
            throw new common_1.NotFoundException('Voter not found');
        }
        await this.userRepository.update(id, { status: 'rejected' });
        await this.auditLogRepository.save({
            user_id: staffId,
            user_email: staffEmail,
            action: 'Rejected voter registration',
            ip_address: ipAddress,
            details: `Rejected voter ID: ${id} - ${user.first_name} ${user.last_name}. Reason: ${reason}`,
        });
        return { success: true, message: 'Voter rejected successfully' };
    }
    async getAllElections() {
        return this.electionRepository.find({
            order: { created_at: 'DESC' },
        });
    }
    async getElectionsWithStats() {
        const elections = await this.electionRepository.find({
            relations: ['positions', 'positions.candidates'],
            order: { created_at: 'DESC' },
        });
        const active = [];
        const upcoming = [];
        const completed = [];
        for (const election of elections) {
            const totalVoters = await this.userRepository.count({
                where: { status: 'approved', role: 'voter' }
            });
            const votesCast = await this.voteRepository.count({
                where: { election_id: election.id }
            });
            const positions = await Promise.all(election.positions.map(async (position) => {
                const candidates = await Promise.all(position.candidates.map(async (candidate) => {
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
                positions,
            };
            if (election.status === 'ongoing') {
                active.push(electionData);
            }
            else if (election.status === 'upcoming') {
                const daysUntilStart = Math.ceil((new Date(election.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                upcoming.push({
                    ...electionData,
                    days_until_start: daysUntilStart > 0 ? daysUntilStart : 0,
                });
            }
            else if (election.status === 'completed') {
                completed.push(electionData);
            }
        }
        return { active, upcoming, completed };
    }
    async getCompletedElections() {
        return this.electionRepository.find({
            where: { status: 'completed' },
            order: { created_at: 'DESC' },
        });
    }
    async getElectionReport(electionId) {
        const election = await this.electionRepository.findOne({
            where: { id: electionId },
            relations: ['positions', 'positions.candidates'],
        });
        if (!election) {
            throw new common_1.NotFoundException('Election not found');
        }
        const totalVoters = await this.userRepository.count({
            where: { status: 'approved', role: 'voter' }
        });
        const totalVotesCast = await this.voteRepository.count({
            where: { election_id: electionId }
        });
        const positions = await Promise.all(election.positions.map(async (position) => {
            const totalPositionVotes = await this.voteRepository.count({
                where: { election_id: electionId, position_id: position.id },
            });
            const candidates = await Promise.all(position.candidates.map(async (candidate) => {
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
    async getRecentActivities(limit = 10) {
        return this.auditLogRepository.find({
            order: { created_at: 'DESC' },
            take: limit,
        });
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(election_entity_1.Election)),
    __param(2, (0, typeorm_1.InjectRepository)(position_entity_1.Position)),
    __param(3, (0, typeorm_1.InjectRepository)(candidate_entity_1.Candidate)),
    __param(4, (0, typeorm_1.InjectRepository)(vote_entity_1.Vote)),
    __param(5, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StaffService);
//# sourceMappingURL=staff.service.js.map