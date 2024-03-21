import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { FilesArmazenados } from "../files.dm";

@Injectable()
@ValidatorConstraint({async:true})
export class ArquivoValidoValidator implements ValidatorConstraintInterface{
    //constructor (private arquivos: FilesArmazenados){}
    constructor (){}
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        var arquivos;
        const fs = require('fs');
        fs.readdir('./upload/files/', (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        arquivos = files;
        });


        //const validaArquivo = await this.arquivos.validaArquivo(value);
        const validaArquivo = true;
        return validaArquivo;
    }    
}

export const ArquivoValido = (opcaoValidacao: ValidationOptions)=>{
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator: ArquivoValidoValidator,
        })
    }
}