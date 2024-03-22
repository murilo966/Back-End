import { FILME } from "src/filme/filme.entity";
import { GENERO } from "src/genero/genero.entity";
import { Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class SerieEntity{
    @PrimaryColumn()
    id: string;
    
    @Column({length: 255})
    nomeSerie: string;

    @Column('int')
    episodio: number;
    
    @Column('int')
    temporada: number;

    @ManyToOne(() => FILME)
    @JoinColumn({ name: 'IDFILME', referencedColumnName:'ID'})
    filme: FILME;
}