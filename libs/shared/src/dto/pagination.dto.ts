import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

/* (обьект для валидации данных при запросе на получение массива сущностей(постов в д.с)) */
export class PaginationDto {

    @IsOptional() /* (параметр не обязательный) */
    @Min(0)  /* (минимальное значение) */
    @IsNumber({allowNaN: false, allowInfinity: false}) /* (проверяем на числовое значение, NaN и бесконечность запрещаем) */
    @Type(() => Number)  /* (преобразовываем в число(будем брать из запроса, там приходит как строка)) */
    offset = 0;

    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Type(() => Number) 
    @IsPositive() /* (значение больше нуля) */
    limit = 15;
} /* (экспортируем через index.ts, пример подключения в providers/post.repository.ts) */