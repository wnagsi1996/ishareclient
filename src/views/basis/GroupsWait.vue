<template>
	<div class="bj">
		<Header ref="header" title="Groups Wait" shareshow />
			
		<div v-if="Object.keys(orderInfo).length!=0">
			<div class="orderimg"><img :src="orderInfo.shareimg" /></div>
			<div class="order-info">
				<div class="order-info-desc bjWhite">
					<h3>{{orderInfo.pname}}</h3>
					<p>{{orderInfo.pattrstr}}</p>
				</div>
				<div class="order-state ">
					<div class="order-state-txt">{{orderInfo.pdstate}}</div>
					<div class="order-time" v-if="orderInfo.state==0">
						<van-count-down millisecond :time="(orderInfo.djsms)*1000" format="DD day HH:mm:ss" />
					</div>
				</div>
				<div class="bjWhite" v-if="orderInfo.state==0">
					<div class="order-numtxt">
						<van-icon name="friends-o" />
						<p>Also need invite <em>{{orderInfo.alsoneednum}}</em> Friends to get this product for free</p>
					</div>
					<div class="order-sharenow" v-if="isweixin">
						Sorry that Wechat offcial rules doesn't allowed us to share this now, please choose facebook friends to help you.
					</div>
				</div>
				<div class="order-share bjWhite" v-if="orderInfo.state=='0'">
					<div class="order-share-icon" @click="shareicon('Facebook')">
						<img src="@/assets/icon/Facebook.svg" />
					</div>
					<div class="order-share-icon" @click="shareicon('Messenger')">
						<img src="@/assets/icon/Messenger.png"/>
					</div>
					<div class="order-share-icon" @click="shareicon('Twitter')">
						<img src="@/assets/icon/Twitter.svg" />
					</div>
					<div class="order-share-icon" @click="share">SHARE</div>
				</div>
				<div class="order-info-friends">
					<div class="order-info-friendscen">
						<div class="order-info-friendsdesc" v-for="(item,value) in orderdivShow" :key="value">
							<img v-if="orderPhoto[value]" :src="orderPhoto[value]" >
							<span v-else>?</span>
						</div>
					</div>
				</div>
				<div class="order-buy bjWhite" v-if="orderInfo.state=='0'">
					<div class="order-buy-title">If you don't want to invite more friends, you can choose to buy directly. Certainly, the more friends you invite, the less you have to pay.</div>
					<div class="order-buy-desc">
						<div class="order-buy-price">
							<span>${{orderInfo.d3fprice}}</span>
							<p>${{orderInfo.curprice}}</p>
						</div>
						<div class="order-buy-btn">
							<van-button type="danger" size="small" :disabled="disabled" @click="buyShow">Buy Now ${{orderInfo.curprice}}</van-button>
						</div>
					</div>
				</div>
				<div class="order-addr bjWhite" v-if="orderInfo.pdtype!='3'">
					<div class="order-rules-title">Shipping Address <van-icon v-if="address[0]==''" name="edit" @click="setAddr" /></div>
					<div v-if="address[0]!=''" class="order-addr-info">
						<p>{{address[0]}}</p>
						<p>{{address[1]}}</p>
						<p>{{address[2]}}</p>
					</div>
					<div v-else class="order-rules-desc">
						<div>Plz leave your shipping address here first so that we can inform you if you are selected as the winner and then send the shoes out.</div>
					</div>
				</div>
				<div class="order-rules bjWhite">
					<div class="order-rules-title">Activity Rules</div>
					<div class="order-rules-info">
						<p>1. You just need to invite {{orderInfo.alsoneednum}} friends to help you in 7 days.</p>
						<p>2. We will send the product to you after {{orderInfo.alsoneednum}} users helped you.</p>
					</div>
				</div>
				<div class="order-information bjWhite" v-if="orderInfo.ifwl=='1'">
					<div class="order-rules-title">Express information</div>
					<div v-if="orderInfo.orderno_wl!=''" class="order-addr-info">
						<p>{{orderInfo.company_wl}}</p>
						<p>{{orderInfo.orderno_wl}}</p>
						<p>{{orderInfo.sendate_wl}}</p>
					</div>
					<div v-else class="order-rules-desc">
						<div>No logistics required</div>
					</div>
				</div>
				<JoinSocial />
			</div>
		</div>
		
		<Loading v-else :isload="isload" />
		
		<!-- 弹出支付 -->
		<van-action-sheet v-model="actionshow" title="Disount Price Purchase">
		  <div class="content">
			  <h4>You have invited {{orderInfo.alsoneednum}} friends, you can buy it with ${{orderInfo.curprice}} directly</h4>
			  <van-cell-group>
			    <van-cell title="Price" :value="'$'+orderInfo.d3fprice" />
			    <van-cell title="Discount Price" :value="'$'+orderInfo.curprice" />
			    <van-cell title="Balance Payment" :value="'$'+orderInfo.zhye" />
			    <van-cell title="Pay Extra" :value="'$'+payMoney" />
			  </van-cell-group>
			  <template v-if="showpay">
			  	<van-button v-if="isweixin" type="primary" :disabled="disabled" block size="small" @click="buy">WeChat Pay</van-button>
			  	<van-button v-else type="info" :disabled="disabled" block size="small" @click="buy">Payapl Pay</van-button>
			  </template>
			  <template v-else>
			  	<van-button type="info" :disabled="disabled" block size="small" @click="buy">PAY NOW</van-button>
			  </template>
		  </div>
		</van-action-sheet>
	</div>
