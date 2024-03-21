import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";



export class criaFilmeDTO{
    @IsString()
    @IsNotEmpty({message: "nome Não pode ser vazio"})
    @ApiProperty({
        example: 'Indiana Jones',
        description: `O nome é usado para identificar o filme e listar.`,
    })
    NOME:string;
    
    @IsInt()
    @ApiProperty({
        example: '120',
        description: `A duração é um parametro numerico que armazena quantos minutos tem o filme.`,
    })
    DURACAO: number;

    @IsString()
    @ApiProperty({
        example: 'O filme conta a história de um arqueólogo....',
        description: `Uma breve descrição ou a sinopse completa do filme.`,
    })
    SINOPSE: string;

    @IsString()  
    @ApiProperty({
        example: '2012',
        description: `O ano de lançamento do filme.`,
    })  
    ANO: string;

    @IsString()
    @ApiProperty({
        example: '20b4d2b8-c682-4e64-bc05-a32b76d4ba13',
        description: `ID do genero do filme`,
    })
    GENERO: string;

}

