import { IPost } from "./post.interface";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import { PostServices } from "./services";
import { IsBoolean, IsNotEmpty, IsString, IsUUID, validateSync } from "class-validator";
import { Exclude } from "class-transformer";
import { DomainError } from "@lib/errors";

/* (класс для работы с постами, сервисы вынесены в папку services, хотя можно прописывать и внутри) */
export class PostAggregate extends PostServices implements IPost {

    /* (наследуем типизацию IPost, но изменяем ее, здесь же валидируем пришедшие данные) */
    @IsUUID()  
    id: string = randomStringGenerator();

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsUUID()  
    @IsNotEmpty()
    authorId: string;

    @IsBoolean()
    @Exclude()  /* (пример - исключаем данное поле, не будем возвращать его наружу) */
    isPublished = false;

    @IsString()
    createdAt = new Date().toISOString();

    @IsString()
    updatedAt = new Date().toISOString();

    private constructor() { /* (подключаем для наследования PostServices(AggregateRoot)) */
        super();
    }
    
    /* (метод для создания поста, обьединит пришедшие поля с уже существующими) */
    static create(post: Partial<IPost>) {
        const _post = new PostAggregate();
        // _post.setNotPublished(); /* (пример метода из сервисов, установит поле о публикации в false) */
        Object.assign(_post, post);
        _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;
        const errors = validateSync(_post); /* (whitelist - из обьекта будут удалены все поля, не помеченные декораторами(лишние, так как все помеченные)) */
        if (!!errors.length) {
            throw new DomainError(errors, "Post not valid"); /* (подключаем кастомный класс ошибок, передаем в него обьект с ошибками) */
        }
        return _post;
    }

    /* (пример создания метода/сервиса внутри класса(предпочтительно выносить в отдельный блок - в д.c services)) */
    // setPublished() {
    //     this.published = true;
    // } 
}