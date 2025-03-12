"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const redis_cache_service_1 = require("./redis_cache.service");
const redis_graphql_service_1 = require("./redis_graphql.service");
const redis_transport_service_1 = require("./redis_transport.service");
let RedisModule = RedisModule_1 = class RedisModule {
    static register(redis) {
        const providers = [];
        const exports = [];
        if (redis.isTransport) {
            providers.push({
                provide: redis_transport_service_1.RedisTransportService,
                useValue: new redis_transport_service_1.RedisTransportService(redis.options),
            });
            exports.push(redis_transport_service_1.RedisTransportService);
        }
        if (redis.isCache) {
            providers.push({
                provide: redis_cache_service_1.RedisCacheService,
                useValue: new redis_cache_service_1.RedisCacheService(redis.options),
            });
            exports.push(redis_cache_service_1.RedisCacheService);
        }
        if (redis.isGraphql) {
            providers.push({
                provide: redis_graphql_service_1.RedisGraphqlService,
                useValue: new redis_graphql_service_1.RedisGraphqlService(redis.options),
            });
            exports.push(redis_graphql_service_1.RedisGraphqlService);
        }
        return {
            module: RedisModule_1,
            providers,
            exports,
            global: true,
        };
    }
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = RedisModule_1 = __decorate([
    (0, common_1.Module)({})
    // biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
], RedisModule);
