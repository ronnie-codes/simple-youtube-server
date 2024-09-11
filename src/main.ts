import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { Innertube } from 'youtubei.js';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootstrap = async () => {
  // Setup root composition
  const innertube = await Innertube.create();
  const app = await NestFactory.create(AppModule.create(innertube));

  // Setup Globals
  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Youtube API')
    .setDescription('Youtube API and more')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Setup Environment
  dotenv.config({ path: `.config/${process.env.NODE_ENV}.env` });
  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get('PORT') as string | number;

  // Listen
  await app.listen(port);
};

bootstrap();
