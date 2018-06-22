<template>
	<main>
		<transition-group
			tag="section"
			name="selected-item"
			appear
		>
			<select-item
				v-for='(theme, i) in themes'
				v-if="!selectedThemes.includes(theme)"
				:key="theme + i"
				:theme="theme"
				:itemStyle="{
					backgroundImage: 'url(/assets/images/' + theme.imageUrl + ')'
				}"
				:onSelect="addTheme"
			/>
		</transition-group>

		<footer>
			<transition-group
				tag="ul"
				name="selected-item"
				appear
			>
				<li
					v-for="(theme, i) in selectedThemes"
					:key="i"
					@click="removeTheme(theme, i, $event)"
				>
					<selected-item :theme="theme" />
				</li>
			</transition-group>

			<vue-button
				:onClick="confirmTour"
				:isDisabled="isDisabled"
				:btnText="'Complete'"
			/>
		</footer>
	</main>
</template>

<script>
	import SelectItem from './SelectItem.vue';
	import SelectedItem from './SelectedItem.vue';
	import VueButton from '../../../components/Button.vue';

	import { tourSelect } from '../../../../services/http-service';

	export default {
		components: {
			SelectItem,
			SelectedItem,
			VueButton
		},
		props: [],
		data() {
			return {
				themes: [
					{
						'title': 'Painter friends',
						'imageUrl': 'stoelVGauguin-min.jpg'
					},
					{
						'title': 'Japanese influences',
						'imageUrl': 'courtisane-min.jpg'
					},
					{
						'title': 'Legacy of Van Gogh',
						'imageUrl': 'deBlauweJapon-min.png'
					},
					{
						'title': 'Family Van Gogh',
						'imageUrl': 'portretTheo-min.jpg'
					},
					{
						'title': 'Learning by doing',
						'imageUrl': 'rodeKolenUi-min.jpg'
					},
					{
						'title': 'The modern portret',
						'imageUrl': 'grijzeVilthoed-min.jpg'
					},
					{
						'title': 'Changing techniques',
						'imageUrl': 'aardappeleters-min.jpg'
					},
					{
						'title': 'Simplicity',
						'imageUrl': 'zonnebloemen-min.jpg'
					},
					{
						'title': 'The wealth of nature',
						'imageUrl': 'korenveld-min.jpg'
					},
					{
						'title': 'Driven and goal oriented',
						'imageUrl': 'portretAlsSchilder-min.jpg'
					},
					{
						'title': 'Color effects',
						'imageUrl': 'zeegezichtSaintLeMer-min.jpg'
					},
					{
						'title': 'Work as a medicine',
						'imageUrl': 'tuinVanZiekenhuis-min.jpg'
					},
					{
						'title': 'In search of perfect light',
						'imageUrl': 'amandelbloesem-min.jpg'
					},
					{
						'title': 'Conserving Van Gogh',
						'imageUrl': 'zaaier-min.jpg'
					},
					{
						'title': 'A different Mind',
						'imageUrl': 'skeletSigaret-min.jpg'
					}
				],
				selectedThemes: [],
				isDisabled: true,
			};
		},
		methods: {
			addTheme(theme) {
				if (this.selectedThemes.includes(theme)) return;
				this.selectedThemes.push(theme);
			},
			removeTheme(theme, i) {
				this.selectedThemes.splice(i, 1);
			},
			confirmTour() {
				const selected = this.selectedThemes.map(theme => theme.title);

				tourSelect(selected).then(res => {
					// res is the generated tour
					// Call the 'setTour' action
					this.$store.dispatch('addTour', res);
					this.$store.dispatch('connectSocket', io());
					this.$store.state.socket.emit('startTour', res);
				}).then(() => this.$router.push('/tourmap'));
			},
			checkLength() {
				if (this.selectedThemes.length > 0) {
					this.isDisabled = false;
				} else {
					this.isDisabled = true;
				}
			}
		},
		watch: {
			// Watch the $route propertie and run method change
			'selectedThemes': 'checkLength'
		},
	};
</script>

<style lang='scss' scoped>
	section {
		display: flex;
		flex-direction: row;
		list-style:  none;
		overflow: scroll;
		padding: 0;
		height: 45vh;
	}

	footer {
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		width: 100%;

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;
			min-height: .1rem;
			max-height: .1rem;
			width: 35%;

			background: #f4f4f4;
		}

		ul {
			display: flex;
			overflow: scroll;
			flex-wrap: nowrap;
			height: 2.8rem;
			width: 100%;
			margin-right: 5%;
			padding: 0;

			list-style: none;
		}

		li {
			min-width: 2.8rem;
			max-width: 2.8rem;
			margin-right: 5%;

			&:first-of-type {
				margin-left: 8%;
			}
		}
	}

	.selected-item-enter-active, .selected-item-leave-active {
		transition: all .3s;
	}

	.selected-item-enter, .selected-item-leave-to {
		opacity: 0;
		transform: translateY(30px);
	}


</style>
