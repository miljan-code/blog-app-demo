import { pgTable, serial, varchar, timestamp, json } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const post = pgTable('post', {
  id: serial('id').primaryKey(),
  title: varchar('name', { length: 256 }).notNull(),
  coverUrl: varchar('cover_url', { length: 256 }),
  content: json('content'),
  author: varchar('author', { length: 256 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export type Post = InferModel<typeof post>;
