<template>
	<article
		:style="{
			backgroundImage: 'url(/assets/images/' + imageUrl + ')',
			backgroundPosition: '0 ' + index * -8 + 'rem'
		}"
	>
		<button @click="((isAudioPlaying === false) || isPlaying) && (isPlaying ? pauseAudio() : playAudio(audio.audio_url))">

			<icon-play v-if="!isPlaying"/>
			<icon-pause v-if="isPlaying" />

		</button>
		<!-- <no-script>
			Add audio tag here
		</no-script> -->
	</article>
</template>

<script>
	import iconPlay from '../../../components/icons/iconPlay.vue';
	import iconPause from '../../../components/icons/iconPause.vue';

	export default {
		props: [
			'audio',
			'tourId',
			'togglePlayState',
			'isAudioPlaying',
			'imageUrl',
			'index',
			'locatedFloor',
		],
		components: {
			iconPlay,
			iconPause,
		},
		data() {
			return {
				audioFile: Object,
				isPlaying: false,
				socket: this.$store.state.socket,
			};
		},
		methods: {
			playAudio(sound) {
				if (sound) {
					const audioUrl = `/assets/audio/${sound}`;
					this.audioFile = new Audio(audioUrl);
					this.audioFile.play();

					this.isPlaying = true;
					// Send to parent
					this.togglePlayState(true);
					this.getPosition();
				}
			},
			pauseAudio() {
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
				this.$store.state.tour.current_floor = paintingId;

				this.socket.emit('sendPosition', this.tourId, paintingId, this.locatedFloor);
			}
		},
		beforeDestroy() {
			// Stop the audio when leaving the audioscreen
			// Does not stop automatically
			this.pauseAudio();
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

		background-repeat: no-repeat;
		background-size: cover;
	}

	button {
		border: none;
    	background: none;
	}
</style>
