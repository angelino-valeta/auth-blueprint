import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1741032127871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'username', type: 'varchar', isUnique: true },
                { name: 'password', type: 'varchar' },
                { name: 'email', type: 'varchar', isUnique: true, isNullable: true },
                { name: 'is_deleted', type: 'boolean', default: false },
                { name: 'role_id', type: 'integer' }
            ],
            foreignKeys: [
                { columnNames: ['role_id'], referencedTableName: 'roles', referencedColumnNames: ['id'], onDelete: 'SET NULL' }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }
}
