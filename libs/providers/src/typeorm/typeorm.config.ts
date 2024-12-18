import { ENTITIES, PostEntity } from "../../../entities/src/index";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';

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
        entities: ENTITIES,
        /* (миграции вынесли в отдельный документ) */
        migrationsRun: true, /* (миграции при запуске) */
        migrationsTableName: "migrations", /* (название) */
    }
};

export const appDataSource = new DataSource(options());