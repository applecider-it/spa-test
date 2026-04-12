import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().default(''),
  password: text('password').notNull().default(''),
});

export const userTweets = pgTable(
  'user_tweets',
  {
    id: serial('id').primaryKey(),

    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    content: text('content').notNull(),

    createdAt: timestamp('created_at')
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [index('user_tweets_user_id_idx').on(table.userId)],
);

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().default(''),
  password: text('password').notNull().default(''),
});
