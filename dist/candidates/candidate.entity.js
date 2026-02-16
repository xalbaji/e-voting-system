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
exports.Candidate = void 0;
const typeorm_1 = require("typeorm");
const position_entity_1 = require("../positions/position.entity");
let Candidate = class Candidate {
    id;
    first_name;
    last_name;
    photo;
    biography;
    status;
    position;
    position_id;
    created_at;
    get fullName() {
        return `${this.first_name} ${this.last_name}`;
    }
};
exports.Candidate = Candidate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Candidate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Candidate.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Candidate.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Candidate.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Candidate.prototype, "biography", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], Candidate.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position, position => position.candidates),
    (0, typeorm_1.JoinColumn)({ name: 'position_id' }),
    __metadata("design:type", position_entity_1.Position)
], Candidate.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Candidate.prototype, "position_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Candidate.prototype, "created_at", void 0);
exports.Candidate = Candidate = __decorate([
    (0, typeorm_1.Entity)('candidates')
], Candidate);
//# sourceMappingURL=candidate.entity.js.map