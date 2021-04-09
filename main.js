const player1 = {
	name: 'SCORPION',
	hp: 50,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	}
}

const player2 = {
	name: 'SUB-ZERO',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	}
}

function createPlayer(player, character) {
	const $player1 = document.createElement('div');
	$player1.classList = player;
	
	const $progressbar = document.createElement('div');
	$progressbar.classList = 'progressbar';
	$player1.appendChild($progressbar);

	const $life = document.createElement('div');
	$life.classList = 'life';
	$life.style.width = character.hp + '%';
	$progressbar.appendChild($life);

	const $name = document.createElement('div');
	$name.classList = 'name';
	$name.innerText = character.name;
	$progressbar.appendChild($name);

	const $character = document.createElement('div');
	$character.classList = 'character';
	$player1.appendChild($character);

	const $img = document.createElement('img');
	$img.src = character.img;
	
	$character.appendChild($img);
	
	const $root = document.querySelector('.root .arenas');
	$root.appendChild($player1);
};

createPlayer('player1', player1);
createPlayer('player2', player2);
