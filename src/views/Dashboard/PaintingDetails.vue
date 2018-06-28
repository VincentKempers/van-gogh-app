<template>
<div class="dashboard-painting">
		<nav-dash>
		</nav-dash>
	<main>	
		<section class="linechart">
			<h2>painting {{paintingNum}} <span>Every visitor on this floor</span></h2>
			
			<line-chart :chartData="paintingChart"></line-chart>
			<h2>Devices</h2>
			<ul>
				<li
					v-for="(device, index) in allDevices"
					:key="index"
				>
					<router-link :to="`/dashboard/user/${device.device_id}`">
						<p>{{ device.device_id.substr(0, 4) }}</p>
					</router-link>
				</li>
			</ul>
		</section>
		<section class="overview-navigation">
			<div v-for="(item, index) in images" :key="index" v-if="paintingNum == item.number">
				<h3>Meta</h3>
				<LazyImage
					:src="'/assets/images/' + item.imageUrl"
					:alt="item.description"
				/>
			</div>
			<div>
				<h3>Thema's</h3>
				<p>Changing techniques</p>
				<p>Color effects</p>
			</div>
		</section>
	</main>
</div>
</template>

<script>
import { getAllDevicesAt } from '../../../services/http-service.js';
import LineChart from '../../components/Charts/LineChart.vue';
import NavDash from '../../components/Navdash.vue';
import LazyImage from '../../components/LazyImage.vue';
import { generateFakeTime, createInterval, getTime } from '../../../services/helpers.js';

export default {
	components: {
		LineChart,
		LazyImage,
		NavDash,
	},
	props: ['src', 'alt'],
	data() {
		return {
			paintingNum: this.$route.params.id,
			paintingChart: null,
			labels: [getTime(new Date(), true)],
			paintingData: [0],
			allDevices: [],
			socket: null,
			images: [
				{
					number: '50',
					description: 'the famous potatoeaters piece of van Gogh',
					imageUrl: 'aardappeleters-min.jpg',
				},
				{
					number: '28',
					description: 'The cottage',
					imageUrl: 'thecottage-min.jpg',
				},
				{
					number: '16',
					description:
						'The theme. An image of a woman in a blue dress to depict the theme Legacy of Van Gogh',
					imageUrl: 'peasantheads-min.jpg',
				},
				{
					number: '13',
					description:
						"The theme. An image of a portrait of Vincent's brother Theo to depict the theme Family Van Gogh",
					imageUrl: 'stillbiblelife-min.jpg',
				},
				{
					number: '41',
					description:
						'The theme. An image of red cabbages and onions to depict the theme Learning by doing',
					imageUrl: 'skeletSigaret-min.jpg',
				},
				{
					number: '55',
					description:
						'The theme. An image of a self portrait of Vincent with a grey felt hat to depict the theme The modern portrait',
					imageUrl: 'headofprostitute-min.jpg',
				},
				{
					number: '38',
					description:
						'The theme. An image of people eating potatoes to depict the theme Changing techniques',
					imageUrl: 'treesandundergrowth-min.jpg',
				},
				{
					number: '18',
					description: 'The theme. An image of Sunflowers to depict the theme Simplicity',
					imageUrl: 'gardenwithcourtingcouple-min.jpg',
				},
				{
					number: '14',
					description:
						'The theme. An image of a wheatfield to depict the theme The wealth of nature',
					imageUrl: 'grijzeVilthoed-min.jpg',
				},
				{
					number: '30',
					description:
						'The theme. An image of self portrait as painter to depict the theme Driven and goal oriented',
					imageUrl: 'portretAlsSchilder-min.jpg',
				},
				{
					number: '02',
					description:
						'The theme. An image of the seascape new les saintes-maties-de-la-mer to depict the theme Color effects',
					imageUrl: 'pinkOrchard-min.jpg',
				},
				{
					number: '29',
					description:
						'The theme. An image of the hospital garden to depict the theme Work as a medicine',
					imageUrl: 'anoldwomanofarles-min.jpg',
				},
				{
					number: '53',
					description: 'The chair of Gauguin',
					imageUrl: 'stoelVGauguin-min.jpg',
				},
				{
					number: '37',
					description: 'van Gogh painting of the seeder',
					imageUrl: 'zaaier-min.jpg',
				},
				{
					number: '04',
					description: 'the yellow house where van Gogh stayed in',
					imageUrl: 'yellowhouse-min.jpg',
				},
				{
					number: '76',
					description: 'Famous sunflowerpainting',
					imageUrl: 'zonnebloemen-min.jpg',
				},
			],
		};
	},
	created() {
		this.fillData();
	},
	beforeMount() {
		getAllDevicesAt(this.paintingNum)
			.then(res => res.json())
			.then(json => {
				this.allDevices = json;
			});
	},
	mounted() {
		this.socket = io();

		this.socket.emit('Dashboard');
		this.socket.on('sendPosition', this.sendPosition);
		this.socket.on('exitAudio', this.exitAudio);

		this.dataInterval = createInterval(3000, this.tourInterval);
		// gradient color
		this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

		this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
		this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
		this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
	},
	methods: {
		fillData() {
			this.paintingChart = {
				labels: this.labels,
				datasets: [
					{
						label: 'visitors',
						borderColor: '#f87979',
						backgroundColor: this.gradient,
						data: this.paintingData,
					},
				],
			};
		},
		sendPosition(paintingData, count, paintingId) {
			this.updateTourData(paintingData, count, paintingId);
		},
		exitAudio(paintingData, count, paintingId) {
			this.updateTourData(paintingData, count, paintingId);
		},
		updateTourData(paintingData, count, paintingId) {
			this.paintingData.push(count);
		},
		generateNewLabel() {
			// const lastLabel = this.labels[this.labels.length - 1];
			// const newLabel = generateFakeTime(lastLabel);
			const newLabel = getTime(new Date(), true);
			this.labels.push(newLabel);
		},
		tourInterval() {
			this.generateNewLabel();
			const paintingLength = this.paintingData.length;

			const labelsLength = this.labels.length;

			if (labelsLength !== paintingLength) {
				this.paintingData.push(this.paintingData[paintingLength - 1]);
			}

			if (labelsLength === 8) {
				this.paintingData.splice(0, 1);
				this.labels.splice(0, 1);
			}
			this.fillData();
		},
	},
};
</script>

