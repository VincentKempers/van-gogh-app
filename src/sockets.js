const Tour = require('./models/Tour');

const { getCurrentDate } = require('../services/helpers');

function sockets(io) {
	// Sockets start
	io.on('connection', socket => {
		console.log('CONNECTED SOCK');

		socket.on('sendPosition', sendPosition);

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
	});
}

module.exports = sockets;
