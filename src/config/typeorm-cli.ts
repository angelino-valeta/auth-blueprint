import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'

dotenv.config()

if (!process.env.DB_HOST) throw new Error('DB_HOST não configurado no .env')
if (!process.env.DB_NAME) throw new Error('DB_NAME não configurado no .env')

const isTsNode = process.env.TS_NODE === 'true'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [isTsNode ? 'src/infrastructure/entities/**/*.ts' : 'dist/infrastructure/entities/**/*.js'],
  migrations: [isTsNode ? 'src/migrations/*.ts' : 'dist/src/migrations/*.js'],
  logging: true
})