import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { databaseConfig } from './config/database.config';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
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