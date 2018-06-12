import * as types from './mutationTypes';

export function addTour({ commit }, tour_payload) {
	commit(types.ADD_TOUR, tour_payload);
}
