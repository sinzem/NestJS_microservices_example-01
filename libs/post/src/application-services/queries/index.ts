import { Type } from "@nestjs/common";
import { IQueryHandler } from "@nestjs/cqrs";
import { GetPostQueryHandler } from "./get-post/get-post.query-handler";

/* (документ для экспорта запросов - будут собраны в массив) */
export const POST_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
    GetPostQueryHandler,
];