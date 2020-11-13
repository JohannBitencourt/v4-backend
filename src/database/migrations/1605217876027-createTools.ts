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

    await queryRunner.query(`
      INSERT INTO tools (id, title, link, description, tags) 
      VALUES (1,'Notion', 'https://notion.so', 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.', 
      ARRAY ['organization', 'planning', 'collaboration', 'writing', 'calendar']);
      
      INSERT INTO tools (id, title, link, description, tags) 
      VALUES (2,'json-server', 'https://github.com/typicode/json-server', 'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.', 
      ARRAY ['api', 'json', 'schema', 'node', 'github', 'rest']);
      
      INSERT INTO tools (id, title, link, description, tags) 
      VALUES (3,'fastify', 'https://www.fastify.io/', 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.', 
      ARRAY ['web', 'framework', 'node', 'http2', 'https', 'localhost']);
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM tools
      WHERE id IN (1, 2, 3);
    `)
    await queryRunner.dropTable('tools')
  }
}
