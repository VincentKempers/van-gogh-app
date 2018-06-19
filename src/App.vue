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
		background: #fcfcfc;
	}

	body {
		&::before {
			content: "";
			height: 55%;
			width: 48%;
			position: fixed;
			top: 0;
			right: 0;
			background: #F8E71C;
		}
	}

	h1 {
		color: #4A4A4A;
		font-size: 3rem;
	}
</style>
