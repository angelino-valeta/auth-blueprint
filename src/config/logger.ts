import * as winston from 'winston';
import Transport from 'winston-transport';
import { getAppDataSource } from './database';
import { Log } from '../infrastructure/entities/Log';

class DatabaseTransport extends Transport {
  constructor() {
    super();
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => this.emit('logged', info));
    const database = await getAppDataSource()
    try {
      if (!database.isInitialized) {
        await database.initialize();
      }
      const logRepo = database.getRepository(Log);
      await logRepo.save({
        level: info?.level,
        message: info?.message,
        timestamp: info?.timestamp,
        trace_id: info?.traceId || 'N/A',
      });
    } catch (err) {
      console.error('Erro ao salvar log no banco:', err);
    }

    callback();
  }
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
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
      maxsize: 10485760, // 5MB
      maxFiles: 10,
      tailable: true,
      format: winston.format.timestamp({ format: 'YYYY-MM-DD' }),
      zippedArchive: true,
    }),
    new winston.transports.File({
      filename: process.env.COMBINED_LOG_FILE || 'logs/combined.log',
      tailable: true,
      format: winston.format.timestamp({ format: 'YYYY-MM-DD' }),
      zippedArchive: true,
    }),
    new DatabaseTransport()
  ],
});

export default logger;