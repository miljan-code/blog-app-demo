import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';

export const post = pgTable('post', {
  id: serial('id').primaryKey(),
  title: varchar('name', { length: 256 }).notNull(),
  content: text('content'),
  author: varchar('author', { length: 256 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});
