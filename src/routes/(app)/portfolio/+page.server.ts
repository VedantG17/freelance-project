import { db } from '$lib/server/db';
import { projectTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ locals }) => ({
	projects: await db.select().from(projectTable).where(eq(projectTable.userId, locals.user?.id!))
});

