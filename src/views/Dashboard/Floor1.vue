<template>
	<main>
		<nav>
			<h1>MMT Dashboard</h1>
			<input id="search" type="text" name="search">
		</nav>
		<h1> verdieping 1</h1>
		<section>
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
</style>
