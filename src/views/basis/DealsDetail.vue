<template>
	<div>
		<Header ref="header" :title="detail.title" shareshow />
		<div class="deals"  v-if="Object.keys(detail).length>0">
			<img class="deals-img" :src="detail.img" />
			<div class='deals-pccen-content'>
				<div class='deals-detail1'>
					<div class='detals-source'>
						<span>{{detail.platformname }} · {{detail | typeTxt}}</span>
					</div>
					<div class='detals-title'>
						<h3>{{detail.title}}</h3>
					</div>
					<div class='detals-attr'>
						<div class='detals-price'>
							<h2>{{detail.zkj}}</h2>
							<p>
								<span v-if="detail.oriprice!='0.00'">${{detail.oriprice}}</span>
								<em>{{detail | logisticsFilter}}</em>
							</p>
						</div>
						<div class='detals-description'>
							<div class='detals-description-info'>
								<p>{{detail.pdesc}} <router-link :to="detail.url" target="_blank">Buy Now at {{detail.platformname}}</router-link></p>
							</div>
						</div>
					</div>
				</div>
				<div class='deals-detail2'>
					<div class='deals-tips' v-if="tipsattr.length>0">
						<div class='deals-tips-left'>Tips</div>
						<ul>
							<li v-for="(n,index) in tipsattr" :key="index">{{n}}</li>
						</ul>
					</div>
					<div class='deals-tips' v-if="featuresattr.length>0">
					<div class='deals-tips-left'>Features</div>
						<ul>
							<li v-for="(n,index) in featuresattr" :key="index">{{n}}</li>
						</ul>
					</div>
				</div>
				<div class="deals-pccen-btn">
					<div class="deals-copy-btn">
						<div class='deals-copy' v-if="code!=''">
							<van-icon name="eye-o" />
							<AutoCopy :txt="code">COPY CODE</AutoCopy>
						</div>
						<div class='deals-btn-buy'>
							<van-button type="danger" v-if="detail.dtype=='0'" @click="handUrl">BUY NOW</van-button>
							<van-button type="danger" v-else  @click="handUrl">SHOP NOW</van-button>
						</div>
					</div>
					<div>
						<div class="order-share">
							<div class="order-share-icon" @click="shareicon('Facebook')">
								<img src="@/assets/icon/Facebook.svg" />
							</div>
							<div class="order-share-icon" @click="shareicon('Messenger')">
								<img src="@/assets/icon/Messenger.png"/>
							</div>
							<div class="order-share-icon" @click="shareicon('Twitter')">
								<img src="@/assets/icon/Twitter.svg" />
							</div>
							<div class="order-share-icon" @click="shareicon('LinkedIn')">
								<img src="@/assets/icon/LinkedIn.svg" />
							</div>
						</div>
					</div>
				</div>
				<div class="deals-details-info">
					<div class="deals-detailsinfo" v-if="detail.code!=''">
						<div class="deals-detailsinfo-icon">
							<van-icon name="eye-o" />
						</div>
						<div class='deals-detailsinfo-p'>
							<p>Code '{{detail.code}}'</p>
						</div>
					</div>
					<div class='deals-detailsinfo'>
						<div class="deals-detailsinfo-icon">
							<van-icon name="clock-o" />
						</div>
						<div class="deals-detailsinfo-p">
							<p>{{detail | showdate}}</p>
							<p>{{detail | fverdateFilter}}</p>
						</div>
					</div>
					<div class="deals-detailsinfo">
						<div class="deals-detailsinfo-icon">
							<van-icon name="fire" />
						</div>
						<div class='deals-detailsinfo-p'>
							<p>Popularity: {{detail.popul}}/5</p>
						</div>
					</div>
					<div class="deals-detailsinfo" v-if="detail.ifstaffpick=='1'">
						<div class="deals-detailsinfo-icon">
							<van-icon name="award" />
						</div>
						<div class='deals-detailsinfo-p'>
							<p style='font-weight:bold;'>Staff Pick</p>
							<p>Deals so good we bought one ourselves</p>
						</div>
					</div>
					<div class='deals-more-product'>
						<div class="deals-moreproduct">
							<p>Not like?</p>
							<router-link to="/dealslist">More Deals</router-link>
						</div>
						<div class="deals-moreproduct">
							<p>Receive free products?</p>
							<router-link to="/freeproductlist">Free Products</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Loading v-else :load="isload" />
		
		<!-- 弹出提示 -->
		<van-overlay :show="overlayShow" @click="handOverlayhide">
		  <div class="wrapper">
		    <div class="block" @click.stop>
				<p>Copied <em>{{code}}</em>!</p>
				<span>Apply this code to your cart at ShopCBD</span>
				<van-button type="danger" block @click="handUrl">BUY NOW</van-button>
			</div>
		  </div>
		</van-overlay>
		
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import Loading from '@/components/Loading' //加载
	import AutoCopy from '@/components/AutoCopy' //复制
	import {Button,Overlay } from 'vant'
	export default({
		name:'DealsDetail',
		components:{
			Header,
			Loading,
			AutoCopy,
			[Button.name]:Button,
			[Overlay.name]:Overlay
		},
		data(){
			return{
				detail:{},  //产品详情数据
				tipsattr:[],  //Tips 的信息数组
				featuresattr:[],  //features的信息数组
				rid:this.$route.query.rid, //产品唯一rid
				isload:{
					isload:true
				},  //是否加载中
				code:'',  //折扣码
				overlayShow:false,  //弹出层
				openUrl:''  //打开的url
			}
		},
		beforeRouteEnter(to,from,next) {
			if(to.query.rid==''){
				next('/dealslist')
			}else{
				next()
			}
		},
		created() {
			this.$api.product.getDealsInfo({did:this.rid}).then(res=>{
				//console.log(res);
				this.detail=res
				if(res.tips!=''){
					this.tipsattr=res.tips.split('^');
				}
				if(res.features!=''){
					this.featuresattr=res.features.split('^');
				}
				if(res.code!=''){
					this.code=res.code
				}
				this.openUrl=res.url
				this.isload.isload=false
			}).catch(err=>{
				
			})
		},
		methods:{
			//调用Header分享方法
			shareicon(name){
				let val={};
				val.name=name;
				this.$refs.header.selShare(val)
			},
			//新页面打开
			handUrl(){
				window.open(this.openUrl)
			},
			handOverlayhide(){
				this.overlayShow=false
			},
			// 复制
			// copy(code){
			// 	let clipboard = new Clipboard('.copy',{
			// 		text:()=>{
			// 			return code
			// 		}
			// 	});
			// 	  clipboard.on('success', e => {
			// 		  this.$toast('Copy Success')
			// 		//console.log('复制成功')
			// 		// 释放内存
			// 		clipboard.destroy();
			// 		this.overlayShow=true
			// 	  })
			// 	  clipboard.on('error', e => {
			// 		  this.$toast('Copy failed')
			// 		// 不支持复制
			// 		//console.log('该浏览器不支持自动复制')
			// 		// 释放内存
			// 		clipboard.destroy();
			// 	  })
			// }
		},
		filters:{
			logisticsFilter:(val)=>{
				let logistics;
				let wlprice = parseFloat(val.wlprice);
				if (wlprice == 0)
					wlprice = "";
				switch (val.wltype) {
					case "0":
						if (val.wljsfs == "0") {
							if (wlprice == "")
								logistics = "+free shipping";
							else
								logistics = "+$" + wlprice + " shipping";
						}
						else if (val.wljsfs == "1")
							logistics = "+free shipping w/ $" + wlprice;
						else if (val.wljsfs == "2")
							logistics = "+free shipping w/ Prime";
						else
							logistics = "+free shipping";
						break;
					case "1":
						logistics = "+pickup at " + val.platformname;
						break;
					case "2":
						logistics = "";
						break;
					case "3":
						logistics = "+digital download";
						break;
				}
				return logistics;
			},
			showdate:(n)=>{
				let total = n.fcjsj_span;
				let minute = parseInt(total / 60); //计算整数分钟数
				let jsday = parseInt(total / (24 * 60 * 60)); //计算整数天数
				let jsafterDay = total - jsday * 24 * 60 * 60; //取得算出天数后剩余的秒数
				let jshour = parseInt(total / (60 * 60)); //计算整数小时数
				let week = parseInt(jsday / 7);
				let month = parseInt(jsday / 30);
				let year = parseInt(jsday / 365);
				let showdate = "", showdate1 = "";
				if (minute == 0) {
					showdate = "just recently";
					showdate1 = "Published " + showdate;
				} else if (minute > 0 && jshour == 0) {
					if (minute == 1)
						showdate = minute + " minute ago";
					else
						showdate = minute + " minutes ago";
					showdate1 = "Published " + showdate;
				} else if (jshour > 0 && jsday == 0) {
					if (jshour == 1)
						showdate = jshour + " hr ago";
					else
						showdate = jshour + " hrs ago";
					showdate1 = "Published " + showdate;
				} else if (jsday > 0 && week == 0) {
					if (jsday == 1)
						showdate = jsday + " day ago";
					else
						showdate = jsday + " days ago";
					showdate1 = "Published " + n.fcjsj;
				} else if (0 < week && month == 0) {
					if (week == 1)
						showdate = week + " week ago";
					else
						showdate = week + " weeks ago";
					showdate1 = "Published " + n.fcjsj;
				} else if (0 < month && year == 0) {
					if (month == 1)
						showdate = month + " month ago";
					else
						showdate = month + " months ago";
					showdate1 = "Published " + n.fcjsj;
				} else if (year > 0) {
					if (year == 1)
						showdate = year + " year ago";
					else
						showdate = year + " years ago";
					showdate1 = "Published " + n.fcjsj;
				}
				return showdate1;
			},
			fverdateFilter:(n)=>{
				 let fversj = n.fversj_span;
				let fverminute = parseInt(fversj / 60); //计算整数分钟数
				let fverhour = parseInt(fversj / (60 * 60)); //计算整数小时数
				let fverdate = "";
				if (fverminute == 0) {
					fverdate = "Verified just recently";
				} else if (0 < fverminute && fverhour == 0) {
					fverdate = "Verified " + fverminute + " minutes ago";
				} else if (0 < fverhour && fverhour < 24) {
					fverdate = "Verified " + fverhour + " hrs ago";
				} else {
					fverdate = "Verified " + n.fversj;
				}
				return fverdate;
			},
			//时间显示
			typeTxt:(txt)=>{
				let total = txt.fcjsj_span;
				let minute = parseInt(total / 60); //计算整数分钟数
				let jsday = parseInt(total / (24 * 60 * 60)); //计算整数天数
				let jsafterDay = total - jsday * 24 * 60 * 60; //取得算出天数后剩余的秒数
				let jshour = parseInt(total / (60 * 60)); //计算整数小时数
				let week = parseInt(jsday / 7);
				let month = parseInt(jsday / 30);
				let year = parseInt(jsday / 365);
				let showdate = "";
				if (minute == 0) {
					showdate = "just recently";
				} else if (minute > 0 && jshour == 0) {
					if (minute == 1)
						showdate = minute + " minute ago";
					else
						showdate = minute + " minutes ago";
				} else if (jshour > 0 && jsday == 0) {
					if (jshour == 1)
						showdate = jshour + " hr ago";
					else
						showdate = jshour + " hrs ago";
				} else if (jsday > 0 && week == 0) {
					if (jsday == 1)
						showdate = jsday + " day ago";
					else
						showdate = jsday + " days ago";
				} else if (0 < week && month == 0) {
					if (week == 1)
						showdate = week + " week ago";
					else
						showdate = week + " weeks ago";
				} else if (0 < month && year == 0) {
					if (month == 1)
						showdate = month + " month ago";
					else
						showdate = month + " months ago";
				} else if (year > 0) {
					if (year == 1)
						showdate = year + " year ago";
					else
						showdate = year + " years ago";
				}
				return showdate;
			}
		}
	})
