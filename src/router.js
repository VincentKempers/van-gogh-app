import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Selection from './views/Selection/index.vue';

Vue.use(Router);

// Return factory function:
// Returns a function which creates Router instance
function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			{
				path: '/',
				name: 'home',
				component: Home,
			},
			{
				path: '/about',
				name: 'about',
				component: About,
			},
			{
				path: '/selection',
				name: 'selection',
				component: Selection,
			},
		],
	});
}

export { createRouter };