</template>

<script>
	import { CountDown,Button,ActionSheet,Cell, CellGroup  } from 'vant';
	import JoinSocial from '@/components/JoinSocial'
	import { isWeiXin } from '@/utils/isWeixin.js'
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	import {mapGetters} from "vuex"
	import Loading from '@/components/Loading' //加载
	export default({
		name:'GroupsWaitBuy',
		components:{
			JoinSocial,
			[CountDown.name]:CountDown,
			[Button.name]:Button,
			[Cell.name]:Cell,
			[CellGroup.name]:CellGroup,
			[ActionSheet.name]:ActionSheet,
			Loading
		},
		data(){
			return{
				orderno:'',
				orderInfo:{},
				time:'',
				orderPhoto:[],
				orderdivShow:[],  //展示的数据
				address:[],
				isweixin:isWeiXin(),
				disabled:false,
				actionshow:false,
				payMoney:0,
				showpay:true,
				isload:true  //是否加载中
			}
		},
		computed:{
			...mapGetters(['userInfo'])
		},
		created() {
			this.orderno=this.$route.params.orderno;
			this.getOrderInfo();
		},
		methods:{
			//获取订单状态
			getOrderInfo(){
				this.$api.product.getPDProductOrderInfo_Wait({pdorderno:this.orderno}).then(res=>{
					console.log(res) //状态0：拼单中 1：已经完成拼单 2：拼单失败 4:已经支付（等待第三方回调确认）
					if(res.rescode==0){
						this.orderInfo=res
						for(let i=0;i<res.alsoneednum;i++){
							this.orderdivShow.push(i);
						}
						this.orderPhoto=res.helpUserHeadimg.split(',')
						this.address=res.UserAddr.split("^");
						document.title=`${this.userInfo.ncname} can get it free and invite you to get free too.${res.pname}`;
					}else{
						
						this.$router.push({path:`/grouphelp/${res.resdesc}`})
					}
					
				}).catch(xhr=>{
					
				})
			},
			//分享弹出
			share(){
				this.$refs.header.shareLink()//调用Header组件分享方法
			},
			//调用Header分享方法
			shareicon(name){
				let val={};
				val.name=name;
				this.$refs.header.selShare(val)
			},
			//购买弹出
			buyShow(){
				this.actionshow=true;
				let ifjg = (this.orderInfo.d3fprice - this.orderInfo.zhye).toFixed(2);
				if (ifjg > 0) {
					this.payMoney=ifjg
					this.showpay=true
				}else{
					this.payMoney=0;
					this.showpay=false
				}
			},
			//购买
			buy(){
				let pdj=0 //传回后台的第三方支付金额
				let pye=0 //传给后台余额支付金额
				let ifjg = (this.orderInfo.curprice-this.orderInfo.zhye).toFixed(2);  //产品价格减去余额
				if(ifjg<=0){
					pye = this.orderInfo.curprice;
				}else{
					pdj = ifjg;
					pye = this.orderInfo.zhye
				}
				
				let zffs=1; //第三方支付方式,1微信 2PayPal
				if(isWeiXin){
					zffs=1
				}else{
					zffs=2
				}
				
				let zfinfos = pdj + "," + pye;
				let zfobj = zfinfos + "|" + this.orderno + "|" + zffs; //支付数据
				let strPublicKeyExponent = "", strPublicKeyModulus = "";
				this.$api.verify.CreateRSAKey().then(res=>{
					if(res!=null && res!=''){
						if (res.rescode == 0) {
							strPublicKeyExponent = res.strPublicKeyExponent;
							strPublicKeyModulus = res.strPublicKeyModulus;
							 zfobj = cmdEncrypt(zfobj, strPublicKeyExponent, strPublicKeyModulus, 1);
							 this.$api.product.CommitPay_Buy_PD({zfobj}).then(resjson=>{
								 if(resjson!=null && resjson!=''){
								 	if (resjson.fsstate != 0) {
								 		this.$toast(resjson.fsmes);
								 		if(resjson.fsstate==2){  //登录超时
								 			this.$router.push({path:'/login'})
								 		}
								 	}else{
								 		if(resjson.fzffs==0){  //余额支付
								 			this.$toast('Successful Payment.');
											this.getOrderInfo();
								 		}else if(resjson.fzffs==2){  //PayPal支付
								 			window.location.href = resjson.fsmes;
								 		}else{
								 			//微信支付
								 		}
								 	}
								 }
								 this.disabled=false
							 }).catch(xhr=>{
								 this.$toast('The shopping cart is empty and cannot be submitted for payment.');
								 this.disabled=false;
							 })
						}else{
							this.$toast('Failed to create encrypted data. Please try again.');
							this.disabled=false;
						}
					}else{
						this.$toast('Failed to create encrypted data. Please try again.');
						this.disabled=false;
					}
				}).catch(xhr=>{
					this.$toast('Failed to create encrypted data. Please try again.');
					this.disabled=false;
				})
			}
		}
	})
