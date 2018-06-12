const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const helpers = require('../../services/helpers');

const Tour = new Schema({
	device_id: {
		type: String,
		isRequired: 'device needs an id',
	},
	current_way_point: Number,
	start_tour_time: Date,
	end_tour_time: Date,
	date: {
		type: Date,
		default: helpers.getCurrentDate(),
	},
	cancelled: {
		type: Boolean,
		default: false,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	tour: [
		{
			id: {
				type: Number,
				isRequired: 'device needs an id',
			},
			start_time: Date,
			end_time: Date,
			type_tour: String,
			painting: String,
			painting_no: String,
			floor: Number,
			origins: String,
			description: String,
			visited: {
				type: Boolean,
				default: false,
			},
			theme: String,
		},
	],
});

module.exports = mongoose.model('Tour', Tour);
