import { FILME } from "src/filme/filme.entity";
import { Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class Serie{
    @PrimaryColumn()
    ID: string;
    
    @Column({length: 255})
    NOMESERIE: string;

    @Column('int')
    TEMPORADA: number;

    @Column('int')
    EPSODIO: number;

    @ManyToOne(() => FILME)
    @JoinColumn({ name: 'IDFILME', referencedColumnName:'ID'})
    FILME: FILME;
}