import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExeptionsFilter } from './filters';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    /* (подключаем глобально модуль для работы с конфигами, можно в любом другом модуле, передаем опции глобальности и путь к .env) */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env")
    })
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExeptionsFilter /* (подключаем кастомные фильтры для ошибок) */
    }
  ],
  exports: [],
})
export class SharedModule {} 
/* (подключаем модуль в корневой модуль(app.module.ts)) */
