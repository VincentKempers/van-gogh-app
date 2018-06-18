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
	data() {
		return {};
	},
};
</script>


<style lang="scss">
html,
body {
	position: relative;
	font-family: 'varela round', 'arial rounded', 'arial', sans-serif;
	margin: 0;
}

body {
	&::before {
		content: '';
		height: 40%;
		min-height: 14rem;
		max-height: 16rem;
		width: 100%;
		position: absolute;
		z-index: -1;
		top: 0;
		background: #9c0e1c;
	}
}

h1 {
	color: #fff;
}
</style>
