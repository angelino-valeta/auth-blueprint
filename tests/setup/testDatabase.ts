import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory',
  synchronize: true,
  entities: ['src/infrastructure/entities/**/*.ts'],
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