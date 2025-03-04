import { getAppDataSource } from "@config/database";
import { User } from "@infrastructure/entities/User";
import { DataSource } from "typeorm";

describe('Database configuration', () => {

  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await getAppDataSource()
  })

  afterAll(async () => {
    if(dataSource && dataSource.isInitialized){
      dataSource.destroy()
    }
  })

  it('should connect to the database and perform CRUD operations', async () => {
    expect(dataSource).toBeDefined()
    expect(dataSource.isInitialized).toBe(true)

    const userRepo = dataSource.getRepository(User)
    const testUser = new User()
    testUser.username = 'testdatabaseuser'
    testUser.email = 'testdatabaseuser@example.com'
    testUser.password = 'hashedpassword'
    await userRepo.save(testUser)
    const savedUser = await userRepo.findOneBy({ email: 'testdatabaseuser@example.com' })
    expect(savedUser).not.toBeNull()
    expect(savedUser?.username).toBe('testdatabaseuser')

    await userRepo.delete({ email: 'testdatabaseuser@example.com' })
    const deletedUser = await userRepo.findOneBy({ email: 'testdatabaseuser@example.com' })
    expect(deletedUser).toBeNull()
  })
})