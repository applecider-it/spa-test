import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { DevelopmentController } from './development/development.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, DevelopmentController],
  providers: [AppService, AuthService],
})
export class AppModule {}
