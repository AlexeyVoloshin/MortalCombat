import createElement from './createElem.js';
import generateLogs from './genLogs.js';
import { GlobalVar } from './services/globalStor.js';
import routers from './routing/routes.js';


const {$arenas, $fightButton} = GlobalVar;

export  function showResult(player1, player2) {
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

function showResultText(name) {
	const $showTitle = createElement('div', 'showTitle');
	if (name) {
		$showTitle.innerText = name + ' wins';
	} else {
		$showTitle.innerText = 'draw';
	};

	return $showTitle;
};

function createReloadButton() {
	const $reloadWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';
	$button.addEventListener('click', () => {
		// window.location.reload();
		// routers.navigation('');
		window.location.pathname = './src/app/selectPlayer/index.html';
	});
	$reloadWrap.appendChild($button);
	$arenas.appendChild($reloadWrap);
};