import {UpdatePostDto as IUpdatePostDto} from "@lib/post/application-services/commands/dto/update-post.dto";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdatePostDto implements IUpdatePostDto {
    @ApiProperty({
        description: "ID поста", 
        type: "string", 
        example: randomStringGenerator()})
    @IsUUID()
    id: string;

    @IsUUID()
    authorId: string;

    @ApiPropertyOptional({description: "Заголовок поста", type: "string"})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title?: string;

    @ApiPropertyOptional({description: "Текст поста", type: "string"})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    message?: string;
}