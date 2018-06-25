const Tour = require('./models/Tour');

const { getCurrentDate } = require('../services/helpers');

function sockets(io) {
	// Data counter for the prototype. Will watch the counter ect for the dashboard
	const tourCounter = {
		activeTour: 1,
		paintings: {},
	};

	// Sockets start
	io.on('connection', socket => {
		socket.on('startTour', startTour);
		socket.on('sendPosition', sendPosition);
		socket.on('exitAudio', exitAudio);
		socket.on('cancelTour', cancelTour);
		socket.on('completeTour', completeTour);

		socket.on('Dashboard', sendDashboard);

		// ==========================
		// === Socket (helper)function
		// ===========================

		// TO initialize the data to the dashboard only
		function startTour(tourData) {
			const count = incrementCount(tourCounter.activeTour);
			io.to('Dashboard').emit('startTour', tourData, count);
			socket.join('Dashboard');
		}

		function sendDashboard(newTest) {
			console.log('Join Dashboard');
			socket.join('Dashboard');
		}

		function sendPosition(tourId, paintingId, locatedFloor) {
			Tour.findOneAndUpdate(
				{
					_id: tourId,
					'tour.painting_no': paintingId,
				},
				{
					current_way_point: paintingId,
					current_floor: locatedFloor,
					$set: {
						'tour.$.start_time': getCurrentDate(),
						'tour.$.visited': true,
					},
				}
			).then(tour => {
				if (tourCounter.paintings[paintingId] === undefined) {
					tourCounter.paintings[paintingId] = 0;
				}

				const count = incrementCount(tourCounter.paintings[paintingId]);

				const piece = tour.tour.filter(painting => painting.painting_no === paintingId);

				io.to('Dashboard').emit('sendPosition', piece[0], count, paintingId);
			});
		}

		function exitAudio(tourId, paintingId) {
			Tour.findOneAndUpdate(
				{ _id: tourId, 'tour.painting_no': paintingId },
				{
					current_way_point: 0, // 0 means walking or somewhere else
					$set: { 'tour.$.end_time': getCurrentDate() },
				}
			).then(tour => {
				const count = decrementCount(tourCounter.paintings[paintingId]);
				const piece = tour.tour.filter(painting => painting.painting_no === paintingId);
				io.to('Dashboard').emit('exitAudio', piece[0], count, paintingId);
			});
		}

		function cancelTour(tourId) {
			Tour.findOneAndUpdate(
				{ _id: tourId },
				{
					cancelled: true,
					end_tour_time: getCurrentDate(),
				}
			).then(tour => {
				const count = decrementCount(tourCounter.activeTour);
				io.to('Dashboard').emit('cancelTour', tour, count);
			});
		}

		function completeTour(tourId) {
			Tour.findOneAndUpdate(
				{ _id: tourId },
				{
					completed: true,
					end_tour_time: getCurrentDate(),
				}
			).then(tour => {
				const count = decrementCount(tourCounter.activeTour);
				io.to('Dashboard').emit('completeTour', tour, count);
			});
		}

		// ==========================
		// === Helper functions
		// ===========================

		function incrementCount(item) {
			item += 1;
			return item;
		}

		function decrementCount(item) {
			if (item === 0) {
				return item;
			}
			item -= 1;
			return item;
		}
	});
}

module.exports = sockets;
