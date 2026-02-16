"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_controller_1 = require("./staff.controller");
const staff_service_1 = require("./staff.service");
const user_entity_1 = require("../users/user.entity");
const election_entity_1 = require("../elections/election.entity");
const position_entity_1 = require("../positions/position.entity");
const candidate_entity_1 = require("../candidates/candidate.entity");
const vote_entity_1 = require("../votes/vote.entity");
const audit_log_entity_1 = require("../audit-logs/audit-log.entity");
let StaffModule = class StaffModule {
};
exports.StaffModule = StaffModule;
exports.StaffModule = StaffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, election_entity_1.Election, position_entity_1.Position, candidate_entity_1.Candidate, vote_entity_1.Vote, audit_log_entity_1.AuditLog])
        ],
        controllers: [staff_controller_1.StaffController],
        providers: [staff_service_1.StaffService],
        exports: [staff_service_1.StaffService],
    })
], StaffModule);
//# sourceMappingURL=staff.module.js.map