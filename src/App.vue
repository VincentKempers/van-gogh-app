<template>
<div id="app" :class="{ 'app-side': !this.$route.meta.dashboard }">
	 <Header />
    <router-view></router-view>
</div>
</template>

<script>
import Header from './components/Header.vue';

export default {
	name: 'app',
	components: {
		Header,
	},
};
</script>


<style lang="scss">

	html, body {
		position: relative;
		font-family: "monteserrat", "arial", sans-serif;
		margin: 0;
		background: #fcfcfc;
		z-index: -1;
	}

	// @media all and (min-width: 60rem) {
	// 	html, body {
	// 		max-width: 50rem;
	// 		margin: 0 auto;
	// 	}
	// }

	.app-side {
		&::before {
			content: "";
			height: 55%;
			width: 48%;
			position: fixed;
			z-index: -1;
			top: 0;
			right: 0;
			background: #F8E71C;
		}
	}


	main {
		z-index: +1;
	}

	h1, h2, h4 {
		color: #4a4a4a;
	}

	h1 {
		font-size: 3rem;
	}

	h4 {
		margin: 1rem 0;
	}

	ul {
		list-style: none;
	}

</style>
