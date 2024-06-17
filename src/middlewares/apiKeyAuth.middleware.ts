import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { env } from 'process';

@Injectable()
export class apiKeyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const validApiKeys = env.VALID_API_KEYS.split('|'); // Lista de chaves válidas    next();

    const headers = req.headers['x-api-token'] as string;

    const isValid = validApiKeys.includes(headers);

    return isValid
      ? next()
      : res.status(401).json({ message: 'Unauthorized.' });
  }
}
