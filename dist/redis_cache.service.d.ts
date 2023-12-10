import Redis, { RedisOptions } from 'ioredis';
export declare class RedisCacheService extends Redis {
    constructor(options: RedisOptions);
}
