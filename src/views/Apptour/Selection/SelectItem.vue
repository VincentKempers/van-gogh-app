<template>
	<div>
		<p>{{ theme.title }}</p>
		<img :src="'/assets/images/' + theme.imageUrl" :alt="theme.title">
	</div>
</template>

<script>
	export default {
		props: ['theme'],
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	div {
		position: relative;
		height: 100%;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: 50% 0%;
	}

	p {
		position: absolute;
	}
</style>
