import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Election } from './election.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Election])],
  exports: [TypeOrmModule],
})
export class ElectionsModule {}