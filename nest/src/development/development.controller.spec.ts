import { Test, TestingModule } from '@nestjs/testing';
import { DevelopmentController } from './development.controller';

import { AuthService } from '../auth/auth.service';

describe('DevelopmentController', () => {
  let controller: DevelopmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopmentController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            me: jest.fn().mockResolvedValue({
              user: { id: 1, name: 'test' },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<DevelopmentController>(DevelopmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('sendTest should return message and user', async () => {
    const body = { message: 'hello' };

    const req = {
      session: {},
    } as any;

    const result = await controller.sendTest(body, req);

    expect(result.message).toBe('Message: hello');
    expect(result.user?.name).toBe('test');
  });
});
