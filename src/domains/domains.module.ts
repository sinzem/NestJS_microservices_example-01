import { PostModule } from '@lib/post';
import { Global, Module } from '@nestjs/common';

@Global()  /* (подключаем класс как глобальный, чтобы иметь возможность передавать библиотеку постов) */
@Module({
    imports: [
        PostModule,
    ],
    exports: [
        PostModule,
    ]
})
export class DomainsModule {}
