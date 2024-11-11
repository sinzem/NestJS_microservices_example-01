import { AggregateRoot } from "@nestjs/cqrs";
import { ISetNotPublished, SET_NOT_PUBLISHED } from "./set-not-published.case";
import { ISetPublished, SET_PUBLISHED } from "./set-published.case";

/* (класс обьединит сервисы модуля post - в данном примере какждый сервис вынесен в отдельный класс, в этом документе собираем их все в один сервис) */
export class PostServices extends AggregateRoot implements ISetNotPublished, ISetPublished { /* (имплементируем сервисы(функции)) */
    setNotPublished = SET_NOT_PUBLISHED; 
    setPublished = SET_PUBLISHED;
} /* (в д.с подключаем в post.aggregate.ts) */