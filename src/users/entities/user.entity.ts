import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'rule_id' })
  ruleId: number;

  @OneToOne((type) => UserEntity)
  rule: UserEntity;
}
