import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { generoProviders } from "src/genero/genero.providers";
import { GeneroService } from "src/genero/genero.service";
import { FilmeController } from "./filme.controller";
import { filmeProviders } from "./filmeProvider";
import { FilmeService } from "./filme.service";
import { pessoaProviders } from "src/pessoa/pessoa.providers";
import { filme_pessoaProviders } from "src/filme_pessoa/filme_pessoa.providers";
import { PessoaService } from "src/pessoa/pessoa.service";
import { FILME_PESSOAService } from "src/filme_pessoa/filme_pessoa.service";

@Module({
    imports: [DatabaseModule],
    controllers:[FilmeController],
    providers: [
    ...filmeProviders,
    FilmeService,
    ...generoProviders,
    GeneroService,
    ...pessoaProviders,
    PessoaService,
    ...filme_pessoaProviders,
    FILME_PESSOAService,
    ],
})


export class FilmeModule{
    
}