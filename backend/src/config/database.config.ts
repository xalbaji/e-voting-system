import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { Vote } from '../votes/vote.entity';  // FIXED: Correct import path
import { AuditLog } from '../audit-logs/audit-log.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.MYSQLPORT, 10) || parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.MYSQLUSER || process.env.DB_USERNAME || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_DATABASE || 'evoting_db',
  entities: [User, Election, Position, Candidate, Vote, AuditLog],
  synchronize: true,
  logging: true, // Enable logging for debugging (set to false in production)
  retryAttempts: 10,
  retryDelay: 3000,
  autoLoadEntities: true,
  extra: {
    connectionLimit: 10,
    connectTimeout: 60000, // Increased to 60 seconds
    acquireTimeout: 60000,
  },
  // SSL configuration for Railway
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};