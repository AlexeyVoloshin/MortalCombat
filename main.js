const $arenas = document.querySelector('.root .arenas');
const $randomButton = document.querySelector('.button');
let $winsTitle;

const player1 = {
	player: 1,
	name: 'SONYA',
	hp: 100,
	img: {
		fightingStance: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
		dizzy: 'http://www.mortalkombatwarehouse.com/mk3/sonya/sprites/dizzy/a1.gif',
		win: 'http://www.mortalkombatwarehouse.com/mk3/sonya/sprites/victory/08.png',
	},
	weapon: ['ax', 'harpoon', 'gun'],
	attack: function() {
		console.log(this.name + ' Fight...');
	},
};

const player2 = {
	player: 2,
	name: 'LIUKANG',
	hp: 100,
	img: { 
		fightingStance: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
		dizzy: 'http://reactmarathon-api.herokuapp.com/assets/liukang-dizzy.gif',
		win: 'http://www.mortalkombatwarehouse.com/mk3/liukang/sprites/victory/14.png',	
	},
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
	const $player = createElement('div', 'player' + character.player);
	const $progressbar = createElement('div', 'progressbar');
	const $character = createElement('div', 'character');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $img = createElement('img');

	$life.style.width = character.hp + '%';
	$name.innerText = character.name;
	$img.src = character.img.fightingStance;

	$progressbar.appendChild($name);
	$progressbar.appendChild($life);
	$character.appendChild($img);

	$player.appendChild($progressbar);
	$player.appendChild($character);

	return $player;
};

function changeImg(player, statePlayer) {
	const $img = document.querySelector('.player'+player.player+ ' img');
	switch (statePlayer) {
		case 'dizzy':
			$img.src = player.img.dizzy;
			break;
		case 'wins':
			$img.src = player.img.win;
			break;
		default:
			$img.src = player.img.fightingStance;
			break;
	}
}

function changeHPView(player) {
	const $playerLife = document.querySelector('.player'+player.player+ ' .life');
	$playerLife.style.width = player.hp + '%';
}

function changeHP(player, randomNum, healthLevel) {
/* 
	данная проверка исключает запись отрицательного числа в player.hp, 
	что не давало зайти в условие player.hp <= 0 c первого раза. 
*/
	if (player.hp - randomNum <= 0) {
		player.hp = 0;
		if (player.hp === 0 && healthLevel === 0) {
			$arenas.appendChild(bothLost());
			changeHPView(player);
			playerLose(player);
			return;
		}
		if (player.player === 1) {
			$arenas.appendChild(playerWin(player2));
			playerLose(player1);
		} else {
			$arenas.appendChild(playerWin(player1));
			playerLose(player2);
		};
	} else {
		player.hp -= randomNum;
	};
	changeHPView(player);
};

function playerLose(player) {
	changeImg(player, 'dizzy');
}

function playerWin(player) {
	changeImg(player, 'wins');
	$winsTitle = createElement('div', 'winsTitle');
	$winsTitle.innerText = player.name + ' wins';
	$randomButton.disabled = true;

	return $winsTitle;
};

function bothLost() {
	const $bothLostTitle = createElement('div', 'bothLostTitle');
	/* 
		Удаляю дом ноду "winsTitle", потому что не смог решить проблему с добавлением winsTitle 
		когда у одного из игроков hp == 0 а второму еще не проверил уровень его hp;
	*/
	if ($winsTitle !== null) {
		$arenas.removeChild($winsTitle);
	};
	$bothLostTitle.innerText = 'Both Lost';
	$randomButton.disabled = true;

	return $bothLostTitle;
};

function generateRandomNum(min, max) {
	const number = Math.ceil(Math.random() * (max - min + 1)) + min;

	return number;
};

$randomButton.addEventListener('click', function() {
	changeHP(player1, generateRandomNum(1, 20), player2.hp);
	changeHP(player2, generateRandomNum(1, 20), player1.hp);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
