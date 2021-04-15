const $arenas = document.querySelector('.root .arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}

const PENALTY = 50;

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
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

const player2 = {
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
	};
};

function elHP() {
	const $playerLife = document.querySelector('.player' + this.player + ' .life');

	return $playerLife;
};

function renderHP() {
	this.elHP().style.width = this.hp + '%';
};

function showResultText(name) {
	const $showTitle = createElement('div', 'showTitle');
	if (name) {
		$showTitle.innerText = name + ' wins';
	} else {
		$showTitle.innerText = 'draw';
	};

	return $showTitle;
};

function getRandom(max) {
	const number = Math.ceil(Math.random() * max);

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

	$arenas.appendChild($reloadWrap);
};

$arenas.appendChild(createPlayer.call(player1));
$arenas.appendChild(createPlayer.call(player2));

function enemyAttack() {
	const hit = ATTACK[getRandom(3) -1];
	const defence = ATTACK[getRandom(3) -1];

	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	};
};

function myAttack() {
	const attack = {};
	for(let item of $formFight) {
		if (item.checked && item.name === 'hit') {
			attack.value = getRandom(HIT[item.value]);
			attack.hit = item.value;
		};
		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		};
		item.checked = false;
	};
	return attack;
};

function calcPercent(hit) {
	const percent = Math.ceil(hit / 100 * PENALTY) -1;
	return percent;
};

function checkPowerAttack(attack, enemy) {
	if(attack.hit !== enemy.defence) {
		return attack.value
	} else {
		const penalty = calcPercent(attack.value);
		return attack.value -  penalty;
	};
};

$formFight.addEventListener('submit', function(event) {
	event.preventDefault();
	const attack = myAttack();
	const enemy = enemyAttack();

	player1.changeHP(checkPowerAttack(enemy, attack));
	player2.changeHP(checkPowerAttack(attack, enemy));

	player1.renderHP();
	player2.renderHP();
	
	if (player1.hp === 0 || player2.hp === 0) {
		$fightButton.disabled = true;
		createReloadButton();
	};
	
	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(showResultText(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(showResultText(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(showResultText());
	};
});