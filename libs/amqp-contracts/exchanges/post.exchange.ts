import { RabbitMQExchangeConfig } from "@golevelup/nestjs-rabbitmq";


export const EXCHANGE_POST: RabbitMQExchangeConfig = {
    name: "post",
    type: "direct"
};