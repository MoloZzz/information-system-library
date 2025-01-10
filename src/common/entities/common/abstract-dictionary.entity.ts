import { Column, PrimaryColumn } from 'typeorm';

export class AbstractDictionary<T extends string | void = void> {
  @PrimaryColumn({ type: 'varchar' })
  code: T extends string ? T : string;

  @Column({ type: 'varchar' })
  label?: string;
}
