import createElement from './createElem.js';
import generateLogs from "./genLogs.js";
import { player1, player2 } from "./players.js";
import { calcPercent, getRandom } from './utils.js';
import { showResult } from './show.js';
import { GlobalVar } from './services/globalStor.js';


const {$arenas, ATTACK, HIT, $formFight} = GlobalVar;

export default class Game {
	constructor(){};

	enemyAttack() {
		const hit = ATTACK[getRandom(ATTACK.length) -1];
		const defence = ATTACK[getRandom(ATTACK.length) -1];
	
		return {
			value: getRandom(HIT[hit]),
			hit,
			defence,
		};
	};
	playerAttack() {
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
	checkPowerAttack(hit, value, defence) {
		if(hit !== defence) {
			return value;
		} else {
			const penalty = calcPercent(value);
			return value - penalty;
		};
	};
	createPlayer({player, name, hp, img}) {
		const $player = createElement('div', `player${player}`);
		const $progressbar = createElement('div', 'progressbar');
		const $character = createElement('div', 'character');
		const $life = createElement('div', 'life');
		const $name = createElement('div', 'name');
		const $img = createElement('img');
	
		$life.style.width = hp + '%';
		$name.innerText = name;
		$img.src = img;
	
		$progressbar.appendChild($name);
		$progressbar.appendChild($life);
		$character.appendChild($img);
	
		$player.appendChild($progressbar);
		$player.appendChild($character);
	
		return $player;
	};
	showPlayers = () => {
		$arenas.appendChild(this.createPlayer(player1));
		$arenas.appendChild(this.createPlayer(player2));
	};
	start = () => {
		generateLogs('start', player1, player2);
		this.showPlayers();
		
		$formFight.addEventListener('submit', (event) => {
			event.preventDefault();
			const { 
				hit, 
				defence, 
				value
			} = this.playerAttack();
			const {	
				hit: hitEnemy, 
				defence: defenceEnemy, 
				value: valueEnemy
			} = this.enemyAttack();
		
			const powerEnemy = this.checkPowerAttack(
				hitEnemy, 
				valueEnemy, 
				defence
			);
			const powerPlayer = this.checkPowerAttack(
				hit, 
				value, 
				defenceEnemy
			);
		
			player1.changeHP(powerEnemy);
			player1.renderHP();
			player2.changeHP(powerPlayer);
			player2.renderHP();
		
			if (defence !== hitEnemy) {
				generateLogs('hit', player2, player1, powerEnemy);
			} else {
				generateLogs('defence', player2, player1, powerEnemy);
			};
		
			if (defenceEnemy !== hit) {
				generateLogs('hit', player1, player2, powerPlayer);
			} else {
				generateLogs('defence', player1, player2, powerPlayer);
			};
		
			showResult();
		});
	};
};