import { FILME } from "src/filme/filme.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class PESSOA {
    @PrimaryColumn()
    ID:string;

    @Column({length: 255})
    NOME: string;

    @Column()
    NASCIMENTO: Date;

    @Column({length: 255})
    PAIS: string;

    @OneToOne(() => Usuario)
    @JoinTable({
      name:'pessoa',
      joinColumn: {
        name: 'ID',
        referencedColumnName: 'ID',
      },
      inverseJoinColumn: {
        name: 'IDPESSOA',
        referencedColumnName: 'ID'
      }
    })

    @ManyToMany(
        () => FILME, 
        filme => filme.atores, //optional
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
        @JoinTable({
          name: 'filme_pessoa',
          joinColumn: {
            name: 'IDPESSOA',
            referencedColumnName: 'ID',
          },
          inverseJoinColumn: {
            name: 'IDFILME',
            referencedColumnName: 'ID',
          },
        })
    filmes?: FILME[];

    
}