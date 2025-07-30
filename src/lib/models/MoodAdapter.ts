import { Mood, type MoodApi } from './Mood';

export class MoodAdapter extends Mood {
	constructor(data: MoodApi) {
		super({
			createdAt: data.created_at,
			mood: data.mood,
			feelings: data.feelings,
			journalEntry: data.journal_entry,
			sleepHours: data.sleep_hours
		});
	}
}
