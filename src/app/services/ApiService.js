export default class ApiService {
	get(_url) {
		return fetch(_url);
	};
	post(_url, {hit, defence}) {
		return fetch(_url, {
			method: 'POST',
			body: JSON.stringify({
				hit,
				defence
			})
		});
	}
}

