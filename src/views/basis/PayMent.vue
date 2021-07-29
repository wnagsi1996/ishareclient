<template>
	<div class="bj">
		<Header title="payment"/>
		<div class="payment">
			<div class="payaddress">
				<div class="payaddress-title">
					<h3>Shpping Address</h3>
					<van-icon name="edit" @click="toAddress" />
				</div>
				<div class="payaddress-info" v-if="address.name!=''">
					<p>{{address.name}}</p>
					<p>{{address.phone}}</p>
					<p>{{address.txt}}</p>
				</div>
			</div>
			
			<div class="payment-product">
				<van-card v-for="(item,value) in cartproduct" :key="value" :num="item.num" :price="item.spdj" :title="item.sptitle" :thumb="item.pimg" currency="$" class="goods-card">
				  <template #tags>
				    <van-tag plain type="danger">{{item.skuattr}}</van-tag>
				  </template>
				</van-card>
			</div>
			
			<div class="payment-remark">
				 <van-field v-model="remarkval" type="textarea" placeholder="Order remark" />
			</div>
			
			<van-cell-group>
			  <van-cell title="Product Total" :value="'$'+totalPrice" />
			  <van-cell v-if="couponBool" title="Coupon" is-link :value="coupon.money==0?'Select':coupon.money" @click="showActionSheet=true" />
			  <van-cell v-if="integral>0" title="Integral Exchange" :value="integral" />
			  <van-cell v-if="income>0" title="Income" :value="income" />
			  <van-cell v-if="balancePay>0" title="Balance Payment" :value="balancePay" />
			  <van-cell v-if="pay>0" title="Pay Extra" :value="'$'+pay" />
			</van-cell-group>
			<br />
			<template v-if="pay>0">
				<van-button v-if="isweixin" type="primary" :disabled="disabled" block size="small" @click="paysubmit1">WeChat Pay</van-button>
				<van-button v-else type="info" :disabled="disabled" block size="small" @click="paysubmit1">Payapl Pay</van-button>
			</template>
			<template v-else>
				<van-button type="info" :disabled="disabled" block size="small" @click="paysubmit1">PAY NOW</van-button>
			</template>
		</div>
		<van-action-sheet v-model="showActionSheet" :actions="actions" @select="onSheetSelect" />
	</div>
</template>

