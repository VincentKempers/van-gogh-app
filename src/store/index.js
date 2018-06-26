import Vue from 'vue';
import Vuex from 'vuex';

import { mutations } from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const state = {
	tour: {},
	socketConnected: false,
	socket: false,
	selectedThemes: [],
	themes: [
		{
			title: 'Painter friends',
			description:
				'The theme. An image of the chair of Gauguin to depict the theme Painters friends',
			imageUrl: 'stoelVGauguin-min.jpg',
		},
		{
			title: 'Japanese influences',
			description:
				'The theme. An image of a Japanese style Courtisan to depict the theme Japanese influences',
			imageUrl: 'courtisane-min.jpg',
		},
		{
			title: 'Legacy of Van Gogh',
			description:
				'The theme. An image of a woman in a blue dress to depict the theme Legacy of Van Gogh',
			imageUrl: 'deBlauweJapon-min.png',
		},
		{
			title: 'Family Van Gogh',
			description:
				'The theme. An image of a portrait of Vincent\'s brother Theo to depict the theme Family Van Gogh',
			imageUrl: 'portretTheo-min.jpg',
		},
		{
			title: 'Learning by doing',
			description:
				'The theme. An image of red cabbages and onions to depict the theme Learning by doing',
			imageUrl: 'rodeKolenUi-min.jpg',
		},
		{
			title: 'The modern portret',
			description:
				'The theme. An image of a self portrait of Vincent with a grey felt hat to depict the theme The modern portrait',
			imageUrl: 'grijzeVilthoed-min.jpg',
		},
		{
			title: 'Changing techniques',
			description:
				'The theme. An image of people eating potatoes to depict the theme Changing techniques',
			imageUrl: 'aardappeleters-min.jpg',
		},
		{
			title: 'Simplicity',
			description: 'The theme. An image of Sunflowers to depict the theme Simplicity',
			imageUrl: 'zonnebloemen-min.jpg',
		},
		{
			title: 'The wealth of nature',
			description: 'The theme. An image of a wheatfield to depict the theme The wealth of nature',
			imageUrl: 'korenveld-min.jpg',
		},
		{
			title: 'Driven and goal oriented',
			description:
				'The theme. An image of self portrait as painter to depict the theme Driven and goal oriented',
			imageUrl: 'portretAlsSchilder-min.jpg',
		},
		{
			title: 'Color effects',
			description:
				'The theme. An image of the seascape new les saintes-maties-de-la-mer to depict the theme Color effects',
			imageUrl: 'zeegezichtSaintLeMer-min.jpg',
		},
		{
			title: 'Work as a medicine',
			description:
				'The theme. An image of the hospital garden to depict the theme Work as a medicine',
			imageUrl: 'tuinVanZiekenhuis-min.jpg',
		},
		{
			title: 'In search of perfect light',
			description:
				'The theme. An image of almond blossoms to depict the theme In search of perfect light',
			imageUrl: 'amandelbloesem-min.jpg',
		},
		{
			title: 'Conserving Van Gogh',
			description: 'The theme. An image of a sower to depict the theme Conserving Van Gogh',
			imageUrl: 'zaaier-min.jpg',
		},
		{
			title: 'A different Mind',
			description:
				'The theme. An image of a skeleton who is smoking to depict the theme A different mind',
			imageUrl: 'skeletSigaret-min.jpg',
		},
	],
};

function createStore() {
	return new Vuex.Store({
		state,
		actions,
		mutations,
	});
}

export { createStore };
