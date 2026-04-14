import 'express-session';
import { InferSelectModel } from 'drizzle-orm';

import { users } from '@/db/schema'; 

declare module 'express-session' {
  interface Session {
    authUserId?: number;
    adminAuthUserId?: number;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: InferSelectModel<typeof users>;
    }
  }
}
