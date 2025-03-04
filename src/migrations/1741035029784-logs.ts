import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Logs1741035029784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'logs',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, generationStrategy: 'increment'},
                { name: 'level', type: 'varchar' },
                { name: 'message', type: 'text' },
                { name: 'timestamp', type: 'varchar' },
                { name: 'trace_id', type: 'integer', }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logs')
    }

}
