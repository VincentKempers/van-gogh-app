import * as types from './mutationTypes';

const mutations = {
	[types.ADD_TOUR](state, tour_payload) {
		state.tour = tour_payload;
	},
};

export { mutations };
