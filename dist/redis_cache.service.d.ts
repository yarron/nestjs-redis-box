import { OnModuleInit } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
export declare class RedisCacheService extends Redis implements OnModuleInit {
    private _logger;
    constructor(options: RedisOptions, logger?: Console);
    onModuleInit(): void;
}
