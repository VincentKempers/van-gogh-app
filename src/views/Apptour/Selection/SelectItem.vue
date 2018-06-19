<template>
	<div
		:style="itemStyle"
	>
		<input
			type="checkbox"
			name="theme.title"
			:id="theme.title"
		>
		<label :for="theme.title"></label>
		<p>{{ theme.title }}</p>
	</div>
</template>

<script>
	export default {
		props: [
			'theme',
			'itemStyle'
		],
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	div {
		position: relative;
		background-repeat: no-repeat;
		background-size: cover;
		overflow: hidden;

		height: 100%;
		min-width: 85vw;
		margin-right: 1rem;

		label {
			display: inline-block;
			height: 100%;
			width: 100%;
			 
			 &:hover {

			 }
		}

		input {
			opacity: 0;

			&:focus {
				outline: none;
			}

			&:checked {

			}
		}

		&:first-of-type {
			margin-left: 1rem;
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
