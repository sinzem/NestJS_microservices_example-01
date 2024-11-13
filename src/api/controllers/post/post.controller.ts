import { PostFacade } from '@lib/post/application-services';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { CurrentUser } from '@lib/auth';

@Controller('post')
export class PostController {

    constructor(private readonly postFacede: PostFacade) {}

    @Post()
    createPost(
        @Body() createPostDto: CreatePostDto,
        /* (кастомный декоратор, вернет из контекста запроса данные о пользователе) */
        @CurrentUser() user 
    ) {
        return this.postFacede.commands.createPost(createPostDto);
    }
}
