import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { FilesArmazenados } from './files/files.dm';
import { FilesModule } from './files/files.module';
import { FilmeModule } from './filme/filme.module';
 import { SerieModule } from './serie/serie.module';
import { UsuarioModule } from './usuario/usuario.module';
import { GeneroModule } from './genero/genero.module';




@Module({
  imports: [UsuarioModule,FilesModule,FilmeModule,EmailModule,GeneroModule,SerieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
