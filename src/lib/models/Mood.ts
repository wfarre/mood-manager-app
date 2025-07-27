import { moodRank, moodSvg, moodSvgColor } from '$lib/constants';
import { getMoodColor, getSleepHoursRange } from '$lib/utils';

export class Mood {
	protected _createdAt: string;
	protected _mood: number;
	protected _feelings: string[];
	protected _journalEntry: string;
	protected _sleepHours: number;

	constructor(data: MoodJson) {
		this._createdAt = data.createdAt;
		this._mood = data.mood;
		this._feelings = data.feelings;
		this._journalEntry = data.journalEntry;
		this._sleepHours = data.sleepHours;
	}

	public get createdAt(): string {
		return this._createdAt;
	}

	public get mood(): number {
		return this._mood;
	}

	public get moodString(): string {
		return moodRank[this._mood];
	}

	public get feelings(): string[] {
		return this._feelings;
	}

	public get journalEntry(): string {
		return this._journalEntry;
	}

	public get sleepHours(): number {
		return this._sleepHours;
	}

	public get moodEmojiColor(): string {
		return moodSvgColor[this._mood];
	}
	public get moodEmojiWhite(): string {
		return moodSvg[this._mood];
	}

	public get moodColor(): string {
		return getMoodColor(this._mood);
	}

	public get sleepHourRange(): string {
		return getSleepHoursRange(this._sleepHours);
	}

	public getMoodQuote(quotes: { [key: number]: string[] }): string {
		const list = quotes[this._mood];
		if (!list || list.length === 0) return 'No quote available.';
		return list[Math.floor(Math.random() * list.length)];
	}
}

export interface MoodJson {
	createdAt: string;
	mood: number;
	feelings: string[];
	journalEntry: string;
	sleepHours: number;
}

export interface MoodApi {
	created_at: string;
	mood: number;
	feelings: string[];
	journal_entry: string;
	sleep_hours: number;
}
