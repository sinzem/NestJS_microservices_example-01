import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT", 3000);

  const config = new DocumentBuilder()
    .setTitle('Posts')
    .setDescription('CRUD API by posts')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-dock', app, documentFactory);

  await app.listen(port, () => {
    // console.log(`App started on http://localhost:${port}`);
    Logger.log(`App started on http://localhost:${port}`, "Main");
    Logger.log(
      `Swagger documentation on http://localhost:${port}/api-dock`, "Main"
    );
    Logger.log(
      `Graphql playground on http://localhost:${port}/graphql`, "Main"
    );
  });
}
bootstrap();
