import ApiService from "./ApiService.js";

export default class PlayerService {
	constructor() {
		this._apiService = new ApiService();
	}
	async getAllPlayers() {
		const query = await this._apiService
			.get('https://reactmarathon-api.herokuapp.com/api/mk/players');
		const data = await query.json();

		return data;
	}
	async getRandomEnemy() {
		const data = await this._apiService
			.get('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
				.then((data) => data.json());
		return data;
	}
	async postAttack(data) {
		const res = await this._apiService
			.post('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', 
			data).then(response => response.json());
		return res
	}
}