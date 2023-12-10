import { Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisCacheService extends Redis {
  constructor(options: RedisOptions) {
    super(options);
  }
}
