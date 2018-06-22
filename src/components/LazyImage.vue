<template>
 	 <img
		:src="noJavascript ? src : srcImage"
		:alt="alt"
	/>
</template>

<script>
// Source: https://alligator.io/vuejs/lazy-image/
	export default {
		props: [
			'src',
			'alt'
		],
		data: () => ({
			observer: null,
			intersected: false,
			noJavascript: true
		}),
		computed: {
			srcImage() {
				return this.intersected? this.src : '';
			}
		},
		beforeMount() {
			// If this runs we know we have js and can lazyload
			this.noJavascript = false;
		},
		mounted() {
			this.observer = new IntersectionObserver(entries => {
				const image = entries[0];
				if (image.isIntersecting) {
					this.intersected = true;
					this.observer.disconnect();
				}
			});

			this.observer.observe(this.$el);
		},
		destroyed() {
			this.observer.disconnect();
		}
	}
</script>

<style lang="scss" scoped>
	
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: 50% 0%;
	}

</style>