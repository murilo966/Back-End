import Datas from "../utils/datas";
import * as bcrypt from 'bcrypt';

export class UsuarioEntity{
    id: string;
    nome: string;
    idade: number;
    cidade: string;
    email: string;
    telefone: string;
    senha: string; 
    assinatura: Date;
    cep: string;
    logradouro: string;
    complemento: string;
    foto: string;
    #datas: Datas;
    
    constructor(id: string,nome: string,idade: number,cidade: string,email: string,telefone: string,senha: string,foto: string,cep: string, logradouro: string, complemento:string){
        const saltOrRounds = 10;

        this.#datas = new Datas();
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.email = email;
        this.telefone = telefone;
        this.senha = bcrypt.hashSync(senha, saltOrRounds);
        this.assinatura = this.#datas.dataAtual();
        this.foto = foto;
    }


    login(senha){
        return bcrypt.compareSync(senha,this.senha);
    }

    trocaSenha(senha){
        const saltOrRounds = 10;
        this.senha = bcrypt.hashSync(senha, saltOrRounds);
    }

    retornaAssinatura(){
        return this.#datas.formatar(this.assinatura);
    }

    validarAssinatura(){
        var dias = this.#datas.diferencaDias(this.assinatura)
        return (dias >= 1)
    }

    adicionarAssinatura(dias){
        this.assinatura = this.#datas.adicionarDias(this.assinatura,dias)
    }

}