<template>
<div class="dashboard-floor">
		<nav>
			<h1>MMT Dashboard</h1>
		</nav>
	<main>	
		<section class="linechart">
			<h2>Floor 1</h2>
			<line-chart :chartData="floorOneChart"></line-chart>
			<h2>Paintings</h2>
			<ul>
				<li><router-link to="floor-1/50">50</router-link></li>
				<li><router-link to="floor-1/28">28</router-link></li>
				<li><router-link to="floor-1/16">16</router-link></li>
				<li><router-link to="floor-1/13">13</router-link></li>
				<li><router-link to="floor-1/41">41</router-link></li>
				<li><router-link to="floor-1/55">55</router-link></li>
				<li><router-link to="floor-1/38">38</router-link></li>
				<li><router-link to="floor-1/18">18</router-link></li>
				<li><router-link to="floor-1/14">14</router-link></li>
				<li><router-link to="floor-1/30">30</router-link></li>
				<li><router-link to="floor-1/2">2</router-link></li>
				<li><router-link to="floor-1/29">29</router-link></li>
				<li><router-link to="floor-1/53">53</router-link></li>
				<li><router-link to="floor-1/37">37</router-link></li>
				<li><router-link to="floor-1/4">4</router-link></li>
				<li><router-link to="floor-1/76">76</router-link></li>
			</ul>
		</section>
		<section class="overview-navigation">
				<ul>
					<li class="verd0">
						<a  href="/dashboard/floor-0">
							<div>
								<h3>Floor 0</h3>
								<line-chart :chartData="floorZeroChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="verd2">
						<a href="/dashboard/floor-2">
							<div>
								<h3>Floor 2</h3>
								<line-chart :chartData="floorTwoChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="verd3">
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
		sendPosition(tourData, counter, paintingId) {
			console.log(tourData, counter, paintingId);
		},
		exitAudio(tourData, counter) {
		},
		updateTourData(tourData, counter) {
			this.floorZeroData.push(counter);
			this.floorOneData.push(counter);
			this.floorTwoData.push(counter);
			this.floorThreeData.push(counter);
		},
		generateNewLabel() {
				const lastLabel = this.labels[this.labels.length - 1];
				const newLabel = generateFakeTime(lastLabel);
				this.labels.push(newLabel);
		},
		tourInterval() {
			this.generateNewLabel();
			const floorZeroLength = this.floorZeroData.length;
			const floorOneLength = this.floorOneData.length;
			const floorTwoLength = this.floorTwoData.length;
			const floorThreeLength = this.floorThreeData.length;

			const labelsLength = this.labels.length;

			if (labelsLength !== floorOneLength) {
				this.floorOneData.push(this.floorOneData[floorOneLength - 1]);
			}

			if (labelsLength !== floorZeroLength) {
				this.floorZeroData.push(this.floorZeroData[floorZeroLength - 1]);
			}
			if (labelsLength !== floorTwoLength) {
				this.floorTwoData.push(this.floorTwoData[floorTwoLength - 1]);
			}
			if (labelsLength !== floorThreeLength) {
				this.floorThreeData.push(this.floorThreeData[floorThreeLength - 1]);
			}

			if (labelsLength === 8) {
				this.floorZeroData.splice(0, 1);
				this.floorOneData.splice(0, 1);
				this.floorTwoData.splice(0, 1);
				this.floorThreeData.splice(0, 1);
				this.labels.splice(0, 1);
			}
			this.fillData();
		},
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
			h1,h2 {
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
