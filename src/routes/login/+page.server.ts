// import { login } from '$lib/actions.js';
import { login } from '$lib/actions.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const token = cookies.get('moodTrackerToken');
	if (!token) return;
	redirect(307, '/');
};

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const result = await login({ email, password });
		if ('token' in result && result.token) {
			cookies.set('moodTrackerToken', result.token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			});
		} else {
			return result;
		}
	}
};
