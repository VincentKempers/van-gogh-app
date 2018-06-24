<template>
	<img v-if="noJavascript"
		:src="src"
		:alt="alt"
		class="test"
	/>
	<img v-else
		:src="srcImage"
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
			noJavascript: false,
		}),
		computed: {
			srcImage() {
				return this.intersected ? this.src : '';
			}
		},
		created() {
			// this.srcImage = this.src;
			// this.intersected = this.noJavascript;
		},
		beforeMount() {
			// this.noJavascript = false;
		},
		mounted() {
			this.noJavascript = false;
			if (window.IntersectionObserver) {
				this.observer = new IntersectionObserver(entries => {
					const image = entries[0];
				
					if (image.isIntersecting) {
						this.intersected = true;
						this.observer.disconnect();
					}
				});

				this.observer.observe(this.$el);
			} else {
				this.intersected = true;
			}
		},
		destroyed() {
			if (window.IntersectionObserver) {
				this.observer.disconnect();
			}
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