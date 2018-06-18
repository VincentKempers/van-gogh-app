const Tour = require('./models/Tour');

const { getCurrentDate } = require('../services/helpers');

function sockets(io) {
	// Sockets start
	io.on('connection', socket => {
		console.log('CONNECTED SOCK');

		socket.on('sendPosition', sendPosition);
		socket.on('cancelTour', cancelTour);
		socket.on('exitAudio', exitAudio);

		// ==========================
		// === Socket (helper)function
		// ===========================

		function sendPosition(tourId, paintingId) {
			Tour.findOneAndUpdate(
				{
					_id: tourId,
					'tour.painting_no': paintingId,
				},
				{
					current_way_point: paintingId,
					$set: {
						'tour.$.start_time': getCurrentDate(),
						'tour.$visited': true,
					},
				}
			).then(tour => {
				socket.emit('sendPosition', tour);
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
	});
}

module.exports = sockets;
