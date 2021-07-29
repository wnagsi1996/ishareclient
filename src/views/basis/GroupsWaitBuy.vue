<template>
	<div>
		<Header ref="header" title="Groups Shopping" shareshow />
		<div class="head">
			<div class="img">
				<van-image fit="scale-down" :src="orderInfo.shareimg" alt="" />
			</div>
			<div class="info">
				<div class="title">{{orderInfo.pname}}</div>
				<div class="price">
					<span>Group Buy Price:</span>
					<span>${{orderInfo.pprice}}</span>
				</div>
			</div>
		</div>
		<div class="coninter">
			<div class="node" v-if="orderInfo.state==0 || orderInfo.state==4">
				<p>Invited <em>{{orderInfo.psalenum}}</em> person to buy successfully</p>
				<div class="time">
					<span>Remaining </span>
					<van-count-down class="count" millisecond :time="orderInfo.djsms*1000" format="HH:mm:ss" />
				</div>
			</div>
			<div v-else-if="orderInfo.state==1" class="pd-status">
				<van-icon name="checked" />
				<span>Group Buy Success</span>
			</div>
			<div v-else class="pd-status" style="color:#e41c1d">
				<van-icon name="clear" />
				<span>Group Buy Fail</span>
			</div>
			<div class="user">
				<van-image class="img" round fit="scale-down" :src="liimgs[0]"></van-image>
				<van-image class="img" round fit="scale-down" :src="showHelpImg"></van-image>
			</div>
			<div class="btn" v-if="orderInfo.state==0 || orderInfo.state==4">
				<van-button type="info" block @click="_handShare">Invite Friends Buy</van-button>
				<p>Shared to friends or groups Up to 98% success rate of Group Shopping</p>
			</div>
		</div>
		<!-- 拼购 -->
		<div class="groupbuy-item">
		 <div class="groupbuy-item-title">
			 <span>Discount for Two Rules</span>
			 <router-link to="/freerule">View More</router-link>
		 </div>
		 <div class="groupbuy-item-info">
			 If a Group Buy consists of less than 2 buyers, a refund will be automatically transferred into your account.
		 </div>
		</div>
		<Loading :load="loading" />
	</div>
</template>

<script>
	import {CountDown,Button,Icon} from 'vant'
	import Header from '@/components/Header'
	import Loading from '@/components/Loading' //加载
	export default({
		name:'GroupsWaitBuy',
		components:{
			Header,
			[CountDown.name]:CountDown,
			[Button.name]:Button,
			[Icon.name]:Icon,
			Loading
		},
		data(){
			return{
				orderno:this.$route.params.orderno, //拼团订单号
				orderInfo:{},
				loading:{//加载组件
					isload:true,  //是否加载中
					istype:'circular',  //加载类型
					iscolor:'#c9c9c9',	//加载颜色
					opacity:false  //背景是否透明/true为不透明
				},
				liimgs:[]
			}
		},
		beforeRouteEnter(to,from,next) {
			if(to.params.orderno!='' && to.params.orderno){
				next()
			}else{
				next(from.path)
			}
		},
		computed:{
			showHelpImg(){
				return this.liimgs[1]?this.liimgs[1]:require('../../assets/images/group-icon1.png')
			}
		},
		created() {
			this.getOrderInfo()
		},
		methods:{
			//获取订单状态
			getOrderInfo(){
				this.$api.product.getPDProductOrder_FreeWait({pdorderno:this.orderno}).then(res=>{
					console.log(res) //状态0：拼单中 1：已经完成拼单 2：拼单失败 4:已经支付（等待第三方回调确认）
					if(res.rescode==0){
						this.liimgs=res.liimgs.split(',');
						Object.assign(this.orderInfo,res)
						Object.assign(this.loading,{isload:false})
					}else if(res.rescode==2){
						this.$router.push(`/groupsbuy/${res.resdesc}`)
					}else if(res.rescode==3){
						this.$message.warning(res.resdesc);
						this.$router.back()
					}else{
						this.$message.warning('data loading fail')
					}
				}).catch(xhr=>{
					
				})
			},
			//分享
			_handShare(){
				this.$refs.header.shareLink()
			}
		}
	})
</script>

<style scoped>
	.head{
		display: flex;
		padding:15px;
		background-color: #fff;
	}
	.head .img{
		width:100px;
		height: 100px;
	}
	.head .info{
		flex: 1;
		margin-left: 10px;
		
	}
	.head .info .title{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.head .info .price{
		margin-top: 10px;
	}
	.head .info .price span:first-child{
		color: #666;
	}
	.head .info .price span:last-child{
		color: #e41c1d;
		font-size: 20px;
	}
	.coninter{
		margin-top: 15px;
		padding: 15px;
		background-color: #fff;
	}
	.coninter .node{
		text-align: center;
	}
	.coninter .pd-status{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
		color: #009054;
	}
	.coninter .pd-status span{
		margin-left: 5px;
		font-size: 20px;
	}
	.coninter .node p em{
		color: #f39c13;
		font-style: normal;
		font-size: 18px;
	}
	.coninter .node .time{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 8px;
	}
	.coninter .node .time span,
	.coninter .node .time .count{
		color: #e41c1d;
		font-size: 18px;
		padding: 0 4px;
	}
	.coninter .node .time .count{
		width: 110px;
	}
	.coninter .user{
		display: flex;
		align-items: center;
		justify-content: center;
		margin:15px auto;
	}
	.coninter .user .img{
		width: 60px;
		height: 60px;
		margin: 0 10px;
	}
	.coninter .btn p{
		color: #666;
		margin-top: 5px;
	}
	.groupbuy-item{padding:15px;margin:10px auto;display: flex; flex-direction: column;background-color: #fff;}
	.groupbuy-item-title{display: flex;}
	.groupbuy-item-title span{display: inline-block; flex: 1;}
	.groupbuy-item-title a{width:80px;display: inline-block;text-align: right;color: #e41c1d;}
	.groupbuy-item-info{padding:15px 0;color: #666;}
</style>
