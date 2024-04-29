import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Roles } from './constants/rolePermissions';
import { AccountStatus } from './constants/enums';

@Entity()
export class Account{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.Customer
  })
  role: Roles;

  @Column({     
    type: 'enum',
    enum: AccountStatus,
    // default: AccountStatus.Active
    default: AccountStatus.Pending
  })
  status: AccountStatus;

}