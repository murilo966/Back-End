import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { generoProviders } from "src/genero/genero.providers";
import { GeneroService } from "src/genero/genero.service";
import { FilmeController } from "./filme.controller";
import { filmeProviders } from "./filmeProvider";
import { FilmeService } from "./filme.service";

@Module({
    imports: [DatabaseModule],
    controllers:[FilmeController],
    providers: [
    ...filmeProviders,
    FilmeService,
    ...generoProviders,
    GeneroService,
    ],
})


export class FilmeModule{
    
}