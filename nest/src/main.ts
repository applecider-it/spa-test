import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import session from 'express-session';
import cookieParser from 'cookie-parser';

import FileStore from 'session-file-store';

import { ValidationPipe, BadRequestException } from '@nestjs/common';

import { TrimPipe } from '@/app/TrimPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS（別ポート対応）
  app.enableCors({
    origin: true, // リクエスト元のOriginをそのまま許可
    credentials: true, // ←これ必須
  });

  // cookie
  app.use(cookieParser());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const FileStoreSession = FileStore(session);

  // session
  app.use(
    session({
      name: 'spatestsess',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      store: new FileStoreSession({}),
      secret: 'secret-key',
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

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
