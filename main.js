const $arenas = document.querySelector('.root .arenas');

const player1 = {
	player: 1,
	name: 'SCORPION',
	hp: 50,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	},
};

const player2 = {
	player: 2,
	name: 'KITANA',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	},
};

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if(className) {
		$tag.classList.add(className);
	}
	return $tag;
};

function createPlayer(character) {
	const $player = createElement('div', 'player'+character.player);
	const $progressbar = createElement('div', 'progressbar');
	const $character = createElement('div', 'character');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $img = createElement('img');

	$life.style.width = character.hp + '%';
	$name.innerText = character.name;
	$img.src = character.img;

	$progressbar.appendChild($name);
	$progressbar.appendChild($life);
	$character.appendChild($img);

	$player.appendChild($progressbar);
	$player.appendChild($character);

	return $player;
};
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
