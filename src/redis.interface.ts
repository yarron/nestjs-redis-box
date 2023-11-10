import { RedisOptions } from 'ioredis';

export interface IORedis {
  isTransport: boolean;
  isCache: boolean;
  isGraphql: boolean;
  options: RedisOptions;
}
