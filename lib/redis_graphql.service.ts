import { Injectable } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RedisOptions } from 'ioredis';

@Injectable()
export class RedisGraphqlService extends RedisPubSub {
  constructor(options: RedisOptions) {
    super({
      connection: options,
    });
  }
}
