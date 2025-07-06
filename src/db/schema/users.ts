import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  NICUser: text('nic_user'),
  NICPassword: text('nic_password'),
  GeminiKey: text('gemini_key')
});
