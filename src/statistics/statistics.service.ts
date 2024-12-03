import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/common/entities/transaction.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  // Найпопулярніші книги за кількістю транзакцій
  async getPopularBooks(limit: number = 5) {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .select('transaction.bookId', 'bookId')
      .addSelect('COUNT(transaction.id)', 'transactionCount')
      .groupBy('transaction.bookId')
      .orderBy('transactionCount', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  // Найактивніші читачі за кількістю транзакцій
  async getActiveReaders(limit: number = 5) {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .select('transaction.userId', 'userId')
      .addSelect('COUNT(transaction.id)', 'transactionCount')
      .groupBy('transaction.userId')
      .orderBy('transactionCount', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  // Загальний підсумок транзакцій (видача, повернення, втрата)
  async getTransactionsSummary() {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .select('transaction.type', 'type')
      .addSelect('COUNT(transaction.id)', 'count')
      .groupBy('transaction.type')
      .getRawMany();
  }
}

