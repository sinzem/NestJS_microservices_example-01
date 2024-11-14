// npm i -g @nestjs/cli
// nest new 01_example
// npm install --save @nestjs/typeorm typeorm pg
// npm i @nestjs/cqrs

// npx nest g lib providers   - создаем библиотеку провайдеров(просит указать префикс, пишем @lib), удаляем сервисы, оставляем модуль

// npx nest g mo typeorm -p providers  - в проекте providers создаем модуль typeorm для подключения к БД
// для создания БД запускаем pgAdmin4 и создаем базу(db_post в д.с)

/* (для файлов конфигурации) */
// npm i --save @nestjs/config  
// npm i dotenv
// npm i -D cross-env


// npx nest g lib entities  -  создаем библиотеку для создания сущностей(таблиц?), при создании запрашивает указать префикс - пишем @lib
    // nest build entities --tsc  - можем запустить для проверки, куда пойдет библиотека после сборки(нужно для указания пути в конфигах typeorm)


// В package.json добавляем скрипты запуска typeorm и migration
    // npm run migration:gen --name=post_create  - пример запуска миграций(подставляем нужное имя) - в д.с выдало предупреждение, что таблицы пустые и мигрировать нечему
    // npm run migration:run  - накатит созданную миграцию
        // npm run typeorm:config migration:revert  - удалит созданную миграцию
        // в nest-cli.json удаляем строку "deleteOutDir": true,  иначе будет каждый раз очищать папку dist


// npx nest g lib post  - создаем библиотеку, на запрос указать префикс пишем @lib, внутри папку domain с интерфейсом и аггрегатором для создания/обработки постов, также внутри пример вынесения сервисов в отдельный класс(папка services)

// npm i class-validator class-transformer  - для валидации входящих данных, автор валидирует не в dto обьектах, а в модулях - пример в post.aggregate.ts

// npx nest g lib errors  - создаем модуль (@lib - библиотеку) для работы с ошибками

// npx nest g lib shared  - (префикс @lib) - кастомный глобальный обработчик ошибок
    // npx nest g f all-exeptions -p shared  - генерируем фильтры в папке shared


// Папка post/src/providers - post.repository.ts - репзиторий с типизацией методов для posts

// Папка libs/post/src/application-services  - создаем инжектируемый модуль с сервисами posts 


// npx nest g mo api  - создаем апишку(выдает вопрос, где создавать - проставляем src)
    // npx nest g co api/controller/post --no-spec  - создаем контроллер(тоже src)
    // npx nest g mo controllers api/controllers --flat -p src

    // npx nest g mo domains -p src  - модуль для подключения доменов


// npx nest g lib auth  - создаем библиотеку для авторизации(с префиксом @lib)

// npm i --save @nestjs/passport passport passport-local @nestjs/jwt passport-jwt - ставим модули для авторизации
// npm i --save-dev @types/passport-local @types/passport-jwt

// npx nest g gu guards/jwt --flat --no-spec -p auth  - пример создания гуарда
// npx nest g d decorators/public --flat --no-spec -p auth   - создаем обложку для декоратора















// "scripts": {
//     "build": "nest build",
//     "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\" \"libs/**/*.ts\"",
//     "start": "npm run migration:compile && nest start",
//     "start:dev": "npm run migration:compile && nest build entities && nest start --watch",
//     "start:debug": "npm run migration:compile && nest start --debug --watch",
//     "start:prod": "npm run migration:compile && node dist/main",
//     "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
//     "test": "jest",
//     "test:watch": "jest --watch",
//     "test:cov": "jest --coverage",
//     "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
//     "test:e2e": "jest --config ./test/jest-e2e.json",
//     "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",
//     "typeorm:config": "npm run typeorm -- -d ./libs/providers/src/typeorm/typeorm-migrations.config.ts",
//     "migration:run": "npm run migration:compile && npm run typeorm:config migration:run",
//     "migration:generate": "nest build entities --tsc && cross-env npm run typeorm:config migration:generate ./migrations/%npm_config_name%_migration",
//     "migration:compile": "tsc -p ./migrations/tsconfig.migration.json",
//     "migration:create": "cross-env npm run typeorm migration:create ./migrations/%npm_config_name%_migration",
//     "migration:revert": "npm run typeorm:config migration:revert"
//   },


