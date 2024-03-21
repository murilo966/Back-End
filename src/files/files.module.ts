import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesArmazenados } from "./files.dm";

@Module({
    controllers:[FilesController],
    providers: [FilesArmazenados]
})

export class FilesModule{
    
}