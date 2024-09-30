import { Column, Entity } from "typeorm";
import { AbstractDictionary } from "./common/abstract-dictionary.entity";

@Entity('dict_genres', { comment: 'Довідник жанрів' })
export class GenreEntity extends AbstractDictionary {
    @Column({type: 'varchar', nullable: true})
    descriprion: string;
}