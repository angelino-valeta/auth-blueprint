import { DataSource, QueryRunner } from 'typeorm'
import * as dotenv from 'dotenv'
import logger from './logger';


dotenv.config()

if (!process.env.DB_HOST) throw new Error('DB_HOST não configurado no .env');
if (!process.env.DB_NAME) throw new Error('DB_NAME não configurado no .env');
const isTsNode = process.env.TS_NODE === 'true'

let dataSourceInstance: DataSource | null = null


const dataSourceConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: Boolean(process.env.DB_SYNC),
  entities: [isTsNode ? 'src/infrastructure/entities/**/*.ts' : 'dist/infrastructure/entities/**/*.js'],
  migrations: [isTsNode ? 'src/migrations/*.ts' : 'dist/migrations/*.js'],
  logging: false,
  logger: 'advanced-console',
}

async function initializeDataSource(): Promise<DataSource> {
  const dataSource = new DataSource({
    ...dataSourceConfig,
    logger: {
      logQuery: (query: string, parameters?: any[], queryRunner?: QueryRunner) => {
        logger.debug('Query executada', { query, parameters });
      },
      logQueryError: (error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) => {
        logger.error('Erro na query', { error, query, parameters });
      },
      logQuerySlow: (time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) => {
        logger.warn('Query lenta', { time, query, parameters });
      },
      logSchemaBuild: (message: string) => {
        logger.info('Schema construído', { message });
      },
      logMigration: (message: string) => {
        logger.info('Migração executada', { message });
      },
      log: (level: 'log' | 'info' | 'warn', message: any) => {
        logger[level === 'log' ? 'info' : level](message);
      },
    },
  });

  try {
    await dataSource.initialize()
    logger.info('Conexão com o banco de dados estabelecida com sucesso', {
      host: process.env.DB_HOST || 'localhost',
      database: dataSource.options.database
    })
    return dataSource
  } catch (error: any) {
    logger.error('Erro ao inicializar o banco de dados', { error: error.message, stack: error.stack });
    throw error;
  }

}

export async function getAppDataSource(): Promise<DataSource> {
  if (!dataSourceInstance || !dataSourceInstance.isInitialized) {
    dataSourceInstance = await initializeDataSource();
  }
  return dataSourceInstance;
}

process.on('SIGINT', async () => {
  if (dataSourceInstance && dataSourceInstance.isInitialized) {
    logger.info('Encerrando aplicação... Desconectando banco de dados');
    try {
      await dataSourceInstance.destroy();
      logger.info('Banco de dados desconectado com sucesso');
    } catch (error: any) {
      logger.error('Erro ao desconectar o banco de dados', { error: error.message });
    }
  }
  process.exit(0);
});