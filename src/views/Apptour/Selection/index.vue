<template>
	<div>
		<form
			v-if="noJavascript"
			method="POST"
			action="/api/tour-select"
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
						backgroundImage: `url(/assets/images/${theme.imageUrl}')`
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

		<main v-else>
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
						backgroundImage: `url(/assets/images/${theme.imageUrl}')`
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
		</main>
	</div>
</template>

<script>
	import SelectItem from './SelectItem.vue';
	import SelectedItem from './SelectedItem.vue';
	import VueButton from '../../../components/Button.vue';

	export default {
		components: {
			SelectItem,
			SelectedItem,
			VueButton,
		},
		props: [],
		data() {
			return {
				themes: this.$store.state.themes,
				selectedThemes: [],
				isDisabled: false,
				noJavascript: true
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
				this.$store.dispatch('selectThemes', selected);

				this.$router.push('/tour-overview');
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
			this.noJavascript = false;
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

	@media all and (min-width: 60rem) {
		footer {
			max-width: 50rem;
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
