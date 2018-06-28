<template>
    	<nav>
			<h1>Multi Media Tour Dashboard</h1>
			<ul>
				<li><router-link to="/dashboard/">Floors</router-link></li>
				<li><router-link to="/dashboard/paintinglist">Paintings</router-link></li>
				<li><router-link to="/dashboard/devicelist">Devices</router-link></li>
			</ul>
		</nav>
</template>

<style lang="scss" scoped>
nav {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 0 1em;
	background-color: rgba(0, 0, 0, 1);
	@media screen and (min-width: 40rem) {
		display: flex;
		flex-direction: row;
	}
	h1 {
		color: white;
	}
	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 0;

		@media screen and (min-width: 40em) {
			display: flex;	
			flex-direction: row;	
		}
		li {
			border: none;
			padding: 1.5em 1em;
			a {
				background-color: #454545;
				text-decoration: none;
				color: white;
				padding: 1em 2em;
				max-width: 2em;
				&.router-link-exact-active {
					color: white;
					border-bottom: white solid 4px;
				}
				&:focus {
							background-color: white;
							color: black;
							transition: all .5s ease-in;
							border-radius: 1rem;
				}
			}
		}
	}
}
</style>
