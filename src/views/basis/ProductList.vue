<template>
	<div>
		<van-search v-model="key" placeholder="Search Product" @search="search" />
		<!-- 产品列表 -->
		<ProductList :productList="productlist" @loadproductdata="loadproductdata" :productTotal="productTotal"></ProductList>
		<!-- 底部导航 -->
		<NavTab/>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {Search} from 'vant'
	import ProductList from "@/components/ProductList"
	import NavTab from "@/components/NavTab"
	export default({
		name:'productlist',
		components:{
			[Search.name]:Search,
			ProductList,
			NavTab
		},
		data(){
			return{
				productlist:[],
				productTotal:false,  //是否没有产品可加载
				key:this.$route.query.key?this.$route.query.key:'',
				index:0,
				typeID:this.$route.query.typeID?this.$route.query.typeID:''
			}
		},
		//进入路由缓存页面
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				if(!vm.keepAliveName.includes('productlist')){
					vm.$store.commit('keepAliveName/SET_NAME_LIST','productlist')
				}
			})
		},
		created(){
		},
		computed:{
			...mapGetters([
				'keepAliveName'
			])
		},
		methods:{
			//点击搜索
			search(){
				this.$router.push({
				    query:{key:this.key}
				});
				this.typeID=''
				this.productlist=[];
			},
			//加载搜索得产品
			async loadproductdata(i=0){
				if(i!=0){
					this.index=0
				}
				
				let params={
					ifbook:'0',
					sptitle:this.key,
					sptype:this.typeID,
					ifkq:'-1',
					ifjk:'-1',
					sorttype:'0',
					ifdx:'1',
					SellUserID:'-1',
					pageindex:this.index
				}
				//获取数据
				await this.$api.product.searchProduct(params).then(res=>{
					console.log(res)
					if(i!=0){
						this.productlist=[];
					}
					this.index++;
					this.productlist = this.productlist.concat(res.rows);
					if(res.rows.length==0){
						this.productTotal=true
					}
				}).catch((err)=>{
				   console.log(err);
				});
			 }
		},
		beforeRouteLeave(to,from,next){
			// 下一个页面是详情页就把该页面缓存,如果不是就不缓存
			if(to.name!='ProductDetail'){
				if(this.keepAliveName.includes('productlist')){
					this.$store.commit('keepAliveName/DEL_NAME_LIST','productlist')
				}
			}else{
				if(!this.keepAliveName.includes('productlist')){
					this.$store.commit('keepAliveName/SET_NAME_LIST','productlist')
				}
			}
			next()
		}
		
	})
</script>

<style>
</style>
