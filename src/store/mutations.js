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
};

export { mutations };
