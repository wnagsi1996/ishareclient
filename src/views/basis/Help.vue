<template>
	<div>
		<Header title="Help" />
		<div>
			<van-cell title="About Us" is-link to="/aboutus" />
			<van-cell title="Return Policy" is-link to="/returnpolicy" />
			<van-cell title="FAQ" is-link to="/faq" />
			<van-cell title="Privacy Security Policy" is-link to="/privacysecuritypolicy" />			
			<van-cell title="Terms Of Use" is-link to="/termsofuse" />
		</div>
	</div>
</template>

<script>
	import { Cell, CellGroup } from 'vant';
	export default({
		name:'Help',
		components:{
			[Cell.name]:Cell,
			[CellGroup.name]:CellGroup
		}
	})
</script>

<style>
</style>
