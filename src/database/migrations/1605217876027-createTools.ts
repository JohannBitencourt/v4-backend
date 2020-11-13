import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTools1605217876027 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tools',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'title',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'link',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'description',
          type: 'varchar'
        },
        {
          name: 'tags',
          type: 'varchar',
          isArray: true
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tools')
  }
}
