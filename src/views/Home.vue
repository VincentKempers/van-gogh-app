<template>
	<main>
    	<h1>{{ title }}</h1>
		<section class="vanGoghMain">
			<div class='text-image'>
				<router-link to="/selection"><img src="https://www.arlestourisme.com/assets/components/phpthumbof/cache/van_gogh_cafe.b349b397fbeeb31f34f671c94d95eb3f16.jpg" alt="people sitting in a restaurant painting">
				<div class="text-block">
					<h2>Personalised tour</h2>
				</div>
				</router-link>
			</div>
			<div class="pictures-in-twos">
				<div class='text-image'>

				<img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Vincent_Willem_van_Gogh_128.jpg" alt="sunflower painting van gogh">

				<div class="text-block">
					<h4>Open tour</h4>
				</div>
			</div>
				<div class='text-image'>

				<img src="https://www.vangoghgallery.com/catalog/image/0320/Self-Portrait.jpg" alt="Self portrait of van Gogh">

				<div class="text-block">
					<h4>Highlight tour</h4>
				</div>
			</div>
			</div>
		</section>
		<section>
			<h2>Van Gogh Japan collection</h2>
			<div class='text-image'>
				<router-link to="/selection"><img src="https://img.whichmuseum.com/van-gogh-museum/large/van-gogh-japan.png" alt="people sitting in a restaurant painting">
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
			return {
				title: 'Home page'
			};
		}
	};
</script>
 
<style lang="scss" scoped>
main {
	h1 {
		margin: 0 0.5em;
	}
}
section {
	margin: 1rem 0.8rem;

	.text-image {
		position: relative;
		width: 100%;
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
		margin-right: 0.2em;
	}
}
</style>
