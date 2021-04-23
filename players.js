import Player from './Player.js';

const player1 = new Player({
	player: 1,
	name: 'SONYA',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
});
const player2 = new Player({
	player: 2,
	name: 'LIU-KANG',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
})

export {player1, player2};