import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import session from 'express-session';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS（別ポート対応）
  app.enableCors({
    origin: 'http://localhost:3000', // フロント
    credentials: true, // ←これ必須
  });

  // cookie
  app.use(cookieParser());

  // session
  app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
