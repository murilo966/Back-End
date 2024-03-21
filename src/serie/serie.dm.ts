// import { Injectable } from "@nestjs/common";
// import { SerieEntity } from "./serie.entity";


// @Injectable()
// export class SeriesArmazenados{
//     #series: SerieEntity[] = [];  

//     Adicionar(Serie: SerieEntity){
//         this.#series.push(Serie);
//     }

//     atualiza(id: string, dadosAtualizacao: Partial<SerieEntity>){
//         const serie = this.buscaPorID(id);

//         Object.entries(dadosAtualizacao).forEach(
//             ([chave,valor]) => {
//                 if(chave === 'id'){
//                     return
//                 }
//                 serie[chave] = valor;
//             }
//         )

//         return serie;
//     }

//     private buscaPorID(id: string){
//         const possivel = this.#series.find(
//             serie => serie.id === id
//         )

//         if (!possivel){
//             throw new Error('Serie nao encontrado')
//         }
        
//         return possivel;
//     }

//     async remove(id: string){
//         const serie = this.buscaPorID(id);

//         this.#series = this.#series.filter(
//             serie => serie.id !== id
//         )

//         return serie;
//     }

//     async Compartilhar(id: string){
//         const serie = this.buscaPorID(id);

//         return "Estou assistindo o episódio " + serie.episodio + " da temporada "+serie.temporada+" da serie "+serie.nomeSerie+
//         " que conta a seguinte história: "+serie.sinopse+ ", foi lançado em "+serie.ano+" e tem duração de "
//         +serie.duracao+" minutos. Assista também!!"
//     }
    

//     get Filmes(){        
//         return this.#series;
//     }
// }