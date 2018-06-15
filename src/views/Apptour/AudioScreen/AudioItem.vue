<template>
	<article>
		<!-- <p>{{ audio }}</p> -->

		<!-- <audio controls>
			<source :src="audio.audio_link" type="audio/wav">
			Your browser does not support the playing audio.
		</audio> -->

		<button @click="playAudio">PLAY</button>
		<!-- audiotag here -->
	</article>
</template>

<script>
	import HttpService from '../../../../services/http-service.js';

	export default {
		props: ['audio', 'tourId'],
		data() {
			return {};
		},
		methods: {
			playAudio() {
				HttpService.sendPosition(this.tourId, this.$route.params.id);
			}
		}
	};
</script>

<style lang="scss" scoped>
	article {
		width: 100%;
		height: 8rem;
		background: silver;
	}
</style>