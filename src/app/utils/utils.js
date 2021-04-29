import { GlobalVar } from '../services/globalStor.js';

const {PENALTY} = GlobalVar;

export function getRandom(max) {
	const number = Math.ceil(Math.random() * max);

	return number;
};

export function getCurrentTime() {
	const date = new Date();
	const minutes = date.getMinutes();
	return `${date.getHours()}:${minutes > 9 ? minutes : '0' + minutes}`;
};

export function calcPercent(hit) {
	const percent = Math.ceil(hit / 100 * PENALTY) -1;
	return percent;
};
