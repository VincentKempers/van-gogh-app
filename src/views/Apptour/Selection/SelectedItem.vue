<template>
	<div>
		<span class="btn-close">&times;</span>
		<LazyImage :src="'/assets/images/' + theme.imageUrl" />
	</div>
</template>

<script>
	import LazyImage from '../../../components/LazyImage.vue';
	import IconClose from '../../../components/icons/IconClose.vue';

	export default {
		components: {
			LazyImage,
			IconClose,
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

	.btn-close {
		position: absolute;
		top: 0;
		right: 0;
		width: 1rem;
		height: 1rem;
		background-color: #f3f3f3;
		text-align: center;
	}

</style>
