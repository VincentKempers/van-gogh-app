const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'vars.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
	console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

// Importing all our models

require('./models/Tour');
require('./models/Painting');
// Start our app!
const port = process.env.PORT;
const server = require('./server');
server.listen(port, () => {
	console.log(`Express running → PORT ${port}`);
});
