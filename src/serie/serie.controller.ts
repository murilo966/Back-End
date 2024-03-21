// import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
// import { ApiTags } from "@nestjs/swagger";
// import {v4  as uuid} from 'uuid'
// import { alteraSerieDTO } from "./dto/atualizaSerie.dto";
// import { criaSerieDTO } from "./dto/insereSerie.dto";
// import { ListaSeriesDTO } from "./dto/listaSerie.dto";
// import { SeriesArmazenados } from "./serie.dm";
// import { SerieEntity } from "./serie.entity";

// @ApiTags('serie')
// @Controller('/series')
// export class SerieController{    
//     constructor(private clsSeriesArmazenados: SeriesArmazenados){
        
//     }

//     @Get()
//     async RetornoSerie(){
//         const seriesListados = await this.clsSeriesArmazenados.Filmes;
//         const listaRetorno = seriesListados.map(
//             serie => new ListaSeriesDTO(
//                 serie.id,
//                 serie.nome,
//                 serie.duracao,
//                 serie.sinopse,
//                 serie.episodio,
//                 serie.temporada
//             )
//         );
        
//         return listaRetorno;
//     }

//     @Get('/compartilhar/:id')
//     async CompartilharSerie(@Param('id') id: string){
//         const retorno = await this.clsSeriesArmazenados.Compartilhar(id);
//         return{            
//             message: retorno
//         }
                
//     }

//     @Delete('/:id')
//     async removeSerie(@Param('id') id: string){
//         const serieRemovido = await this.clsSeriesArmazenados.remove(id)

//         return{
//             serie: serieRemovido,
//             message: 'Serie removido'
//         }
//     }


//     @Put('/:id')
//     async atualizaFilme(@Param('id') id: string, @Body() novosDados: alteraSerieDTO){
//         const serieAtualizado = await this.clsSeriesArmazenados.atualiza(id, novosDados)

//         return{
//             serie: serieAtualizado,
//             message: 'Serie atualizado'
//         }
//     }

//     @Post()
//     async criaSerie(@Body() dados: criaSerieDTO){
//         var serie = new SerieEntity(uuid(),dados.nome,dados.duracao,dados.sinopse,
//                                         dados.ano, dados.genero,dados.nomeSerie,dados.episodio,dados.temporada)
        
            
//         this.clsSeriesArmazenados.Adicionar(serie);        
//         var retorno={
//             id: serie.id,
//             message:'Serie Criado'
//         }
        
//         return retorno
//     }
// }