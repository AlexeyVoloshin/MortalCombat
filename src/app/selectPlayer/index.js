import PlayerService from '../services/PlayerService.js';
const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $enemy = document.querySelector('.enemy');
const _playerService = new PlayerService();


const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function createEnemy() {
	 const enemy = await _playerService.getRandomEnemy();
	 saveLocalStore('player2', enemy);
	 const $img = createElement('img');
	 $img.src = enemy.img;
	 $enemy.appendChild($img);
};

function saveLocalStore(player ,item) {
	localStorage.setItem(player, JSON.stringify(item));
};

async function init() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');
	 createEnemy();
	 const players = await _playerService.getAllPlayers();

    let imgSrc = null;
    createEmptyPlayerBlock();

    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
            // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
            // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
            // но это уже будет в нашем классе Game когда мы инициализируем игроков.
				saveLocalStore('player1', item);
            el.classList.add('active');

            setTimeout(() => {
                // TODO: Здесь должен быть код который перенаправит вас на ваше игровое поле...
                //  Пример использования: window.location.pathname = 'arenas.html';
					window.location.pathname = './src/app/arenas/index.html';
            }, 3000);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
