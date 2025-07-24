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
