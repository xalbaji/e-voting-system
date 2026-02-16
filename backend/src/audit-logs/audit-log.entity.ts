import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  user_email: string;

  @Column()
  action: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @CreateDateColumn()
  created_at: Date;
}