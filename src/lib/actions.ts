import { error, fail, type ActionFailure } from '@sveltejs/kit';
import type { Credentials } from './types';
import type { MoodApi } from './models/Mood';

const returnError = (err: unknown | { status: number; body: { message: string } }) => {
	if ((err as { status: number; body: { message: string } }).status) {
		return fail((err as { status: number; body: { message: string } }).status, {
			message: (err as { status: number; body: { message: string } }).body.message
		});
	} else {
		error(500, 'Something went wrong');
	}
};

const header = (token?: string) => ({
	'Content-Type': 'application/json',
	Accept: 'application/json',
	Authorization: token ? `Bearer ${token}` : ''
});

export const login = async (
	credentials: Credentials,
	path: string = 'login'
): Promise<{ token: string } | ActionFailure<{ message: string }>> => {
	try {
		const response = await fetch(`http://localhost:8000/api/${path}`, {
			method: 'POST',
			headers: header(),
			body: JSON.stringify(credentials)
		});

		if (!response.ok) {
			const json = await response.json();
			throw error(response.status, json.message);
		}

		const data = await response.json();
		return { token: data.token };
	} catch (err) {
		return returnError(err);
	}
};

export const fetchData = async (path: string, token: string) => {
	try {
		const res = await fetch('http://localhost:8000/api' + path, {
			method: 'GET',
			headers: header(token)
		});

		if (!res.ok) {
			const json = await res.json();
			throw error(res.status, json.message);
		}

		return await res.json();
	} catch (err) {
		console.log(err);
	}
};

export const create = async (path: string, newMood: MoodApi, token: string) => {
	try {
		const res = await fetch('http://localhost:8000/api' + path, {
			method: 'POST',
			headers: header(token),
			body: JSON.stringify(newMood)
		});

		if (!res.ok) {
			const json = await res.json();
			throw error(res.status, json.message);
		}

		return await res.json();
	} catch (err) {
		return returnError(err);
	}
};
