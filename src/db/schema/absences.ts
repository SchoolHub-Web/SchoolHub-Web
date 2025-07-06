import { pgTable, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@/db/schema/users';

export const absences = pgTable('absences', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  excused: boolean('excused').notNull(),
  timestamp: timestamp('timestamp').notNull(),
  userID: integer('user_id')
    .notNull()
    .references(() => users.id)
});
