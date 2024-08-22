import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swaggerAPI.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  await app.listen(3333);
}
bootstrap();
