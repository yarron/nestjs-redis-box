import { DynamicModule, Module } from '@nestjs/common';
import { RedisCacheService } from './redis_cache.service';
import { RedisGraphqlService } from './redis_graphql.service';
import { RedisTransportService } from './redis_transport.service';
import { IORedis } from './redis.interface';

@Module({})
export class RedisModule {
  static register(redis: IORedis): DynamicModule {
    const providers = [];
    const exports = [];

    if (redis.isTransport) {
      providers.push({
        provide: RedisTransportService,
        useValue: new RedisTransportService(redis.options),
      });
      exports.push(RedisTransportService);
    }

    if (redis.isCache) {
      providers.push({
        provide: RedisCacheService,
        useValue: new RedisCacheService(redis.options),
      });
      exports.push(RedisCacheService);
    }

    if (redis.isGraphql) {
      providers.push({
        provide: RedisGraphqlService,
        useValue: new RedisGraphqlService(redis.options),
      });
      exports.push(RedisGraphqlService);
    }

    return {
      module: RedisModule,
      providers,
      exports,
      global: true,
    };
  }
}
