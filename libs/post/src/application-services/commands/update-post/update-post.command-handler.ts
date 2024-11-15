import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePostCommand } from "./update-post.command";
import { PostAggregate } from "@lib/post/domain";
import { PostRepository } from "@lib/post/providers";
import { BadRequestException, Logger } from "@nestjs/common";


@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler 
        implements ICommandHandler<UpdatePostCommand, PostAggregate> {

    private readonly logger = new Logger(UpdatePostCommandHandler.name); /* (подключаем логгер, передаем имя команды) */

    constructor(private readonly postRepository: PostRepository) {}

    async execute({post}: UpdatePostCommand): Promise<PostAggregate> {
        const existPost = await this.postRepository.findOne(post.id).catch(err => {
            /* (если обновляемый пост не найден, вносим ошибку в логи и возвращаем null) */
            this.logger.error(err); 
            return null as PostAggregate;
        })
        if (!existPost) {
            throw new BadRequestException(`Post by id ${post.id} not found2`);
        }
        Object.assign(existPost, post); /* (если пост существует, добавляем в него новые данные) */
        const postAggregate = PostAggregate.create(existPost);
        postAggregate.plainToInstance();
        await this.postRepository.save(postAggregate);
        return postAggregate;
    }
} 