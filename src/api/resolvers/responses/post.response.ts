import { IPost } from "@lib/post";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostResponse implements Omit<IPost, "isPublished"> {

    @Field(() => ID, {description: "ID поста"})
    id: string;

    @Field(() => ID, {description: "Заголовок поста"})
    title: string;

    @Field(() => ID, {description: "Текст поста"})
    message: string;

    @Field(() => ID, {description: "ID автора поста"})
    authorId: string;

    @Field(() => ID, {description: "Дата создания поста"})
    createdAt: string;

    @Field(() => ID, {description: "Дата изменения поста"})
    updatedAt: string;
} /* (тип указываем на самом резолвере в post.resolver.ts) */