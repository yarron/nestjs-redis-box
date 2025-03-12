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
exports.RedisCacheService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisCacheService = class RedisCacheService extends ioredis_1.default {
    constructor(options, logger = console) {
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
        this.on("error", (error) => {
            this._logger.error(`CONNECTION FAILED: ${error.message}`, "REDIS");
        });
        this.on("reconnecting", (wait) => {
            this._logger.warn(`CONNECTION WAIT: ${wait}`, "REDIS");
        });
    }
};
exports.RedisCacheService = RedisCacheService;
exports.RedisCacheService = RedisCacheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object])
], RedisCacheService);
