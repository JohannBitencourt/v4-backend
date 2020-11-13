import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsers1605291556096 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'password',
          type: 'varchar'
        }
      ]
    }))

    await queryRunner.query(`
      INSERT INTO users (id, name, email, password) 
      VALUES ('e257b4d1-cc78-45b7-b753-0d9b63096187','Rick Sanchez', 'rick@test.com', '$2a$08$9aLD0xkxtR/SzqI./noI/OaIShUPaLJYq9XT5j8zI8Y0Kj9lhdJBS');

      INSERT INTO users (id, name, email, password) 
      VALUES ('c12d908b-ab2d-40fe-8da8-bd2fc4bda445','Morty Smith', 'morty@test.com', '$2a$08$zlFGmJupfcNE/O739HjqJOfWSvDm3yk.Xn.cAGtY4wo6NEqK5Sv/u');

      INSERT INTO users (id, name, email, password) 
      VALUES ('5553cf6d-7f9f-4556-bb91-d9a3ce5e5197','Beth Smith', 'beth@test.com', '$2a$08$h.QSs95tqLJkHViS3WQbee7T69GnWNIYdrAOUSsmPYgYNcZaT7khy');
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users
      WHERE name IN ('Rick Sanchez', 'Morty Smith', 'Beth Smith');
    `)
    await queryRunner.dropTable('users')
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')
  }
}
