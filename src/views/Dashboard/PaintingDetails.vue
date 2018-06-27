<template>
<div class="dashboard-painting">
		<nav>
			<h1>MMT Dashboard</h1>
		</nav>
	<main>	
		<section class="linechart">
			<h2>Floor 1</h2>
			<line-chart></line-chart>
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
			<div>
				<h3>Meta</h3>
				<LazyImage
					:src="'/assets/images/' + images.imageUrl"
					:alt="images.description"
				/>
			</div>
		</section>
	</main>
</div>
</template>

<script>
	import { getAllDevicesAt } from '../../../services/http-service.js';
	import LineChart from '../../components/Charts/LineChart.vue';
	import LazyImage from '../../components/LazyImage.vue';
	import { generateFakeTime, createInterval } from '../../../services/helpers.js';

	export default {
		components: {
			LineChart,
			LazyImage
        },
        props: ['src', 'alt'],
		data() {
			return {
				paintingNum: this.$route.params.id,
				allDevices: [],
				socket: this.$store.state.socket,
				images: [
					{
                        'number': '50',
                        'description': 'the famous potatoeaters piece of van Gogh',
						'imageUrl': 'aardappeleters-min.jpg'
					},
					{
                        'number': '28',
                        'description': 'The cottage',
						'imageUrl': 'thecottage-min.jpg'
					},
					{
						'number': '16',
						'description': 'The theme. An image of a woman in a blue dress to depict the theme Legacy of Van Gogh',
						'imageUrl': 'peasantheads-min.jpg'
					},
					{
						'number': '13',
						'description': 'The theme. An image of a portrait of Vincent\'s brother Theo to depict the theme Family Van Gogh',
						'imageUrl': 'stillbiblelife-min.jpg'
					},
					{
						'number': '41',
						'description': 'The theme. An image of red cabbages and onions to depict the theme Learning by doing',
						'imageUrl': 'skeletSigaret-min.jpg'
					},
					{
						'number': '55',
						'description': 'The theme. An image of a self portrait of Vincent with a grey felt hat to depict the theme The modern portrait',
						'imageUrl': 'headofprostitute-min.jpg'
					},
					{
						'number': '38',
						'description': 'The theme. An image of people eating potatoes to depict the theme Changing techniques',
						'imageUrl': 'treesandundergrowth-min.jpg'
					},
					{
						'number': '18',
						'description': 'The theme. An image of Sunflowers to depict the theme Simplicity',
						'imageUrl': 'gardenwithcourtingcouple-min.jpg'
					},
					{
						'number': '14',
						'description': 'The theme. An image of a wheatfield to depict the theme The wealth of nature',
						'imageUrl': 'grijzeVilthoed-min.jpg'
					},
					{
						'number': '30',
						'description': 'The theme. An image of self portrait as painter to depict the theme Driven and goal oriented',
						'imageUrl': 'portretAlsSchilder-min.jpg'
					},
					{
						'number': '2',
						'description': 'The theme. An image of the seascape new les saintes-maties-de-la-mer to depict the theme Color effects',
						'imageUrl': 'pinkOrchard-min.jpg'
					},
					{
						'number': '29',
						'description': 'The theme. An image of the hospital garden to depict the theme Work as a medicine',
						'imageUrl': 'anoldwomanofarles-min.jpg'
					},
					{
						'number': '53',
						'description': 'The theme. An image of almond blossoms to depict the theme In search of perfect light',
						'imageUrl': 'stoelVGauguin-min.jpg'
					},
					{
						'number': '37',
						'description': 'The theme. An image of a sower to depict the theme Conserving Van Gogh',
						'imageUrl': 'zaaier-min.jpg'
					},
					{
						'number': '4',
						'description': 'The theme. An image of a skeleton who is smoking to depict the theme A different mind',
						'imageUrl': 'yellowhouse-min.jpg'
					},
					{
						'number': '76',
						'description': 'The theme. An image of a skeleton who is smoking to depict the theme A different mind',
						'imageUrl': 'zonnebloemen-min.jpg'
					}
				]
			};
		},
		beforeMount() {
			console.log(this.paintingNum);
			
			getAllDevicesAt(this.paintingNum)
				.then(res => res.json())
				.then(json => {
					this.allDevices = json;
				});
		}
	};
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
    .dashboard-painting {
        background-color: black;
        // width: 100vw;
        height: 100%;
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
			border-left: 3px solid;
			-webkit-border-image: 
      		-webkit-gradient(linear, 0 0, 0 100%, from(white), to(rgba(0, 0, 0, 0))) 1 100%;
    		-webkit-border-image: -webkit-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;
    		-moz-border-image: -moz-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;    
    		-o-border-image: -o-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;
    		border-image:linear-gradient(to bottom, white, rgba(0, 0, 0, 0)) 1 100%;
            padding: .7em;
            div {
                
			    h3 {
                    color:white;
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