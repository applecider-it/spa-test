import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import session from 'express-session';
import cookieParser from 'cookie-parser';

import FileStore from 'session-file-store';

import { ValidationPipe, BadRequestException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { TrimPipe } from '@/app/TrimPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // CORS（別ポート対応）
  app.enableCors(configService.get('web.cors'));

  // cookie
  app.use(cookieParser());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const FileStoreSession = FileStore(session);

  // session
  app.use(
    session({
      name: configService.get<string>('session.name'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      store: new FileStoreSession({}),
      secret: configService.get<string>('session.secret') as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
      },
    }),
  );

  // validation
  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const custom: any = {};

        errors.forEach((err) => {
          custom[err.property] = Object.values(err.constraints || {});
        });

        return new BadRequestException({
          errors: custom,
        });
      },
    }),
  );

  await app.listen(configService.get<number>('web.port') as number);
}
bootstrap();
