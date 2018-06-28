<template>
    <div class="dashboard-paintinglist">
        <nav-dash>
        </nav-dash>
    </div>
    
</template>

<script>
import NavDash from '../../components/Navdash.vue';
export default {
	components: { NavDash },
};
</script>

<style lang="scss" scoped>
.dashboard-paintinglist {
	background-color: black;
	height: 100vh;
	nav {
		margin: 0;
		padding-left: 2em;
		padding-top: 1em;
		h1 {
			color: white;
		}
	}
	main {
		background-color: black;
		@media screen and (min-width: 40em) {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		.linechart {
			background-color: #464646;
			border-radius: 1rem;
			margin-bottom: 2em;
			padding: 1em;
			@media screen and (min-width: 40em) {
				width: 60vw;
				margin-right: 2em;
			}
			h1,
			h2 {
				color: white;
				span {
					font-size: 0.5em;
					font-style: italic;
					color: white;
					margin-bottom: 0.4em;
				}
			}

			ul {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				margin-right: 2em;
				list-style: none;
				overflow: scroll;
				height: 10em;
				li {
					background-color: black;
					border-radius: 1rem;
					margin-right: 0.3em;
					margin-bottom: 0.5em;
					@media screen and (min-width: 40em) {
						margin-right: 1em;
						margin-bottom: 1em;
					}
					a {
						display: block;
						padding: 0.3em 2.5em;
						color: white;
					}
				}
			}
		}
		.overview-navigation {
			border-left: 3px solid;
			-webkit-border-image: -webkit-gradient(linear, 0 0, 0 100%, from(white), to(rgba(0, 0, 0, 0)))
				1 100%;
			-webkit-border-image: -webkit-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;
			-moz-border-image: -moz-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;
			-o-border-image: -o-linear-gradient(white, rgba(0, 0, 0, 0)) 1 100%;
			border-image: linear-gradient(to bottom, white, rgba(0, 0, 0, 0)) 1 100%;
			padding: 0.7em;
			div {
				h3 {
					color: white;
				}
				p {
					color: white;
				}
			}
		}
	}
}
</style>

