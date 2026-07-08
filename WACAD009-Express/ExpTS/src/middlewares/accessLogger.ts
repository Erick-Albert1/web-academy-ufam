import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

type LogFormat = 'simples' | 'completo';

function accessLogger(format: LogFormat = 'simples') {
  const logDir = path.resolve(process.cwd(), process.env.LOG_DIR || 'logs');

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFilePath = path.join(logDir, 'access.log');

  return (req: Request, res: Response, next: NextFunction) => {
    const now = new Date().toISOString();

    let logLine = `[${now}] ${req.method} ${req.originalUrl}`;

    if (format === 'completo') {
      logLine += ` HTTP/${req.httpVersion} - ${req.headers['user-agent']}`;
    }

    fs.appendFile(logFilePath, `${logLine}\n`, (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo de log:', err);
      }
    });

    next();
  };
}

export default accessLogger;
