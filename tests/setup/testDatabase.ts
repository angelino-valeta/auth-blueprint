import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'
import * as glob from 'glob'
import * as path from 'path'

dotenv.config({ path: '.env.test' })

const files = glob.sync('src/infrastructure/entities/**/*.ts')
const fileNames = files.map(file => path.basename(file))
const entities = fileNames
entities.forEach((entity) => {
  const columns = (entity as any).__columns || [];
  columns.forEach((col: any) => {
    if (col.options && col.options.type === 'jsonb') {
      col.options.type = 'json';
    }
  });
});


export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory',
  synchronize: true,
  entities,
  logging: false
})

export async function setupTestDatabase() {
  if (!testDataSource.isInitialized) {
    await testDataSource.initialize()
  }
  return testDataSource
}

export async function teardownTestDatabase() {
  if (testDataSource.isInitialized) {
    await testDataSource.destroy()
  }
}