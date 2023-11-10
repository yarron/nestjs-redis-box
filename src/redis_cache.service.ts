import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService extends Redis {
  constructor(options) {
    super(options);
  }

  async get(key: string) {
    return JSON.parse(await super.get(key));
  }

  async set<T>(key: string, value: T) {
    return super.set(key, JSON.stringify(value));
  }
}
