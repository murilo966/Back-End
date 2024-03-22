import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4  as uuid} from 'uuid'
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { GENERO } from 'src/genero/genero.entity';
import { GeneroService } from 'src/genero/genero.service';
import { SerieEntity } from './serie.entity';
import { ListaSeriesDTO } from './dto/listaSerie.dto';
import { criaSerieDTO } from './dto/insereSerie.dto';
import { alteraSerieDTO } from './dto/atualizaSerie.dto';
import { FilmeService } from 'src/filme/filme.service';


@Injectable()
export class SerieService {
  constructor(
    @Inject('GENERO_REPOSITORY')
    private generoRepository: Repository<GENERO>,  
    private readonly generoService: GeneroService,
    @Inject('FILME_REPOSITORY')
    private filmeRepository: Repository<FilmeService>,
    private readonly filmeService: FilmeService,
    @Inject('SERIE_REPOSITORY')
    private serieRepository: Repository<SerieEntity>,
  ) {}

  async listar(): Promise<ListaSeriesDTO[]> {
    var seriesListadas = await this.serieRepository.find();
    return seriesListadas.map(
      serie => new ListaSeriesDTO(
        serie.id,
        serie.nomeSerie,
        serie.episodio,
        serie.temporada,
        serie.filme  
      ))
        
  }

  async Compartilhar(id: string){
    var serie = await (this.serieRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
      .createQueryBuilder('serie')
      .select('serie.is', 'id')
      .addSelect('serie.nomeSerie','nome_serie')
      .addSelect('serie.sinopse','sinopse')
      .addSelect('serie.ano','ano')
      .addSelect('serie.duracao','duracao')
      .addSelect('serie.episodio','episodio')
      .addSelect('serie.temporada','temporada')
      .addSelect('gen.NOME','GENERO')
      .leftJoin('genero', 'gen','filme.idgenero = gen.id')      
      .andWhere('serie.id = :id',{ ID: `${id}` })         
      .getRawOne());

    return{            
      message: "Estou assistindo o episódio " + serie.episodio + " da temporada "+serie.temporada+" da serie "+serie.nomeSerie+
              " que conta a seguinte história: "+serie.sinopse+ ", foi lançado em "+serie.ano+" e tem duração de "
              +serie.duracao+" minutos. Assista também!!" 
    }
  }

  async inserir(dados: criaSerieDTO): Promise<RetornoCadastroDTO>{
        let serie = new SerieEntity();
        let retornoFilme = await this.filmeService.inserir(dados.dadosFilme);
        serie.id = uuid();
        serie.nomeSerie = dados.nomeSerie;
        serie.filme = await this.filmeService.localizarID(retornoFilme.id)

        
    return this.serieRepository.save(serie)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: serie.id,
        message: "Serie cadastrada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  localizarID(id: string): Promise<SerieEntity> {
    return this.serieRepository.findOne({
      where: {
        id,
      },
    });
  }


  async remove(id: string): Promise<RetornoObjDTO> {
    const serie = await this.localizarID(id);
    
    return this.serieRepository.remove(serie)
    .then((result) => {
      return <RetornoObjDTO>{
        return: serie,
        message: "Serie excluida!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: serie,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: alteraSerieDTO): Promise<RetornoCadastroDTO> {
    const serie = await this.localizarID(id);

    Object.entries(dados).forEach(
      async ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          if(chave=== 'genero'){
            serie['genero'] = await this.generoService.localizarID(valor);
            return;
           }

          serie[chave] = valor;
      }
    )

    return this.serieRepository.save(serie)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: serie.id,
        message: "Serie alterada!"
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