import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column('jsonb')
  payload!: any;

  @Column()
  timestamp!: string;

  @Column({ nullable: true })
  userId?: number;

  @Column({ nullable: true })
  traceId?: string;
}