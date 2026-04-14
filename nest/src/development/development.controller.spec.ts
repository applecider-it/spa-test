import { Test, TestingModule } from '@nestjs/testing';
import { DevelopmentController } from './development.controller';

import { AuthService } from '@/auth/auth.service';

describe('DevelopmentController', () => {
  let controller: DevelopmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopmentController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            // me()のテスト用の結果を返す
            me: jest.fn().mockResolvedValue({ id: 1, name: 'test' }),
          },
        },
      ],
    }).compile();

    controller = module.get<DevelopmentController>(DevelopmentController);
  });

  // サービスが正しくDIされているか確認
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // sendTestが正しい値を返すか確認
  it('sendTest should return message and user', async () => {
    // 疑似パラメーター
    const body = { message: 'hello' };

    // 疑似リクエスト
    const req = {
      session: {},
    } as any;

    // テスト実行
    const result = await controller.sendTest(body, req);

    // 結果確認
    expect(result.message).toBe('Message: hello');
    expect(result.user?.name).toBe('test');
  });
});
