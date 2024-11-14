import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async validateUser(email: string) { /* (хардкодовый пример валидации пользователя, в реальной ситуации чаще используют валидацию по id, обращаются к другому сервису и проверяют наличие пользователя в БД) */
        return email === "test@mail.ru";
    }
}
