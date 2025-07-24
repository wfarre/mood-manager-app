import { Mood, type MoodApi } from '$lib/models/Mood';

export class MoodFactory {
	constructor(data: MoodApi, type: string) {
		if (type === 'json') {
			return new Mood(data);
		}
	}
}
