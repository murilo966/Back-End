import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { alteraFilmeDTO } from "./dto/atualizaFilme.dto";
import { criaFilmeDTO } from "./dto/insereFilme.dto";
import { ListaFilmesDTO } from "./dto/listaFilmes.dto";
import { ApiTags } from "@nestjs/swagger";
import { FilmeService } from "./filme.service";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { atorFilmeDTO } from "./dto/atorFilme.dto";
import { RetornoElencoDTO } from "src/filme_pessoa/dto/retornoElenco.dto";

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
    
    @Post('/ator/')
    async addAtor( @Body() dados: atorFilmeDTO):Promise<RetornoCadastroDTO>{
        return this.filmeService.addAtor(dados);        
    }

    @Delete('/ator/')
    async removeAtor( @Body() dados: atorFilmeDTO):Promise<RetornoCadastroDTO>{
        return this.filmeService.removeAtor(dados);        
    }

    @Get('/ator/:id')
    async listaElencoFilme( @Param('id') id: string):Promise<RetornoElencoDTO>{
        return this.filmeService.listarAtor(id);        
    }
}