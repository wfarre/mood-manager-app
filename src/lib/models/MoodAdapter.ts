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
		// this._createdAt = data.created_at;
		// this._journalEntry = data.journal_entry;
		// this._sleepHours = data.sleep_hours;
	}
}
