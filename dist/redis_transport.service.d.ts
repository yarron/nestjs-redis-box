import { ClientProviderOptions, ClientRedis } from "@nestjs/microservices";
import { RedisOptions } from "ioredis";
export declare class RedisTransportService extends ClientRedis {
    constructor(options: RedisOptions);
    static getProviderOptions: (options: RedisOptions) => ClientProviderOptions;
    sendPromise<T>(topicName: string, topicMessage: unknown, timeOut?: number): Promise<T>;
    onApplicationBootstrap(): Promise<void>;
    beforeApplicationShutdown(): Promise<void>;
}
