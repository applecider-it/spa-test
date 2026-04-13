import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
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
