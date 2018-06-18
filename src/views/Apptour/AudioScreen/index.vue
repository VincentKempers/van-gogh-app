<template>
	<main>
		<ul v-if="wayPoint">
			<li
				v-for="(audio, index) in wayPoint[0].audio"
				:key="index"
			>
				<audio-item
					:audio="audio"
					:tourId="tourId"
					:isAudioPlaying="isAudioPlaying"
					:togglePlayState="togglePlayState"
					:imageUrl="wayPoint[0].imageUrl"
					:index="index"
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
				wayPoint: Object,
				tourId: this.$store.state.tour._id,
				paintingNum: this.$route.params.id,
				isAudioPlaying: false,
			};
		},
		methods: {
			togglePlayState(playState) {
				this.isAudioPlaying = playState;
			}
		},
		beforeMount() {
			this.wayPoint = this.$store.state.tour.tour.filter(item => item.painting_no === this.paintingNum);
			console.log(this.wayPoint);
			
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
