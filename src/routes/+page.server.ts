import { create, fetchData } from '$lib/actions';
import type { MoodApi } from '$lib/models/Mood';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
	const token: undefined | string = cookies.get('moodTrackerToken');
	if (!token) {
		redirect(307, '/login');
	}

	console.log(token);

	const fetchUser = async () => {
		return await fetch('http://127.0.0.1:8000/api/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${cookies.get('moodTrackerToken')}`
			}
		})
			.then((res) => {
				if (res.status === 401) {
					cookies.delete('moodTrackerToken', { path: '/' });
					throw error(401, 'Unauthorized');
				}
				if (!res.ok) {
					throw new Error('Something went wrong');
				}
				return res.json();
			})
			.then((data) => {
				return data;
			})
			.catch((err) => {
				console.log('hello');

				if (err.status === 401) {
					redirect(307, '/login');
				}
				console.log(err);
			});
	};

	const user = await fetchUser();

	console.log(user);

	const fetchDataJson = async () => {
		return await fetch('/data/data.json')
			.then((res) => res.json())
			.then((fetchedData) => {
				return fetchedData;
			})
			.catch((err) => console.log(err));
	};

	const data = await fetchDataJson();

	return {
		moodEntries: await fetchData('/moods', cookies.get('moodTrackerToken') as string),
		// moodEntries: data.moodEntries,
		moodQuotes: data.moodQuotes
	};
};

export const actions = {
	create: async ({ request, cookies }) => {
		const token: undefined | string = cookies.get('moodTrackerToken');
		if (!token) {
			redirect(307, '/login');
		}
		const data = await request.formData();

		console.log(data.get('formData'));
		const formDataString = data.get('formData');
		const formData = JSON.parse(formDataString as string);
		console.log(formData);

		const newMood = {
			mood: formData.mood,
			feelings: formData.feelings,
			journal_entry: formData.journalEntry,
			sleep_hours: formData.sleepHours
		} as MoodApi;

		return await create('/moods', newMood, token);
	},

	logout: async ({ cookies }) => {
		try {
			const response = await fetch('http://localhost:8000/api/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${cookies.get('moodTrackerToken')}`
				}
			});

			console.log(response);

			if (response.ok) {
				const data = await response.json();
				cookies.set('moodTrackerToken', data.token, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict'
				});
				cookies.delete('moodTrackerToken', { path: '/' });
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
