import { Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisCacheService extends Redis {
  constructor(options: RedisOptions) {
    super(options);
  }

  async get<T>(key: string): Promise<T> {
    return JSON.parse((await super.get(key)) || '{}');
  }

  async set<T>(key: string, value: T): Promise<'OK'> {
    return super.set(key, JSON.stringify(value));
  }
}
