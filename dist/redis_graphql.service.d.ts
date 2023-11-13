import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RedisOptions } from 'ioredis';
export declare class RedisGraphqlService extends RedisPubSub {
    constructor(options: RedisOptions);
}
