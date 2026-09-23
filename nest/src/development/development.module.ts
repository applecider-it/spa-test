import { Module } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';

import { DevelopmentController } from './development.controller';

@Module({
  providers: [AuthService],
  controllers: [DevelopmentController],
})
export class DevelopmentModule {}
