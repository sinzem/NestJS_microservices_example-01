import { Type } from "@nestjs/common";
import { IQueryHandler } from "@nestjs/cqrs";

/* (документ для экспорта запросов - будут собраны в массив) */
export const POST_QUERIES_HANDLERS: Type<IQueryHandler>[] = [];