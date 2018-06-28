<template>
	<div class="dashboard--content">
		<nav-dash></nav-dash>
		<main>
			<div class="navigation">
				<ul>
					<li class="floor0">
						<a  href="/dashboard/floor-0">
							<div>
								<h3>Floor 0</h3>
								<line-chart :chartData="floorZeroChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="floor1">
						<a  href="/dashboard/floor-1">
							<div>
								<h3>Floor 1</h3>
								<line-chart :chartData="floorOneChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="floor2">
						<a href="/dashboard/floor-2">
							<div>
								<h3>Floor 2</h3>
								<line-chart :chartData="floorTwoChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="floor3">
						<a  href="/dashboard/floor-3">
							<div>
								<h3>Floor 3</h3>
								<line-chart :chartData="floorThreeChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
				</ul>
			</div>
		</main>
	</div>
</template>

<script>
import LineChart from '../../components/Charts/LineChart.vue';
import NavDash from '../../components/Navdash.vue';

import { generateFakeTime, createInterval, generateNumber } from '../../../services/helpers.js';

export default {
	name: 'Dashboard',
	components: { LineChart, NavDash },
	data() {
		return {
			labels: ['09:00', '09:15'],
			floorZeroData: [2, 4],
			floorOneData: [1, 12],
			floorTwoData: [9, 5],
			floorThreeData: [2, 7],
			floorZeroChart: null,
			floorOneChart: null,
			floorTwoChart: null,
			floorThreeChart: null,
			gradient: null,
			gradient2: null,
			gradient3: null,
			gradient4: null,
			socket: null,
		};
	},
	created() {
		this.fillData();
	},
	mounted() {
		// Create an socket instance for dashboard
		this.socket = io();
		this.socket.emit('Dashboard');

		this.socket.on('startTour', this.startTour);
		this.socket.on('cancelTour', this.cancelTour);
		this.socket.on('completeTour', this.completeTour);
		this.socket.on('sendPosition', this.sendPosition);
		this.socket.on('exitAudio', this.exitAudio);

		// Create a set interval
		this.dataInterval = createInterval(3000, this.tourInterval);

		// gradient color 1
		this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

		this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
		this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
		this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

		// gradient color 2
		this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

		this.gradient2.addColorStop(0, 'rgb(65, 184, 131, 0.1)');
		this.gradient2.addColorStop(0.5, 'rgb(65, 184, 131, 0.5)');
		this.gradient2.addColorStop(1, 'rgb(65, 184, 131, 0.25)');
	},
	methods: {
		fillData() {
			(this.floorZeroChart = {
				labels: this.labels,
				datasets: [
					{
						label: 'people',
						pointBorderColor: 'white',
						borderColor: '#f89842',
						backgroundColor: this.gradient,
						data: this.floorZeroData,
					},
				],
			}),
				(this.floorOneChart = {
					labels: this.labels,
					datasets: [
						{
							label: 'people',
							pointBorderColor: 'white',
							borderColor: '#f87979',
							backgroundColor: this.gradient2,
							data: this.floorOneData,
						},
					],
				}),
				(this.floorTwoChart = {
					labels: this.labels,
					datasets: [
						{
							label: 'people',
							pointBorderColor: 'white',
							borderColor: '#acd696',
							backgroundColor: this.gradient3,
							data: this.floorTwoData,
						},
					],
				});
			this.floorThreeChart = {
				labels: this.labels,
				datasets: [
					{
						label: 'people',
						pointBorderColor: 'white',
						borderColor: '#00abdf',
						backgroundColor: this.gradient4,
						data: this.floorThreeData,
					},
				],
			};
		},
		fetchData() {},
		startTour(tourData, counter) {
			this.updateTourData(tourData, counter);
		},
		cancelTour(tourData, counter) {
			this.updateTourData(tourData, counter);
		},
		completeTour(tourData, counter) {
			this.updateTourData(tourData, counter);
		},
		sendPosition(tourData, counter) {},
		exitAudio(tourData, counter) {},
		updateTourData(tourData, counter) {
			this.floorOneData.push(counter);
		},
		generateVisitors() {
			const labelsLength = this.labels.length;
			const floorZeroLength = this.floorZeroData.length;

			if (labelsLength !== floorZeroLength) {
				this.floorZeroData.push(generateNumber(this.floorZeroData[this.floorZeroData.length - 1]));
				this.floorTwoData.push(generateNumber(this.floorTwoData[this.floorTwoData.length - 1]));
				this.floorThreeData.push(
					generateNumber(this.floorThreeData[this.floorThreeData.length - 1])
				);
			}

			if (labelsLength === 8) {
				this.floorZeroData.splice(0, 1);
				this.floorTwoData.splice(0, 1);
				this.floorThreeData.splice(0, 1);
			}
		},
		generateNewLabel() {
			const lastLabel = this.labels[this.labels.length - 1];
			const newLabel = generateFakeTime(lastLabel);
			this.labels.push(newLabel);
		},
		tourInterval() {
			this.generateNewLabel();
			const floorOneLength = this.floorOneData.length;
			const labelsLength = this.labels.length;

			if (labelsLength !== floorOneLength) {
				this.floorOneData.push(this.floorOneData[floorOneLength - 1]);
			}

			this.generateVisitors();

			if (labelsLength === 8) {
				this.floorOneData.splice(0, 1);
				this.labels.splice(0, 1);
			}

			this.fillData();
		}
    }
  };
  </script>

<style lang="scss" scoped>
.dashboard--content {
	background-color: black;
	overflow: scroll;
	padding: 2em;
	main {
		background-color: black;
		@media screen and (min-width: 40em) {
			height: 100vh;
			width: 100vw;
		}
		// Desktop
		@media screen and (min-width: 70em) {
			height: 100vh;
			width: 100vw;
		}
	}
	.navigation {
		ul {
			display: flex;
			flex-flow: row wrap;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			margin: 0;
			padding: 0;
			list-style: none;
			@media screen and (min-width: 70em) {
				margin: 2em;
				align-self: center;
			}
			li {
				margin: 2em 2em;
				a {
					text-decoration: none;
					padding: 1rem 0rem;
					div {
						padding: 1.5em;
						background-color: #454545;
						border-radius: 1rem;
						max-width: 86vw;
						h3 {
							color: white;
							padding-left: 0.7em;
						}
						&:hover,
						&:focus {
							background-color: #7c7c7c;
							div {
								background-color: #7c7c7c;
							}
						}
					}
					&:focus {
						background-color: #7c7c7c;
						div {
							background-color: #7c7c7c;
							div {
								background-color: #7c7c7c;
							}
						}
					}
				}
			}
			.floor0 {
				order: 1;
			}
			.floor1 {
				order: 2;
			}
			.floor2 {
				order: 3;
			}
			.floor3 {
				order: 4;
			}
		}
	}
}
</style>
