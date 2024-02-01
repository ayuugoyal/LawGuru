import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const chat = pgTable('chat', {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: varchar('user_id').notNull(),
    title: varchar('title').notNull(),
});

export const messages = pgTable('messages', {
    id: uuid('id').primaryKey().defaultRandom(),
    chat_id: uuid('chat_id').references(() => chat.id).notNull(),
    content: varchar('content').notNull(),
    sender: varchar('sender').notNull(),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
});
