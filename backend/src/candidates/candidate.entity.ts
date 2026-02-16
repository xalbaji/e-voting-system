import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Position } from '../positions/position.entity';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ default: 'active' })
  status: string;

  @ManyToOne(() => Position, position => position.candidates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @Column()
  position_id: number;

  @CreateDateColumn()
  created_at: Date;
}