import { Injectable } from "@nestjs/common";
import {
	ClientProviderOptions,
	ClientRedis,
	Transport,
} from "@nestjs/microservices";
import { RedisOptions } from "ioredis";
import { catchError, lastValueFrom, timeout } from "rxjs";

@Injectable()
export class RedisTransportService extends ClientRedis {
	// biome-ignore lint/complexity/noUselessConstructor: <explanation>
	constructor(options: RedisOptions) {
		super(options);
	}

	static getProviderOptions = (
		options: RedisOptions,
	): ClientProviderOptions => ({
		name: "REDIS",
		transport: Transport.REDIS,
		options,
	});

	sendPromise<T>(
		topicName: string,
		topicMessage: unknown,
		timeOut = 10000,
	): Promise<T> {
		return lastValueFrom(
			super
				.send(topicName, topicMessage)
				.pipe(timeout(timeOut))
				.pipe(
					catchError((error: Error) => {
						throw new Error(error?.message);
					}),
				),
		);
	}

	async onApplicationBootstrap() {
		await super.connect();
	}

	async beforeApplicationShutdown() {
		await super.close();
	}
}
