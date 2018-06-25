<template>
<div class="dashboard-painting">
		<nav>
			<h1>MMT Dashboard</h1>
		</nav>
	<main>	
		<section class="linechart">
			<h2>Floor 1</h2>
			<line-chart></line-chart>
		</section>
		<section class="overview-navigation">
				<div>
                    <h3>Meta</h3>
                    <img src="/src/assets/images/aardappeleters-min.jpg" alt="">
                </div>
		</section>
	</main>
</div>
</template>

<script>
    import LineChart from '../../components/Charts/LineChart.vue';
    import { generateFakeTime, createInterval } from '../../../services/helpers.js';

	export default {
		components: {
			LineChart
		},
		data() {
			return {
				paintingNum: this.$route.params.id,
				socket: this.$store.state.socket
			};
		},
		methods: {
			
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