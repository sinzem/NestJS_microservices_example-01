import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PostFacade } from '@lib/post/application-services';
import { CreatePostDto } from '@lib/post/application-services/commands/dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConsumerService {
    private readonly logger = new Logger(ConsumerService.name);

    constructor(private readonly postFacade: PostFacade) {}

    /* (подключаем севисы постов с декоратором от rabbit, на localhost:5672 можно наблюдать отчет о работе приложения) */
    @RabbitRPC({
        exchange: "post", /* (расширение донастраиваем в конфиг-файле(amqp.config.ts)) */
        routingKey: "create-post",
        queue: "create-post"
    })
    private async createPost(post: CreatePostDto) {
        // this.logger.log({createPost: post})
        try {
            const createdPost = await this.postFacade.commands.createPost(post); 
            return createdPost;
        } catch (error) {
            this.logger.error(error);
            return null;
        } 
    }
}
