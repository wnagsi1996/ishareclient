<template>
	<div>
		<Header :title="storeName" shareshow />
		<div class="store-node">
			<div class="store-node-top">
				<shopInfo :id="id" :storeName.sync="storeName" :ishome="ishome"></shopInfo>
			</div>
			<div class="store-node-bottom">
				<ProductList :productList="shopProductList" @loadproductdata="loadproductdata" :productTotal="shopProductTotal"></ProductList>
			</div>
		</div>
	</div>
</template>

<script>
	import ProductList from "@/components/ProductList"
	import shopInfo from "@/components/ShopInfo"
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	export default({
		name:'Shop',
		components:{
			ProductList,
			shopInfo
		},
		computed:{
			...mapGetters([
				'token',
				'keepAliveName',
				'shopProductList',
				'shopIndex',
				'shopProductTotal'
			])
		},
		data(){
			return{
				id:'',
				// productList:[],
				// productTotal:false,
				// index:0,
				storeName:'',
				ishome:true
			}
		},
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				if(vm.keepAliveName && !vm.keepAliveName.includes('Shop')){
					
					vm.SET_NAME_LIST('Shop');
				}
			})
		},
		created(){
			this.id=this.$route.params.id;
			this.SET_PID(this.id)
		},
		methods:{
			//加载产品
			loadproductdata(i=0){
				if(i!=0){
					this.SET_INDEX(0)
				}
				let params={
					  s:this.id,
					  pageindex:this.shopIndex
				}
				this.getProductList(params).then(),(err=>{
					this.$toast('Data loading error')
				})
			},
			...mapMutations({
				DEL_NAME_LIST:'keepAliveName/DEL_NAME_LIST',
				SET_NAME_LIST:'keepAliveName/SET_NAME_LIST',
				SET_INDEX:'shop/SET_INDEX',
				SET_PID:'shop/SET_PID'
			}),
			...mapActions({
				getProductList:'shop/getProductList'
			})
		},
		beforeRouteLeave(to,from,next){
			if(to.name!='ShopDetail'){
				if(this.keepAliveName.includes('Shop')){
					this.DEL_NAME_LIST('Shop')
				}
			}
			next()
		}
	})
</script>

<style scoped>
	.store-node{width:100vw;min-height:100vh;background-color: #f7f7f7;padding: 10px 0;}
	.store-node-top{width:90vw;height: 100px;background-color: #fff;border-radius: 5px;margin:auto;padding:10px;display:flex}
	
	.store-node-bottom{width:90vw;background-color: #fff;border-radius: 5px;margin:10px auto;padding:10px;}
	
</style>
