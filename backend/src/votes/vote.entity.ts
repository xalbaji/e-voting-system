import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Unique, Column } from 'typeorm';
import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { User } from '../users/user.entity';

@Entity('votes')
@Unique(['election_id', 'position_id', 'voter_id'])
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Election, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'election_id' })
  election: Election;

  @Column()
  election_id: number;

  @ManyToOne(() => Position, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @Column()
  position_id: number;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column()
  candidate_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'voter_id' })
  voter: User;

  @Column()
  voter_id: number;

  @CreateDateColumn()
  voted_at: Date;
}