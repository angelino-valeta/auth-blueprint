import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @Column({ unique: true, nullable: true })
  email?: string

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role!: Role
}