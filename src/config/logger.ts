import * as winston from 'winston';
import Transport from 'winston-transport'; // Importar a classe base para transports
import { getAppDataSource } from './database';
import { Log } from '../infrastructure/entities/Log';

// Transport personalizado para salvar logs no banco
class DatabaseTransport extends Transport {
  constructor() {
    super();
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => this.emit('logged', info)); // Emite o evento 'logged' assincronamente
    const database = await getAppDataSource()
    try {
      if (!database.isInitialized) {
        await database.initialize();
      }
      const logRepo = database.getRepository(Log);
      await logRepo.save({
        level: info.level,
        message: info.message,
        timestamp: info.timestamp,
        trace_id: info.traceId || 'N/A',
      });
    } catch (err) {
      console.error('Erro ao salvar log no banco:', err); // Fallback para não quebrar
    }

    callback(); // Chama o callback para indicar que o log foi processado
  }
}

// Criação do logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: process.env.ERROR_LOG_FILE || 'logs/error.log',
      level: 'error',
      maxsize: 5_242_880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: process.env.COMBINED_LOG_FILE || 'logs/combined.log',
      maxsize: 5_242_880,
      maxFiles: 5,
    }),
    new DatabaseTransport(), // Usar o transport personalizado
  ],
});

export default logger;