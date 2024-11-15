import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

export const apolloDriverConfig: ApolloDriverConfig = {
    driver: ApolloDriver,
    autoSchemaFile: join( /* (схему проставляем автоматическую, составляем путь к ней) */
        process.cwd(),
        "libs",
        "providers",
        "src",
        "graphql",
        "schema.gql"
    ),
    sortSchema: true, /* (автосортировка) */
    context: ({req, res}) => ({req, res}) /* (для работы понадобится контекст, пробрасываем) */
}