import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Events1741035582902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'events',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'type', type: 'varchar' },
                { name: 'payload', type: 'jsonb' },
                { name: 'timestamp', type: 'varchar' },
                { name: 'userId', type: 'integer', isNullable: true },
                { name: 'traceId', type: 'integer' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('events');
    }

}
