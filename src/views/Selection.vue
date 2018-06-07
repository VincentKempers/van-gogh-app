<template>
	<div>
		<section>
			<h2>List of first half</h2>

			<ul>
				<li
					v-for="(theme, i) in themes"
					v-if="i < (themes.length / 2)"
				>
					<select-item
						:title="theme"
					/>
				</li>
			</ul>

		</section>

		<section>
			<h2>List of last half</h2>

			<ul>
				<li
					v-for="(theme, i) in themes"
					v-if="i > (themes.length / 2)"
				>
					<select-item
						:title="theme"
					/>
				</li>
			</ul>
		</section>

		<footer>
			Footer
		</footer>
	</div>
</template>

<script>
	import SelectItem from './Selection/SelectItem.vue';

	export default {
		components: {
			SelectItem
		},
		props: ['backTo'],
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
				]

			}
		},
		methods: {
			test() {
				console.log('Got clicked');
			}
		},
		created() {}
	}
</script>

<style lang="scss" scoped>
	section {
		ul {
			display: flex;
			flex-direction: row;
		}
	}

	ul {
		list-style:  none;
		padding: 0;
		overflow: scroll;
	}
</style>