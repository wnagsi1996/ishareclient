<template>
	<div class="gifts">
		<Header title="My Like" />
		<RefreshLoading :ismore="ismore" :list="list" @load="load">
			<div class="gifts-node">
				<van-card
				  v-for="(item,index) in list"
				  :key="index"
				  :price="item.spjg"
				  :title="item.sptitle"
				  :thumb="item.pimg"
				  currency="$"
				>
					<template #footer>
					    <van-button size="mini" @click="cancelFollow(item.spid)">Cancel Follow</van-button>
					</template>
				</van-card>
			</div>
		</RefreshLoading>
	</div>
</template>

<script>
	import { Card,Button } from 'vant';
	import RefreshLoading from '@/components/RefreshLoading'
	export default({
		name:'MyLike',
		components:{
			[Card.name]:Card,
			[Button.name]:Button,
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
				this.$api.user.getUserSCFocusSaleList({pageindex:this.index}).then(res=>{
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
			//取消关注
			cancelFollow(pid){
				let params={
					pid
				}
				this.$api.user.cancelFocus(params).then(res=>{
					if(res=='2'){
						this.$toast('success');
						this.list=this.list.filter(n=>n.spid!=pid);
					}else{
						if(res=='0'){
							this.$toast('Fuccess')
						}else{
							this.$toast(res)
						}
					}
				})
			}
		}
	})
</script>

<style scoped>
	.gifts-node{width: 90vw;background-color: #fff;border-radius: 5px;margin:10px auto;padding:10px}
	.van-card{background-color: #fff;}
</style>
