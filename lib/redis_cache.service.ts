import { Injectable, OnModuleInit } from "@nestjs/common";
import Redis, { RedisOptions } from "ioredis";

@Injectable()
export class RedisCacheService extends Redis implements OnModuleInit {
	private _logger: Console;

	constructor(options: RedisOptions, logger = console) {
		super(options);
		this._logger = logger;
	}

	onModuleInit() {
		this.on("connect", () => {
			this._logger.log("CONNECTION SUCCESS!", "REDIS");
		});
		this.on("connecting", () => {
			this._logger.debug("CONNECTING...", "REDIS");
		});
		this.on("end", () => {
			this._logger.error("CONNECTION TERMINATED!", "REDIS");
		});
		this.on("error", (error: Error) => {
			this._logger.error(`CONNECTION FAILED: ${error.message}`, "REDIS");
		});
		this.on("reconnecting", (wait: number) => {
			this._logger.warn(`CONNECTION WAIT: ${wait}`, "REDIS");
		});
	}
}
