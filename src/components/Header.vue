<template>
	<header>
		<router-link
			:to="returnPath"
			v-if="returnPath"
			role="link"
			aria-label="returnPage"
		>
			<icon-back></icon-back>
		</router-link>
		<div class="spacing" v-if="!returnPath"></div>
		<h1>{{ this.$route.meta.title }}</h1>
	</header>
</template>

<script>
	import IconBack from './icons/IconBack.vue';

	export default {
		props: [],
		components: {
			IconBack
		},
		data() {
			return {
				returnPath: this.$route.meta.returnPath,
			};
		},
		methods: {},
		watch: {
			$route (to, from) {
				this.returnPath = this.$route.meta.returnPath;
				const isCompleted = this.$store.state.tour.completed;

				if (from.path === '/tour-map' && to.path === '/' && isCompleted === false) {
					this.$store.dispatch('disconnectSocket');
					this.$store.state.socket.emit('cancelTour', this.$store.state.tour._id);
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	header {
		padding: .4rem 5%;
		color: #4a4a4a;
	}

	h1 {
		position: relative;
		bottom: 1rem;
		width: 60%;
		margin-top: 0;
		margin-left: auto;
		margin-right: .5rem;
		margin-bottom: 0;
	}

	.spacing {
		height: 3rem;
	}
</style>
