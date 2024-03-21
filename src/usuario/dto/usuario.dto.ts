import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ArquivoValido } from "src/files/validacao/arquivo-valido.validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/strongpass.validator";


export class criaUsuarioDTO{
    @IsString({message: "nome tem que ser string"})
    @IsNotEmpty({message: "nome Não pode ser vazio"})
    @ApiProperty({
        example: 'Roberto Silva',
        description: `O nome é usado para identificar o usuário, em telas, cadastros e outros.`,
    })
    nome:string;
    
    @IsInt()
    @ApiProperty({
        example: '18',
        description: `A idade é utilizada para identificar a idade do usuário, deve ser numérico.`,
    })
    idade: number;

    @IsString()
    @ApiProperty({
        example: 'São Paulo',
        description: `A cidade é utilizada para identificar a localização do usuário.`,
    })
    cidade: string;

    @IsNumberString()
    @MinLength(8,{message:'CEP precisa ter 8 numeros'})
    @MaxLength(8,{message:'CEP precisa ter 8 numeros'})
    @ApiProperty( {
        example: '17010150',
        description: `O CEP é utilizado para preencher o endereço.`,
    })
    cep:string;

    @IsEmail(undefined,{message:"email é inválido"})
    @EmailUnico({message:"O email informado já existe"})
    @ApiProperty({
        example: 'teste@teste.com',
        description: `O email é utilizado para o login e identificação do usuário. Deve ser único.`,
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: '(00)00000-0000',
        description: `O telefone pode ser usado para se comunicar com o usuário.`,
        
    })
    telefone: string;

    @MinLength(6,{message: "Senha precisa de pelo menos 6 digitos"})
    @SenhaForte({message: "Senha muito fraca"})
    @ApiProperty({
        example: 'Asd@444555666',
        description: `A senha deve conter pelo menos 6 caracteres, contar com letras minusculas e maiusculas, numeros e caracteres especiais.`,
    })
    senha: string; 

    
    @IsOptional()
    @ArquivoValido({message:'Arquivo não encontrado ou inválido'})
    @ApiProperty({
        example: 'nomearquivo-idarquivo.png',
        description: `Esse campo é responsável pela foto do usuário, para ser enviado o dado correto é necessário que seja feito o upload pelo modulo FILES.`,
    })
    foto: string; 
}
