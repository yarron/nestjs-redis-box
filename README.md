# nestjs-redis-box

## Connecting globally

### Transferable options (Variant 1)

```
const options =
  {
    options: {
      host: '127.0.0.1',
      port: 6379,
      username: undefined,
      password: undefined,
    },
    isCache: true,
    isTransport: true,
    isGraphql: true,
  } as IORedis;

```
### Transferable options (Variant 2)
```

const options = {
    options: {
      host: '127.0.0.1',
      port: 6379,
      username: undefined,
      password: undefined,
      retryStrategy: (times) => {
        const delay = 5000;
        if (times >= 12 * 5) {
          return new Error('REDIS CONNECTION TERMINATED');
        }
        return delay;
      },
    },
    isCache: true,
    isTransport: true,
    isGraphql: true,
  } as IORedis
```

You can read more about the options here https://docs.nestjs.com/microservices/redis#options

```
import { RedisModule } from 'nestjs-redis-box';

@Module({
  imports: [
    RedisModule.register(options),
    ...
  ]
})
export default class AppModule {}
```

## Example of sending messages to a microservice with waiting for a response

```
@Resolver(() => NetworkModel)
export class NetworkResolver {
  constructor(private readonly serviceRedis: RedisService) {}

  @Query(() => NetworksModel, {
    description: '@public - Network list',
  })
  async networks(@CurrentCtx() { relations }): Promise<NetworksModel> {
    try {
      const result = await this.serviceRedis.sendPromise(
        MicroserviceEnum.MS_BLOCKCHAIN_networks,
        { payload, relations },
      );

      if (result.error) throw Error(result.error);
      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
```

## Example of receiving a message in a microservice

```
@Controller('network')
export class NetworkControler {
  constructor(private readonly dataSource: DataSource) {}

  @MessagePattern(MicroserviceEnum.MS_BLOCKCHAIN_networks)
  async networks(@Payload() data: PayloadListDTO) {
    return await QueryService.list(
      this.dataSource.getRepository(NetworkModel),
      { ...data, select: ['id', 'name', 'symbol', 'fees'] },
    );
  }
}
```

### Clarification:

- sendPromise - sends a message while waiting for a response (async/await)
- emit - sends an event without waiting for a response (pub/sub)

## If you have a hybrid application and you want to not only send but also receive messages from microservices, then you need to add the following code to the main.ts file

```
import { RedisModule } from 'nestjs-redis-box';
const options = {} as RedisOptions;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  ...
  app.connectMicroservice(
    RedisModule.getProviderOptions(options),
    {
      inheritAppConfig: true,
    },
  );
  ...

  await app.startAllMicroservices();
  await app.listen(configuration().platform.port);
}
bootstrap();
```

## To use the caching mechanism in redis it is enough to perform a service connection

```
 constructor(
    private readonly redisCacheService: RedisCacheService,
    ...
  ) {}
```

And then save to cache or retrieve from cache.

```
  async getSession(email: string) {
    return await this.redisCacheService.get(`session:${email}`);
  }

  async setSession(email: string, data: any) {
    await this.redisCacheService.set(`session:${email}`, JSON.stringify(data));
  }
```

## To use the Subscribtion mechanism in Graphql it is enough to perform a service connection

```
constructor(
  private readonly redisGraphqlService: RedisGraphqlService,
) {}
```

### Send an event to graphql

```
await this.redisGraphqlService.publish('nameEvent', {...});
```

### And add a resolver to Subscribtion

```
@Subscription(() => Model, {
    name: 'nameEvent',
    filter: ({ id }, { payload }) => id === payload.id,
    resolve: (data) => data,
  })
  @UseGuards(AuthGuardJwt)
  nameEvent(
    @Args('payload', { type: () => GetIdDTO, nullable: false }) _: GetIdDTO,
  ) {
    return this.redisGraphqlService.asyncIterator<Model>(
      'nameEvent',
    );
  }
```
