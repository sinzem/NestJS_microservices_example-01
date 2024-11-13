import { IPost } from "@lib/post/domain";

/* (экспортируем только тип, так как валидация уже проходит в post.aggregate.ts) */
export type CreatePostDto = Pick<IPost, "title" | "message" | "authorId">;