import { AmqpConnectionManager, RabbitMQModule, RabbitRpcParamsFactory } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ampqConfig } from './ampq.config';

@Global()
@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ampqConfig(configService)
        })
    ],
    providers: [RabbitRpcParamsFactory, AmqpConnectionManager],
    exports: [RabbitMQModule]
})
export class AmqpModule {} /* (подключаем в providers.module.ts) */
