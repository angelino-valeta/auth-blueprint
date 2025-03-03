import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Audits1741035658210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'audits',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'action', type: 'varchar' },
                { name: 'userId', type: 'integer', isNullable: true },
                { name: 'details', type: 'jsonb' },
                { name: 'timestamp', type: 'varchar' },
                { name: 'traceId', type: 'varchar', isNullable: true },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('audits');
    }

}
