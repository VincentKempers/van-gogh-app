const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Tour = new Schema({
	deviceId: {
		type: String,
		isRequired: 'device needs an id',
	},
	startTime: String,
	endTime: String,
	date: {
		type: Date,
		default: Date.now(),
	},
	tour: [
		{
			id: {
				type: Number,
				isRequired: 'device needs an id',
			},
			startTime: String,
			endTime: String,
			kind: String,
			painting: String,
			painting_no: String,
			location: Number,
			origins: String,
			description: String,
			visited: Boolean,
		},
	],
	went: [],
	buffer: [],
});

module.exports = mongoose.model('Tour', Tour);
