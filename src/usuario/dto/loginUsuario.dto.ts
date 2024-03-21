import { IsEmail, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUsuarioDTO{

    @IsEmail(undefined,{message:"email é inválido"})
    @ApiProperty({
        example: 'teste@teste.com',
        description: `Email utilizado no cadastro.`,
    })
    email: string;

    @MinLength(6,{message: "Senha precisa de pelo menos 6 digitos"})
    @ApiProperty({
        example: 'Asd@1234444',
        description: `Senha utilizada no cadastro.`,
    })
    senha: string; 
}