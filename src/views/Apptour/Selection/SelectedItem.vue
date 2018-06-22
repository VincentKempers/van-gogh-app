<template>
	<LazyImage :src="'/assets/images/' + theme.imageUrl" />
</template>

<script>
	import LazyImage from '../../../components/LazyImage.vue';

	export default {
		components: {
			LazyImage
		},
		props: ['theme']
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
