import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4  as uuid} from 'uuid'
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { FILME } from './filme.entity';
import { criaFilmeDTO } from './dto/insereFilme.dto';
import { alteraFilmeDTO } from './dto/atualizaFilme.dto';
import { GENERO } from 'src/genero/genero.entity';
import { GeneroService } from 'src/genero/genero.service';
import { ListaFilmesDTO } from './dto/listaFilmes.dto';
import { atorFilmeDTO } from './dto/atorFilme.dto';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { FILME_PESSOAService } from 'src/filme_pessoa/filme_pessoa.service';
import { RetornoElencoDTO } from 'src/filme_pessoa/dto/retornoElenco.dto';

@Injectable()
export class FilmeService {
  constructor(
    @Inject('FILME_REPOSITORY')
    private filmeRepository: Repository<FILME>,
    private readonly generoService: GeneroService,
    private readonly atorService:  PessoaService,
    private readonly filmeAtorService:  FILME_PESSOAService
  ) {}

  async listar(): Promise<ListaFilmesDTO[]> {
    var filmesListados = await this.filmeRepository.find();
    return filmesListados.map(
      filme => new ListaFilmesDTO(
          filme.ID,
          filme.NOME,
          filme.DURACAO,
          filme.SINOPSE
      ))
        
  }

  async Compartilhar(id: string){
    var filme = await (this.filmeRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
      .createQueryBuilder('filme')
      .select('filme.ID', 'ID')
      .addSelect('filme.NOME','NOME_PRODUTO')
      .addSelect('filme.SINOPSE','SINOPSE')
      .addSelect('filme.ANO','ANO')
      .addSelect('filme.DURACAO','DURACAO')
      .addSelect('gen.NOME','GENERO')
      .leftJoin('genero', 'gen','filme.idgenero = gen.id')      
      .andWhere('filme.ID = :ID',{ ID: `${id}` })         
      .getRawOne());

    return{            
      message: `Estou assistindo o filme ${filme.NOME} que é do genero ${filme.GENERO} que conta a seguinte história: ${filme.SINOPSE} foi lançado em ${filme.ANO} e tem duração de ${filme.DURACAO} minutos. Assista também!!` 
    }
  }

  async inserir(dados: criaFilmeDTO): Promise<RetornoCadastroDTO>{
    let filme = new FILME();
        filme.ID = uuid();
        filme.NOME = dados.NOME;
        filme.ANO = dados.ANO;
        filme.DURACAO = dados.DURACAO;
        filme.SINOPSE = dados.SINOPSE;
        filme.genero = await this.generoService.localizarNome(dados.GENERO);

    return this.filmeRepository.save(filme)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: filme.ID,
        message: "Filme cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  localizarID(ID: string): Promise<FILME> {
    return this.filmeRepository.findOne({
      where: {
        ID,
      },
    });
  }

  async remover(id: string): Promise<RetornoObjDTO> {
    const filme = await this.localizarID(id);
    
    return this.filmeRepository.remove(filme)
    .then((result) => {
      return <RetornoObjDTO>{
        return: filme,
        message: "Filme excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: filme,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }
  async addAtor(dados: atorFilmeDTO): Promise<RetornoCadastroDTO> {
    const filme = await this.localizarID(dados.IDFILME);
    const ator = await this.atorService.localizarID(dados.IDATOR);
    
    return this.filmeAtorService.inserir(filme,ator,dados.FUNCAO);    
  }

  async removeAtor(dados: atorFilmeDTO): Promise<RetornoCadastroDTO> {
    const filme = await this.localizarID(dados.IDFILME);
    const ator = await this.atorService.localizarID(dados.IDATOR);
    
    return this.filmeAtorService.remover(filme,ator);
  }

  async listarAtor(idfilme: string): Promise<RetornoElencoDTO> {
    const filme = await this.localizarID(idfilme);
    
    return this.filmeAtorService.listarElenco(filme);
  }

  async alterar(id: string, dados: alteraFilmeDTO): Promise<RetornoCadastroDTO> {
    const filme = await this.localizarID(id);

    Object.entries(dados).forEach(
      async ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          if(chave=== 'GENERO'){
            filme['GENERO'] = await this.generoService.localizarID(valor);
            return;
           }

          filme[chave] = valor;
      }
    )

    return this.filmeRepository.save(filme)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: filme.ID,
        message: "Filme alterado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }
}