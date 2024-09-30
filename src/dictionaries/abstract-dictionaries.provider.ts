import { Injectable } from '@nestjs/common';
import { AbstractDictionary } from 'src/common/entities/common/abstract-dictionary.entity';
import { Dictionaries } from 'src/common/enums';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export abstract class AbstractDictionaryProvider<T extends AbstractDictionary> {
  protected name: Dictionaries;
  protected repository: Repository<T>;

  public canHandle(name: Dictionaries) {
    return this.name === name;
  }

  public get() {
    return this.repository.find({ order: { label: 'ASC' } } as FindManyOptions); // `as FindManyOptions` fixes weird typescript issue of typorm
  }
}
