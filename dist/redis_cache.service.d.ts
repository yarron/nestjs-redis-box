import Redis from 'ioredis';
export declare class RedisCacheService extends Redis {
    constructor(options: any);
    get(key: string): Promise<any>;
    set<T>(key: string, value: T): Promise<"OK">;
}
