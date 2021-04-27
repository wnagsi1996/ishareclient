<template>
	<div>
		<Header :title="storeName" />
		<div class="store-node">
			<div class="store-node-top">
				<shopInfo :id="id" :storeName.sync="storeName" :ishome="ishome"></shopInfo>
			</div>
			<div class="store-node-bottom">
				
			</div>
		</div>
	</div>
</template>

<script>
	import shopInfo from "@/components/ShopInfo"
	import {mapGetters} from 'vuex'
	export default({
		name:'Shop',
		components:{
			shopInfo
		},
		computed:{
			...mapGetters([
				'token'
			])
		},
		data(){
			return{
				id:'',
				storeName:'',
				ishome:false
			}
		},
		created(){
			this.id=this.$route.params.id
			
		},
		methods:{
		}
	})
</script>

<style scoped>
	.store-node{width:100vw;min-height:100vh;background-color: #f7f7f7;padding: 10px 0;}
	.store-node-top{width:90vw;height: 100px;background-color: #fff;border-radius: 5px;margin:auto;padding:10px;display:flex}
	
	.store-node-bottom{width:90vw;background-color: #fff;border-radius: 5px;margin:10px auto;padding:10px;}
	
</style>
