import { Mood, type MoodApi, type MoodJson } from '$lib/models/Mood';
import { MoodAdapter } from '$lib/models/MoodAdapter';

export class MoodFactory {
	constructor(data: MoodApi | MoodJson, type: string) {
		if (type === 'json') {
			return new Mood(data as MoodJson);
		}
		if (type === 'api') {
			return new MoodAdapter(data as MoodApi);
		}
	}
}
