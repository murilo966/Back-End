import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { FilmeService } from "src/filme/filme.service";
import { filmeProviders } from "src/filme/filmeProvider";
import { generoProviders } from "src/genero/genero.providers";
import { GeneroService } from "src/genero/genero.service";
import { SerieController } from "./serie.controller";
import { serieProvider } from "./serie.provider";
import { SerieService } from "./serie.service";

@Module({
    imports: [DatabaseModule],
    controllers:[SerieController],
    providers: [
    ...serieProvider,
    SerieService, FilmeService, 
    ...filmeProviders,
    ...generoProviders,
    GeneroService,
    ],
})

export class SerieModule{
    
}