// import { login } from '$lib/actions.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const token = cookies.get('moodTrackerToken');
	if (!token) return;
	redirect(307, '/');
};

export const actions = {
	signup: async ({ request, cookies }) => {
		const formData = await request.formData();
		const name = 'Hello';
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			const response = await fetch('http://localhost:8000/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ name, email, password })
			});

			if (response.ok) {
				const data = await response.json();
				cookies.set('moodTrackerToken', data.token, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict'
				});
			} else {
				const json = await response.json();
				throw error(response.status, json.message);
			}
		} catch (err) {
			console.log(err);

			if ((err as { status: number; body: { message: string } }).status) {
				error((err as { status: number; message: string }).status, {
					message: (err as { status: number; body: { message: string } }).body.message
				});
			} else {
				error(500, 'Something went wrong');
			}
		}
	}
};
