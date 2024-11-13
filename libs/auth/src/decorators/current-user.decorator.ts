import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/* (декоратор для получения информации(пользователя) из запроса - во встроенную функцию передаем данные(в д.с неизвестные) и контекст) */
export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest(); /* (получаем запрос из контекста) */
    return req.user; /* (возвращаем данные пользователя из запроса) */
}); /* (регистрируем в индексах этой и родительской папки, пример применения в api/controllers/post.controller.ts) */