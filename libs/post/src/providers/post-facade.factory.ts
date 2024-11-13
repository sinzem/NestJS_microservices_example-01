import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { PostFacade } from "../application-services";

/* (для удобства передачи Bus-ов, пример подключения в postmodule.ts) */
export const postFacadeFactory = (
    commandBus: CommandBus,
    queryBus: QueryBus,
    eventBus: EventBus
) => new PostFacade(commandBus, queryBus, eventBus);