</script>

<style scoped>
	.deals-img{max-width: 100%;display: block;margin:0 auto}
	.deals-pccen-content{width: 94vw;margin: 20px auto 0;}
	.detals-source span{color:#7f8387;}
	.detals-title h3{margin:10px 0;}
	.detals-price{margin:10px 0 15px;}
	.detals-price h2{color:#00a863;display:inline-block; margin:0;font-size: 24px;}
	.detals-price p{display:inline-block;color:#7f8387;margin-left:5px;}
	.detals-price p span{text-decoration:line-through;padding-right:10px;}
	.detals-price p em{font-size:12px;font-style:italic}
	.detals-description-info p{display: inline-block;}
	.detals-description-info a{color: #e41c1d;}
	.deals-tips{margin:20px 0 0 10px;}
	.deals-tips-left{width:100px;display:inline-block;vertical-align:top;color:#000;font-weight:bold;font-size: 16px;}
	.deals-tips ul{display:inline-block;vertical-align:top;padding-left: 20px;margin-top: 5px;}
	.deals-tips ul li{color:#303437; list-style:disc;padding: 2px 0;}
	.deals-pccen-btn{margin-top: 30px;}
	.deals-copy-btn{display: flex;align-items: center;justify-content: flex-end;}
	.deals-copy{padding-right: 20px;display: flex;align-items: center;}
	.deals-copy i{font-size: 18px;}
	.deals-copy span{padding-left: 5px;}
	.deals-btn-buy button{padding:0 30px}
	.order-share{width:50vw;display: flex; align-items: center;margin:30px 0 20px 49%;text-align: right;}
	.order-share-icon{width: 25%;text-align: center;}
	.order-share-icon img{width: 60%;}
	.order-share-icon{font-size:18px}
	.deals-detailsinfo{display: flex;width: 100vw; align-items: center;padding: 10px 0;}
	.deals-detailsinfo-icon{width: 50px;;}
	.deals-detailsinfo-icon i{font-size: 20px;color: #a0a0a0;}
	.deals-detailsinfo-p p{padding: 2px 0;}
	.deals-more-product{margin-top: 20px;}
	.deals-moreproduct{display: flex;margin:15px 0;}
	.deals-moreproduct p{width: 50%;color: #7f8387;}
	.deals-moreproduct a{color: #E41C1D;font-weight: bold;}
	.wrapper { display: flex; align-items: center; justify-content: center; height: 100%; }
	.block { width: 80vw; background-color: #fff; padding:20px 10px;}
	.block p{font-size: 24px;text-align: center;margin:10px 0}
	.block p em{font-weight: bold;font-style: normal;}
	.block>span{max-width: 200px;color: rgb(0 0 0 / 70%);margin: 20px auto;display: block;text-align: center;}
</style>
