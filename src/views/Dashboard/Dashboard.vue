<template>
	<div class="dashboard--content">
		<nav>
			<h1>MMT Dashboard</h1>
		</nav>
		<main>
			<div class="navigation">
				<ul>
					<li class="verd0">
						<a  href="/dashboard/verdieping-0">
							<div>
								<h3>Floor 0</h3>
								<line-chart :chartData="floorZeroChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="verd1">
						<a  href="/dashboard/verdieping-1">
							<div>
								<h3>Floor 1</h3>
								<line-chart :chartData="floorOneChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="verd2">
						<a href="/dashboard/verdieping-2">
							<div>
								<h3>Floor 2</h3>
								<line-chart :chartData="floorTwoChart" :width="400" :height="200" />
							</div>
						</a>
					</li>
					<li class="verd3">
						<a  href="/dashboard/verdieping-3">
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

export default {
    name: 'Dashboard',
    components: {LineChart},
    data () {
      return {
		labels:["10:00", "11:00"],
		floorZeroData: [4, 1],
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
		this.socket = io();
		this.socket.emit('Dashboard');
		//   this.socket.on('exitAudio', function(d) {
		// 	  console.log(d);
		//   });]
		const floorOne = this.floorOneData;
		const theLabels = this.labels;
		const updateData = this.fillData;
		
		
		this.socket.on('exitAudio', function(d) {
			if(d._id) {
				var one = 1;
				floorOne.push(one);
				theLabels.push('12:00');
				updateData();	
			}
		});
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
      fetchData () {

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
		h1 {
			color: white;
		}
	}
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
				width: 75%;
				margin: 2em;
				align-self: center;
			}
			li {
				margin: 2em 2em;
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
			.verd0 { order: 1;}
			.verd1 { order: 2;}
			.verd2 { order: 3;}
			.verd3 { order: 4;}
		}
	}
}
</style>
