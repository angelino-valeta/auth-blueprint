import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('audits')
export class Audit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  action!: string;

  @Column({ nullable: true })
  userId?: number;

  @Column('jsonb')
  details!: any;

  @Column()
  timestamp!: string;

  @Column({ nullable: true })
  traceId?: string;
}