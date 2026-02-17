import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { Vote } from '../votes/vote.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST,  // Use Railway variable
  port: parseInt(process.env.MYSQLPORT, 10), // Use Railway variable
  username: process.env.MYSQLUSER, // Use Railway variable
  password: process.env.MYSQLPASSWORD, // Use Railway variable
  database: process.env.MYSQLDATABASE, // Use Railway variable
  entities: [User, Election, Position, Candidate, Vote, AuditLog],
  synchronize: true,
  logging: false,
  retryAttempts: 10,
  retryDelay: 3000,
  extra: {
    connectionLimit: 5,
  },
  ssl: { rejectUnauthorized: false }, // Railway requires SSL
};