<script>
	import{mapGetters,mapMutations} from 'vuex'
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	import Header from "@/components/Header"
	import {Card,Tag,Field,Cell, CellGroup,Button,ActionSheet  } from 'vant'
	import { isWeiXin } from '@/utils/isWeixin.js'
	import {wxPayjsApiCall} from '@/utils/public.js'
	export default({
		name:'PayMent',
		components:{
			Header,
			[Card.name]:Card,
			[Tag.name]:Tag,
			[Field.name]:Field,
			[Cell.name]:Cell,
			[CellGroup.name]:CellGroup,
			[Button.name]:Button,
			[ActionSheet.name]:ActionSheet
		},
		data(){
			return{
				cartproduct:[],
				remarkval:'',
				totalPrice:0,   //产品总价
				income:0,  //收入支付
				integral:0,  //积分支付
				couponBool:false,
				isweixin:isWeiXin(),
				disabled:false,
				address:{
					name:'',
					phone:'',
					txt:'',
					id:''
				},
				iforder:true  ,//true订单无变动  false订单变动
				skus:'',
				ifsw:0  ,//是否是实物
				ifpt:'',//是否拼团
				gmfs:'', //购买份数
				showActionSheet:false,
				actions:[{ name: 'Select Coupon' }, { name: 'Cancel Coupon' }],
				ptorderno:this.$route.query.ptorderno || ''
			}
		},
		beforeRouteEnter(to,from,next) {
			if(to.query.skus=='' || !to.query.skus){
				next(from.path)
			}else{
				next(vm=>{
					if(!vm.keepAliveName.includes('PayMent')){
						vm.$store.commit('keepAliveName/SET_NAME_LIST','PayMent')
					}
					
				})
			}
		},
		created() {
			this.getCartInfo();
			this.getAddress();
			if(this.coupon.id!=0){
				this.couponBool=true
			}
		},
		activated(){
			this.getAddress(this.addressid);
			
		},
		computed:{
			...mapGetters([
				'keepAliveName',
				'addressid',
				'coupon'
			]),
			//余额支付
			balancePay(){
				if(this.income>0){ //判断余额大于0，不是直接返回0
					let money=Number(this.totalPrice)-Number(this.coupon.money)-Number(this.integral/100); //总价-抵用券-积分
					if(this.income>=money){  //判断余额大于还需要支付的金额，直接返回支付的金额，如果小于直接返回余额
						return money;
					}else{
						return this.income;
					}
				}
				return 0
			},
			//计算剩余第三方支付
			pay(){
				let money=Number(this.coupon.money)+Number(this.integral/100)+Number(this.income)
				if(money>=this.totalPrice){
					return 0;
				}else{
					return (Number(this.totalPrice)-money).toFixed(2);
				}
				
			},
		},
		methods:{
			//获取产品信息
			getCartInfo(){
				this.skus=this.$route.query.skus;
				let cartproduct=this.$store.getters.cart;
				this.ifpt=this.$route.query.pt;
				let urlname;
				if(this.ifpt=='' || this.ifpt==undefined){
					urlname='Get_MyCarSCProductsSaleList';
				}else{
					urlname='Get_MyCarSCProductsSaleList_PT'
				};
				
				this.$api.product[urlname]({skus:this.skus}).then(res=>{console.log(res)
					let list= res.rows;
					if(this.cartproduct.length==0){  //第一次加载
						list.forEach(item=>{
							if(this.ifpt=='' || this.ifpt==undefined){
								cartproduct.forEach(n=>{
									if(item.sku==n.sku){
										if(item.num<n.num){
											this.$toast(item.sptitle+' Inventory shortage, has automatically switched the maximum number of purchase')
											this.iforder=false;
										}else{
											item.num=n.num
										}
									}
								});
							this.totalPrice+=item.spdj*item.num
							}else{
								item.num=this.ifpt
								this.totalPrice+=item.spdj*eval(this.ifpt)
							}
							
							item.check=false
							if (item.ifkq == 0){ //只要有一个商品不是卡券，则该订单为实物商品，必须提供收件地址和计算运费
								this.ifsw = 1;
							}
						});
						
							
						console.log(list)
						this.cartproduct=list;
						this.getCoupu();
					}else{   //点击支付再次获取计算
						list.forEach(item=>{
							if(this.ifpt=='' || this.ifpt==undefined){
								this.cartproduct.forEach(n=>{
									if(item.sku==n.sku){
										if(item.cangmnum<n.num){
											this.$toast('Some of the information you have purchased has changed!')
											this.disabled=false
											return;
										}
										this.gmfs+=n.num+',';
									}
									//this.gmfs+="'" + n.num + "',";
									
								})
							}
							
						})
						
						if(this.disabled){
							this.paysubmit2();
						}
						
					}
					
				}).catch(xhr=>{
					
				})
			},
			//编辑地址
			toAddress(){
				this.$router.push({path:'/address',query:{paymen:1}})
			},
			//获取抵用券
			getCoupu(){
				let params={
					orderTotalMoney:this.totalPrice,
					HzPID:'',
					SkuID:'',
					ifJustRight:0
				}
				this.$api.product.getMaxVoucher(params).then(res=>{
					//console.log(res);
					if(res!=''){
					this.income=res.ye
					this.integral=res.jf
						if (res.vid != 0) {
							this.addCoupon({id:res.vid,money:res.vprice});
							this.couponBool=true
						}
					}
				}).catch(xhr=>{
					
				})
			},
			
			//获取地址
			getAddress(addressid=''){
				this.$api.product.GetAddressByAddressID({addressid}).then(res=>{
					if(res.addressid!=0){
						this.address.name=res.firstname+' '+res.lastname,
						this.address.phone=res.lxfs
						this.address.txt=res.address + " " + res.city + " " + res.province + " " + res.county,
						this.address.id=res.addressid
					}
				}).catch(xhr=>{
					
				})
			},
			// 支付
			paysubmit1(){
				this.disabled=true;
				this.getCartInfo();
			},
			async paysubmit2(){
				let paypalpage=0;
				let zffs=0
				let ifwx=1  //微信环境1  非微信0
				if(this.pay>0){
					if(this.isweixin){ //微信环境
					    paypalpage=1
					    zffs=1;
						ifwx=1;
						if(this.address.id=='0'){
							if(this.ifsw==1){
								this.$toast('Please Set Shipping Address.')
								return;
							}
						}
					}else{  //paypal
						paypalpage=0
						zffs=2;
						ifwx=0;
					}
				}else{   //余额
					if(this.address.id=='0'){
						if(this.ifsw==1){
							this.$toast('Please Set Shipping Address.')
							return;
						}
					}
					zffs=1;
					ifwx=0
				}
				
				this.gmfs=this.ifpt?1:this.gmfs.substring(0,this.gmfs.length-1)
				
				let zfinfos = this.totalPrice.toFixed(2) + "," + this.coupon.money + "," + this.coupon.id + "," + this.integral + "," + this.integral/100 + "," + this.balancePay + "," + this.pay + ",0,0," + paypalpage;
				let zfobj = this.skus + "|" + this.gmfs + "|" + zffs + "|" + zfinfos + "|" + this.ifsw + "|" + this.address.id + "|" + this.remarkval; //支付数据
				 
				let zfobj1 = zfobj,zfobj2="";
				//加密
				const res = await this.$api.verify.CreateRSAKey()
				if(res!=null && res!=''){
					if (res.rescode == 0) {
						if (zfobj.length > 117) {
							zfobj1 = zfobj.substring(0, 117);
							zfobj2 = zfobj.substring(117);
						}
						zfobj1 = cmdEncrypt(zfobj1, res.strPublicKeyExponent, res.strPublicKeyModulus, 1);
						if (zfobj2 != ""){
							zfobj2 = cmdEncrypt(zfobj2, res.strPublicKeyExponent, res.strPublicKeyModulus, 1);
						}
					}else{
						this.$toast('Failed to create encrypted data. Please try again.');
						this.disabled=false;
						return;
					}
					
					let params={
						zfobj1,
						zfobj2,
						ifwx,
						ifanonymous:0,
						password:'',
						mwpassword:'',
						qdbs:''
					}
					
					//拼团购买支付
					if(this.ifpt){
						Object.assign(params,{ptorderno:this.ptorderno})
						var resjson=await this.$api.product.CommitPay_PT(params)
					}else{//正常购买支付
						var resjson=await this.$api.product.CommitPay_SC(params)
					}
					if(resjson!=null && resjson!=''){
						if (resjson.fsstate != 0) {
							this.$toast(resjson.fsmes);
							if(resjson.fsstate==2){  //登录超时
								this.$router.push({path:'/login',query:{plan:this.$route.fullPath}})
							}
							if(resjson.fsstate==3){  //抵用券没办法用，还原
								this.coupon.money=0
								this.coupon.id=''
							}
						}else{
							let sku=this.skus.split(',');
							sku.forEach(n=>{
								this.$store.commit('cart/DEL_CART',n)
							})
							if(resjson.fzffs==0){  //余额支付
								//this.$toast('Successful Payment.');
								if(this.ifpt){
									this.$router.push({path:`/groupswaitbuy/${resjson.fsmes}`});
								}else{
									this.$router.push({path:'/paymentsuccessful'});
								}
								
							}else if(resjson.fzffs==2){  //PayPal支付
								window.location.href = resjson.fsmes;
							}else{
								//微信支付
								 if (resjson.fzffs == 1) { //第三方支付-微信
									//判断是否在微信浏览器
									var payurl = "";
									var ua = navigator.userAgent.toLowerCase();
									var isWeixin = ua.indexOf('micromessenger') != -1;
									if (!isWeixin) {
										window.location.href = "/PayMent/WXPay/example/NativePayPage.aspx?rid=" + resjson.fsmes + "&tid=/paymentsuccessful?orderno=" + resjson.fsmes;
									}
									else {
										if (resjson.fwxpay == 0)
											window.location.href = "/PayMent/WXPay/example/ProductPage.aspx?rid=" + resjson.fsmes + "&tid=/paymentsuccessful?orderno=" + resjson.fsmes;
										else
											wxPayjsApiCall(resjson.fwxJsApiParam, "/paymentsuccessful?orderno=" + resjson.fsmes, "/myorder");
									}
								}
							}
						}
					}
					this.disabled=false;
				}else{
					this.$toast('Failed to create encrypted data. Please try again.');
					this.disabled=false;
					return;
				}
				// }).catch(xhr=>{
				// 	this.$toast('Failed to create encrypted data. Please try again.');
				// 	this.disabled=false;
				// 	return;
				// })
				
			},
			onSheetSelect(item){
				if(item.name=='Select Coupon'){
					this.$router.push({path:'/mycoupon',query:{isPay:1}})
				}else{
					this.addCoupon({id:0,money:0})
				}
				this.showActionSheet=false;
			},
			...mapMutations({
				addCoupon:'pay/SET_COUPON'
			})
		},
		
		beforeRouteLeave(to,from,next){
			//判断下一页是否是地址，是就加缓存，不是就清除缓存
			if(to.path!='/address'){
				if(this.keepAliveName.includes('PayMent')){
					this.$store.commit('keepAliveName/DEL_NAME_LIST','PayMent')
				}
			}else{
				if(!this.keepAliveName.includes('PayMent')){
					this.$store.commit('keepAliveName/SET_NAME_LIST','PayMent')
				}
			}
			next();
		}
	})
</script>

<style>
	.bj{background-color: #f7f7f7;height: 100vh;}
	.payment{margin:10px;}
	.payaddress{background-color: #fff;margin:10px auto;padding:10px;border-radius: 5px;display: flex;flex-direction: column;}
	.payaddress-title{display: flex;flex-direction: row;justify-content: space-between;align-items: flex-end;}
	.payaddress-info{margin-top: 10px;border-top:1px solid #f7f7f7}
	.payaddress-info p{margin:8px 0}
	.payaddress-info p:last-child{color:#666}
	.goods-card{background-color: #fff;}
	.payment-product{background-color: #fff;border-radius: 5px;overflow: hidden;}
	.payment-remark{margin:10px 0;background-color: #fff;border-radius: 5px;overflow: hidden;}
</style>
