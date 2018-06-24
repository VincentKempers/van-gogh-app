<template>
	<div class="dashboard--content">
		<nav>
			<h1>MMT Dashboard</h1>
		</nav>
		<main>
			<div class="navigation">
				<ul>
					<li>
						<a class="verd0" href="/dashboard/verdieping-0">
							<div>
								<h3>Floor 0</h3>
								<line-chart :chartData="floorZeroChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li>
						<a class="verd1" href="/dashboard/verdieping-1">
							<div>
								<h3>Floor 1</h3>
								<line-chart :chartData="floorOneChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li>
						<a class="verd2" href="/dashboard/verdieping-2">
							<div>
								<h3>Floor 2</h3>
								<line-chart :chartData="floorTwoChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li>
						<a class="verd3" href="/dashboard/verdieping-3">
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

import { generateFakeTime, createInterval } from '../../../services/helpers.js';

export default {
    name: 'Dashboard',
    components: { LineChart },
    data () {
      return {
		  	labels:['09:00', '09:15'],
			floorZeroData: [0, 1],
			floorOneData: [1, 12],
			floorTwoData: [2, 5],
			floorThreeData: [2, 5],
			floorZeroChart: null,
			floorOneChart: null,
			floorTwoChart: null,
			floorThreeChart: null,
			socket: null
      }
    },
    created () {
		this.fillData();
	},
    mounted () {
		 // Create an socket instance for dashboard
		this.socket = io();
		this.socket.emit('Dashboard');

		this.socket.on('startTour', this.startTour);
		this.socket.on('cancelTour', this.cancelTour);
		this.socket.on('completeTour', this.completeTour);
		this.socket.on('sendPosition', this.sendPosition);
		this.socket.on('exitAudio', this.exitAudio);

		// Create a set interval
		this.dataInterval = createInterval(1000, this.tourInterval);
    },
    methods: {
      fillData () {
		  this.floorZeroChart = {
			labels: ['10:00', '12:00'],
				datasets: [
					{
						label: 'people',
						backgroundColor: '#f87979',
						data: this.floorZeroData
					},
				]
			},
		  this.floorOneChart = {
			labels: this.labels,
				datasets: [
					{
						label: 'people',
						backgroundColor: '#f87979',
						data: this.floorOneData
					},
				]
			},
			this.floorTwoChart = {
				labels: ['10:00', '12:00'],
				datasets: [
					{
						label: 'people',
						backgroundColor: '#f87979',
						data: this.floorTwoData
					},
				]
			}
			this.floorThreeChart = {
				labels: ['10:00', '12:00'],
				datasets: [
					{
						label: 'people',
						backgroundColor: '#f87979',
						data: this.floorThreeData
					},
				]
			}
      },
      fetchData () {},
		startTour(tourData, counter) {
			this.updateTourData(tourData, counter);
		},
		cancelTour(tourData, counter) {
			this.updateTourData(tourData, counter);
		},
		completeTour(tourData, counter) {
			this.updateTourData(tourData, counter);
		},
		sendPosition(tourData, counter) {
		},
		exitAudio(tourData, counter) {
		},
		updateTourData(tourData, counter) {
				this.floorOneData.push(counter.activeTour);
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

			if (labelsLength === 8) {
				this.floorOneData.splice(0, 1);
				this.labels.splice(0, 1);
			}
			this.fillData();
		}
    }
  };
  </script>
  
<style lang="scss">
body::before {
	background: none;
}
header {
	display: none;
}
</style>

<style lang="scss" scoped>
.dashboard--content {
	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		background-color: rgba(0, 0, 0, 1);

		#search {
			height: 2rem;
			border-radius: 0.8rem;
			border: none;
		}
		h1 {
			color: white;
		}
	}
	main {
		display: flex;
		flex-direction: column;
		h2 {
			margin-bottom: 3rem;
		}
		section {
			width: 100%;
			margin: 3rem 0 4rem 2rem;
			table {
				border-collapse: collapse;
				width: 50%;
				tr:not(:first-child) {
					border-bottom: 0.1rem solid black;
				}
				tr {
					th {
						color: rgba(224, 90, 50, 1);
						font-size: 0.8em;
					}
					td {
						padding: 1rem 0rem;
						text-align: center;
						.busy {
							color: red;
						}
						.fair {
							color: orange;
						}
						.calm {
							color: green;
						}
					}
				}
			}
		}
		.button-floor {
			background-color: black;
			color: white;
			border-radius: 0.8rem;
			padding: 0.5rem 1rem;
			border: none;
			margin-left: 2rem;
		}
	}
	.navigation {
		position: absolute;
		right: 0;
		ul {
			display: flex;
			flex-direction: column;
			margin: 0;
			list-style: none;
			li {
				a {
					text-decoration: none;
					color: black;
					padding: 1rem 0rem;
					div {
						padding: 0.5em;
						background-color: black;
						h3 {
							color: white;
						}
					}
				}
			}
		}
	}
}
</style>
