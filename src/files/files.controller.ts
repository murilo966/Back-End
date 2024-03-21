import {Controller,Post,UseInterceptors,UploadedFile,Req, Get, Param, Res} from '@nestjs/common';
import { FilesArmazenados } from './files.dm';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request } from 'express';
  
@Controller('/files')
export class FilesController {
    constructor(private readonly arquivos: FilesArmazenados) {}

    @Post()
    @UseInterceptors(FileInterceptor('arquivo', multerConfig))
    uploadArquivo(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        return this.arquivos.salvarDados(file, req);
    }

    @Get(':imgpath')
    retornaArquivo(@Param('imgpath') image, @Res() res){
        return res.sendFile(image,{root: './upload/files'})
    }
}