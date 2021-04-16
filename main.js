const $arenas = document.querySelector('.root .arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
};

const PENALTY = 50;
const ATTACK = ['head', 'body', 'foot'];
const logs = {
	start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
	end: [
		 'Результат удара [playerWins]: [playerLose] - труп',
		 '[playerLose] погиб от удара бойца [playerWins]',
		 'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
	],
	hit: [
		 '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
		 '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
		 '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
		 '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
		 '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
		 '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
		 '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
		 '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
		 '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
		 '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
		 '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
		 '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
		 '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
		 '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
		 '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
		 '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
		 '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
		 '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
	],
	defence: [
		 '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
		 '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
		 '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
		 '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
		 '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
		 '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
		 '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
		 '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
	],
	draw: 'Ничья - это тоже победа!'
};

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

function playerAttack() {
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

function showResult() {
	if (player1.hp === 0 || player2.hp === 0) {
		$fightButton.disabled = true;
		createReloadButton();
	};
	
	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(showResultText(player2.name));
		generateLogs('end', player2, player1)
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(showResultText(player1.name));
		generateLogs('end', player1, player2)
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(showResultText());
		generateLogs('draw');
	};
};

function getCurrentTime() {
	const date = new Date();
	const minutes = date.getMinutes();
	return `${date.getHours()}:${minutes > 9 ? minutes : '0' + minutes}`;
};

function generateLogs(type, player1, player2, powerAttack) {
	let text = '';
	let el = '';
	switch (type) {
		case 'start':
			text = logs[type].replace('[time]', getCurrentTime())
				.replace('[player1]', player1.name)
				.replace('[player2]', player2.name);
				el = `<p>${text}</p>`;
			break;
		case 'hit':
			text = logs[type][getRandom(logs[type].length -1)]
				.replace('[playerKick]', player1.name)
				.replace('[playerDefence]', player2.name);
			el = `<p>${getCurrentTime()} - ${text} -${powerAttack} [${player2.hp}/100]</p>`;
			break; 
		case 'defence':
			text = logs[type][getRandom(logs[type].length -1)]
				.replace('[playerKick]', player1.name)
				.replace('[playerDefence]', player2.name);
			el = `<p>${getCurrentTime()} - ${text} -${powerAttack} [${player2.hp}/100]</p>`;
			break; 
		case 'draw':
			text = logs[type];
			el = `<p>${text}</p>`;
			break; 
		case 'end':
			text = logs[type][getRandom(logs[type].length -1)]
				.replace('[playerWins]', player1.name)
				.replace('[playerLose]', player2.name);
			el = `<p>${getCurrentTime()} - ${text}</p>`;
			break; 
		default:
			break;
	};
	
	$chat.insertAdjacentHTML('afterbegin', el);
};

function startGame() {
	generateLogs('start', player1, player2);
};

function checkPowerAttack(attack, enemy) {
	if(attack.hit !== enemy.defence) {
		return attack.value;
	} else {
		const penalty = calcPercent(attack.value);
		return attack.value - penalty;
	};
};

$formFight.addEventListener('submit', function(event) {
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