import { DynamicModule } from '@nestjs/common';
import { IORedis } from './redis.interface';
export declare class RedisModule {
    static register(redis: IORedis): DynamicModule;
}
