<template>
	<main>
		<ul>
			<li
				v-for="(theme, index) in selectedThemes"
				:key="index"
			>
				<LazyImage
					:src="'/assets/images/' + theme.imageUrl"
					:alt="theme.description"
				/>
				<div class="title-container">
					<h4>{{ theme.title }}</h4>
				</div>
			</li>
		</ul>

		<vue-button
			class="btn-confirm"
			:onClick="confirmTour"
			:btnText="'Start Tour'"
			:btnType="'submit'"
		/>
	</main>
</template>

<script>
	import LazyImage from '../../../components/LazyImage.vue';
	import VueButton from '../../../components/Button.vue';
	import { tourSelect } from '../../../../services/http-service';

	export default {
		components: {
			LazyImage,
			VueButton,
		},
		data() {
			return {
				themes: this.$store.state.themes,
				selectedThemes: this.$store.state.themes.filter(theme => this.$store.state.selectedThemes.includes(theme.title)),
			};
		},
		methods: {
			confirmTour() {
				tourSelect(this.selectedThemes).then(res => {
					// res is the generated tour
					this.$store.dispatch('addTour', res);
					this.$store.dispatch('connectSocket', io());
					
					this.$store.state.socket.emit('startTour', res);
				}).then(() => {
					this.$router.push('/tour-map');
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.btn-confirm {
		position: fixed;
		bottom: 0;
		right: 0;
		margin: 5%;
	}

	h4 {
		color: #f4f4f4;
	}

	ul {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: .4rem 5%;
	}

	li {
		position: relative;
		width: 42.5vw;
		height: 15rem;
		margin-bottom: 5vw;
	}

	.title-container {
		position: absolute;
		bottom: 0;
		width: 60%;
		right: 0;
		font-size: 1.2rem;
		color: #f4f4f4;
		background-color: rgba(74, 74, 74, 0.6);
		padding-left: 1.2rem;
		padding-right: 1.2rem;
	}

</style>
