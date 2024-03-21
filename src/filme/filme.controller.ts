import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { alteraFilmeDTO } from "./dto/atualizaFilme.dto";
import { criaFilmeDTO } from "./dto/insereFilme.dto";
import { ListaFilmesDTO } from "./dto/listaFilmes.dto";
import { FILME } from "./filme.entity";
import {v4  as uuid} from 'uuid'
import { ApiTags } from "@nestjs/swagger";
import { FilmeService } from "./filme.service";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";

@ApiTags('filme')
@Controller('/filmes')
export class FilmeController{    
    constructor(private readonly filmeService: FilmeService){
    }

    @Get()
    async Retorno():Promise<ListaFilmesDTO[]> {
        return this.filmeService.listar();
    }

    @Get('/compartilhar/:id')
    async Compartilhar(@Param('id') id: string): Promise<{message:String}>{
        return this.filmeService.Compartilhar(id);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.filmeService.remover(id);
    }


    @Put('/:id')
    async atualiza(@Param('id') id: string, @Body() novosDados: alteraFilmeDTO):Promise<RetornoCadastroDTO>{
        return this.filmeService.alterar(id, novosDados);
    }

    @Post()
    async cria(@Body() dados: criaFilmeDTO):Promise<RetornoCadastroDTO>{
        return this.filmeService.inserir(dados);        
    }
}