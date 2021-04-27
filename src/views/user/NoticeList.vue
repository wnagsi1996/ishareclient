<template>
	<div>
		<Header title="Notice List" />
		<div class="list">
			<div class="list-item" v-for="item in list" :key="item.nid" @click="hankShow(item.nid)">
				<div class="list-top">
					<div class="list-name">{{item.flb | type}}</div>
					<div class="list-time">{{item.frq}}</div>
				</div>
				<div class="list-info">{{item.fntitle}}</div>
			</div>
		</div>
		<van-popup v-model="show" position="bottom" round :style="{ height: '50%' }" >
			<div ref="detail" class="detail"></div>
		</van-popup>
	</div>
</template>

<script>
	import {Popup} from 'vant'
	export default({
		name:'NoticeList',
		data(){
			return{
				list:[],
				show:false,
				detail:''
			}
		},
		components:{
			[Popup.name]:Popup
		},
		created(){
			this.getList();
		},
		methods:{
			//获取消息列表
			getList(){
				this.$api.user.getUserNoticeList().then(res=>{
					console.log(res);
					if(res.rows!=''){
						this.list=res.rows;
					}
				})
			},
			//获取详细信息
			getdetail(nid){
				this.$api.user.getNoticeDetails({nid}).then(res=>{
					if(res!=''){
						res=res.replace('<br>','</p><p>');
						res=`<p>${res}</p>`
						this.$refs.detail.innerHTML =res;
					}
				})
			},
			hankShow(nid){
				this.getdetail(nid);
				this.show=true;
			}
		},
		filters:{
			type(n){
				if(n=='1'){
					return 'System Messages'
				}else{
					return 'General messages'
				}
			}
		}
	})
</script>

<style>
	.list{width: 96vw;margin:0 auto;}
	.list-item{margin:10px auto;background-color: #fff;border-radius: 5px;padding: 10px;}
	.list-top{width: 100%;display: flex;align-items: center;}
	.list-name{width:70%;height: 18px;line-height: 18px;text-overflow: ellipsis;overflow: hidden;white-space: normal;}
	.list-time{width: 30%;text-align: right;}
	.list-info{margin-top: 10px;color: #888;border-top: 1px solid #f7f7f7;padding-top: 10px;}
	.detail{padding:10px;overflow: auto;}
	.detail p{padding:6px 0;line-height: 26px;}
</style>
