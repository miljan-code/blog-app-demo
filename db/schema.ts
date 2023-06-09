import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  avatarUrl: varchar('avatarUrl', { length: 256 }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});
