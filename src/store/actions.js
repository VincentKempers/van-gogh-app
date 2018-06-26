import * as types from './mutationTypes';

export function addTour({ commit }, tour_payload) {
	commit(types.ADD_TOUR, tour_payload);
}

export function connectSocket({ commit }, socketIo) {
	commit(types.CONNECT_SOCKET, socketIo);
}

export function disconnectSocket({ commit }) {
	commit(types.DISCONNECT_SOCKET);
}

export function selectThemes({ commit }, themes_payload) {
	commit(types.ADD_THEME_SELECTION, themes_payload);
}
