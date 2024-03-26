import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyObject, IsNumber, IsString } from "class-validator";
import { criaFilmeDTO } from "src/filme/dto/insereFilme.dto";

export class criaSerieDTO{   
    
    @IsNotEmptyObject()
    dadosFilme: criaFilmeDTO;

    @IsString()
    @ApiProperty({
        example: 'Breaking Bad',
        description: `O nome será utilizado para identificar a série.`,
    })
    NOMESERIE: string;

    @IsNumber()
    @ApiProperty({
        example: '01',
        description: `O número é usado para identificar a ordem dos episódios`,
    })

    EPSODIO: number;

    @IsNumber()
    @ApiProperty({
        example: '03',
        description: `O número é usado para identificar a ordem das temporadas e para agrupar os mesmos episódios de uma temporada`,
    })
    TEMPORADA: number;
    
    @IsString()
    @ApiProperty({
        example: 'Drama',
        description: `Genero é a classificação de segmento de um filme`,
    })
    GENERO: string;


}
