const HttpService = {
	tourSelect(data) {
		fetch('/api/tour-select', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data),
		}).
			then(res => res.json()).
			then(json => json);
	},

	getPosition() {
		console.log('Get Position');
	},
};

module.exports = HttpService;
