import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rules')
export class RuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
