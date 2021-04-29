import Router from './Router.js';

const routers = new Router({
	mode: 'hash',
	root: '/'
});

routers.add(/arenas/, () => {
	console.log('welcome arena');
	// window.location.pathname = './src/app/arenas/index.html';
})
routers.add(/select/, () => {
	console.log('welome in select');
	
	// routers.navigation('../../../src/app/selectPlayer');
	// window.location.pathname = './src/app/selectPlayer/index.html';
})
routers.add('', () => {
	console.log('welome in catch all');
	// window.location.pathname = './src/app/selectPlayer/index.html';
	
})

export default routers;