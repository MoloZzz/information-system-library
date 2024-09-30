import { Module } from '@nestjs/common';
import { DictionariesController } from './dictionaries.controller';
import { DictionariesService } from './dictionaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  controllers: [DictionariesController],
  providers: [
    DictionariesService,
    {
      provide: 'Dictionaries',
      useFactory: (...values) => {
        // pass everything from inject array
        return values;
      },
      inject: [
      ],
    },
  ],
})
export class DictionariesModule {}
