import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Role1741014052115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'roles',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar', isUnique: true },
                { name: 'permissions', type: 'jsonb', default: "'[]'" }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles')
    }
}
