import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { criaUsuarioDTO } from "./dto/usuario.dto";
import { Usuario } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import {v4  as uuid} from 'uuid'
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/atualizaUsuario.dto";

import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AlteraFotoUsuarioDTO } from "./dto/alteraFotoUsuario.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map, throwError } from "rxjs";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { UsuarioService } from "./usuario.service";

@ApiTags('usuario')
@Controller('/usuarios')
export class UsuarioController{    
    constructor(private usuarioService: UsuarioService){
        
    }   

    @ApiResponse({ status: 200, description: 'Retorna os usuários cadastrados.'})
    @Get()
    async RetornoUsuarios(){
        const usuariosListados = await this.usuarioService.listar();
        const listaRetorno = usuariosListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.ID,
                usuario.CIDADE,
                usuario.EMAIL,
                usuario.PESSOA,
                usuario.ASSINATURA,
                usuario.SENHA,
            )
        );
        
        return listaRetorno;
    }

    @ApiResponse({ status: 200, description: 'Retorna se houve sucesso no login. O retorno "Status" diz se houve sucesso ou não.'})
    @Post('/login')
    async Login(@Body() dadosUsuario: LoginUsuarioDTO): Promise<RetornoObjDTO>{
        return this.usuarioService.validarLogin(dadosUsuario.EMAIL,dadosUsuario.SENHA)
    }

    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso ao excluir o usuário.'})
    @ApiResponse({ status: 500, description: 'Retorna que o usuário não foi encontrado.'})
    @Delete('remove-:id')
    async removeUsuario(@Param('id') id: string): Promise<RetornoObjDTO>{
        const usuarioRemovido = await this.usuarioService.removeUsuario(id)

        return{
            return: usuarioRemovido,
            message: 'Usuário removido'
        }
    }

    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso ao alterar o usuário.'})
    @ApiResponse({ status: 500, description: 'Retorna que o usuário não foi encontrado.'})
    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AlteraUsuarioDTO){
        const usuarioAtualizado = await this.usuarioService.atualizaUSuario(id, novosDados)

        return{
            usuario: usuarioAtualizado,
            message: 'Usuário atualizado'
        }
        
    }

    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso ao modificar a assinatura.'})
    @ApiResponse({ status: 500, description: 'Retorna que o usuário não foi encontrado.'})
    @Put('/assinatura/:id/:dias')
    async adicionaAssinatura(@Param('id') id: string, @Param('dias') dias: BigInteger){
        const vencimento = await this.usuarioService.adicionarAssinatura(id, dias)

        return{
            vencimento: vencimento,
            message: 'Usuário atualizado'
        }
    }

    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso ao encontrar a assinatura.'})
    @ApiResponse({ status: 500, description: 'Retorna que o usuário não foi encontrado.'})
    @Get('/assinatura/:id')
    async buscaAssinatura(@Param('id') id: string){
        const vencimento = await this.usuarioService.validaAssinatura(id)

        return{
            vencimento: vencimento            
        }
    }

    // @ApiResponse({ status: 200, description: 'Retorna que houve sucesso ao trocar a foto.'})
    // @ApiResponse({ status: 500, description: 'Retorna que o usuário não foi encontrado.'})
    // @Post('/foto/:id')
    // async atualizaFoto(@Param('id') id: string,@Body() AlteraFotoUsuarioDTO){
    //     const usuario = await this.usuarioService.atualizaUSuario(id,AlteraFotoUsuarioDTO)

    //     return{
    //         usuario: usuario            
    //     }
    // }


    @ApiCreatedResponse({ description: 'Retorna que houve sucesso ao cadastrar o usuário e retorna o ID criado.'})
    @Post()
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO):Promise<RetornoCadastroDTO>{
        return this.usuarioService.inserir(dadosUsuario);  
    }
}