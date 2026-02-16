import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Position } from '../positions/position.entity';

@Entity('elections')
export class Election {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'datetime', nullable: true })
  start_date: Date;

  @Column({ type: 'datetime', nullable: true })
  end_date: Date;

  @Column({ default: 'upcoming' })
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @Column({ nullable: true })
  created_by_id: number;

  @OneToMany(() => Position, position => position.election, { 
    cascade: true,
    onDelete: 'CASCADE' 
  })
  positions: Position[];

  @CreateDateColumn()
  created_at: Date;
}