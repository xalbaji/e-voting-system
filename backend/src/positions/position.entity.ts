import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Election } from '../elections/election.entity';
import { Candidate } from '../candidates/candidate.entity';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  position_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 1 })
  max_votes: number;

  @ManyToOne(() => Election, election => election.positions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'election_id' })
  election: Election;

  @Column()
  election_id: number;

  @OneToMany(() => Candidate, candidate => candidate.position, { 
    cascade: true,
    onDelete: 'CASCADE' 
  })
  candidates: Candidate[];

  @CreateDateColumn()
  created_at: Date;
}