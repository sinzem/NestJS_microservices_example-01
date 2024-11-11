import { IPost } from "../post.interface";
/* (пример создания сервиса) */

/* (типизируем, в д.с это функция, которая ничего не возвращает) */
export interface ISetNotPublished {
    setNotPublished(): void;
}

export const SET_NOT_PUBLISHED = async function (this: IPost) { /* (передаем this для доступа к полям Post, по сути в саму функцию ничего не передаем, функция ничего не возвращает, просто ставит поле обьекта о публикации в состояние false) */
    this.published = false;
} /* (экспортируем, собираем все сервисы модуля post в один в этой папке(services) в index.ts) */