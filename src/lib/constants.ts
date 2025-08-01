const happy = '/images/icon-happy-white.svg';
const sad = '/images/icon-sad-white.svg';
const verySad = '/images/icon-very-sad-white.svg';
const veryHappy = '/images/icon-very-happy-white.svg';
const neutral = '/images/icon-neutral-white.svg';
const happyColor = '/images/icon-happy-color.svg';
const sadColor = '/images/icon-sad-color.svg';
const verySadColor = '/images/icon-very-sad-color.svg';
const veryHappyColor = '/images/icon-very-happy-color.svg';
const neutralColor = '/images/icon-neutral-color.svg';

export const moodRank: Record<string, string> = {
	'-2': 'Very sad',
	'-1': 'Sad',
	'0': 'Neutral',
	'1': 'Happy',
	'2': 'Very happy'
};

export const moodSvg: Record<string, string> = {
	'-2': verySad,
	'-1': sad,
	'0': neutral,
	'1': happy,
	'2': veryHappy
};

export const moodSvgColor: Record<string, string> = {
	'-2': verySadColor,
	'-1': sadColor,
	'0': neutralColor,
	'1': happyColor,
	'2': veryHappyColor
};

export const moodsSelection = [
	{
		text: 'Very Happy',
		value: 2,
		id: 'very-happy'
	},
	{
		text: 'Happy',
		value: 1,
		id: 'happy'
	},
	{
		text: 'Neutral',
		value: 0,
		id: 'neutral'
	},
	{
		text: 'Sad',
		value: -1,
		id: 'sad'
	},
	{
		text: 'Very Sad',
		value: -2,
		id: 'very-sad'
	}
];

export const sleepHours = [
	{
		text: '0-2 hours',
		value: 1,
		id: '0-2-hours'
	},
	{
		text: '3-4 hours',
		value: 3,
		id: '3-4-hours'
	},
	{
		text: '5-6 hours',
		value: 5,
		id: '5-6-hours'
	},
	{
		text: '7-8 hours',
		value: 7,
		id: '7-8-hours'
	},
	{
		text: '9+ hours',
		value: 9,
		id: '9+-hours'
	}
];

export const feelingsList = [
	'Joyful',
	'Down',
	'Anxious',
	'Calm',
	'Excited',
	'Frustrated',
	'Lonely',
	'Grateful',
	'Overwhelmed',
	'Motivated',
	'Irritable',
	'Peaceful',
	'Tired',
	'Hopeful',
	'Confident',
	'Stressed',
	'Content',
	'Disappointed',
	'Optimistic',
	'Restless'
];
