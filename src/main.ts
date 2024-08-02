import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swaggerAPI.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  await app.listen(3000);
}
bootstrap();
