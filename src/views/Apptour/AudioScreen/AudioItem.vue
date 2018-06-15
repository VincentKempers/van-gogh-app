<template>
	<article>
		<p>{{ isPlaying }}</p>
		<button @click="isPlaying ? pauseAudio() : playAudio(audio.audio_url)">

			<icon-play v-if="!isPlaying"/>
			<icon-pause v-if="isPlaying" />

		</button>
	</article>
</template>

<script>
	import iconPlay from '../../../components/icons/iconPlay.vue';
	import iconPause from '../../../components/icons/iconPause.vue';
	import { sendPosition } from '../../../../services/http-service.js';

	export default {
		props: [
			'audio',
			'tourId',
			'togglePlayState'
		],
		components: {
			iconPlay,
			iconPause,
		},
		data() {
			return {
				audioFile: Object,
				isPlaying: false,
			};
		},
		methods: {
			playAudio(sound) {
				if (sound) {
					const audioUrl = `/assets/audio/${sound}`
					this.audioFile = new Audio(audioUrl);
					this.audioFile.play();

					this.isPlaying = true;
					// Send to parent
					this.togglePlayState(true);
				}
			},
			pauseAudio() {
				console.log(this.audioFile);
				
				if (this.audioFile && this.isPlaying === true) {
					this.audioFile.pause();

					this.isPlaying = false;
					// Send to parent
					this.togglePlayState(false);
				}
			},
			getPosition() {
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
