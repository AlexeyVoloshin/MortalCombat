export const player1 = {
	player: 1,
	name: 'SONYA',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	},
	changeHP,
	elHP,
	renderHP,
};

export const player2 = {
	player: 2,
	name: 'LIUKANG',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	},
	changeHP,
	elHP,
	renderHP,
};

function changeHP(randomNum) {
	this.hp -= randomNum;

	if (this.hp <= 0) {
		this.hp = 0;
	};
};

function elHP() {
	const $playerLife = document.querySelector('.player' + this.player + ' .life');

	return $playerLife;
};

function renderHP() {
	this.elHP().style.width = this.hp + '%';
};