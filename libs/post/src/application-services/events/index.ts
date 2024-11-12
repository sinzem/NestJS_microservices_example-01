import { Type } from "@nestjs/common";
import { IEventHandler } from "@nestjs/cqrs";

/* (документ для экспорта событий - будут собраны в массив) */
export const POST_EVENTS_HANDLERS: Type<IEventHandler>[] = [];