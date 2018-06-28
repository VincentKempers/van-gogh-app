import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Apptour/Home.vue';
import Tourmap from './views/Apptour/Tourmap.vue';
import Selection from './views/Apptour/Selection/index.vue';
import SelectionOverview from './views/Apptour/SelectionOverview/index.vue';
import AudioScreen from './views/Apptour/AudioScreen/index.vue';

import Dashboard from './views/Dashboard/Dashboard.vue';
import Floor1 from './views/Dashboard/Floor1.vue';
import Floor0 from './views/Dashboard/Floor0.vue';
import UserTour from './views/Dashboard/UserTour/index.vue';
import PaintingDetails from './views/Dashboard/PaintingDetails.vue';
import Paintinglist from './views/Dashboard/Paintinglist.vue';
import Devicelist from './views/Dashboard/Devicelist.vue';

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
				path: '/tour-map',
				name: 'Tourmap',
				component: Tourmap,
				meta: {
					title: 'My Tour',
					returnPath: '/',
					returnLabel: 'Cancel',
				},
			},
			{
				path: '/tour-select',
				name: 'Tour select',
				component: Selection,
				meta: {
					title: 'Choose your themes',
					returnPath: '/',
					returnLabel: 'Overview',
				},
			},
			{
				path: '/tour-overview',
				name: 'Tour overview',
				component: SelectionOverview,
				meta: {
					title: 'Your Themes',
					returnPath: '/tour-select',
					returnLabel: 'Select',
				},
			},
			{
				path: '/audio-screen/:id',
				name: 'audio screen',
				component: AudioScreen,
				meta: {
					title: 'More about the painting',
					returnPath: '/tour-map',
					returnLabel: 'Map',
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
					dashboard: true,
				},
			},
			{
				path: '/dashboard/floor-0',
				name: 'floor-0',
				component: Floor0,
				meta: {
					title: 'MMT Dashboard',
					returnPath: '',
					returnLabel: '',
					dashboard: true,
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
					dashboard: true,
				},
			},
			{
				path: '/dashboard/floor-1/:id',
				name: 'floor-1 detail',
				component: PaintingDetails,
				meta: {
					title: 'MMT Dashboard',
					returnPath: '',
					returnLabel: '',
					dashboard: true,
				},
			},
			{
				path: '/dashboard/user/:id',
				name: 'User tour detail',
				component: UserTour,
				meta: {
					title: 'MMT Dashboard',
					returnPath: '',
					returnLabel: '',
					dashboard: true,
				},
			},
			{
				path: '/dashboard/paintinglist',
				name: 'Paintinglist',
				component: Paintinglist,
				meta: {
					title: 'MMT Dashboard',
					returnPath: '',
					returnLabel: '',
					dashboard: true,
				},
			},
			{
				path: '/dashboard/devicelist',
				name: 'Devicelist',
				component: Devicelist,
				meta: {
					title: 'MMT Dashboard',
					returnPath: '',
					returnLabel: '',
					dashboard: true,
				},
			},
		],
	});
}

export { createRouter };
