import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { User } from '../users/user.entity';
import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { Vote } from '../users/votes/vote.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Election, Position, Candidate, Vote, AuditLog])
  ],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}