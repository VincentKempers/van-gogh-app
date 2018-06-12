import Vue from 'vue';
import Vuex from 'vuex';

import { mutations } from './mutations';
import * as actions from './actions';

const state = {
	tour: {},
};

Vue.use(Vuex);

function createStore() {
	return new Vuex.Store({
		state,
		actions,
		mutations,
	});
}

export { createStore };
