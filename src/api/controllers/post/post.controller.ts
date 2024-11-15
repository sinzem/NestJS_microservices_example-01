import { PostFacade } from '@lib/post/application-services';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { CurrentUser, ICurrentUser, Public } from '@lib/auth';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtGuard } from '@lib/auth/guards/jwt.guard';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe'; 
import { PaginationDto } from '@lib/shared/dto';
import { plainToInstance } from 'class-transformer';
import { ApiOkResponsePaginated, ResponseWithPagination } from '@lib/shared';
import { PostAggregate } from '@lib/post';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostResponse } from './responses';

@ApiTags("Posts")
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {

    constructor(private readonly postFacede: PostFacade) {}

    @ApiOperation({
        summary: "Создание поста"
    })
    @ApiBearerAuth()
    @ApiOkResponse({type: PostResponse})
    @Post()
    createPost(
        @Body() createPostDto: CreatePostDto,
        @CurrentUser() user: ICurrentUser,/* (кастомный декоратор, вернет из контекста запроса данные о пользователе, при создании поста берем из запроса id пользователя) */ 
    ) {
        return this.postFacede.commands.createPost({
            ...createPostDto, 
            // authorId: randomStringGenerator(), /* (пока не подключили авторизацию, генерируем случайный id) */
            authorId: user.userId
        });
    }

    @ApiOperation({
        summary: "Получение поста по id"
    })
    @ApiOkResponse({type: PostResponse})
    @Public()
    @Get(":id")
    getPostById(@Param("id", ParseUUIDPipe) id: string) {
        return this.postFacede.queries.getOnePost(id);
    }

    @ApiOperation({
        summary: "Получение всех постов"
    })
    @ApiOkResponsePaginated(PostResponse)
    @Public()
    @Get()
    async getAllPosts(@Query() paginationDto: PaginationDto): Promise<ResponseWithPagination<PostAggregate>> {
        const pagination = plainToInstance(PaginationDto, paginationDto);
        // @ts-ignore
        const [data, count] = await this.postFacede.queries.getAllPosts(pagination);
        return {
            ...pagination,
            data,
            total: count
        }
    }

    @ApiOperation({
        summary: "Обновление поста"
    })
    @ApiOkResponse({type: PostResponse})
    @Put()
    updatePost(
        @CurrentUser() user: ICurrentUser,
        @Body() updatePost: UpdatePostDto,
    ) {
        return this.postFacede.commands.updatePost({
            ...updatePost,
            authorId: user.userId
        })
    }

    @ApiOperation({
        summary: "Установка флага о публикации"
    })
    @ApiOkResponse({type: PostResponse})
    @Patch(":id")
    setPublished(@Param("id", ParseUUIDPipe) id: string) {
        return this.postFacede.commands.setPublishedPost(id);
    }

    @ApiOperation({
        summary: "Удаление поста"
    })
    @ApiBearerAuth()
    @ApiOkResponse({type: Boolean})
    @Delete(":id")
    deletePost(@Param("id", ParseUUIDPipe) id: string) {
        return this.postFacede.commands.deletePost(id);
    }
}
