import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'DRIZZLE',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login success should set session user and return ok', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: '1234',
    };

    const mockDb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockResolvedValue([mockUser]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'DRIZZLE',
          useValue: mockDb,
        },
      ],
    }).compile();

    const service = module.get<AuthService>(AuthService);

    const session: any = {};

    const result = await service.login(session, 'test@example.com', '1234');

    expect(result).toEqual({ status: 'ok' });
    expect(session.user).toEqual({
      id: 1,
      email: 'test@example.com',
    });
  });
});
