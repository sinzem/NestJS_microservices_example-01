import { IPost, PostAggregate } from "../domain";

/* (? типизация для методов работы с post) */
export abstract class PostRepository {
    abstract save(post: IPost): Promise<PostAggregate>;
    abstract findOne(id: string): Promise<PostAggregate | null>;
    abstract findAll(): Promise<[[PostAggregate], number]>;
    abstract delete(id: string): Promise<boolean>;
}