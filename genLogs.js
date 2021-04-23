import { logs } from './logs.js';
import {getCurrentTime, getRandom} from './utils.js'
import { GlobalVar } from './globalStor.js';

const {$chat} = GlobalVar;

function generateLogs(type, player1 = {}, player2 = {}, powerAttack) {
	let text = '';
	let el = '';

	const {name: namePlayer1} = player1;
	const {name: namePlayer2, hp: hpPlayer2} = player2;
	
	switch (type) {
		case 'start':
			text = logs[type].replace('[time]', getCurrentTime())
				.replace('[player1]', namePlayer1)
				.replace('[player2]', namePlayer2);
				el = `<p>${text}</p>`;
			break;
		case 'hit':
			text = logs[type][getRandom(logs[type].length -1)]
				.replace('[playerKick]', namePlayer1)
				.replace('[playerDefence]', namePlayer2);
			el = `<p>${getCurrentTime()} - ${text} -${powerAttack} [${hpPlayer2}/100]</p>`;
			break; 
		case 'defence':
			text = logs[type][getRandom(logs[type].length -1)]
				.replace('[playerKick]', namePlayer1)
				.replace('[playerDefence]', namePlayer2);
			el = `<p>${getCurrentTime()} - ${text} -${powerAttack} [${hpPlayer2}/100]</p>`;
			break; 
		case 'draw':
			text = logs[type];
			el = `<p>${text}</p>`;
			break; 
		case 'end':
			text = logs[type][getRandom(logs[type].length -1)]
				.replace('[playerWins]', namePlayer1)
				.replace('[playerLose]', namePlayer2);
			el = `<p>${getCurrentTime()} - ${text}</p>`;
			break; 
		default:
			break;
	};
	
	$chat.insertAdjacentHTML('afterbegin', el);
};

export default generateLogs;