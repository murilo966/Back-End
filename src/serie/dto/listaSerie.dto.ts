export class ListaSeriesDTO{
    constructor(
        readonly id: string,
        readonly nomeSerie: string,
        readonly duracao: number,
        readonly nome: string,
        readonly episodio: string,
        readonly temporada: string,             
        ){}
}

