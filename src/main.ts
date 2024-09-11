import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { Innertube } from 'youtubei.js';

const bootstrap = async () => {
  dotenv.config({ path: `.config/${process.env.NODE_ENV}.env` });
  const innertube = await Innertube.create();
  const app = await NestFactory.create(AppModule.create(innertube));
  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get('PORT') as string | number;
  await app.listen(port);
};

bootstrap();
