<template>
	<main>
		<h1>audio screen</h1>
		<!-- <p>{{ tour[0]}}</p> -->
		<ul v-if="tour">
			<li
				v-for="(audio, index) in tour[0].audio"
				:key="index"
			>
				<audio-item :audio="audio" :tourId="tourId" />
			</li>
		</ul>
	</main>
</template>

<script>
	import AudioItem from './AudioItem.vue';

	export default {
		components: {
			AudioItem
		},
		data() {
			return {
				tour: Object,
				tourId: Number
			};
		},
		beforeMount() {
			this.tourId = this.$store.state.tour._id;
			this.tour = this.$store.state.tour.tour.filter(item => item.painting_no === this.$route.params.id);
		}
	};
</script>

<style lang="scss" scoped>
	ul {
		list-style: none;
		padding: 0;
	}
</style>
