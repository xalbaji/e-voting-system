"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
var user_entity_1 = require("../users/user.entity");
var election_entity_1 = require("../elections/election.entity");
var position_entity_1 = require("../positions/position.entity");
var candidate_entity_1 = require("../candidates/candidate.entity");
var vote_entity_1 = require("../votes/vote.entity");
var audit_log_entity_1 = require("../audit-logs/audit-log.entity");
// Simple database configuration without environment variables for now
exports.databaseConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'evoting_db',
    entities: [user_entity_1.User, election_entity_1.Election, position_entity_1.Position, candidate_entity_1.Candidate, vote_entity_1.Vote, audit_log_entity_1.AuditLog],
    synchronize: true,
    logging: false,
};
