import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";
import { criaFilmeDTO } from "src/filme/dto/insereFilme.dto";



export class criaSerieDTO{   
    
    @IsNotEmptyObject()
    dadosFilme: criaFilmeDTO;

    @IsString()
    @ApiProperty({
        example: 'Breaking Bad',
        description: `O nome será utilizado para identificar a série.`,
    })
    nomeSerie: string;

    @IsString()
    @ApiProperty({
        example: '01',
        description: `O número é usado para identificar a ordem dos episódios`,
    })
    episodio: string;

    @IsString()
    @ApiProperty({
        example: '03',
        description: `O número é usado para identificar a ordem das temporadas e para agrupar os mesmos episódios de uma temporada`,
    })
    temporada: string;
    
    @IsString()
    @ApiProperty({
        example: 'Drama',
        description: `Genero é a classificação de segmento de um filme`,
    })
    genero: string;


}
