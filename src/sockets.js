const Tour = require('./models/Tour');

const { getCurrentDate } = require('../services/helpers');

function sockets(io) {
	// Data counter for the prototype. Will watch the counter ect for the dashboard
	const tourCounter = {
		activeTour: 1,
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
			incrementTourCount();
			io.to('Dashboard').emit('startTour', tourData, tourCounter);
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
						'tour.$visited': true,
					},
				}
			).then(tour => {
				io.to('Dashboard').emit('sendPosition', tour, tourCounter);
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
				io.to('Dashboard').emit('exitAudio', tour, tourCounter);
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
				decrementTourCount();
				io.to('Dashboard').emit('cancelTour', tour, tourCounter);
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
				decrementTourCount();
				io.to('Dashboard').emit('completeTour', tour, tourCounter);
			});
		}

		// ==========================
		// === Helper functions
		// ===========================

		function incrementTourCount() {
			tourCounter.activeTour += 1;
			return tourCounter.activeTour;
		}

		function decrementTourCount() {
			if (tourCounter.activeTour === 0) {
				return tourCounter.activeTour;
			}
			tourCounter.activeTour -= 1;
			return tourCounter.activeTour;
		}
	});
}

module.exports = sockets;
