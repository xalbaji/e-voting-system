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
exports.Position = void 0;
const typeorm_1 = require("typeorm");
const election_entity_1 = require("../elections/election.entity");
const candidate_entity_1 = require("../candidates/candidate.entity");
let Position = class Position {
    id;
    position_name;
    description;
    max_votes;
    election;
    election_id;
    candidates;
    created_at;
};
exports.Position = Position;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Position.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Position.prototype, "position_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Position.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Position.prototype, "max_votes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => election_entity_1.Election, election => election.positions),
    (0, typeorm_1.JoinColumn)({ name: 'election_id' }),
    __metadata("design:type", election_entity_1.Election)
], Position.prototype, "election", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Position.prototype, "election_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => candidate_entity_1.Candidate, candidate => candidate.position),
    __metadata("design:type", Array)
], Position.prototype, "candidates", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Position.prototype, "created_at", void 0);
exports.Position = Position = __decorate([
    (0, typeorm_1.Entity)('positions')
], Position);
//# sourceMappingURL=position.entity.js.map