</script>

<style scoped>
	.bj{background-color: #f7f7f7;padding:0 0 10px}
	.orderimg{width: 100vw;}
	.orderimg img{width: 100%;}
	.order-info{width: 96vw;margin:10px auto 0;}
	.bjWhite{background-color: #fff;border-radius: 5px;padding:10px;margin:10px auto;}
	.order-info-desc p{color: #777;margin:10px 0}
	.order-state{height: 40px;line-height: 40px;display: flex; align-items: center;font-size:16px;background-color: #f39a0f;border-radius: 5px;padding:0 10px;color: #fff;margin:15px 0}
	.order-state-txt{width: 50%;}
	.order-time{width: 50%;}
	.order-time .van-count-down{color: #fff;text-align: right;font-size: 16px;}
	.order-numtxt{display: flex;align-items: center;}
	.order-numtxt i{font-size:24px;}
	.order-numtxt p{margin-left: 5px;font-size:16px}
	.order-numtxt p em{color: #e41c1d;font-style: normal;}
	.order-sharenow{color: #777;margin:10px 0;}
	.order-share{display: flex; align-items: center;margin:20px 0}
	.order-share-icon{width: 25%;text-align: center;}
	.order-share-icon img{width: 36%;}
	.order-share-icon{font-size:18px}
	.order-info-friends{padding: 0 10px;max-height: 60vw;overflow: auto;}
	.order-info-friendscen{display: flex;justify-content: space-between;flex-wrap: wrap;}
	/* .order-info-friendsall{text-align: right;padding:0 5px 5px 0;color: #e41c1d;} */
	.order-info-friendsdesc{width:16vw;height:16vw;line-height:18vw;margin:8px 0;border-radius: 50%;text-align: center;border:1px dashed #E41C1D}
	.order-info-friendsdesc img{width: 100%;}
	.order-info-friendsdesc span{font-size: 36px;color: #E41C1D;}
	.order-buy-desc{display: flex;margin-top:20px;align-items: flex-end;}
	.order-buy-price{width: 50%;}
	.order-buy-price span{color: #777;text-decoration: line-through;}
	.order-buy-price p{display: inline-block;;color: #e41c1d;font-size:20px;padding-left:10px}
	.order-buy-btn{width:50%;text-align: right;}
	.order-addr-info{margin-top: 10px;}
	.order-addr-info p{margin:8px 0}
	.order-addr-info p:last-child{color:#666}
	.order-rules-desc{color:#666}
	.order-rules-title{font-size:18px;border-bottom: 1px solid #f7f7f7;padding-bottom: 5px;margin-bottom: 10px;}
	.order-rules-title i{float: right;}
	.order-rules-info p{padding:4px 0;color: #666;}
	.content{padding: 10px;}
	.content h4{padding:10px}
</style>
