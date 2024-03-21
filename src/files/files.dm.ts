import { Injectable } from '@nestjs/common';
import { FilesEntity } from './files.entity';
import { Request } from 'express';

@Injectable()
export class FilesArmazenados {
  arquivos = [];  
  
  async salvarDados(file: Express.Multer.File, req: Request) {
    const arquivo = new FilesEntity();
    arquivo.fileName = file.filename;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = `${file.filename}`;

    this.arquivos.push(arquivo);
    return arquivo.url;
  }

  async validaArquivo(nome: string){
    const possivelArquivo = this.arquivos.find(
      file => file.fileName === nome
    );
    return(possivelArquivo!==undefined)
  }


}