import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('popular-books')
  getPopularBooks(@Query('limit') limit: number) {
    return this.statisticsService.getPopularBooks(limit);
  }

  @Get('active-readers')
  getActiveReaders(@Query('limit') limit: number) {
    return this.statisticsService.getActiveReaders(limit);
  }

  @Get('transactions-summary')
  getTransactionsSummary() {
    return this.statisticsService.getTransactionsSummary();
  }
}
