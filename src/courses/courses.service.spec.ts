import { CoursesService } from './courses.service'
import { CreateCourseDTO } from './dtos/createCourseDTO'
import { UpdateCourseDTO } from './dtos/updateCourseDTO'

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
            findOne: jest.fn(),
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

    it('should be list courses', async () => {
        const expectOutputTags = [{ id, name: 'nestjs', create_at: date }]
        const expectOutputCourses = [
            {
                id,
                name: 'Test',
                description: 'Test description.',
                created_at: date,
                tags: expectOutputTags,
            },
        ]

        const mockCourseRepository = {
            findAll: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourses)),
            find: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourses)),
        }

        // @ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository

        const courses = await service.findAll()
        expect(mockCourseRepository.find).toHaveBeenCalled()
        expect(expectOutputCourses).toStrictEqual(courses)
    })

    it('should gets a course', async () => {
        const expectOutputTags = [{ id, name: 'nestjs', create_at: date }]
        const expectOutputCourse = {
            id,
            name: 'Test',
            description: 'Test description.',
            created_at: date,
            tags: expectOutputTags,
        }

        const mockCourseRepository = {
            findOne: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourse)),
        }

        // @ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository

        const course = await service.findOne(id)
        expect(mockCourseRepository.findOne).toHaveBeenCalled()
        expect(expectOutputCourse).toStrictEqual(course)
    })

    it('should updates a course', async () => {
        const expectOutputTags = [{ id, name: 'nestjs', create_at: date }]
        const expectOutputCourse = {
            id,
            name: 'Test',
            description: 'Test description.',
            created_at: date,
            tags: expectOutputTags,
        }

        const mockCourseRepository = {
            preload: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourse)),
            save: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourse)),
            update: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourse)),
        }

        const mockTagRepository = {
            create: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputTags)),
            findOne: jest.fn(),
        }

        // @ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository
        // @ts-expect-error defined part of methods
        service['tagRepository'] = mockTagRepository

        const updateCourseDTO: UpdateCourseDTO = {
            name: expectOutputCourse.name,
            description: expectOutputCourse.description,
            tags: [expectOutputTags[0].name],
        }

        const course = await service.update(id, updateCourseDTO)
        expect(mockCourseRepository.save).toHaveBeenCalled()
        expect(expectOutputCourse).toStrictEqual(course)
    })

    it('should deletes a course', async () => {
        const expectOutputTags = [{ id, name: 'nestjs', create_at: date }]
        const expectOutputCourse = {
            id,
            name: 'Test',
            description: 'Test description.',
            created_at: date,
            tags: expectOutputTags,
        }

        const mockCourseRepository = {
            findOne: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourse)),
            remove: jest
                .fn()
                .mockReturnValue(Promise.resolve(expectOutputCourse)),
        }

        // @ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository

        const course = await service.remove(id)
        expect(mockCourseRepository.remove).toHaveBeenCalled()
        expect(expectOutputCourse).toStrictEqual(course)
    })
})
