import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";



export class alteraFilmeDTO{
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: "nome Não pode ser vazio"})
    @ApiPropertyOptional({
        example: 'Indiana Jones',
        description: `O nome é usado para identificar o filme e listar.`,
    })
    NOME:string;
    
    @IsInt()
    @IsOptional()
    @ApiPropertyOptional({
        example: '120',
        description: `A duração é um parametro numerico que armazena quantos minutos tem o filme.`,
    })
    DURACAO: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'O filme conta a história de um arqueólogo....',
        description: `Uma breve descrição ou a sinopse completa do filme.`,
    })
    SINOPSE: string;

    @IsString()    
    @IsOptional()
    @ApiPropertyOptional({
        example: '2012',
        description: `O ano de lançamento do filme.`,
    })
    ANO: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: '20b4d2b8-c682-4e64-bc05-a32b76d4ba13',
        description: `ID do genero do filme`,
    })
    GENERO: string;

}