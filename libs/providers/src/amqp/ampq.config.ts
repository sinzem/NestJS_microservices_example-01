import { RabbitMQConfig, RabbitMQExchangeConfig } from "@golevelup/nestjs-rabbitmq";
import { ConfigService } from "@nestjs/config";

const AMQP_EXCHANGES: RabbitMQExchangeConfig[] = [
    { /* (расширение post из сервиса(channels/consumer.service.ts - для соединения rabbit и postfacade)) */
        name: "post",
        type: "direct"
    }
];

export const ampqConfig = (configService: ConfigService): RabbitMQConfig => {
    const uri = configService.get("AMQP_URI");
    if (!uri) {
        throw new Error('"AMQP_URI" not found. Check .env');
    }
    return {
        exchanges: AMQP_EXCHANGES,
        uri,
        connectionInitOptions: {wait: false}, /* (без ожидания авторизации) */
        connectionManagerOptions: {
            /* (интервалы коннекта и реконнекта в секундах) */
            heartbeatIntervalInSeconds: 15, 
            reconnectTimeInSeconds: 30
        } 
    }
}  /* (подключаем в amqp.module.ts) */