import { ClientRedis } from '@nestjs/microservices';
export declare class RedisTransportService extends ClientRedis {
    constructor(options: any);
    static getProviderOptions: (options: any) => ClientProviderOptions;
    sendPromise<T>(topicName: string, topicMessage: unknown): Promise<T>;
    onApplicationBootstrap(): Promise<void>;
    beforeApplicationShutdown(): Promise<void>;
}
