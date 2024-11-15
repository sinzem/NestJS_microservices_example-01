import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { PaginationDto } from "../dto";
import { applyDecorators, Type } from "@nestjs/common";

/* (типизация для ответа на запрос с query-параметрами, пример использования в контроллере) */
export class ResponseWithPagination<T> extends PaginationDto {

    @ApiProperty({description: "Количество строк для показа", type: "number"})
    limit: number;

    @ApiProperty({description: "Пропуск строк", type: "number"})
    offset: number;

    @ApiProperty({description: "Общее количество записей в БД", type: "number"})
    total!: number;
    
    @ApiProperty({
        description: "Набор данных",
        default: [],
        isArray: true,
        items: {}
    })
    data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) => applyDecorators(
    ApiExtraModels(Response, dataDto),
    ApiOkResponse({
        schema: {
            allOf: [
                {$ref: getSchemaPath(Response)},
                {
                    properties: {
                        data: {
                            type: "array",
                            items: {$ref: getSchemaPath(dataDto)}
                        }
                    }
                }
            ]
        }
    })
) 