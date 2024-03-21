import { ApiPropertyOptional } from "@nestjs/swagger";
import { ArquivoValido } from "src/files/validacao/arquivo-valido.validator";

export class AlteraFotoUsuarioDTO{
    
    @ApiPropertyOptional({
        example: 'nomearquivo-idarquivo.png',
        description: `Esse campo é responsável pela foto do usuário, para ser enviado o dado correto é necessário que seja feito o upload pelo modulo FILES.`,
    })
    @ArquivoValido({message:'Arquivo não encontrado ou inválido'})
    foto: string;     
}