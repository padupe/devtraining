import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateCourseDTO } from './dtos/createCourseDTO'
import { UpdateCourseDTO } from './dtos/updateCourseDTO'
import { Course } from './entities/course.entity'
import { Tag } from './entities/tag.entity'

@Injectable()
export class CoursesService {
    @Inject('COURSES_REPOSITORY')
    private courseRepository: Repository<Course>

    @Inject('TAGS_REPOSITORY')
    private tagRepository: Repository<Tag>

    async findAll() {
        return this.courseRepository.find({
            relations: ['tags'],
        })
    }

    async findOne(id: string) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['tags'],
        })

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found!`)
        }

        return course
    }

    async create(createCourseDTO: CreateCourseDTO) {
        const tags = await Promise.all(
            createCourseDTO.tags.map((name) => this.preloadTagByName(name))
        )

        const newCourse = this.courseRepository.create({
            ...createCourseDTO,
            tags,
        })
        return this.courseRepository.save(newCourse)
    }

    async update(id: string, updateCourseDTO: UpdateCourseDTO) {
        // Verificamos primeiro se a propriedade "tags" existe em "upateCourseDTO"
        const tags =
            updateCourseDTO.tags &&
            (await Promise.all(
                updateCourseDTO.tags.map((name) => this.preloadTagByName(name))
            ))

        const findCourse = await this.courseRepository.preload({
            // Ao usar +id eu informo que este parâmetro deve ser "convertido" para Number
            id,
            ...updateCourseDTO,
            tags,
        })

        if (!findCourse) {
            throw new NotFoundException(`Course ID ${id} not found!`)
        }

        return this.courseRepository.save(findCourse)
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne({ where: { id } })

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found!`)
        }

        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ where: { name } })

        if (tag) {
            return tag
        }

        return this.tagRepository.create({ name })
    }
}
