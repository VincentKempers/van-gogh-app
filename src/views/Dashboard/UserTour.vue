<template>
	<div>
		<nav>
			<h1>MMT Dashboard</h1>
		</nav>
		<main>
			<ul>
				<li
					v-for="(tour, index) in userTour.tour"
					:key="index"
				>
					{{ tour.painting }}
					<LazyImage
						:src="tour.imageUrl"
						:alt="tour.description"
					/>
				</li>
			</ul>
			
			<ul>
				<li
					v-for="(tour, index) in userTour.tour"
					v-if="tour.visited"
					:key="index"
				>
					{{ tour.painting }}
					<LazyImage
						:src="tour.imageUrl"
						:alt="tour.description"
					/>
				</li>
			</ul>
		</main>
	</div>
</template>

<script>
	import { getUserTour } from '../../../services/http-service.js';
	import LazyImage from '../../components/LazyImage.vue';

	export default {
		components: {
			LazyImage
		},
		data() {
			return {
				userTour: {}
			};
		},
		beforeCreate() {
			console.log('b create');
		},
		beforeMount() {

			getUserTour('eac122d7-f5ef-46fe-bc90-ff3c0163b16d')
				.then(res => res.json())
				.then(json => {
					console.log(json);
					
					this.userTour = json;
				});

		}
	}
</script>

<style lang="scss">
	body::before {
		background: none !important;
	}
	header {
		display: none !important;
	}
</style>

<style lang="scss" scoped>
	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		background-color: rgba(0, 0, 0, 1);
		h1 {
			color: white;
		}
	}
</style>