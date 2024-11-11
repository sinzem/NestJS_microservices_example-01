/* (класс по обработке ошибок домена) */
import { ValidationError } from "@nestjs/common";

export class DomainError extends Error {
    constructor(errors: ValidationError[], message?: string) { /* (будет приходить массив типа ValidationError и сообщение) */
        const _errors: string[] = []; /* (создаем новый массив для ошибок) */
        errors.forEach((err) => { /* (перебираем пришедшие, достаем из них сообщения и добавляем в новый массив ошибок) */
            err?.constraints && 
                Object.entries(err.constraints).forEach((v) => {
                    _errors.push(v[1]);
                })
        })
        super(
            `Errors: ${_errors.join("; ")}${message ? `. Message ${message}` : ""}`
        );
        this.name = DomainError.name;
    }
} /* (экспортируем(через index.ts), пример использования в post/src/domain/services/post.aggregate.ts) */