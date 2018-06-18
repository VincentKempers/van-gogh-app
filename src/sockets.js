const Tour = require('./models/Tour');

const { getCurrentDate } = require('../services/helpers');

function sockets(io) {
	// Sockets start
	io.on('connection', socket => {
		socket.on('startTour', startTour);
		socket.on('sendPosition', sendPosition);
		socket.on('exitAudio', exitAudio);
		socket.on('cancelTour', cancelTour);
		socket.on('completeTour', completeTour);

		// ==========================
		// === Socket (helper)function
		// ===========================

		// TO initialize the data to the dashboard only
		function startTour(tourData) {
			socket.emit('startTour', tourData);
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
				socket.emit('sendPosition', tour);
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
				socket.emit('exitAudio', tour);
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
				socket.emit('cancelTour', tour);
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
				socket.emit('completeTour', tour);
			});
		}
	});
}

module.exports = sockets;
