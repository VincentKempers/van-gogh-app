<template>
	<button
		@click="onClick"
		:disabled="isDisabled"
		:class="{ disabled: isDisabled }"
	>
		{{ btnText.toUpperCase() }}
	</button>
</template>

<script>
	export default {
		props: [
			'onClick',
			'isDisabled',
			'btnText'
		]
	}
</script>

<style lang="scss" scoped>
	button {
		font-weight: 700;
		color: #4a4a4a;
		background: #F8E71C;
		height: 2.8rem;
		border: none;
		margin: auto 5% auto 0;
		padding: 0 1.4rem;
	}

	.disabled { 
		background: #f4f4f4;
	}
</style>