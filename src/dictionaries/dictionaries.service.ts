import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AbstractDictionary } from 'src/common/entities/common/abstract-dictionary.entity';
import { Dictionaries } from 'src/common/enums';
import { AbstractDictionaryProvider } from './abstract-dictionaries.provider';

@Injectable()
export class DictionariesService {
  constructor(
    @Inject('Dictionaries')
    protected readonly dictionaryProviders: AbstractDictionaryProvider<AbstractDictionary>[],
  ) {}

  public async getAll(name: Dictionaries) {
    const provider = this.dictionaryProviders.find((provider) =>
      provider.canHandle(name),
    );
    if (!provider) {
      throw new NotFoundException(`Dictionary with name = ${name} not found`);
    }
    return await provider.get();
  }
}
