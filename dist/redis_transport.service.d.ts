import { ClientProviderOptions, ClientRedis } from '@nestjs/microservices';
export declare class RedisTransportService extends ClientRedis {
    constructor(options: any);
    static getProviderOptions: (options: any) => ClientProviderOptions;
    sendPromise(topicName: string, topicMessage: any): Promise<any>;
    onApplicationBootstrap(): Promise<void>;
    beforeApplicationShutdown(): Promise<void>;
}
