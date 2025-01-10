import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { BookEntity } from './book.entity';
import { EmployeeEntity } from './employee.entity';
import { UserEntity } from './user.entity';

@Entity('transactions', { comment: 'Транзакції' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity)
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'date' })
  borrowDate: Date;

  @Column({ type: 'date', nullable: true })
  returnDate: Date;

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'librarian_id' })
  librarian: EmployeeEntity;
}
