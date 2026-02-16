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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const typeorm_1 = require("typeorm");
const election_entity_1 = require("../elections/election.entity");
const position_entity_1 = require("../positions/position.entity");
const candidate_entity_1 = require("../candidates/candidate.entity");
const user_entity_1 = require("../users/user.entity");
let Vote = class Vote {
    id;
    election;
    election_id;
    position;
    position_id;
    candidate;
    candidate_id;
    voter;
    voter_id;
    voted_at;
};
exports.Vote = Vote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => election_entity_1.Election),
    (0, typeorm_1.JoinColumn)({ name: 'election_id' }),
    __metadata("design:type", election_entity_1.Election)
], Vote.prototype, "election", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vote.prototype, "election_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position),
    (0, typeorm_1.JoinColumn)({ name: 'position_id' }),
    __metadata("design:type", position_entity_1.Position)
], Vote.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vote.prototype, "position_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => candidate_entity_1.Candidate),
    (0, typeorm_1.JoinColumn)({ name: 'candidate_id' }),
    __metadata("design:type", candidate_entity_1.Candidate)
], Vote.prototype, "candidate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vote.prototype, "candidate_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'voter_id' }),
    __metadata("design:type", user_entity_1.User)
], Vote.prototype, "voter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vote.prototype, "voter_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vote.prototype, "voted_at", void 0);
exports.Vote = Vote = __decorate([
    (0, typeorm_1.Entity)('votes'),
    (0, typeorm_1.Unique)(['election_id', 'position_id', 'voter_id'])
], Vote);
//# sourceMappingURL=vote.entity.js.map