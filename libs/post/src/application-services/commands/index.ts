import { Type } from "@nestjs/common";
import { ICommandHandler } from "@nestjs/cqrs";
import { CreatePostCommandHandler } from "./create-post/create-post.command-handler";
import { UpdatePostCommandHandler } from "./update-post/update-post.command-handler";

/* (документ для экспорта комманд - будут собраны в массив) */
export const POST_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
    CreatePostCommandHandler,
    UpdatePostCommandHandler
];