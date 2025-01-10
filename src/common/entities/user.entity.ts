import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users', { comment: 'Користувачі' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  formNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'date' })
  registrationDate: Date;
}
