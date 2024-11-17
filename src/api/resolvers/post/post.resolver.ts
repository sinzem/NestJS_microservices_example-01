import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginatedPosts, PostResponse } from '../responses';
import { PostFacade } from '@lib/post';
import { PaginationDto } from '@lib/shared';
import { plainToInstance } from 'class-transformer';
import { CreatePostInput, UpdatePostInput } from '../inputs';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { GqlCurrentUser, ICurrentUser, Public } from '@lib/auth';
import { UseGuards } from '@nestjs/common';
import { GqlGuard } from '@lib/auth/guards/gql.guard';

@UseGuards(GqlGuard)
@Resolver(() => PostResponse) /* (резолвер типизируем) */
export class PostResolver {

    constructor(private readonly postFacede: PostFacade) {}

    @Public()
    @Query(() => PostResponse, {name: "post"})  /* (операции запроса помечаем декоратором Query) */
    async getPostById(@Args("id") id: string) { /* (Args - аналог Param, для получения id) */
        return this.postFacede.queries.getOnePost(id); /* (подключаем метод из сервиса постов) */
    } 

    @Public()
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

    @Mutation(() => PostResponse) /* (опреации, изменяющие БД, помечаем декоратором Mutation) */
    async createPost(
        @Args("createPostInput") createPostInput: CreatePostInput,
        @GqlCurrentUser() currentUser: ICurrentUser    
    ) {
        return this.postFacede.commands.createPost({
            ...createPostInput,
            authorId: currentUser.userId
        });
    }

    @Mutation(() => PostResponse) 
    async updatePost(
        @Args("updatePostInput") updatePostInput: UpdatePostInput,
        @GqlCurrentUser() currentUser: ICurrentUser 
    ) {
        return this.postFacede.commands.updatePost({
            ...updatePostInput,
            authorId: currentUser.userId
        });
    }

    @Mutation(() => PostResponse)
    async setPublishedPost(@Args("id") id: string) {
        return this.postFacede.commands.setPublishedPost(id);
    }

    @Mutation(() => Boolean)
    async deletePost(@Args("id") id: string) {
        return this.postFacede.commands.deletePost(id);
    }
}
