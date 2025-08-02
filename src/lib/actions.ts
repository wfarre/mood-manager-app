import { error } from '@sveltejs/kit';
import type { Credentials } from './types';
import type { MoodApi } from './models/Mood';

export const login = async (credentials: Credentials) => {
	try {
		const response = await fetch('http://localhost:8000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(credentials)
		});

		if (response.ok) {
			const data = await response.json();
			return data.token;
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
};

export const fetchData = async (path: string, token: string) => {
	return await fetch('http://localhost:8000/api' + path, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((res) => res.json())
		.then((fetchedData) => {
			return fetchedData;
		})
		.catch((err) => console.log(err));
};

export const create = async (path: string, newMood: MoodApi, token: string) => {
	return await fetch('http://127.0.0.1:8000/api' + path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(newMood)
	})
		.then((res) => res.json())
		.then((fetchedData) => {
			console.log(fetchedData);
		})
		.catch((err) => console.log(err));
};
