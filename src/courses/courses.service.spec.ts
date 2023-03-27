import { Connection, Repository } from 'typeorm'
import { CoursesService } from './courses.service'

import { NotFoundException } from '@nestjs/common'
import { CreateCourseDTO } from './dtos/createCourseDTO'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
})

describe('CoursesService', () => {
    let service: CoursesService
    let id: string
    let date: Date

    beforeEach(async () => {
        service = new CoursesService()
        id = '8c06c119-881f-4afd-864b-fda27d4d733c'
        date = new Date()
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should be create a course', async () => {
        const expectOutputTags = [{ id, name: 'nestjs', create_at: date }]
        const expectOutputCourse = {
            id,
            name: 'Test',
            description: 'Test description.',
            created_at: date,
            tags: expectOutputTags,
        }

        const mockCourseRepository = {
            create: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourse)),
            save: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourse)),
        }

        const mockTagRepository = {
            create: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputTags)),
            findOne: jest.fn().mockReturnValue,
        }

        // @ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository
        // @ts-expect-error defined part of methods
        service['tagRepository'] = mockTagRepository

        const createCourseDTO: CreateCourseDTO = {
            name: expectOutputCourse.name,
            description: expectOutputCourse.description,
            tags: [expectOutputTags[0].name],
        }

        const newCourse = await service.create(createCourseDTO)
        expect(mockCourseRepository.save).toHaveBeenCalled()
        expect(expectOutputCourse).toStrictEqual(newCourse)
    })

    // describe('findOne', () => {
    //     describe('buscar curso pelo ID', () => {
    //         it('deve retornar o objeto Course', async () => {
    //             const courseId = '1'
    //             const expectedCourse = {}

    //             courseRepository.findOne.mockReturnValue(expectedCourse)
    //             const course = await service.findOne(courseId)
    //             expect(course).toEqual(expectedCourse)
    //         })

    //         it('deve retornar uma NotFoundException', async () => {
    //             const courseId = '1'
    //             courseRepository.findOne.mockReturnValue(undefined)

    //             try {
    //                 await service.findOne(courseId)
    //             } catch (error) {
    //                 expect(error).toBeInstanceOf(NotFoundException)
    //                 expect(error.message).toEqual(
    //                     `Course ID ${courseId} not found!`
    //                 )
    //             }
    //         })
    //     })
    // })
})
