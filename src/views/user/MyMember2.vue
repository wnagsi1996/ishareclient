<template>
	<div class="memberBJ">
		<Header title="My 2 Level Members" />
		<RefreshLoading :ismore="ismore" :list="list" @load="load">
			<div class="member">
				<div class="member-node" v-for="(item,index) in list" :key="index">
					<div class="member-node-img">
						<van-image :src="item.headimg" width="40" round></van-image>
					</div>
					<div class="member-node-info">
						<div class="member-node-title">
							{{item.yhname}}
						</div>
						<div class="member-node-desc">
							<div class="member-node-date">
								{{item.zcsj}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</RefreshLoading>
	</div>
</template>

<script>
	import RefreshLoading from '@/components/RefreshLoading'
	export default({
		name:'MyMember',
		components:{
			RefreshLoading
		},
		data(){
			return{
				ismore:false,
				list:[],
				index:0,
				id:''
			}
		},
		created(){
			this.id=this.$route.params.id;console.log(this.id)
		},
		methods:{
			load(i=0){
				if(i!=0){
					this.index=0
				}
				this.$api.user.getShareYQRecordList2({hyid:this.id,pageindex:this.index}).then(res=>{
					if(res!=''){
						if(i!=0){
							this.list=[]
						}
						this.index++
						this.list=this.list.concat(res.rows)
					}
					if(res.rows.length==0){
						this.ismore=true
					}
				}).catch(xhr=>{
					console.log(xhr)
				})
			}
		}
	})
</script>

<style scoped>
	.member{width: 90vw;padding: 10px;background-color: #fff;margin:10px auto;border-radius: 5px;}
	.member-node{display: flex;border-bottom:1px solid #f7f7f7;padding:10px 0}
	.member-node-img{width: 56px;}
	.member-node-info{width:100%}
	.member-node-title{width: 100%;height:20px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
	.member-node-desc{display: flex;justify-content: space-between;margin-top: 8px;}
	.member-node-date{text-align: right;color: #666;}
</style>
