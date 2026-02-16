"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var StaffService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StaffService = _classThis = /** @class */ (function () {
        function StaffService_1(userRepository, electionRepository, positionRepository, candidateRepository, voteRepository, auditLogRepository) {
            this.userRepository = userRepository;
            this.electionRepository = electionRepository;
            this.positionRepository = positionRepository;
            this.candidateRepository = candidateRepository;
            this.voteRepository = voteRepository;
            this.auditLogRepository = auditLogRepository;
        }
        // Dashboard Methods
        StaffService_1.prototype.getDashboardStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var today, tomorrow, _a, activeElections, pendingApprovals, todaysVotes, totalVoters;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            today = new Date();
                            today.setHours(0, 0, 0, 0);
                            tomorrow = new Date(today);
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            return [4 /*yield*/, Promise.all([
                                    this.electionRepository.count({ where: { status: 'ongoing' } }),
                                    this.userRepository.count({ where: { status: 'pending', role: 'voter' } }),
                                    this.voteRepository.count({ where: { voted_at: (0, typeorm_1.Between)(today, tomorrow) } }),
                                    this.userRepository.count({ where: { role: 'voter', status: 'approved' } }),
                                ])];
                        case 1:
                            _a = _b.sent(), activeElections = _a[0], pendingApprovals = _a[1], todaysVotes = _a[2], totalVoters = _a[3];
                            return [2 /*return*/, {
                                    activeElections: activeElections,
                                    pendingApprovals: pendingApprovals,
                                    todaysVotes: todaysVotes,
                                    totalVoters: totalVoters,
                                }];
                    }
                });
            });
        };
        // Voter Management Methods
        StaffService_1.prototype.getVoterRequests = function () {
            return __awaiter(this, arguments, void 0, function (limit) {
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userRepository.find({
                            where: { status: 'pending', role: 'voter' },
                            order: { created_at: 'DESC' },
                            take: limit,
                        })];
                });
            });
        };
        StaffService_1.prototype.getVoters = function () {
            return __awaiter(this, arguments, void 0, function (search, status) {
                var queryBuilder;
                if (search === void 0) { search = ''; }
                if (status === void 0) { status = 'all'; }
                return __generator(this, function (_a) {
                    queryBuilder = this.userRepository
                        .createQueryBuilder('user')
                        .where('user.role = :role', { role: 'voter' });
                    if (status !== 'all') {
                        queryBuilder.andWhere('user.status = :status', { status: status });
                    }
                    if (search) {
                        queryBuilder.andWhere('(user.first_name LIKE :search OR user.last_name LIKE :search OR user.email LIKE :search OR user.voter_id LIKE :search)', { search: "%".concat(search, "%") });
                    }
                    return [2 /*return*/, queryBuilder
                            .orderBy('user.created_at', 'DESC')
                            .getMany()];
                });
            });
        };
        StaffService_1.prototype.approveVoter = function (id, staffId, staffEmail, ipAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: id, role: 'voter' } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('Voter not found');
                            }
                            return [4 /*yield*/, this.userRepository.update(id, { status: 'approved' })];
                        case 2:
                            _a.sent();
                            // Log action
                            return [4 /*yield*/, this.auditLogRepository.save({
                                    user_id: staffId,
                                    user_email: staffEmail,
                                    action: 'Approved voter registration',
                                    ip_address: ipAddress,
                                    details: "Approved voter ID: ".concat(id, " - ").concat(user.first_name, " ").concat(user.last_name),
                                })];
                        case 3:
                            // Log action
                            _a.sent();
                            return [2 /*return*/, { success: true, message: 'Voter approved successfully' }];
                    }
                });
            });
        };
        StaffService_1.prototype.rejectVoter = function (id, reason, staffId, staffEmail, ipAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: id, role: 'voter' } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('Voter not found');
                            }
                            return [4 /*yield*/, this.userRepository.update(id, { status: 'rejected' })];
                        case 2:
                            _a.sent();
                            // Log action
                            return [4 /*yield*/, this.auditLogRepository.save({
                                    user_id: staffId,
                                    user_email: staffEmail,
                                    action: 'Rejected voter registration',
                                    ip_address: ipAddress,
                                    details: "Rejected voter ID: ".concat(id, " - ").concat(user.first_name, " ").concat(user.last_name, ". Reason: ").concat(reason),
                                })];
                        case 3:
                            // Log action
                            _a.sent();
                            return [2 /*return*/, { success: true, message: 'Voter rejected successfully' }];
                    }
                });
            });
        };
        // Election Monitoring Methods
        StaffService_1.prototype.getAllElections = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.electionRepository.find({
                            order: { created_at: 'DESC' },
                        })];
                });
            });
        };
        StaffService_1.prototype.getElectionsWithStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var elections, active, upcoming, completed, _loop_1, this_1, _i, elections_1, election;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.electionRepository.find({
                                relations: ['positions', 'positions.candidates'],
                                order: { created_at: 'DESC' },
                            })];
                        case 1:
                            elections = _a.sent();
                            active = [];
                            upcoming = [];
                            completed = [];
                            _loop_1 = function (election) {
                                var totalVoters, votesCast, positions, electionData, daysUntilStart;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this_1.userRepository.count({
                                                where: { status: 'approved', role: 'voter' }
                                            })];
                                        case 1:
                                            totalVoters = _b.sent();
                                            return [4 /*yield*/, this_1.voteRepository.count({
                                                    where: { election_id: election.id }
                                                })];
                                        case 2:
                                            votesCast = _b.sent();
                                            return [4 /*yield*/, Promise.all(election.positions.map(function (position) { return __awaiter(_this, void 0, void 0, function () {
                                                    var candidates;
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, Promise.all(position.candidates.map(function (candidate) { return __awaiter(_this, void 0, void 0, function () {
                                                                    var votes;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0: return [4 /*yield*/, this.voteRepository.count({
                                                                                    where: {
                                                                                        election_id: election.id,
                                                                                        position_id: position.id,
                                                                                        candidate_id: candidate.id,
                                                                                    },
                                                                                })];
                                                                            case 1:
                                                                                votes = _a.sent();
                                                                                return [2 /*return*/, {
                                                                                        id: candidate.id,
                                                                                        name: "".concat(candidate.first_name, " ").concat(candidate.last_name),
                                                                                        votes: votes,
                                                                                    }];
                                                                        }
                                                                    });
                                                                }); }))];
                                                            case 1:
                                                                candidates = _a.sent();
                                                                return [2 /*return*/, {
                                                                        id: position.id,
                                                                        name: position.position_name,
                                                                        max_votes: position.max_votes,
                                                                        candidates: candidates.sort(function (a, b) { return b.votes - a.votes; }),
                                                                    }];
                                                        }
                                                    });
                                                }); }))];
                                        case 3:
                                            positions = _b.sent();
                                            electionData = {
                                                id: election.id,
                                                title: election.title,
                                                description: election.description,
                                                start_date: election.start_date,
                                                end_date: election.end_date,
                                                status: election.status,
                                                turnout: totalVoters > 0 ? (votesCast / totalVoters) * 100 : 0,
                                                total_voters: totalVoters,
                                                votes_cast: votesCast,
                                                positions: positions,
                                            };
                                            if (election.status === 'ongoing') {
                                                active.push(electionData);
                                            }
                                            else if (election.status === 'upcoming') {
                                                daysUntilStart = Math.ceil((new Date(election.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                                                upcoming.push(__assign(__assign({}, electionData), { days_until_start: daysUntilStart > 0 ? daysUntilStart : 0 }));
                                            }
                                            else if (election.status === 'completed') {
                                                completed.push(electionData);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _i = 0, elections_1 = elections;
                            _a.label = 2;
                        case 2:
                            if (!(_i < elections_1.length)) return [3 /*break*/, 5];
                            election = elections_1[_i];
                            return [5 /*yield**/, _loop_1(election)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, { active: active, upcoming: upcoming, completed: completed }];
                    }
                });
            });
        };
        // Reports Methods
        StaffService_1.prototype.getCompletedElections = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.electionRepository.find({
                            where: { status: 'completed' },
                            order: { created_at: 'DESC' },
                        })];
                });
            });
        };
        StaffService_1.prototype.getElectionReport = function (electionId) {
            return __awaiter(this, void 0, void 0, function () {
                var election, totalVoters, totalVotesCast, positions;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.electionRepository.findOne({
                                where: { id: electionId },
                                relations: ['positions', 'positions.candidates'],
                            })];
                        case 1:
                            election = _a.sent();
                            if (!election) {
                                throw new common_1.NotFoundException('Election not found');
                            }
                            return [4 /*yield*/, this.userRepository.count({
                                    where: { status: 'approved', role: 'voter' }
                                })];
                        case 2:
                            totalVoters = _a.sent();
                            return [4 /*yield*/, this.voteRepository.count({
                                    where: { election_id: electionId }
                                })];
                        case 3:
                            totalVotesCast = _a.sent();
                            return [4 /*yield*/, Promise.all(election.positions.map(function (position) { return __awaiter(_this, void 0, void 0, function () {
                                    var totalPositionVotes, candidates, sortedCandidates;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.voteRepository.count({
                                                    where: { election_id: electionId, position_id: position.id },
                                                })];
                                            case 1:
                                                totalPositionVotes = _a.sent();
                                                return [4 /*yield*/, Promise.all(position.candidates.map(function (candidate) { return __awaiter(_this, void 0, void 0, function () {
                                                        var votes;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, this.voteRepository.count({
                                                                        where: {
                                                                            election_id: electionId,
                                                                            position_id: position.id,
                                                                            candidate_id: candidate.id,
                                                                        },
                                                                    })];
                                                                case 1:
                                                                    votes = _a.sent();
                                                                    return [2 /*return*/, {
                                                                            id: candidate.id,
                                                                            name: "".concat(candidate.first_name, " ").concat(candidate.last_name),
                                                                            votes: votes,
                                                                            percentage: totalPositionVotes > 0 ? (votes / totalPositionVotes) * 100 : 0,
                                                                        }];
                                                            }
                                                        });
                                                    }); }))];
                                            case 2:
                                                candidates = _a.sent();
                                                sortedCandidates = candidates.sort(function (a, b) { return b.votes - a.votes; });
                                                return [2 /*return*/, {
                                                        id: position.id,
                                                        name: position.position_name,
                                                        max_votes: position.max_votes,
                                                        total_votes: totalPositionVotes,
                                                        candidates: sortedCandidates,
                                                        winner: sortedCandidates.length > 0 ? sortedCandidates[0] : null,
                                                    }];
                                        }
                                    });
                                }); }))];
                        case 4:
                            positions = _a.sent();
                            return [2 /*return*/, {
                                    election: {
                                        id: election.id,
                                        title: election.title,
                                        description: election.description,
                                        start_date: election.start_date,
                                        end_date: election.end_date,
                                        status: election.status,
                                        duration: "".concat(new Date(election.start_date).toLocaleDateString(), " to ").concat(new Date(election.end_date).toLocaleDateString()),
                                    },
                                    stats: {
                                        total_voters: totalVoters,
                                        total_votes_cast: totalVotesCast,
                                        turnout_percentage: totalVoters > 0 ? (totalVotesCast / totalVoters) * 100 : 0,
                                    },
                                    positions: positions,
                                }];
                    }
                });
            });
        };
        // Recent Activities
        StaffService_1.prototype.getRecentActivities = function () {
            return __awaiter(this, arguments, void 0, function (limit) {
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.auditLogRepository.find({
                            order: { created_at: 'DESC' },
                            take: limit,
                        })];
                });
            });
        };
        return StaffService_1;
    }());
    __setFunctionName(_classThis, "StaffService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffService = _classThis;
}();
exports.StaffService = StaffService;
