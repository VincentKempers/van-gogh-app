<template>
<div id="app">
	<!-- <h2>Van Goh Tour</h2> -->
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <router-link to="/about">About</router-link> -->
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
	data() {
		return {
			title: 'hello',
		};
	},
};
</script>



<style lang="scss">
	html, body {
		background :#9C0E1C;
		color: #f3f3f3;
		font-family: "varela round", "arial rounded", "arial", sans-serif;
	}
</style>