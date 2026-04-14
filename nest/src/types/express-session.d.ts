import 'express-session';
import { InferSelectModel } from 'drizzle-orm';

import { users, adminUsers } from '@/db/schema'; 

declare module 'express-session' {
  interface Session {
    authUserId?: number;
    authAdminUserId?: number;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: InferSelectModel<typeof users>;
      adminUser?: InferSelectModel<typeof adminUsers>;
    }
  }
}
