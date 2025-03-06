import { setupTestDatabase, teardownTestDatabase } from './testDatabase'


beforeAll(async () => {
  await setupTestDatabase()
})

afterAll(async () => {
  await teardownTestDatabase()
  jest.restoreAllMocks()
})

afterEach(() => {
  jest.clearAllMocks();
});