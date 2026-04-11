import { Inject, Injectable } from '@nestjs/common';
import { users } from './db/schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('DRIZZLE') private db: any,
    private configService: ConfigService,
  ) {}

  async getHello(): Promise<string> {
    console.log('getHello', this.configService.get<string>('DATABASE_URL'), process.env.DATABASE_URL);

    const rows = await this.db.select().from(users);

    console.log('rows', rows);

    return 'Hello World!';
  }
}
