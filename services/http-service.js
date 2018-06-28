const HttpService = {
	tourSelect(data) {
		return fetch('/api/tour-select', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data),
		})
			.then(res => res.json())
			.then(json => json);
	},

	// Handles the position on audio playing
	sendPosition(tourId, paintingId) {
		const data = `tourId=${tourId}&paintingId=${paintingId}`;

		return fetch('/api/get-position', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data,
		});
	},

	// On exiting the audio screen
	exitAudio(tourId, paintingId) {
		const data = `tourId=${tourId}&paintingId=${paintingId}`;

		return fetch('/api/exit-audio', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data,
		});
	},

	cancelTour(tourId) {
		const data = `tourId=${tourId}`;

		return fetch('/api/stop-tour', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data,
		});
	},

	completeTour(tourId) {
		const data = `tourId=${tourId}`;

		return fetch('/api/complete-tour', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data,
		});
	},

	getUserTour(deviceId) {
		return fetch(`/api/device-detail/${deviceId}`);
	},

	getAllDevicesAt(paintingId) {
		return fetch(`/api/painting-devices/${paintingId}`);
	},
	getDevices() {
		return fetch('/api/devices/');
	},
};

module.exports = HttpService;
