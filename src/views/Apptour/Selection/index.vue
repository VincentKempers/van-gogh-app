<template>
	<form
		method="POST"
		action='/api/tour-select'
	>
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
				:btnType="'submit'"
			/>
		</footer>
	</form>
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
						'description': 'The theme. An image of the chair of Gauguin to depict the theme Painters friends',
						'imageUrl': 'stoelVGauguin-min.jpg'
					},
					{
						'title': 'Japanese influences',
						'description': 'The theme. An image of a Japanese style Courtisan to depict the theme Japanese influences',
						'imageUrl': 'courtisane-min.jpg'
					},
					{
						'title': 'Legacy of Van Gogh',
						'description': 'The theme. An image of a woman in a blue dress to depict the theme Legacy of Van Gogh',
						'imageUrl': 'deBlauweJapon-min.png'
					},
					{
						'title': 'Family Van Gogh',
						'description': 'The theme. An image of a portrait of Vincent\'s brother Theo to depict the theme Family Van Gogh',
						'imageUrl': 'portretTheo-min.jpg'
					},
					{
						'title': 'Learning by doing',
						'description': 'The theme. An image of red cabbages and onions to depict the theme Learning by doing',
						'imageUrl': 'rodeKolenUi-min.jpg'
					},
					{
						'title': 'The modern portret',
						'description': 'The theme. An image of a self portrait of Vincent with a grey felt hat to depict the theme The modern portrait',
						'imageUrl': 'grijzeVilthoed-min.jpg'
					},
					{
						'title': 'Changing techniques',
						'description': 'The theme. An image of people eating potatoes to depict the theme Changing techniques',
						'imageUrl': 'aardappeleters-min.jpg'
					},
					{
						'title': 'Simplicity',
						'description': 'The theme. An image of Sunflowers to depict the theme Simplicity',
						'imageUrl': 'zonnebloemen-min.jpg'
					},
					{
						'title': 'The wealth of nature',
						'description': 'The theme. An image of a wheatfield to depict the theme The wealth of nature',
						'imageUrl': 'korenveld-min.jpg'
					},
					{
						'title': 'Driven and goal oriented',
						'description': 'The theme. An image of self portrait as painter to depict the theme Driven and goal oriented',
						'imageUrl': 'portretAlsSchilder-min.jpg'
					},
					{
						'title': 'Color effects',
						'description': 'The theme. An image of the seascape new les saintes-maties-de-la-mer to depict the theme Color effects',
						'imageUrl': 'zeegezichtSaintLeMer-min.jpg'
					},
					{
						'title': 'Work as a medicine',
						'description': 'The theme. An image of the hospital garden to depict the theme Work as a medicine',
						'imageUrl': 'tuinVanZiekenhuis-min.jpg'
					},
					{
						'title': 'In search of perfect light',
						'description': 'The theme. An image of almond blossoms to depict the theme In search of perfect light',
						'imageUrl': 'amandelbloesem-min.jpg'
					},
					{
						'title': 'Conserving Van Gogh',
						'description': 'The theme. An image of a sower to depict the theme Conserving Van Gogh',
						'imageUrl': 'zaaier-min.jpg'
					},
					{
						'title': 'A different Mind',
						'description': 'The theme. An image of a skeleton who is smoking to depict the theme A different mind',
						'imageUrl': 'skeletSigaret-min.jpg'
					}
				],
				selectedThemes: [],
				isDisabled: false,
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
			confirmTour(evt) {
				evt.preventDefault();
				const selected = this.selectedThemes.map(theme => theme.title);

				tourSelect(selected).then(res => {
					// res is the generated tour
					// Call the 'setTour' action
					this.$store.dispatch('addTour', res);
					this.$store.dispatch('connectSocket', io());
					this.$store.state.socket.emit('startTour', res);
				}).then(() => {
					this.$router.push('/tourmap')
				});
			},
			checkLength() {
				if (this.selectedThemes.length > 1) {
					this.isDisabled = false;
				} else {
					this.isDisabled = true;
				}
			}
		},
		beforeMount() {
			// If there is javascript we can set the button to disabled
			this.isDisabled = true;
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
