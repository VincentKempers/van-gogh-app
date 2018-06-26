<template>
	<div>
		<nav>
			<h1>MMT Dashboard</h1>
		</nav>
		<main>
			<table>
				<thead>
					<tr>
						<th>nr</th>
						<th>name</th>
						<th>start time</th>
						<th>end time</th>
						<th>total time</th>
						<th>visited</th>
						<th>tour</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="(tour, index) in userTour.tour"
						:key="index"
					>
						<td>{{ tour.painting_no }}</td>
						<td>{{ tour.painting }}</td>
						<td>{{ normalizeTime(tour.start_time) }}</td>
						<td>{{ (tour.end_time && tour.start_time) ? normalizeTime(tour.end_time) : '-' }}</td>
						<td>{{ diffTime(tour.start_time, tour.end_time) }}</td>
						<td>
							<LazyImage
								v-if="tour.visited"
								class="container__tour--image"
								:src="`/assets/images/${tour.imageUrl}`"
								:alt="tour.description"
							/>
						</td>
						<td>
							<LazyImage
								class="container__tour--image"
								:src="`/assets/images/${tour.imageUrl}`"
								:alt="tour.description"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</main>
	</div>
</template>

<script>
	import { getUserTour } from '../../../../services/http-service.js';
	import { getTime, getTimeDiff } from '../../../../services/helpers.js';
	import LazyImage from '../../../components/LazyImage.vue';

	export default {
		components: {
			LazyImage
		},
		data() {
			return {
				userTour: {}
			};
		},
		beforeCreate() {},
		beforeMount() {
			getUserTour(this.$route.params.id)
				.then(res => res.json())
				.then(json => {
					this.userTour = json;
				});
		},
		methods: {
			normalizeTime(date) {
				return getTime(date);
			},
			diffTime(dateOne, dateTwo) {
				return getTimeDiff(dateOne, dateTwo);
			}
		}
	}
</script>

<style lang="scss">
	body::before {
		background: none !important;
	}
	.app--header {
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

	main {
		display: flex;
	}

	ul {
		padding: 0;
	}

	td {
		max-width: 8rem;
		padding: 0 1rem;
		padding-bottom: .4rem;

		&:last-of-type {
			padding-right: 0;
		}
	}

	table {
		margin: 3rem auto;
	}

	.container__tour--image {
		max-width: 8rem;
		max-height: 6rem;
		border-radius: 1rem;
	}
</style>