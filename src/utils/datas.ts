
export default class Datas{
    
    constructor(){
        
    }

    diferencaDias(data){
        var diff = data.getTime() - this.dataAtual().getTime();   
    
        var daydiff = diff / (1000 * 60 * 60 * 24);   
        return daydiff
    }

    adicionarDias(data,dias){
        
        data.setDate(data.getDate() + dias);
        return data;
    }

    removerDias(data,dias){
        data.setDate(data.getDate() - dias);
        return data;
    }

    formatar(data){
        let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() )) ;  
        return dataFormatada;
    }

    dataAtual(){
        return new Date()
    }
}