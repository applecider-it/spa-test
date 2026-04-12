import { Test, TestingModule } from '@nestjs/testing';
import { TweetController } from './tweet.controller';

import { TweetService } from './tweet.service';
import { AuthService } from '../auth/auth.service';

describe('TweetController', () => {
  let controller: TweetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetController],
      providers: [
        {
          provide: TweetService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TweetController>(TweetController);
  });

  // サービスが正しくDIされているか確認
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
