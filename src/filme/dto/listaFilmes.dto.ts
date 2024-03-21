export class ListaFilmesDTO{
    constructor(
        readonly ID: string,
        readonly NOME: string,
        readonly DURACAO: number,
        readonly SINOPSE: string,     
        ){}
}
