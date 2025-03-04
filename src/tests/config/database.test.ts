import { getAppDataSource } from '../../config/database';
import { User } from '../../infrastructure/entities/User';

async function testDatabase() {
  console.log('Testando nova configuração do banco...');
  try {
    const dataSource = await getAppDataSource();
    console.log('DataSource obtido com sucesso!');

    const userRepo = dataSource.getRepository(User);
    const testUser = new User();
    testUser.username = 'testuser';
    testUser.email = 'test@example.com';
    testUser.password = 'hashedpassword';
    await userRepo.save(testUser);
    console.log('Usuário inserido:', testUser);

    const savedUser = await userRepo.findOneBy({ email: 'test@example.com' });
    if (savedUser) {
      console.log('Usuário recuperado:', savedUser);
    } else {
      throw new Error('Falha ao recuperar usuário');
    }

    await userRepo.delete({ email: 'test@example.com' });
    console.log('Usuário removido.');
  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

testDatabase();