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


// npx nest g lib post  - создаем библиотеку, на запрос указать префикс пишем @lib, внутри папку domain с интерфейсом и аггрегатором для создания/обработки постов, также внутри пример вынесения сервисов в отдельный класс(папка services)

// npm i class-validator class-transformer  - для валидации входящих данных, автор валидирует не в dto обьектах, а в модулях - пример в post.aggregate.ts

// npx nest g lib errors  - создаем модуль (@lib - библиотеку) для работы с ошибками

// npx nest g lib shared  - (префикс @lib) - кастомный глобальный обработчик ошибок
    // npx nest g f all-exeptions -p shared  - генерируем фильтры в папке shared


// Папка post/src/providers - post.repository.ts - репзиторий с типизацией методов для posts

// Папка post/src/application-services  - создаем инжектируемый модуль с сервисами posts 