import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePostCommand } from "./create-post.command";
import { PostAggregate } from "@lib/post/domain";
import { PostRepository } from "@lib/post/providers";
import { BadRequestException } from "@nestjs/common";


@CommandHandler(CreatePostCommand) 
export class CreatePostCommandHandler 
        implements ICommandHandler<CreatePostCommand, PostAggregate> { /* (к имплементируему классу прикрепляем типы самой комманды на входе и что лжидаем на выходе(в д.с обьект PostAggregate - созданный пост)) */

    constructor(private readonly postRepository: PostRepository) {}

    async execute({post}: CreatePostCommand): Promise<PostAggregate> {
        const postAggregate = PostAggregate.create(post);
        postAggregate.plainToInstance();
        const createdPost = await this.postRepository
                            .save(postAggregate)
                            .catch(err => {
            throw new BadRequestException(err);
        })
        return createdPost;
    }

}