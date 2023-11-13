import Redis, { RedisOptions } from 'ioredis';
export declare class RedisCacheService extends Redis {
    constructor(options: RedisOptions);
    get<T>(key: string): Promise<T>;
    set<T>(key: string, value: T): Promise<'OK'>;
}
