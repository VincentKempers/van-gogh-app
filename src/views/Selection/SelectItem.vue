<template>
	<div>
		<p>{{ title }}</p>
		<img src="http://lh3.googleusercontent.com/_6EVuASOt_-fs-_SZ7wUdFP3PS5nupTRnYJPvQqdIrds9D4PRS6n0ipSwGBP0duP4ue3HLzRNRbZThyntE01JS-ZK5E9Pz28vsJwGDFw6Js" alt="title">
	</div>
</template>

<script>
	export default {
		props: ['title'],
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	div {
		position: relative;
		// height: 70%;
		// width: 9rem;
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
