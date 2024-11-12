import { PostEntity } from '@lib/entities';
import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POST_COMMANDS_HANDLERS } from './application-services/commands';
import { POST_EVENTS_HANDLERS } from './application-services/events';
import { POST_QUERIES_HANDLERS } from './application-services/queries';
import { PostFacade } from './application-services';

@Module({
  imports: [
    CqrsModule, /* (модуль для работы с ЖЦ приложения, в д.с с его помощью будут работать сервисы) */
    TypeOrmModule.forFeature([PostEntity]), /* (сущности - таблицы БД) */
  ],
  providers: [
    /* (наборы команд/событий/запросов сервисов, обязательно регистрируем при экспорте модуля) */
    ...POST_COMMANDS_HANDLERS,
    ...POST_EVENTS_HANDLERS,
    ...POST_QUERIES_HANDLERS,
  ],
  exports: [
    PostFacade, /* (экспортируем сборку с сервисами) */ 
  ], 
})
export class PostModule implements OnModuleInit { /* (экспортируем модуль через OnModuleInit - интерфейс жизненного цикла приложения - нужен для того, чтобы зарегистрировать массивы сервисов) */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}
  onModuleInit() {
    {
      this.commandBus.register(POST_COMMANDS_HANDLERS);
      this.queryBus.register(POST_QUERIES_HANDLERS);
      this.eventBus.register(POST_EVENTS_HANDLERS);
    }
  }
}
