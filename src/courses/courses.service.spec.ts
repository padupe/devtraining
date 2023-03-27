import { Connection, Repository } from 'typeorm'
import { CoursesService } from './courses.service'

import { NotFoundException } from '@nestjs/common'

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
