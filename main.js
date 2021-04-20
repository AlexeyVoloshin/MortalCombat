import { player1, player2 } from './player.js';
import { playerAttack, enemyAttack} from './attack.js';

import {checkPowerAttack} from './utils.js';
import {showResult} from './show.js';
import createElement from './createElem.js';
import generateLogs from './genLogs.js';

import { GlobalVar } from './globalStor.js';

const {$arenas, $formFight} = GlobalVar;

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

$arenas.appendChild(createPlayer.call(player1));
$arenas.appendChild(createPlayer.call(player2));

function startGame() {
	generateLogs('start', player1, player2);
};

$formFight.addEventListener('submit', (event) => {
	event.preventDefault();
	const player = playerAttack();
	const enemy = enemyAttack();

	const powerEnemy = checkPowerAttack(enemy, player);
	const powerPlayer = checkPowerAttack(player, enemy);

	player1.changeHP(powerEnemy);
	player1.renderHP();
	player2.changeHP(powerPlayer);
	player2.renderHP();

	if (player.defence !== enemy.hit) {
		generateLogs('hit', player2, player1, powerEnemy);
	} else {
		generateLogs('defence', player2, player1, powerEnemy);
	};

	if (enemy.defence !== player.hit) {
		generateLogs('hit', player1, player2, powerPlayer);
	} else {
		generateLogs('defence', player1, player2, powerPlayer);
	};

	showResult();
});

startGame();