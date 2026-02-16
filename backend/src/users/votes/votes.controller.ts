import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { Election } from '../../elections/election.entity';

@Controller('votes')
@UseGuards(AuthGuard('jwt'))
export class VotesController {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    @InjectRepository(Election)
    private electionRepository: Repository<Election>,
  ) {}

  @Get('my-votes')
  async getMyVotes(@Req() req) {
    const votes = await this.voteRepository.find({
      where: { voter_id: req.user.id },
      relations: ['election', 'position', 'candidate'],
      order: { voted_at: 'DESC' }
    });

    return votes.map(vote => ({
      id: vote.id,
      election_id: vote.election_id,
      election_title: vote.election?.title,
      position_name: vote.position?.position_name,
      candidate_name: vote.candidate ? `${vote.candidate.first_name} ${vote.candidate.last_name}` : null,
      voted_at: vote.voted_at
    }));
  }

  @Post('cast')
  async castVote(@Req() req, @Body() body: any) {
    const { election_id, votes } = body;
    
    // Check if user already voted in this election
    const existingVote = await this.voteRepository.findOne({
      where: { voter_id: req.user.id, election_id }
    });

    if (existingVote) {
      return { error: 'Already voted in this election' };
    }

    // Save all votes
    const voteEntities = votes.map(v => ({
      voter_id: req.user.id,
      election_id,
      position_id: v.position_id,
      candidate_id: v.candidate_id
    }));

    await this.voteRepository.save(voteEntities);

    return { success: true, message: 'Votes cast successfully' };
  }
}