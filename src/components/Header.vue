<template>
	<header>
		<router-link
			:to="returnPath"
			v-if="returnPath"
		>
			<icon-back></icon-back>
		</router-link>
		<h1>{{ this.$route.meta.title }}</h1>
	</header>
</template>

<script>
	import IconBack from './icons/IconBack.vue';

	import { cancelTour } from '../../services/http-service.js';

	export default {
		props: [],
		components: {
			IconBack
		},
		data() {
			return {
				returnPath: this.$route.meta.returnPath
			};
		},
		methods: {},
		watch: {
			$route (to, from) {
				this.returnPath = this.$route.meta.returnPath;
				const isCompleted = this.$store.state.tour.completed;

				if (from.path === '/tourmap' && to.path === '/' && isCompleted === false) {
					cancelTour(this.$store.state.tour._id);
				}
				
			}
		},
	};
</script>

<style lang="scss" scoped>
	header {
		padding: .4rem .8rem;
		color: #f3f3f3;
	}
</style>
