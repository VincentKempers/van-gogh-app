<template>
	<div>
		<h2>Header and back</h2>
		<section>List of first half</section>
		<section>List of last half</section>
			<section>selection</section>
		</footer>
	</div>
</template>

<script>
	import Header from '../components/Header.vue';

	export default {
		props: ['backTo'],
		data() {
			return {}
		},
		methods: {
			test() {
				console.log('Got clicked');
			}
		},
		created() {}
	}
</script>

<style lang="scss" scoped>
</style>