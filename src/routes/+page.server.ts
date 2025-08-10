import { create, fetchData } from '$lib/actions';
import type { MoodApi } from '$lib/models/Mood';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
	const token: undefined | string = cookies.get('moodTrackerToken');
	if (!token) {
		redirect(307, '/login');
	}

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
					cookies.delete('moodCurrentUserId', { path: '/' });
					throw error(401, 'Unauthorized');
				}
				if (!res.ok) {
					throw new Error('Something went wrong');
				}
				return res.json();
			})
			.then((data) => {
				cookies.set('moodCurrentUserId', data.id, { path: '/' });
				return data;
			})
			.catch((err) => {
				if (err.status === 401) {
					redirect(307, '/login');
				}
			});
	};

	const user = await fetchUser();

	const fetchDataJson = async () => {
		return await fetch('/data/data.json')
			.then((res) => res.json())
			.then((fetchedData) => {
				return fetchedData;
			})
			.catch((err) => console.log(err));
	};

	const data = await fetchDataJson();
	const pouet = await fetchData(`/moods/${user.id}`, cookies.get('moodTrackerToken') as string);
	console.log('puet data');

	console.log(pouet);

	return {
		moodEntries: pouet?.data,
		// moodEntries: data.moodEntries,
		moodQuotes: data.moodQuotes,
		user: await fetchUser()
	};
};

export const actions = {
	create: async ({ request, cookies }) => {
		const token: undefined | string = cookies.get('moodTrackerToken');
		if (!token) {
			return;
		}
		const data = await request.formData();
		const formDataString = data.get('formData');
		const formData = JSON.parse(formDataString as string);

		const newMood = {
			mood: formData.mood,
			feelings: formData.feelings,
			journal_entry: formData.journalEntry,
			sleep_hours: formData.sleepHours,
			user_id: cookies.get('moodCurrentUserId')
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
				cookies.delete('moodTrackerToken', { path: '/' });
			} else {
				const json = await response.json();
				throw error(response.status, json.message);
			}
		} catch (err) {
			console.log(err);

			if ((err as { status: number; body: { message: string } }).status) {
				return fail((err as { status: number; message: string }).status, {
					message: (err as { status: number; body: { message: string } }).body.message
				});
			} else {
				error(500, 'Something went wrong');
			}
		}
	},
	updateProfile: async ({ request, cookies }) => {
		console.log('update-profile');
		const formData = await request.formData();
		console.log(formData);

		const file = formData.get('file-upload') as File;

		const dataUrl = file.size !== 0 ? await fileToBase64(file) : undefined;

		try {
			const res = await fetch(
				`http://localhost:8000/api/user/${cookies.get('moodCurrentUserId')}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer ${cookies.get('moodTrackerToken')}`
					},
					body: JSON.stringify({ name: formData.get('name'), avatar: dataUrl })
				}
			);

			if (!res.ok) {
				const json = await res.json();
				throw error(res.status, json.message);
			}
			return await res.json();
		} catch (err) {
			console.log(err);
		}
	}
};

const fileToBase64 = async (file: File): Promise<string | Error> => {
	if (!file) {
		throw error(400, { message: 'no file upload' });
	}

	// Read the file into a buffer
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// Convert to base64
	const base64 = buffer.toString('base64');
	const mimeType = file.type;

	// Optional: full Data URL
	const dataUrl = `data:${mimeType};base64,${base64}`;

	// console.log(base64);

	return dataUrl;
};
