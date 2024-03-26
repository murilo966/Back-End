import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";
import { alteraSerieDTO } from "./dto/atualizaSerie.dto";
import { criaSerieDTO } from "./dto/insereSerie.dto";
import { ListaSeriesDTO } from "./dto/listaSerie.dto";
import { SerieService } from "./serie.service";

@ApiTags('serie')
@Controller('/series')
export class SerieController{    
    constructor(private clsSeriesArmazenados: SerieService){
        
    }

    @Get()
    async RetornoSerie(){
        const seriesListados = await this.clsSeriesArmazenados.listar();
        const listaRetorno = seriesListados.map(
            serie => new ListaSeriesDTO(
                serie.ID,
                serie.NOMESERIE,
                serie.EPSODIO,
                serie.TEMPORADA,
                serie.FILME
            )
        );
        
        return listaRetorno;
    }

    @Get('/compartilhar/:id')
    async CompartilharSerie(@Param('id') id: string){
        const retorno = await this.clsSeriesArmazenados.Compartilhar(id);
        return{            
            message: retorno
        }                
    }

    @Delete('/:id')
    async removeSerie(@Param('id') id: string){
        const serieRemovido = await this.clsSeriesArmazenados.remove(id)

        return{
            serie: serieRemovido,
            message: 'Serie removido'
        }
    }

    @Put('/:id')
    async atualizaFilme(@Param('id') id: string, @Body() novosDados: alteraSerieDTO){
        const serieAtualizado = await this.clsSeriesArmazenados.alterar(id, novosDados)

        return{
            serie: serieAtualizado,
            message: 'Serie atualizado'
        }
    }

    @Post()
    async criaSerie(@Body() dados: criaSerieDTO):Promise<RetornoCadastroDTO>{
        return this.clsSeriesArmazenados.inserir(dados);        
    }
}