import createElement from './createElem.js';
import generateLogs from "./genLogs.js";
import { calcPercent, getRandom } from './utils.js';
import { showResult } from './show.js';
import { GlobalVar } from './services/globalStor.js';
import PlayerService from './services/PlayerService.js';
import Player from './Player.js';


const {$arenas, ATTACK, HIT, $formFight} = GlobalVar;

export default class Game {
	players = [];
	player1;
	player2;
	constructor(){
		this._playerService = new PlayerService();
	};

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
		$arenas.appendChild(this.createPlayer(this.player1));
		$arenas.appendChild(this.createPlayer(this.player2));
	};
	checkUniqueHero = async (player1) => {
		const player2 = await this._playerService.getRandomEnemy();
		
		if (player2.id === player1.id) {
			this.checkUniqueHero();
		}
		return player2;
	}
	start = async () => {
		this.players = await this._playerService.getAllPlayers();

		const p1 = this.players[getRandom(this.players.length) -1];
		const p2 = await this.checkUniqueHero(p1);

		this.player1 = new Player({
			...p1,
			player: 1,
			rootSelector: 'arenas',
		});
		this.player2 = new Player({
			...p2,
			player: 2,
			rootSelector: 'arenas',
		});

		generateLogs('start', this.player1, this.player2);
		this.showPlayers();

		$formFight.addEventListener('submit', async (event) => {
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
		
			this.player1.changeHP(powerEnemy);
			this.player1.renderHP();
			this.player2.changeHP(powerPlayer);
			this.player2.renderHP();
		
			if (defence !== hitEnemy) {
				generateLogs('hit', this.player2, this.player1, powerEnemy);
			} else {
				generateLogs('defence', this.player2, this.player1, powerEnemy);
			};
		
			if (defenceEnemy !== hit) {
				generateLogs('hit', this.player1, this.player2, powerPlayer);
			} else {
				generateLogs('defence', this.player1, this.player2, powerPlayer);
			};
		
			showResult(this.player1, this.player2);
		});
	};
};