import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { Vote } from '../votes/vote.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';

export const databaseConfig = {
  type: 'mysql',
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT, 10) || 3306,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // set to false for production if migrations are used
};

