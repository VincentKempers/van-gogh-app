<template>
    <div class="dashboard--painting">

    </div>
</template>

<script>
	import AudioItem from './AudioItem.vue';

	export default {
		components: {
			AudioItem
		},
		data() {
			return {
				paintingNum: this.$route.params.id,
				socket: this.$store.state.socket
			};
		},
		methods: {
			
		}
	};
</script>

<style lang="scss" scoped>
	ul {
		list-style: none;
		padding: 0;
	}
</style>