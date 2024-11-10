import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

/* (конфигурация подключения typeorm) */
config({path: join(process.cwd(), ".env")}); /* (cwd выдаст путь к корневой папке(в д.с директория 01_example)) */
const configService = new ConfigService();

const options = (): DataSourceOptions => {
    const url = configService.get("DATABASE_URL");
    if (!url) {
        throw new Error("Database URL is empty");
    }
    return {
        url,
        type: "postgres",
        schema: "public",
        logging: configService.get("IS_PROD") === "false", /* (логирование для dev-режима - в д.с получаем из среды булевую переменную о прод-режиме) */
        entities: [
            join(process.cwd(), "dist", "libs", "entities", "**", "*.entity.{ts, js}"), /* (указываем путь к сущностям(таблицам)) */  
        ],
        migrations: [join(process.cwd(), "migrations", "**", "*migration.ts")], /* (путь миграций - cwd выдаст путь к корневой папке, в ней папка migrations, все документы, заканчивающиеся на migration.ts) */
        migrationsRun: true, /* (миграции при запуске) */
        migrationsTableName: "migrations", /* (название) */
    }
};

export const appDataSource = new DataSource(options());