import { Test, TestingModule } from '@nestjs/testing';
import { TweetService } from './tweet.service';

describe('TweetService', () => {
  let service: TweetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetService,
        {
          provide: 'DRIZZLE',
          useValue: {
            //select: jest.fn().mockReturnThis(),
            //from: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<TweetService>(TweetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
