import { create, fetchData } from '$lib/actions';
import type { MoodApi } from '$lib/models/Mood';
import { error, fail, json, redirect } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
	const token: undefined | string = cookies.get('moodTrackerToken');
	if (!token) {
		redirect(307, '/login');
	}

	// console.log(token);

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
				if (err.status === 401) {
					redirect(307, '/login');
				}
			});
	};

	const user = await fetchUser();

	// console.log(user);

	const fetchDataJson = async () => {
		return await fetch('/data/data.json')
			.then((res) => res.json())
			.then((fetchedData) => {
				return fetchedData;
			})
			.catch((err) => console.log(err));
	};

	const data = await fetchDataJson();

	// return {
	// 	moodEntries: await fetchData('/moods', cookies.get('moodTrackerToken') as string),
	// 	// moodEntries: data.moodEntries,
	// 	moodQuotes: data.moodQuotes
	// };
};

export const actions = {
	create: async ({ request, cookies }) => {
		const token: undefined | string = cookies.get('moodTrackerToken');
		if (!token) {
			return;
			// throw redirect(307, '/login');
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

		// const { dataUrl } = await fileToBase64(file);

		// console.log(dataUrl);

		try {
			const res = await fetch('http://localhost:8000/api/user/7', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${cookies.get('moodTrackerToken')}`
				},
				body: JSON.stringify({ name: formData.get('name') })
			});

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

// function imageToBase64(imagePath) {
// 	try {
// 		// Read the image file as a binary buffer
// 		const imageData = fs.readFileSync(imagePath);

// 		// Convert the binary buffer to a Base64 string
// 		const base64Image = Buffer.from(imageData).toString('base64');

// 		// Optionally, add the data URI prefix for web usage
// 		// Determine image type from file extension
// 		const ext = imagePath.split('.').pop();
// 		const dataUri = `data:image/${ext};base64,${base64Image}`;

// 		return dataUri; // Or just base64Image if the data URI prefix isn't needed
// 	} catch (error) {
// 		console.error('Error converting image to Base64:', error);
// 		return null;
// 	}
// }

const fileToBase64 = async (file: File) => {
	if (!file) {
		return json({ error: 'No file uploaded' }, { status: 400 });
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

	return { base64, dataUrl };
};
