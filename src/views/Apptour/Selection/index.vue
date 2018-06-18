<template>
	<main>
		<section>
			<h2>List of first half</h2>

			<ul>
				<li
					v-for='(theme, i) in themes'
					v-if='i < (themes.length / 2)'
					:key='i'
					@click='addTheme(theme, $event)'
				>
					<select-item :theme='theme' />
				</li>
			</ul>

		</section>

		<section>
			<h2>List of last half</h2>

			<ul>
				<li
					v-for='(theme, i) in themes'
					v-if='i > (themes.length / 2)'
					:key='i'
					@click='addTheme(theme, $event)'
				>
					<select-item :theme='theme' />
				</li>
			</ul>
		</section>

		<footer>
			<transition-group
				tag='ul'
				name='selected-item'
				appear
			>
				<li
					v-for='(theme, i) in selectedThemes'
					:key='i'
					@click='removeTheme(theme, i, $event)'
				>
					<selected-item :theme='theme' />
				</li>
			</transition-group>

				<button
					@click='confirmTour'
					:disabled='isDisabled'
					:class='{ disabled: isDisabled }'
				>
					Complete
				</button>
		</footer>
	</main>
</template>

<script>
	import SelectItem from './SelectItem.vue';
	import SelectedItem from './SelectedItem.vue';

	import { tourSelect } from '../../../../services/http-service';

	export default {
		components: {
			SelectItem,
			SelectedItem,
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
						'title': 'Japanse influences',
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
	.disabled { 
		background: gray;
	}

	footer {
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		width: 100%;

		&:before {
			content: '';
			min-height: 1.5rem;
			max-height: 1.5rem;
			width: 100%;
			position: absolute;
			z-index: -1;
			bottom: 0;
			background: #9C0E1C;
		}

		ul {
			height: 3rem;
		}

		li {
			min-width: 3rem;
			max-width: 3rem;
		}

		button {
			background: #3a3a3a;
			color: #fff;
			border: none;
		}
	}

	ul {
		display: flex;
		flex-direction: row;
		list-style:  none;
		overflow: scroll;
		padding: 0;
		height: 7rem;
	}

	li {
		// border-radius: .3rem;
		overflow: hidden;
		height: 100%;
		min-width: 9rem;
		max-width: 9rem;

		margin-right: 1rem;

		&:first-of-type {
			margin-left: 1rem;
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
