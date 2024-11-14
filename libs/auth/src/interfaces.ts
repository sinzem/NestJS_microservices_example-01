export interface ICurrentUser {
    userId: string;
    email: string;
    roles: string[];
} /* (типизация для данных, вытаскиваемых из запроса, пример использования - при создании поста в post.controller.ts) */