import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PostRepository } from "./post.repository";
import { IPost, PostAggregate } from "../domain";
import { PaginationDto } from "@lib/shared/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "@lib/entities";
import { FindManyOptions, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";


@Injectable()
export class PostAdapter implements PostRepository {
    private readonly logger = new Logger(PostAdapter.name);

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {}

    /* (метод для сохранения поста, на входе ожидаем пост, на выходе - промис) */
    async save(post: IPost): Promise<PostAggregate> {
        this.logger.debug(post)
        const existPost = await this.findOne(post.id); /* (проверяем, есть ли пост по данному id) */
        if (existPost) { /* (если по данному id есть пост, запускаем функционал обновления) */
            // throw new NotFoundException(`Post by id ${post.id} not found`)
            const {id, ...toUpdate} = post; /* (разделяем пришедший пост на id и остальное) */
            await this.postRepository.update({id}, toUpdate); /* (обновляем запись в таблице по id, получаем обновленный пост и возвращаем на пользователя) */
            return this.findOne(post.id); 
        }
        /* (если пост пришел без id, создаем новую запись в таблице и возвращаем на пользователя) */
        const savedPost = await this.postRepository.save(post);
        return PostAggregate.create(savedPost)
    }

    async findOne(id: string): Promise<PostAggregate> {
        const existPost = await this.postRepository
                                    .findOneBy({id})
                                    .catch(err => {
                                        this.logger.error(err);
                                        return null;
                                    })
        if (!existPost) { 
            throw new NotFoundException(`Post by id ${id} not found3`) 
        }
        return PostAggregate.create(existPost);
    }

    async findAll(pagination: PaginationDto): Promise<[PostAggregate[], number]> {
        /* (деструктурируем и переименовываем offset и limit - в typeorm используют skip и take) */
        const {limit: take, offset: skip} = plainToInstance(PaginationDto, pagination);
        const options: FindManyOptions<PostEntity> = {
            where: {
                isPublished: true /* (только опубликованные) */
            },
            take, 
            skip,
            order: {
                createdAt: "DESC", /* (отсортированные в обратном порядке по дате создания) */
            }
        };
        const [data, count] = await this.postRepository
                                .findAndCount(options)
                                .catch((err) => {
                                    this.logger.error(err);
                                    return [[], 0] as [PostEntity[], number];
                                })
        return [data.map((post) => PostAggregate.create(post)), count];
    }
    async delete(id: string): Promise<boolean> {
       const result = await this.postRepository.delete({id}).catch(err => {
        this.logger.error(err);
        return false
       });
        return !!result;
    }
} /* (подключаем к post.module.ts) */