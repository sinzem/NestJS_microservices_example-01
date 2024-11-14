import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const PUBLIC_KEY = "public";
export const Public = () => SetMetadata(PUBLIC_KEY, true);

/* (функция примет контекст и рефлектор, вернет true/false публичный это метод или нет, используем в гуардах) */
export const isPublic = (ctx: ExecutionContext, reflector: Reflector) => {
    const isPublic = reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
        ctx.getHandler(),
        ctx.getClass()
    ])
    return isPublic;
}
