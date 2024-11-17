import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreatePostContract } from '@lib/amqp-contracts';
import { PostFacade } from '@lib/post/application-services';
import { CreatePostDto } from '@lib/post/application-services/commands/dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConsumerService {
    private readonly logger = new Logger(ConsumerService.name);

    constructor(private readonly postFacade: PostFacade) {}

    /* (подключаем севисы постов с декоратором от rabbit, на localhost:5672 можно наблюдать отчет о работе приложения) */
    @RabbitRPC({
        // exchange: "post", /* (расширение донастраиваем в конфиг-файле(amqp.config.ts) - в реальном приложении лучше использовать контракты - пример ниже) */
        exchange: CreatePostContract.queue.exchange.name,
        // routingKey: "create-post",
        routingKey: CreatePostContract.queue.routingKey,
        // queue: "create-post"
        queue: CreatePostContract.queue.queue
    })
    private async createPost(request: CreatePostContract.request): Promise<CreatePostContract.response> {
        // this.logger.log({createPost: post})
        const {payload: post, ...requestMessage} = request;
        try {
            const createdPost = await this.postFacade.commands.createPost(post); 
            return {
                ...requestMessage,
                payload: createdPost
            };
        } catch (error) {
            this.logger.error(error);
            return {
                ...requestMessage,
                payload: null,
                error: this.errorHandler(error),
            };
        } 
    }

    private errorHandler(error: any) {
        return {
            code: error?.name || "error",
            message: error?.message || JSON.stringify(error),
        }
    }
}
