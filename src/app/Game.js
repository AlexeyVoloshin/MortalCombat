import createElement from './createElem.js';
import generateLogs from './genLogs.js';
import { calcPercent } from './utils/utils.js';
import { showResult } from './show.js';
import { GlobalVar } from '../app/services/globalStor.js';
import PlayerService from './services/PlayerService.js';
import Player from './player.js';


const {$arenas, $formFight} = GlobalVar;

export default class Game {
	players = [];
	player1;
	player2;
	constructor(){
		this._playerService = new PlayerService();
	};

	playerAttack() {
		const attack = {};
		for(let item of $formFight) {
			if (item.checked && item.name === 'hit') {
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

	start = async () => {
		const p1 = JSON.parse(localStorage.getItem('player1'));
		const p2 = JSON.parse(localStorage.getItem('player2'));

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
			
			const dataAttack = await this._playerService
				.postAttack(this.playerAttack());
			
			const { defence, hit, value } = dataAttack.player1;
			const { 
				defence: defenceEnemy,
				hit: hitEnemy,
				value: valueEnemy } = dataAttack.player2;
		
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