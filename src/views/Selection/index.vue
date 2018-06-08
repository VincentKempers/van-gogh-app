<template>
	<div>
		<section>
			<h2>List of first half</h2>

			<ul>
				<li
					v-for="(theme, i) in themes"
					v-if="i < (themes.length / 2)"
					:key="i"
					@click="addTheme(theme, $event)"
				>
					<select-item :title="theme" />
				</li>
			</ul>

		</section>

		<section>
			<h2>List of last half</h2>

			<ul>
				<li
					v-for="(theme, i) in themes"
					v-if="i > (themes.length / 2)"
					:key="i"
					@click="addTheme(theme, $event)"
				>
					<select-item :title="theme" />
				</li>
			</ul>
		</section>

		<footer>
			<ul>
				<li
					v-for="(theme, i) in selectedThemes"
					:key="i"
					@click="removeTheme(theme, i, $event)"
				>
					<select-item :title="theme" />
				</li>
			</ul>
		</footer>
	</div>
</template>

<script>
	import SelectItem from './SelectItem.vue';

	export default {
		components: {
			SelectItem
		},
		props: [],
		data() {
			return {
				themes: [
					'a different mind',
					'conserving van gogh',
					'in search of perfect light',
					'japanese influences',
					'painter friend',
					'legacy of van gogh',
					'the modern portrait',
					'changing techniques',
					'family of van gogh',
					'simplicity',
					'learning by doing',
					'the wealth of nature',
					'work as a medicine',
					'color effects',
					'driven and goal oriented'
				],
				selectedThemes: [
					'driven and goal oriented'
				]
			};
		},
		methods: {
			test() {
				console.log('Got clicked');
			},
			addTheme(theme) {
				// console.log('Add', evt.target, theme);
				this.selectedThemes.push(theme);
				console.log(this.selectedThemes);
			},
			removeTheme(theme, i) {
				this.selectedThemes.splice(i, 1);
				console.log('Remove selected');
			}
		},
		created() {
			console.log('created');
		},
		watch: {
			// Wathc the $route propertie and run method change
			// 'selectedThemes': 'fetchItems'
		},
	};
</script>

<style lang="scss" scoped>
	footer {
		position: fixed;
		bottom: 0;
   	background: gray;
		width: 100%;
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
		border-radius: .3rem;
		overflow: hidden;
		height: 100%;
		min-width: 9rem;
		max-width: 9rem;

		margin-right: 1rem;

		&:first-of-type {
			margin-left: 1rem;
		}
	}

</style>
