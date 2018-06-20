<template>
	<main>
		<nav>
			<h1>MMT Dashboard</h1>
			<input id="search" type="text" name="search">
		</nav>
		<h1> verdieping 1</h1>
		<section class="chart">
			<render-chart></render-chart>
		</section>
		<section>
			<ul>
				<li>
					<div>
					<router-link to="/dashboard/verdieping-1/50">
						<span>50</span>
					</router-link>
					</div>
				</li>
			</ul>
		</section>
		<div class="navigation">
			<ul>
				<li>
					<a class="verd0" href="/dashboard/verdieping-0">
						<div>
							<h3>Floor 0</h3>
							<render-chart   :width="400" :height="200">

							</render-chart>
						</div>
					</a>
				</li>
				<li>
					<a class="verd1" href="/dashboard/verdieping-1">
						<div>
							<h3>Floor 1</h3>
							<render-chart   :width="400" :height="200">

							</render-chart>
						</div>
					</a>
				</li>
				<li>
					<a class="verd2" href="/dashboard/verdieping-2">
						<div>
							<h3>Floor 2</h3>
							<render-chart   :width="400" :height="200">
							</render-chart>
						</div>
					</a>
				</li>
				<li>
					<a class="verd3" href="/dashboard/verdieping-3">
						<div>
							<h3>Floor 3</h3>
							<render-chart   :width="400" :height="200"></render-chart>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</main>
</template>



<script>
import renderChart from './Bigchart.vue';

export default {
	components: {
		renderChart,
	},
	data() {
		return {
			title: 'Verdieping 1',
		};
	},
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

.chart {
	div {
		width: 60%;
	}
}
section {
	margin: 3rem 0 0 2rem;
	ul {
		list-style-type: none;
		li {
			div {
				a {
					text-align: center;
					background-color: red;
					padding: 1rem 3rem;
					border-radius: 0.6rem;
					background-image: url('/assets/images/aardappeleters-min.jpg');
					color: white;
					text-decoration: none;
				}
			}
		}
	}
}
main {
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
