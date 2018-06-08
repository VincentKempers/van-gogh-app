<template>
	<header>
		<router-link to="/" >
			<icon-back></icon-back>
		</router-link>
	</header>
</template>

<script>
	import IconBack from './icons/IconBack.vue';

	export default {
		props: [],
		components: {
			IconBack
		},
		data() {
			return {};
		},
		methods: {
			goBack() {
				if (this.$route.path !== '/') {
					console.log('Going back');
					this.$router.go(-1);
				}
			},
			checkRoute() {
				console.log(this.$route);
			}
		}
	};
</script>

<style lang="scss" scoped>
	header {
		padding: .4rem .8rem;
		color: #f3f3f3;
	}
</style>
