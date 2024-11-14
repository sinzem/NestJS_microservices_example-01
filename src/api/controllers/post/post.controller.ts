import { PostFacade } from '@lib/post/application-services';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { CurrentUser, ICurrentUser } from '@lib/auth';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Controller('post')
export class PostController {

    constructor(private readonly postFacede: PostFacade) {}

    @Post()
    createPost(
        @Body() createPostDto: CreatePostDto,
        @CurrentUser() user: ICurrentUser, /* (кастомный декоратор, вернет из контекста запроса данные о пользователе, при создании поста берем из запроса id пользователя) */ 
    ) {
        return this.postFacede.commands.createPost({
            ...createPostDto, 
            authorId: randomStringGenerator(), /* (пока не подключили авторизацию, генерируем случайный id) */
            // authorId: user.userId
        });
    }
}
