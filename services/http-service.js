const HttpService = {
	tourSelect(data) {
		return fetch('/api/tour-select', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data),
		}).
			then(res => res.json()).
			then(json => json);
	},

	sendPosition(tourId, paintingId) {
		const data = `tourId=${tourId}&paintingId=${paintingId}`;

		return fetch('/api/get-position', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data,
		}).then(res => {
			console.log('Succesful register position');
		});
	},
	// then(json => json);
};

module.exports = HttpService;
