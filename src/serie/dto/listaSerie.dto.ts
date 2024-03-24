export class ListaSeriesDTO{
    constructor(
        readonly ID: string,
        readonly NOMESERIE: string,
        readonly EPSODIO: number,
        readonly TEMPORADA: number,
        readonly FILME: object            
        ){}
}

