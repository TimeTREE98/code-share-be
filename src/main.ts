import * as passport from 'passport';
import * as session from 'express-session';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('Code Share API').addCookieAuth('connect.sid').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(
    session({
      secret: 'abcd1234', // TODO: .env variable
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // 클라이언트에서 쿠키를 볼 수 없도록 설정
        maxAge: 1000 * 60 * 60 * 4, // 4시간
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000);
};
bootstrap();