<style lang="scss" scoped>
.dashboard-painting {
	background-color: black;
	height: 100vh;
	nav {
		margin: 0;
		padding-left: 2em;
		padding-top: 1em;
		h1 {
			color: white;
		}
	}
	main {
		background-color: black;
		@media screen and (min-width: 40em) {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		.linechart {
			background-color: #464646;
			border-radius: 1rem;
			margin-bottom: 2em;
			padding: 1em;
			@media screen and (min-width: 40em) {
				width: 60vw;
				margin-right: 2em;
			}
			h1,
			h2 {
				color: white;
				span {
					font-size: 0.5em;
					font-style: italic;
					color: white;
					margin-bottom: 0.4em;
				}
			}

			ul {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				margin-right: 2em;
				list-style: none;
				overflow: scroll;
				height: 10em;
				li {
					background-color: black;
					border-radius: 1rem;
					margin-right: 0.3em;
					margin-bottom: 0.5em;
					@media screen and (min-width: 40em) {
						margin-right: 1em;
						margin-bottom: 1em;
					}
					a {
						display: block;
						padding: 0.3em 2.5em;
						color: white;
					}
				}
			}
		}
		.overview-navigation {
			border-left: 3px solid;
			-webkit-border-image: -webkit-gradient(linear, 0 0, 0 100%, from(white), to(rgba(0, 0, 0, 0)))
				1 100%;
			-webkit-border-image: -webkit-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;
			-moz-border-image: -moz-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;
			-o-border-image: -o-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;
			border-image: linear-gradient(to bottom, white, rgba(0, 0, 0, 0)) 1 100%;
			padding: 0.7em;
			div {
				h3 {
					color: white;
				}
				p {
					color: white;
				}
			}
		}
	}

	.floorplan {
		background-color: #464646;
		border-radius: 1rem;
		margin-bottom: 2em;
		padding: 1em;
		svg {
			width: 100%;
			padding-top: 2.5em;
		}
	}
}
</style>