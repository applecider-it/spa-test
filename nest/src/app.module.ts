import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { DevelopmentController } from './development/development.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, DevelopmentController],
  providers: [AppService],
})
export class AppModule {}
