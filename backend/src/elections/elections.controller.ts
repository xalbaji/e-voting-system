import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Election } from './election.entity';
import { Position } from '../positions/position.entity';

@Controller('elections')
@UseGuards(AuthGuard('jwt'))
export class ElectionsController {
  constructor(
    @InjectRepository(Election)
    private electionRepository: Repository<Election>,
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  @Get()
  async getElections() {
    return this.electionRepository.find({
      order: { created_at: 'DESC' }
    });
  }

  @Get(':id/positions')
  async getElectionPositions(@Param('id') id: number) {
    return this.positionRepository.find({
      where: { election_id: id },
      relations: ['candidates']
    });
  }
}