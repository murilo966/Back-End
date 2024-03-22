export class ListaSeriesDTO{
    constructor(
        readonly id: string,
        readonly nomeSerie: string,
        readonly episodio: number,
        readonly temporada: number,
        readonly filme: object            
        ){}
}

