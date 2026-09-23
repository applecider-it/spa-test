import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

import { UserService } from './user.service';
import { AuthService } from '@/admin/auth/auth.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'DRIZZLE',
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // サービスが正しくDIされているか確認
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
