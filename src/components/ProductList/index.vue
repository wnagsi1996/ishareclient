<template>
	<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
	  <van-list v-model="loading" :finished="finished" finished-text="No more data" @load="onLoad">
	    <div class="love-item">
			<div class="love-item-info infinite-list-item" v-for="(item,index) in productList" :key="index">
				<router-link :to="item | urlCompile">
					<van-image :src="item.pimg"  fit="scale-down"></van-image>
					<p class="ptitle" v-if="item.ptitle">{{item.ptitle}}</p>
					<template v-if="item.price"> <!--免费领取-->
						<span class="py">{{'$'+item.price}}</span>
						<p class="bold" v-if="item.pnum!='0'">Share Get</p>
						<p class="bold" v-else>Free Get</p>
					</template>
					<template v-else>  <!--正常购买-->
						<span class="py">{{'$'+item.pscjg}}</span>
						<span class="px">{{'$'+item.pjg}}</span>
					</template>
					
				</router-link>
			</div>
		</div>
	  </van-list>
	</van-pull-refresh>
</template>

<script>
	import {List,PullRefresh} from 'vant'
	export default({
		name:'ProductList',
		components:{
			[List.name]:List,
			[PullRefresh.name]:PullRefresh
		},
		props:{
			productList:{
				type:Array,
				default:new Array()
			},
			productTotal:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				finished:true,
				loading:false,
				refreshing:false
			}
		},
		created(){
			this.onRefresh()
		},
		methods:{
			onRefresh(){
				this.loading=true
				this.finished=false
				this.$emit("loadproductdata",'1')
			},
			onLoad(){
				this.$emit("loadproductdata")
				
			}
		},
		watch:{
			productList(newVal,oldVal){
				if(newVal.length==0){
					this.onRefresh()
				}
				
				this.productList=newVal
				this.finished=false
				this.loading=false
				this.refreshing=false
			},
			productTotal(newVal,oldVal){
				if(newVal){
					this.finished=true
				}
			}
		},
		filters:{
			urlCompile:(item)=>{
				let newurl=item.ptitle.replace(/ /g, '-').replace(/'/g, '').replace(new RegExp('/','gm'), '-').replace(/:/g, '-').replace(/,/g, '-')
				
				return '/productdetail/'+newurl+'/'+item.pid
			}
		}
	})
</script>

<style scoped>
	.love-item{width:94%;display: flex;flex-wrap:wrap;margin:10px auto 0;justify-content: space-between;}
	.love-item-info{width: 46%;margin:10px 0;}
	.love-item-info a{display: block;color: #000;}
	.love-item-info a img{width: 100%;display: block;margin:0 auto;border-radius: 5px;}
	.love-item-info a .py{color: #888;text-decoration: line-through;}
	.love-item-info a .px{color: #000;padding-left: 10px;font-weight: bold;}
	.love-item-info a .ptitle{max-height:40px;line-height: 20px;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;margin:8px 0 4px}
	.love-item-info a .bold{font-weight: bold;}
	.van-image{width: 100%;height: 46vw;}
</style>
