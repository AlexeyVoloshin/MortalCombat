const $arenas = document.querySelector('.root .arenas');
const $randomButton = document.querySelector('.button');
let $winsTitle;

const player1 = {
	player: 1,
	name: 'SONYA',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	},
	changeHP: changeHP,
	elHP: elHP,
	renderHP,
};

const player2 = {
	player: 2,
	name: 'LIUKANG',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	},
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,
};

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if(className) {
		$tag.classList.add(className);
	}
	return $tag;
};

function createPlayer() {
	const $player = createElement('div', 'player' + this.player);
	const $progressbar = createElement('div', 'progressbar');
	const $character = createElement('div', 'character');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $img = createElement('img');

	$life.style.width = this.hp + '%';
	$name.innerText = this.name;
	$img.src = this.img;

	$progressbar.appendChild($name);
	$progressbar.appendChild($life);
	$character.appendChild($img);

	$player.appendChild($progressbar);
	$player.appendChild($character);

	return $player;
};

function changeHP(randomNum) {
	this.hp -= randomNum;

	if (this.hp <= 0) {
		this.hp = 0;
	}
};

function elHP() {
	const $playerLife = document.querySelector('.player' + this.player + ' .life');

	return $playerLife;
};

function renderHP($playerLife) {
	$playerLife.style.width = this.hp + '%';
};

function showResultText(name) {
	$showTitle = createElement('div', 'showTitle');
	if (name) {
		$showTitle.innerText = name + ' wins';
	} else {
		$showTitle.innerText = 'draw';
	}

	return $showTitle;
};

function generateRandomNum(min, max) {
	const number = Math.ceil(Math.random() * (max - min + 1)) + min;

	return number;
};

function createReloadButton() {
	const $reloadWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';
	$button.addEventListener('click', function() {
		window.location.reload();
	});
	$reloadWrap.appendChild($button);

	return $reloadWrap;
};

$randomButton.addEventListener('click', function() {
	player1.changeHP(generateRandomNum(1, 20));
	player2.changeHP(generateRandomNum(1, 20));
	player1.renderHP(player1.elHP());
	player2.renderHP(player2.elHP());

	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		$arenas.appendChild(createReloadButton());
	};

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(showResultText(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(showResultText(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(showResultText());
	};
});

$arenas.appendChild(createPlayer.call(player1));
$arenas.appendChild(createPlayer.call(player2));
