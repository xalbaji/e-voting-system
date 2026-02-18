import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

// Remove this import, no longer needed
// import { databaseConfig } from './config/database.config';


import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ElectionsModule } from './elections/elections.module';
import { PositionsModule } from './positions/positions.module';
import { CandidatesModule } from './candidates/candidates.module';
import { VotesModule } from './votes/votes.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { StaffModule } from './staff/staff.module';
import { AdminModule } from './admin/admin.module';
import { ElectionsController } from './elections/elections.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import your entities here to use in TypeORM config
import { User } from './users/user.entity';
import { Election } from './elections/election.entity';
import { Position } from './positions/position.entity';
import { Candidate } from './candidates/candidate.entity';
import { Vote } from './votes/vote.entity';
import { AuditLog } from './audit-logs/audit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Change here: Use forRootAsync to delay config loading until env vars are ready
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQLHOST || 'localhost',
        port: parseInt(process.env.MYSQLPORT || '3306', 10),
        username: process.env.MYSQLUSER || 'root',
        password: process.env.MYSQLPASSWORD || '',
        database: process.env.MYSQLDATABASE || 'evoting_db',
        entities: [User, Election, Position, Candidate, Vote, AuditLog],
        synchronize: true,
        logging: true,
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend'),
      serveRoot: '/',
    }),

    UsersModule,
    AuthModule,
    ElectionsModule,
    PositionsModule,
    CandidatesModule,
    VotesModule,
    AuditLogsModule,
    StaffModule,
    AdminModule,
  ],
  controllers: [AppController, ElectionsController],
  providers: [AppService],
})
export class AppModule {}
