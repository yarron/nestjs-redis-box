import Redis from 'ioredis';
export declare class RedisCacheService extends Redis {
    constructor(options: any);
    get<T>(key: string): Promise<T>;
    set<T>(key: string, value: T): Promise<void>;
}
