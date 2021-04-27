<template>
	<div class="gifts">
		<Header title="My Gifts" />
		<RefreshLoading :ismore="ismore" :list="list" @load="load">
			<div class="gifts-node">
				<van-card
				  v-for="(item,index) in list"
				  :key="index"
				  num="1"
				  :price="item.price"
				  :desc="item.productattr"
				  :title="item.ptitle"
				  :thumb="item.pimg"
				  @click="onClick(item.pdorderno)"
				>
					<template #footer>
					    <p style="margin-top: 10px;color:#e41c1d">{{item.pdorderstate}}</p>
					</template>
				</van-card>
			</div>
		</RefreshLoading>
	</div>
</template>

<script>
	import { Card } from 'vant';
	import RefreshLoading from '@/components/RefreshLoading'
	export default({
		name:'MyGifts',
		components:{
			[Card.name]:Card,
			RefreshLoading
		},
		data(){
			return{
				ismore:false,
				list:[],
				index:0
			}
		},
		methods:{
			//加载数据
			load(i=0){
				if(i!=0){
					this.index=0
				}
				this.$api.user.getUserPDProductList({pdtype:'-1',pageindex:this.index}).then(res=>{
					// /console.log(res)
					if(res!=''){
						if(i!=0){
							this.list=[]
						}
						this.index++
						this.list=this.list.concat(res.rows)
					}else{
						this.$toast('Data loading error')
					}
					if(res.rows.length==0){
						this.ismore=true
					}
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			onClick(orderno){
				this.$router.push({path:'/groupswait/'+orderno})
			}
		}
	})
</script>

<style>
	.gifts-node{width: 90vw;background-color: #fff;border-radius: 5px;margin:10px auto;padding:10px}
	.van-card{background-color: #fff;}
</style>
