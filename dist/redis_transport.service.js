"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisTransportService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let RedisTransportService = class RedisTransportService extends microservices_1.ClientRedis {
    // biome-ignore lint/complexity/noUselessConstructor: <explanation>
    constructor(options) {
        super(options);
    }
    sendPromise(topicName, topicMessage, timeOut = 10000) {
        return (0, rxjs_1.lastValueFrom)(super
            .send(topicName, topicMessage)
            .pipe((0, rxjs_1.timeout)(timeOut))
            .pipe((0, rxjs_1.catchError)((error) => {
            throw new Error(error?.message);
        })));
    }
    async onApplicationBootstrap() {
        await super.connect();
    }
    async beforeApplicationShutdown() {
        await super.close();
    }
};
exports.RedisTransportService = RedisTransportService;
RedisTransportService.getProviderOptions = (options) => ({
    name: "REDIS",
    transport: microservices_1.Transport.REDIS,
    options,
});
exports.RedisTransportService = RedisTransportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], RedisTransportService);
