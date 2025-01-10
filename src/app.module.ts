import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostgresqlModule } from './libs/postgresql/postgresql.module';
import { DictionariesModule } from './dictionaries/dictionaries.module';
import * as Joi from 'joi';
import { entities } from './common/entities';
import { migrations } from './common/migrations';
import { LoggerModule } from './libs/logger/logger.module';
import { LoggerMiddleware } from './libs/logger/logger.middleware';
import { GenreModule } from './genre/genre.module';
import { TransactionsModule } from './transactions/transactions.module';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`src/.env`],
      validationSchema: Joi.object({
        API_DOCS_ENABLED: Joi.string().optional(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_TIME: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DB_NAME: Joi.string().required(),
        POSTGRES_IS_LOGGING_ENABLED: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.string().required(),
        POSTGRES_PASS: Joi.string().required(),
      }),
    }),
    AuthModule,
    PostgresqlModule.register(entities, migrations, []),
    DictionariesModule,
    LoggerModule,
    GenreModule,
    TransactionsModule,
    EmployeesModule,
    UsersModule,
    BooksModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
