<template>
	<div class="setBj">
		<Header title="Setting" />
		<div>
			<van-cell title="Login Password" is-link to="/modifypass" />
			<van-cell title="Bind Email" is-link to="/modifyemail" />
			<van-cell title="Set Receipt Account" is-link to="/setreceiptaccount" />
		</div>
	</div>
</template>

<script>
	import { Cell, CellGroup} from 'vant';
	export default({
		name:'Setting',
		components:{
			[Cell.name]:Cell,
			[CellGroup.name]:CellGroup
		},
	})
</script>

<style scoped>
</style>
