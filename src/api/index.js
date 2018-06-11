const express = require('express');
const router = express.Router();

const Tour = require('../models/Tour');

router.get('/', (req, res) => {
	res.send('This is the api');
});

router.post('/tour-select', (req, res) => {
	console.log('tour select', JSON.parse(req.body));

	const tour = {
		startTime: new Date.now(),
		tour: [],
	};

	Tour.save(tour).then(stuff => {
		console.log(stuff);
	});

	res.json(req.body);
});

router.post('/get-position/:painting-id', (req, res) => {
	console.log('position');
	res.json({ path: 'position' });
});

module.exports = router;
