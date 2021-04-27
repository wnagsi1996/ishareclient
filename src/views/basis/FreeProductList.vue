<template>
	<div>
		<Header ref="header" shareshow />
		<!-- 产品列表 -->
		<ProductList :productList="productlist" @loadproductdata="loadproductdata" :productTotal="productTotal"></ProductList>
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import ProductList from "@/components/ProductList"
	export default({
		components:{
			Header,
			ProductList
		},
		data(){
			return{
				productlist:[],
				productTotal:false,  //是否没有产品可加载
				key:'',
				index:0,
				typeID:0
			}
		},
		methods:{
			loadproductdata(i=0){
				if(i!=0){
					this.index=0
				}
				let params={
					pdtype:'-1',
					sptype:'',
					pageindex:this.index
				}
				this.$api.product.loadPDProductList(params).then(res=>{
					//console.log(res)
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
		}
		
	})
</script>

<style>
</style>
