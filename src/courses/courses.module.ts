import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { CoursesController } from './courses.controller'
import { coursesProviders } from './courses.providers'
import { CoursesService } from './courses.service'

@Module({
    /*
        A configuração abaixo permite que seja importada a entidade
        Como já possuímos uma configuração padrão para o módulo, aqui
        realizamos "apenas" o import da entidade
    */
    imports: [DatabaseModule],
    controllers: [CoursesController],
    providers: [CoursesService, ...coursesProviders],
})
export class CoursesModule {}
