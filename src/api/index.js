const express = require('express');
const router = express.Router();

const Tour = require('../models/Tour');

const { getCurrentDate } = require('../../services/helpers');

const exampleTourComplete = [
	{
		id: 217382,
		type_tour: 'main tour',
		painting: 'The potato eaters',
		painting_no: '50',
		imageUrl: 'aardappeleters-min.jpg',
		floor: 1,
		origins: 'Vincent van Gogh (1853 - 1890), Nuenen, april-mei 1885',
		description:
			'Van Gogh zag De aardappeleters als een meesterproef. Hij koos een moeilijke compositie om te bewijzen dat hij op weg was een goede figuurschilder te worden. Het schilderij moest de realiteit van het harde boerenleven verbeelden.',
		theme: 'changing techniques',
		audio: [
			{
				title: '',
				audio_url: '50a_DUT.wav',
			},
			{
				title: '',
				audio_url: '50b_DUT.wav',
			},
		],
	},
	{
		id: 9238901,
		type_tour: 'related',
		painting: 'Head of a skeleton with a burning cigarette',
		painting_no: '41',
		imageUrl: 'skeletSigaret-min.jpg',
		floor: 1,
		origins: 'Vincent van Gogh (1853 - 1890), Antwerpen, januari-"februari" 1886',
		description:
			'Dit skelet met een brandende sigaret is een studentikoze grap. Van Gogh schilderde het in de tijd dat hij lessen volgde aan de Antwerpse kunstacademie, begin 1886. Het schilderij laat zien dat hij de anatomie goed beheerste.',
		theme: 'a different mind',
		audio: [
			{
				title: '',
				audio_url: '41a_DUT.wav',
			},
			{
				title: '',
				audio_url: '41b_0_DUT.wav',
			},
		],
	},
	{
		id: 9238901,
		type_tour: 'related',
		painting: 'Self-portrait with grey felt hat',
		painting_no: '14',
		imageUrl: 'grijzeVilthoed-min.jpg',
		floor: 1,
		origins: 'Vincent van Gogh (1853 - 1890), Parijs, september-oktober 1887',
		description:
			'Van Gogh schilderde dit zelfportret in de winter van 1887-1888, toen hij al bijna twee jaar in Parijs woonde. Het werk laat zien dat hij de stippeltechniek van de pointillisten had bestudeerd en op zijn eigen, originsele manier toepaste. De streepjes verf zijn in verschillende richtingen geplaatst. Ze volgen de omtrek van zijn hoofd en vormen zo een soort aureool.',
		theme: 'the modern portrait',
		audio: [
			{
				title: '',
				audio_url: '14a_DUT.wav',
			},
		],
	},
	{
		id: 9238901,
		type_tour: 'related',
		painting: 'Garden with courting couples: square saint-pierre',
		painting_no: '18',
		imageUrl: 'zeegezichtSaintLeMer-min.jpg',
		floor: 1,
		origins: 'Square Saint Pierre 1887',
		description: 'A painting about the square in Saint pierre',
		theme: 'color effects',
		audio: [
			{
				title: '',
				audio_url: '18a_DUT.wav',
			},
		],
	},
	{
		id: 9238901,
		type_tour: 'related',
		painting: 'The pink orchard',
		painting_no: '2',
		imageUrl: 'pinkOrchard-min.jpg',
		floor: 1,
		origins: 'De roze boomgaard 1888',
		description: 'A Painting about the tree garden',
		theme: 'the wealth of nature',
		audio: [
			{
				title: '',
				audio_url: '2a_DUT.wav',
			},
		],
	},
	{
		id: 9238901,
		type_tour: 'main tour',
		painting: 'Sunflowers',
		painting_no: '76',
		imageUrl: 'zonnebloemen-min.jpg',
		floor: 1,
		origins: 'sunflowers 1889',
		description: 'The famous sunflower painting of van Gogh ',
		theme: 'in search of perfect light',
		audio: [
			{
				title: '',
				audio_url: '76a_DUT.wav',
			},
		],
	},
	{
		id: 9238901,
		type_tour: 'main tour',
		painting: 'The yellow house',
		painting_no: '4',
		imageUrl: 'geleHuis-min.jpg',
		floor: 1,
		origins: 'The street 1888',
		description: 'The yellow house where van Gogh lived for a while',
		theme: 'color effects',
		audio: [
			{
				title: '',
				audio_url: '4a_DUT.wav',
			},
			{
				title: '',
				audio_url: '4b_1a_DUT.wav',
			},
			{
				title: '',
				audio_url: '4b_1b_DUT.wav',
			},
		],
	},
	{
		id: 9238901,
		type_tour: 'related',
		painting: 'The chair of Gaugain',
		painting_no: '53',
		imageUrl: 'stoelVGauguin-min.jpg',
		floor: 1,
		origins: '1888',
		description: 'The chair Gaugain always sat on.',
		theme: 'painter friend',
		audio: [
			{
				title: '',
				audio_url: '53a_DUT.wav',
			},
			{
				title: '',
				audio_url: '53b_0_DUT.wav',
			},
		],
	},
];

router.post('/tour-select', async (req, res) => {
	const tour = new Tour({
		device_id: 'sha12u3812',
		start_tour_time: getCurrentDate(),
		tour: exampleTourComplete,
	});

	await tour.save();

	res.json(tour);
});

router.put('/get-position', async (req, res) => {
	const { tourId, paintingId } = req.body;

	Tour.update(
		{ _id: tourId, 'tour.painting_no': paintingId },
		{
			current_way_point: paintingId,
			$set: { 'tour.$.start_time': getCurrentDate() },
		}
	).then(tour => {
		res.send(tour);
	});
});

router.put('/exit-audio', async (req, res) => {
	const { tourId, paintingId } = req.body;

	Tour.update(
		{ _id: tourId, 'tour.painting_no': paintingId },
		{
			current_way_point: 0, // 0 means walking or somewhere else
			$set: { 'tour.$.end_time': getCurrentDate() },
		}
	).then(tour => {
		res.send(tour);
	});
});

router.put('/stop-tour', async (req, res) => {
	const { tourId } = req.body;

	Tour.update(
		{ _id: tourId },
		{
			cancelled: true,
			end_tour_time: getCurrentDate(),
		}
	).then(tour => {
		res.send(tour);
	});
});

router.put('/complete-tour', async (req, res) => {
	const { tourId } = req.body;

	Tour.update(
		{ _id: tourId },
		{
			completed: true,
			end_tour_time: getCurrentDate(),
		}
	).then(tour => {
		res.send(tour);
	});
});

module.exports = router;
