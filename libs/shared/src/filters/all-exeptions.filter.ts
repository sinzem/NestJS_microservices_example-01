import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request } from 'express';

@Catch()
export class AllExeptionsFilter<T> implements ExceptionFilter {
    private readonly logger = new Logger(AllExeptionsFilter.name);  /* (передаем в логгер имя фильтра) */
    catch(exception: T, host: ArgumentsHost) {
        this.logger.error(exception);  /* (вывоодим ошибки в логи, в консоль) */
        const ctx = host.switchToHttp(); /* (получаем контекст, далее из него req и res) */
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        /* (если ошибка определяется, получаем ее статус, если нет - выводим внутреннюю ошибку сервера) */
        const status = exception instanceof HttpException 
                          ? exception.getStatus() 
                          : HttpStatus.INTERNAL_SERVER_ERROR; 

        response.status(status).json(this._response(status, request, exception));
    }

    /* (метод для формирования обьекта ответа - используем в методе выше) */
    private _response(status: number, request: Request, exception: any) {
        return {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request?.url,
            method: request?.method,
            params: request?.params,
            query: request?.query,
            exception: {
                name: exception["name"],
                message: exception["message"]
            }
        }
    }
} /* (экспортируем через index.ts, пример подключения в shared.module) */
