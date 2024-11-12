import { Type } from "@nestjs/common";
import { ICommandHandler } from "@nestjs/cqrs";

/* (документ для экспорта комманд - будут собраны в массив) */
export const POST_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [];