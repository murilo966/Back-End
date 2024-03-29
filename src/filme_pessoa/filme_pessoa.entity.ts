
import { FILME } from "src/filme/filme.entity";
import { PESSOA } from "src/pessoa/pessoa.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class FILME_PESSOA{
    @PrimaryColumn()
    ID: string;

    @Column()
    IDPESSOA:PESSOA;
    
    @Column()
    IDFILME:FILME;

    @Column()
    FUNCAO:String;


    @ManyToOne(
        () => PESSOA,
        ator => ator.filmes,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
      )
    @JoinColumn([{ name: 'IDPESSOA', referencedColumnName: 'ID' }])
    ator: PESSOA[];
    
    @ManyToOne(
        () => FILME,
        filme => filme.atores,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
      )
    @JoinColumn([{ name: 'IDFILME', referencedColumnName: 'ID' }])
    filme: FILME[];

}