import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity";


@Injectable()
export class UsuariosArmazenados{
    #usuarios = [];    

    AdicionarUsuario(usuario: Usuario){
        this.#usuarios.push(usuario);
    }

    atualizaUSuario(id: string, dadosAtualizacao: Partial<Usuario>){
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
    get Usuarios(){        
        return this.#usuarios;
    }
}