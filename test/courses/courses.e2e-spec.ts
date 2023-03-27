import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { CoursesModule } from '../../src/courses/courses.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateCourseDTO } from '../../src/courses/dtos/createCourseDTO'


describe('Courses: /courses', () => {
    let app: INestApplication

    const course = {
        name: 'NestJS',
        description: 'Curso básico de NestJS',
        tags: ['nestjs', 'typeorm', 'nodejs', 'typescript']
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [CoursesModule, TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'docker',
                database: 'testdb',
                autoLoadEntities: true,
                synchronize: true,
            })],
        }).compile()

        app = moduleFixture.createNestApplication()
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            })
        )
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Create POST /courses', () => {
        return request(app.getHttpServer())
            .post('/courses')
            .send(course as CreateCourseDTO)  
            .expect(HttpStatus.CREATED)
            .then(({ body }) => {
                const expectedCourse = jasmine.objectContaining({
                    ...course,
                    tags: jasmine.arrayContaining(
                        course.tags.map(name => jasmine.objectContaining({ name }))
                    )
                })
                expect(body).toEqual(expectedCourse)
            })
    })
})
