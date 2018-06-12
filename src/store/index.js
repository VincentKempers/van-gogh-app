import Vue from 'vue';
import Vuex from 'vuex';

import { mutations } from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const state = {
	tour: {},
};

function createStore() {
	return new Vuex.Store({
		state,
		actions,
		mutations,
	});
}

export { createStore };
