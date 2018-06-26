import * as types from './mutationTypes';

const mutations = {
	[types.ADD_TOUR](state, tour_payload) {
		state.tour = tour_payload;
	},
	[types.CONNECT_SOCKET](state, socketIo) {
		state.socketConnected = true;
		state.socket = socketIo;
	},
	[types.DISCONNECT_SOCKET](state) {
		state.socketConnected = false;
	},
	[types.ADD_THEME_SELECTION](state, themes_payload) {
		state.selectedThemes = themes_payload;
	},
};

export { mutations };
