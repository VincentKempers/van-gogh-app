<template>
	<article
		:style="{
			backgroundImage: 'url(/assets/images/' + imageUrl + ')',
			backgroundPosition: '0 ' + index * -8 + 'rem'
		}"
	>
		<h2>{{ audio.title }}</h2>

		<audio
			controls
			v-if="noJavascript"
		>
			<source :src="`/assets/audio/${audio.audio_url}`" type="audio/wav">
			Your browser does not support the audio element and has javascript turned of
		</audio>

		<button
			@click="((isAudioPlaying === false) || isPlaying) && (isPlaying ? pauseAudio() : playAudio(audio.audio_url))"
			aria-label="playPause"
		>
			<icon-play v-if="!isPlaying"/>
			<icon-pause v-if="isPlaying" />
		</button>
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
			noJavascript: true,
		};
	},
	methods: {
		playAudio(sound) {
			console.log('t sound');

			if (sound) {
				console.log(111);

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
		},
	},
	mounted() {
		this.noJavascript = false;
	},
	beforeDestroy() {
		// Stop the audio when leaving the audioscreen
		// Does not stop automatically
		this.pauseAudio();
	},
};
</script>

<style lang="scss" scoped>
article {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 8rem;
	margin: 0 5%;
	margin-bottom: 1rem;
	padding: 0 5%;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

	background-repeat: no-repeat;
}

h2 {
	max-width: 70%;
	color: #f4f4f4;
	text-shadow: 2px 2px 2px #3a3a3a;
}

button {
	border: none;
	background: none;
}
</style>
