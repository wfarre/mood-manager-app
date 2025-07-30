import type { Mood } from './models/Mood';

export const getSleepHoursRange = (sleepHours: number): string => {
	if (sleepHours < 2) {
		return '0-2';
	} else if (sleepHours < 4) {
		return '3-4';
	} else if (sleepHours < 6) {
		return '5-6';
	} else if (sleepHours < 8) {
		return '7-8';
	} else {
		return '9+';
	}
};

export const getMoodColor = (mood: number): string => {
	switch (mood) {
		case 2:
			return '#ffc97c';
		case 1:
			return '#89e780';
		case 0:
			return '#c7d3f7';
		case -1:
			return '#b8b1ff';
		case -2:
			return '#ff9b99';
		default:
			return '#c7d3f7';
	}
};

export const generateCurrentQuote = (
	currentMoodIndex: number = 0,
	moodQuotes: { [index: number]: string[] }
): string => {
	if (moodQuotes) {
		const currentMoodQuotes: string[] = moodQuotes[currentMoodIndex];
		return currentMoodQuotes[Math.floor(Math.random() * currentMoodQuotes.length)];
	}
	return '';
};

export const checkIfLengthIsValid = (
	value: string | string[] | null,
	min: number | undefined,
	max: number | undefined
) => {
	if (!value) return false;
	if (min && value.length < min) return false;
	if (max && value.length > max) return false;
	return true;
};

export const getAverageMood = (moodsList: Mood[]): number =>
	Math.floor(moodsList.reduce((acc, mood) => acc + mood.mood, 0) / moodsList.length);

export const getAverageSleep = (moodsList: Mood[]): number =>
	moodsList.reduce((acc, mood) => acc + mood.sleepHours, 0) / moodsList.length;
