import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm'

export class AddCourseIdToCoursesTagsTable1677844621460
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags',
            new TableColumn({
                name: 'coursesId',
                type: 'uuid',
                // Setamos essa propriedade para evitar que dados sejam perdidos na Migração
                isNullable: true,
            })
        )

        // Criando a "Chave Estrangeira"
        await queryRunner.createForeignKey(
            'courses_tags',
            new TableForeignKey({
                name: 'courses_tags_courses',
                columnNames: ['coursesId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // No REVERT, os passos são inversos
        // O que foi criado por último e "desfeito" primeiro
        await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses')

        await queryRunner.dropColumn('courses_tags', 'coursesId')
    }
}
