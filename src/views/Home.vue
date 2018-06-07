<template>
	<main>
    	<h1>{{ title }}</h1>
	 	<router-link to="/selection">Selection</router-link>
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
</style>