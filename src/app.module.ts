import { ProvidersModule } from '@lib/providers';
import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ApiModule } from './api';
import { DomainsModule } from './domains/domains.module';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [
    SharedModule, /* (подключаем кастомный глобальный обработчик ошибок) */
    ProvidersModule, 
    ApiModule, 
    DomainsModule, ChannelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
