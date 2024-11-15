import {CreatePostDto as ICreatePostDto} from "@lib/post/application-services/commands/dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatePostDto implements ICreatePostDto {
    @ApiProperty({description: "Загодовок поста", type: "string"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({description: "Текст поста", type: "string"})
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsUUID()
    authorId: string;
}