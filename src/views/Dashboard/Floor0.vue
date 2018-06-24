<template>
<div class="dashboard-floor">
		<nav>
			<h1>MMT Dashboard</h1>
		</nav>
	<main>	
		<section class="linechart">
			<h1> Floor 0</h1>
			<line-chart :chartData="floorZeroChart"></line-chart>
			<h1>Paintings</h1>
			<ul>
				<li><router-link to="floor-0/2">2</router-link></li>
				<li><router-link to="floor-0/10">10</router-link></li>
			</ul>
		</section>
		<section class="overview-navigation">
				<ul>
					<li class="floor0">
						<a  href="/dashboard/floor-0">
							<div>
								<h3>Floor 0</h3>
								<line-chart :chartData="floorZeroChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="floor">
						<a  href="/dashboard/floor-1">
							<div>
								<h3>Floor 1</h3>
								<line-chart :chartData="floorOneChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="floor">
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
		</section>
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
			labels: this.labels,
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
				labels: this.labels,
				datasets: [
					{
						label: 'people',
						backgroundColor: '#f87979',
						data: this.floorTwoData
					},
				]
			}
			this.floorThreeChart = {
				labels: this.labels,
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
				this.floorZeroData.push(counter.activeTour);
		},
		generateNewLabel() {
				const lastLabel = this.labels[this.labels.length - 1];
				const newLabel = generateFakeTime(lastLabel);
				this.labels.push(newLabel);
		},
		tourInterval() {
			this.generateNewLabel();
			const floorOneLength = this.floorOneData.length;
			const floorZeroLength = this.floorZeroData.length;
			const labelsLength = this.labels.length;
			if (labelsLength !== floorOneLength) {
				this.floorOneData.push(this.floorOneData[floorOneLength - 1]);
			}

			if (labelsLength !== floorZeroLength) {
				this.floorZeroData.push(this.floorZeroData[floorZeroLength - 1]);
			}

			if (labelsLength === 8) {
				this.floorOneData.splice(0, 1);
				this.floorZeroData.splice(0, 1);
				this.labels.splice(0, 1);
			}
			this.fillData();
		}
    }
  };
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

.dashboard-floor {
	background-color: black;
	height: 100%;
	padding: 0 1em;
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
		@media screen and (min-width: 40em) {
			display:flex;
			flex-direction: row;
			justify-content: space-between;
		}
		
		.linechart {
			background-color: #464646;
			border-radius: 1rem;
			margin-bottom: 2em;
			
			padding: 1em;
				@media screen and (min-width: 40em){
					width: 100%;
					margin-right: 2em;
				}
			h1 {
				color: white;
			}
			ul {
				display:flex;
				flex-direction: row;
				flex-wrap: wrap;
				margin-right: 2em;
				list-style: none;
				li {
					background-color: black;
					border-radius: 1rem;
					margin-right: .3em;
					margin-bottom: .5em;
					// justify-content: space-around;
					@media screen and (min-width: 40em){
						margin-right: 1em;
						margin-bottom: 1em;
					}
					a {
						display: block;
						padding: 1em 3em;
						color:white;
					}
				}
			}

		}
		.overview-navigation {
			ul {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin: 0;
			padding: 0;
			list-style: none;
			li {
				margin-bottom: 2em;
				@media screen and (min-width: 40em){
					margin-right: 2em;
				}
				a {
					text-decoration: none;
					padding: 1rem 0rem;
					div {
						padding: 0.5em;
						background-color: #454545;
						border-radius: 1rem;
						max-width:86vw;
						h3 {
							color: white;
						}
					}
				}
			}
		}
		
	}
}
.floorplan {
			background-color: #464646;
			border-radius: 1rem;
			margin-bottom: 2em;
			padding:1em;
			svg {
				width: 100%;
				padding-top:2.5em;
			}
		}
}
</style>
