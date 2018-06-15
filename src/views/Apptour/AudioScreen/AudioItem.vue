<template>
	<article>
		<!-- <p>{{ audio }}</p> -->

		<!-- <audio controls>
			<source :src="audio.audio_link" type="audio/wav">
			Your browser does not support the playing audio.
		</audio> -->

		<icon-play :click="playAudio"></icon-play>
		<!-- audiotag here -->
	</article>
</template>

<script>
	import iconPlay from '../../../components/icons/iconPlay.vue'
	import { sendPosition } from '../../../../services/http-service.js';

	export default {
		props: ['audio', 'tourId'],
		components: {
			iconPlay,
		},
		data() {
			return {};
		},
		methods: {
			playAudio() {
				const paintingId = this.$route.params.id;
				this.$store.state.tour.current_way_point = paintingId;
				sendPosition(this.tourId, paintingId);
			}
		}
	};
</script>

<style lang="scss" scoped>
	article {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #3a3a3a;
		width: calc(100% - 1.6rem);
		height: 8rem;
		margin: 0 auto;
		margin-bottom: 1rem;
		box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
	}
</style>
