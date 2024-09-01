import { db } from '$lib/server/db';
import { projectTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load = async ({ locals }) => ({
	projects: await db.select().from(projectTable).where(eq(projectTable.userId, locals.user?.id!))
});

export const actions = {
	add: async ({ request, locals }) => {
		const formData = await request.formData();

		const userId = locals.user?.id!;
		const name = formData.get('name')?.toString().toUpperCase();
		const desc = formData.get('desc')?.toString().toUpperCase();
		const language = formData.get('lang')?.toString().toUpperCase();
		// current user as holder name in future

		if (!name || !language) return fail(400, { message: 'Name and Languages are required' });

		try {
			await db.insert(projectTable).values({ userId, name, desc, language });
			return { message: 'Project added successfully' };
		} catch (e) {
			return fail(500, { message: `Error adding Project: ${e}` });
		}
	},

	// yet to be tested
	update: async ({ request, locals }) => {
		const formData = await request.formData();

		const id = Number(formData.get('id'));
		const name = formData.get('name')?.toString().toUpperCase();
		const desc = formData.get('desc')?.toString().toUpperCase();
		const language = formData.get('lang')?.toString().toUpperCase();

		try {
			await db
				.update(projectTable)
				.set({ name, desc, language })
				.where(and(eq(projectTable.id, id), eq(projectTable.userId, locals.user?.id!)));
			return { message: 'Project details updated successfully' };
		} catch (e) {
			return fail(500, { message: `Error updating Project Details: ${e}` });
		}
	},

	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		if (!id) return fail(400, { message: 'Project id is required.' });

		try {
			await db
				.delete(projectTable)
				.where(and(eq(projectTable.id, id), eq(projectTable.userId, locals.user?.id!)));

			return { message: 'Project deleted successfully' };
		} catch (e) {
			return fail(500, { message: `Error deleting Project: ${e}` });
		}
	}
};
