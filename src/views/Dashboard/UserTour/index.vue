<template>
	<div>
		<nav-dash></nav-dash>
		<main>
			<header>
				<p>Device-ID: {{ userTour.device_id }}</p>
				<p>Date: {{ getDate(userTour.start_tour_time) }}</p>
			</header>
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
	import { getTime, getTimeDiff, formatDate } from '../../../../services/helpers.js';
	import NavDash from '../../../components/Navdash.vue';
	import LazyImage from '../../../components/LazyImage.vue';

	export default {
		components: {
			LazyImage, NavDash
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
					json.tour = this.sortTime(json);

					this.userTour = json;
				});
		},
		methods: {
			normalizeTime(date) {
				return getTime(date);
			},
			diffTime(dateOne, dateTwo) {
				return getTimeDiff(dateOne, dateTwo);
			},
			getDate(date) {
				return formatDate(date);
			},
			sortTime(data) {
				// get nan https://stackoverflow.com/questions/17557807/javascript-how-do-you-sort-an-array-that-includes-nans
				const sorted = data.tour.sort(function (a, b) {
					  const diff = new Date(a.start_time) - new Date(b.start_time);
					  if(!isFinite(diff)) {
						  return !isFinite(a.start_time) ? 1 : -1;
					  } else {
						  return diff;
					  }
				});

				return sorted;
			},
		}
	}
</script>

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
		flex-direction: column;
		max-width: 80vw;
		margin: auto;
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