<template>
	<div @click="onSelect(theme, $event)">

		<input
			type="checkbox"
			:name="theme.title"
			:id="theme.title"
		>
		<label :for="theme.title">
			<!-- :style="itemStyle" -->
			<LazyImage
				:src="'/assets/images/' + theme.imageUrl"
				:alt="theme.description"
			/>
		</label>
		<p>{{ theme.title }}</p>
	</div>
</template>

<script>
	import LazyImage from '../../../components/LazyImage.vue';

	export default {
		components: {
			LazyImage
		},
		props: [
			'theme',
			'itemStyle',
			'onSelect'
		],
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	div {
		position: relative;
		overflow: hidden;

		height: 100%;
		min-width: 85vw;
		margin-right: 5%;
		background: #a4a4a4;

		label {
			display: inline-block;
			height: 100%;
			width: 100%;
			background-repeat: no-repeat;
			background-size: cover;
 
			transition: opacity .3s ease-in;

			&:hover {

			}
		}

		input {
			position: absolute;
			opacity: 0;

			&:focus {
				outline: none;
				& + label {
					opacity: .7;
				}
			}

			&:checked {
				& + label {
					opacity: .7;
				}
			}
		}

		&:first-of-type {
			margin-left: 5%;
		}

		p {
			color: #f4f4f4;
			font-size: 2.6rem;
			font-weight: 700;
			letter-spacing: 0.06rem;
			position: absolute;
			bottom: 0;
			margin: 0 0 1rem 1rem;
			max-width: 80%;
			text-shadow: 2px 2px 2px #3a3a3a;
		}
	}
</style>
