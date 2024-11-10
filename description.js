// npm i -g @nestjs/cli
// nest new 01_example
// npm install --save @nestjs/typeorm typeorm pg

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