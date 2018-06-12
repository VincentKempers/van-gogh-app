import Vue from 'vue';
import App from './App.vue';
import { sync } from 'vuex-router-sync';

import { createRouter } from './router';
import { createStore } from './store';

function createApp() {
	// create router and store instances
	const router = createRouter();
	const store = createStore();

	// sync so that route state is available as part of the store
	sync(store, router);

	const app = new Vue({
		el: '#app',
		router,
		store,
		render: h => h(App),
	});

	return { app, router };
}

export { createApp };
