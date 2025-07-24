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
			break;
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
