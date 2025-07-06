import { pgTable, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@/db/schema/users';

export const grades = pgTable('grades', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  value: integer('value').notNull(),
  timestamp: timestamp('timestamp').notNull(),
  userID: integer('user_id')
    .notNull()
    .references(() => users.id)
});
