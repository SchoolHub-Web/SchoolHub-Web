import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { users } from '@/db/schema/users';

export const subjects = pgTable('subjects', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  title: text('title').notNull(),
  icon: text('icon'),
  displayName: text('display_name'),
  nicID: text('nic_id'),
  userID: integer('user_id')
    .notNull()
    .references(() => users.id)
});
