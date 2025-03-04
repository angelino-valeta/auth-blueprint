import { createClient } from 'redis'
import * as dotenv from 'dotenv'

dotenv.config()

if (!process.env.REDIS_HOST) throw new Error('REDIS_HOST não configurado')
if (!process.env.REDIS_PORT) throw new Error('REDIS_PORT não configurado')

let redisInstance: any = null

const initializeRedis = async () => {
  const client = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });

  let reconnectAttempts = 0
  const maxReconnectAttempts = 5

  client.on('error', async (err) => {
    console.error('Redis Client Error', { error: err.message, stack: err.stack })

    if (reconnectAttempts < maxReconnectAttempts && !client.isOpen) {
      reconnectAttempts++
      console.log(`Tentativa de reconexão ${reconnectAttempts}/${maxReconnectAttempts}...`)
      setTimeout(async () => {
        try {
          await client.connect()
          console.log('Reconexão bem-sucedida!')
          reconnectAttempts = 0
        } catch (reconnectErr) {
          console.error('Falha na reconexão:', reconnectErr)
        }
      }, 5000) // Espera 5 segundos antes de tentar reconectar
    } else if (reconnectAttempts >= maxReconnectAttempts) {
      console.error('Número máximo de tentativas de reconexão atingido. Desistindo...')
      // Notificar um sistema de monitoramento ou encerrar o app
    }
  });

  try {
    await client.connect()
    console.log('Conectado ao Redis com sucesso!')
    return client
  } catch (err) {
    console.error('Erro ao conectar ao Redis na inicialização', { error: err })
  }

}

process.on('SIGINT', async () => {
  console.log('Encerrando aplicação... Desconectando Redis.')
  try {
    await redisInstance.quit()
    console.log('Redis desconectado com sucesso.')
    process.exit(0)
  } catch (err) {
    console.error('Erro ao desconectar Redis:', err)
    process.exit(1)
  }
})

export default async function getRedisClient() {
  if (!redisInstance) {
    redisInstance = await initializeRedis()
  }
  return redisInstance
}