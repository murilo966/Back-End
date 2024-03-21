import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";


@Injectable()
export class UsuariosArmazenados{
    #usuarios = [];    

    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    atualizaUSuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>){
        const usuario = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave,valor]) => {
                if(chave === 'id'){
                    return
                }else if(chave === 'senha'){
                    usuario.trocaSenha(valor);
                    return
                }

                usuario[chave] = valor;
            }
        )

        return usuario;
    }

    private buscaPorID(id: string){
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        )

        if (!possivelUsuario){
            throw new Error('Usuario nao encontrado')
        }
        
        return possivelUsuario;
    }

    async removeUsuario(id: string){
        const usuario = this.buscaPorID(id);

        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return usuario;
    }

    buscaPorEmail(email:string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        );
        return possivelUsuario;
    }

    validaEmail(email:string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario !== undefined);
    }

    validaAssinatura(id: string){
        const usuario = this.buscaPorID(id);

        return {
            valida: usuario.validarAssinatura(),
            vencimento: usuario.retornaAssinatura()
        };
    }

    adicionarAssinatura(id: string,dias: BigInteger){
        const usuario = this.buscaPorID(id);

        usuario.adicionarAssinatura(dias);

        return usuario.retornaAssinatura();
    }

    validarLogin(email:string,senha:string){
        const usuario = this.buscaPorEmail(email);
        if (usuario)
            return [usuario,usuario.login(senha)];
        else
            return [null,false];  
    }



    get Usuarios(){        
        return this.#usuarios;
    }
}