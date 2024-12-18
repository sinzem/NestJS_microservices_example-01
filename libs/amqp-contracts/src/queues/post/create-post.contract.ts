import { EXCHANGE_POST } from "@lib/amqp-contracts/exchanges";
import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from "@lib/amqp-contracts/shared";
import { CreatePostRequest, PostResponse } from "./interfaces";


export namespace CreatePostContract {
    export const queue: QueueDeclaration = {
        exchange: EXCHANGE_POST,
        queue: `${EXCHANGE_POST.name}-create`,
        routingKey: `${EXCHANGE_POST.name}-create`,
        queueOptions: {
            durable: true,
        }
    };

    export type request = AmqpBaseRequest<CreatePostRequest>;

    export type response = AmqpBaseResponse<PostResponse>;
}