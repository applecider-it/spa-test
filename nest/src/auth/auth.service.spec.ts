import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  /** テスト用のDBモック */
  const mockDb = {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'DRIZZLE',
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // サービスが正しくDIされているか確認
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ログイン処理の確認
  it('login success: should set session user and return ok', async () => {
    // テストデータ（DBから返るユーザー）
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: '1234',
    };

    // DBの振る舞いをこのテスト用に上書き
    // select().from().where() の結果を返す
    mockDb.where.mockResolvedValue([mockUser]);

    // セッション（Expressの疑似オブジェクト）
    const session: any = {};

    // テスト実行
    const result = await service.login(
      session,
      'test@example.com',
      '1234',
    );

    // 結果確認
    expect(result).toEqual({ status: 'ok' });
  });
});