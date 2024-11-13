import { PaginationDto } from "@lib/shared/dto";
import { IPost, PostAggregate } from "../domain";

/* (? типизация для методов работы с post) */
export abstract class PostRepository {
    abstract save(post: IPost): Promise<PostAggregate>;
    abstract findOne(id: string): Promise<PostAggregate | null>;
    abstract findAll(
        pagination: PaginationDto /* (подключаем дто для валидации входящих данных - в запросе может приходить лимит страниц и отступ от начала) */
    ): Promise<[[PostAggregate], number]>;
    abstract delete(id: string): Promise<boolean>;
}