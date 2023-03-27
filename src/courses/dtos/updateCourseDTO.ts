import { PartialType } from '@nestjs/mapped-types'
import { CreateCourseDTO } from './createCourseDTO'

/* 
    Desta maneira eu informo ao NestJS que devem considerar a mesma estrutura de outra classe
    Neste caso, PartialType "diz" para minha classe "UpdateCourseDTO" que os parâmetros são os
    mesmos da classe "CreateCourseDTO". Porém, são OPCIONAIS, por isso o método se chama "Partial".
*/
export class UpdateCourseDTO extends PartialType(CreateCourseDTO) {}
