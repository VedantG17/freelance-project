import { sql } from 'drizzle-orm';
import { integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('userTable', {
	id: serial('id').primaryKey(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	email: text('email').unique(),
	name: text('name')
});
export const sessionTable = pgTable('sessionTable', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull(),
	userId: integer('userId')
		.notNull()
		.references(() => userTable.id)
});
export const oauthAccountTable = pgTable(
	'oauthAccountTable',
	{
		providerId: text('providerId').notNull(),
		providerUserId: text('providerUserId').notNull(),
		userId: integer('userId')
			.notNull()
			.references(() => userTable.id)
	},
	(table) => ({ pk: primaryKey({ columns: [table.providerId, table.providerUserId] }) })
);

export const projectTable = pgTable('projectTable', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	desc: text('desc'),
	languages: text('languages')
		.array()
		.notNull()
		.default(sql`'{}'::text[]`),
	userId: integer('userId')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' })
});
