import { DataSource } from 'typeorm'
import { CreateCoursesTable1677761920767 } from './migrations/1677761920767-CreateCoursesTable'
import { CreateTagsTable1677762441780 } from './migrations/1677762441780-CreateTagsTable'
import { CreateCoursesTagsTable1677844227028 } from './migrations/1677844227028-CreateCoursesTagsTable'
import { AddCourseIdToCoursesTagsTable1677844621460 } from './migrations/1677844621460-AddCourseIdToCoursesTagsTable'
import { AddTagIdToCoursesTagsTable1677845277197 } from './migrations/1677845277197-AddTagIdToCoursesTagsTable'

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'db',
                port: 5432,
                username: 'postgres',
                password: 'docker',
                database: 'cursonestjs',
                entities: [__dirname + '/**/*.entity.js'],
                // Esta propriedade permite "carregar" as entidades mapeadas no meu projeto
                // AutoLoad só deve ser TRUE no ambiente de desenvolvimento
                // autoLoadEntities: true,
                // A propriedade "synchronize" NUNCA deve ser utilizada no ambiente de Produção
                synchronize: false,
            })
            return dataSource.initialize()
        },
    },
]

// Replicamos esta configuração, pois a CLI do TypeORM não consegue capturar dentro de 'Factory'
export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'cursonestjs',
    entities: [__dirname + '/**/*.entity.js'],
    synchronize: false,
    migrations: [
        CreateCoursesTable1677761920767,
        CreateTagsTable1677762441780,
        CreateCoursesTagsTable1677844227028,
        AddCourseIdToCoursesTagsTable1677844621460,
        AddTagIdToCoursesTagsTable1677845277197,
    ],
})
