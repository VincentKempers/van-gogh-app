import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Apptour/Home.vue';
import Tourmap from './views/Apptour/Tourmap.vue';
import Selection from './views/Apptour/Selection/index.vue';
import AudioScreen from './views/Apptour/AudioScreen/index.vue';
import Dashboard from './views/Dashboard/Dashboard.vue';
import Floor1 from './views/Dashboard/Floor1.vue';
// import SelectionOverview from './views/SelectionOverview/index.vue';

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
				meta: {
					title: 'Van Gogh Tour',
					returnPath: '',
					returnLabel: '',
				},
			},
			{
				path: '/tourmap',
				name: 'Tourmap',
				component: Tourmap,
				meta: {
					title: 'My Tour',
					returnPath: '/',
					returnLabel: '',
				},
			},
			{
				path: '/selection',
				name: 'selection',
				component: Selection,
				meta: {
					title: 'Create your Tour',
					returnPath: '/',
					returnLabel: '',
				},
			},
			{
				path: '/audio-screen/:id',
				name: 'audio screen',
				component: AudioScreen,
				meta: {
					title: 'More about the painting',
					returnPath: '/tourmap',
					returnLabel: '',
				},
			},
			{
				path: '/dashboard',
				name: 'dashboard',
				component: Dashboard,
				meta: {
					title: 'MMT Dashboard',
					returnPath: '',
					returnLabel: '',
				},
			},
			{
				path: '/dashboard/floor-1',
				name: 'floor-1',
				component: Floor1,
				meta: {
					title: 'MMT Dashboard',
					returnPath: '',
					returnLabel: '',
				},
			},
			// {
			// 	path: '/selection-overview',
			// 	name: 'selection overview',
			// 	component: SelectionOverview,
			// 	meta: { title: 'This is your Tour' },
			// },
		],
	});
}

export { createRouter };
