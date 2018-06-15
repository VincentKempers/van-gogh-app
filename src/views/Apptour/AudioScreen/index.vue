<template>
	<main>
		<ul v-if="tour">
			<li
				v-for="(audio, index) in tour[0].audio"
				:key="index"
			>
				<audio-item
					:audio="audio"
					:tourId="tourId"
					:isAudioPlaying="isAudioPlaying"
					:togglePlayState="togglePlayState"
				/>
			</li>
		</ul>
	</main>
</template>

<script>
	import AudioItem from './AudioItem.vue';
	import { exitAudio } from '../../../../services/http-service';

	export default {
		components: {
			AudioItem
		},
		data() {
			return {
				tour: Object,
				tourId: this.$store.state.tour._id,
				paintingNum: this.$route.params.id,
				isAudioPlaying: false,
			};
		},
		methods: {
			togglePlayState(playState) {
				this.isPlaying = playState;
			}
		},
		beforeMount() {
			this.tour = this.$store.state.tour.tour.filter(item => item.painting_no === this.paintingNum);
		},
		beforeDestroy() {
			// This method is called before the component exits
			exitAudio(this.tourId, this.paintingNum);
		}
	};
</script>

<style lang="scss" scoped>
	ul {
		list-style: none;
		padding: 0;
	}
</style>
