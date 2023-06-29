import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config({ path: `.config/${process.env.NODE_ENV}.env` });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
}

bootstrap();
