<template>
	<main>
		<section class="vanGoghMain">
			<div class='text-image'>
				<router-link to="/selection"><img src="/assets/images/zeegezichtSaintLeMer-min.jpg" alt="sea sight painting of Saint Le Mer">
				<div class="text-block">
					<h2>Personalised tour</h2>
				</div>
				</router-link>
			</div>
			<div class="pictures-in-twos">
				<div class='text-image'>

				<img src="/assets/images/zonnebloemen-min.jpg" alt="sunflower painting van gogh">

				<div class="text-block">
					<h4>Open tour</h4>
				</div>
			</div>
				<div class='text-image'>
				<img src="/assets/images/portretTheo-min.jpg" alt="Self portrait of van Gogh">


				<div class="text-block">
					<h4>Highlight tour</h4>
				</div>
			</div>
			</div>
		</section>
		<section>
			<h2>Van Gogh Japan collection</h2>
			<div class='text-image'>
				<router-link to="/selection">
				<div class="gxj-button"></div>
				<div class="text-block">
					<h2>van Gogh x Japan</h2>
				</div>
				</router-link>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
main {
	h1 {
		margin: 0 0.5em;
		color: white;
	}
}
section {
	margin: 1rem 0.8rem;

	.text-image {
		position: relative;
		width: 100%;
		.gxj-button {
			height: 20em;
			width: 100%;
			background-image: url(/assets/images/courtisane-min.jpg);
			background-repeat: no-repeat;
			background-size: cover;
		}
		img {
			width: 100%;
		}
		.text-block {
			position: absolute;
			bottom: 1.2rem;
			right: 1.2rem;
			background-color: black;
			color: white;
			padding-left: 1.2rem;
			padding-right: 1.2rem;
		}
	}
}

.pictures-in-twos {
	display: flex;
	flex-direction: row;
	width: 100%;
	div {
		width: 100%;
		.text-block {
			width: 6em;
		}
		img {
			height: 15em;
		}
	}
	div:first-of-type {
		margin-right: 0.3em;
	}
}
</style>
