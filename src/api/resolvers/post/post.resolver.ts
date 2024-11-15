import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginatedPosts, PostResponse } from '../responses';
import { PostFacade } from '@lib/post';
import { PaginationDto } from '@lib/shared';
import { plainToInstance } from 'class-transformer';

@Resolver(() => PostResponse) /* (резолвер типизируем) */
export class PostResolver {

    constructor(private readonly postFacede: PostFacade) {}

    @Query(() => PostResponse, {name: "post"}) 
    async getPostById(@Args("id") id: string) { /* (Args - аналог Param, для получения id) */
        return this.postFacede.queries.getOnePost(id); /* (подключаем метод из сервиса постов) */
    } 

    @Query(() => PaginatedPosts, {name: "posts"}) 
    async getPost(@Args() paginationDto: PaginationDto) { 
        const pagination = plainToInstance(PaginationDto, paginationDto);
        // @ts-ignore
        const [data, total] = await this.postFacede.queries.getAllPosts(pagination); 
        return {
            ...pagination,
            data,
            total
        }
    } 
}
