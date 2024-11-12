import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExeptionsFilter } from './filters';

@Module({
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
