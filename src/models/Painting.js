const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Painting = new Schema({
	name: {
		type: String,
		isRequired: 'The name of the painting needs to be assinged',
	},
	location: {
		type: Number,
		isRequired: 'The floor/location of the painting needs to be defined',
	},
	painting_no: String,
	origins: String,
	description: String,
});

module.exports = mongoose.model('Painting', Painting);
