<template>
<div id="app">
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
		// background :#9C0E1C;
		// color: #f3f3f3;
	}

	body {
		&::before {
			content: "";
			height: 40%;
			min-height: 14rem;
			max-height: 16rem;
			width: 100%;
			position: absolute;
			z-index: -1;
			top: 0;
			background: #9C0E1C;
		}
	}

	h1 {
		color: #f3f3f3;
	}
</style>
