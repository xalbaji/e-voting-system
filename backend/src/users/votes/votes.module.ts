import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesController } from './votes.controller';
import { Vote } from './vote.entity';
import { Election } from '../../elections/election.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Election])],
  controllers: [VotesController],
  exports: [TypeOrmModule],
})
export class VotesModule {}