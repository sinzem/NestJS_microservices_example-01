import { ArgsType, Field, Int } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

/* (обьект для валидации данных при запросе на получение массива сущностей(постов в д.с)) */
@ArgsType()  /* (декоратор для graphql) */
export class PaginationDto {

    @ApiPropertyOptional({description: "Пропуск строк", type: "number"})
    @IsOptional() /* (параметр не обязательный) */
    @Min(0)  /* (минимальное значение) */
    @IsNumber({allowNaN: false, allowInfinity: false}) /* (проверяем на числовое значение, NaN и бесконечность запрещаем) */
    @Type(() => Number)  /* (преобразовываем в число(будем брать из запроса, там приходит как строка)) */
    @Field(() => Int, {description: "Пропуск строк"}) /* (для graphql) */
    offset = 0;

    @ApiPropertyOptional({description: "Количество строк", type: "number"})
    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Type(() => Number) 
    @Field(() => Int, {description: "Количество строк"}) /* (для graphql) */
    @IsPositive() /* (значение больше нуля) */
    limit = 15;
} /* (экспортируем через index.ts, пример подключения в providers/post.repository.ts) */