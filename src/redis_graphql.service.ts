import { Injectable } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class RedisGraphqlService extends RedisPubSub {
  constructor(options) {
    super({
      connection: options,
    });
  }
}
