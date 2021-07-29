<template>
	<div>
		<Header ref="showSocial" :title="detaildata.ptitle" shareshow />
		<div v-if="Object.keys(detaildata).length>0">
			<van-tabs v-model="activeTabName" stretch @click="handleClick">
				 <van-tab title="Overview" name="Overview">
					 <div>
						 <div>
						 	<Swiper :images="productimg"></Swiper>
						 </div>
						 <div class="product-info">
						 	<div class="product-info-desc">
						 		<h4>{{detaildata.ptitle}}</h4>
						 		<p v-if="detaildata.ifpd=='0' || detaildata.ifpd=='4'">${{detaildata.minspjg}}</p>
						 		<p v-else="detaildata.ifpd=='1' || detaildata.ifpd=='3'">Free</p>
						 		<span>${{detaildata.showpscjg}}</span>
						 	</div>
						 	<div class="product-icon">
						 		<!-- <div class="icon2" @click="showSocial">
						 			<van-icon name="share-o" />
						 		</div> -->
						 		<div class="icon1" @click="like">
									<van-icon v-if="isLike" name="like" />
									<van-icon v-else name="like-o" />
						 		</div>
						 	</div>
							<div v-if="ptInfo.length>0" style="margin-top: 20px;">
								<comment v-for="item in ptInfo" :key="item.orderno" :is="GroupShoppingNodeCom" 
								:infoData="item" @jonNow="showattr('5',item.orderno)"></comment>
							</div>
						 </div>
						 
						 
						 <!-- 加入群组 -->
						 <div class="joinsocial">
						 	<JoinSocial />
						 </div>
						 
						 <!-- 拼购 -->
						 <div class="groupbuy-item" v-if="detaildata.ifpd=='0'">
							 <div class="groupbuy-item-title">
								 <span>Discount for Two Rules</span>
								 <router-link to="/freerule">View More</router-link>
							 </div>
							 <div class="groupbuy-item-info">
								 If a Group Buy consists of less than 2 buyers, a refund will be automatically transferred into your account.
							 </div>
							 <div class="groupbuy-step">
							 	<img src="@/assets/images/groupbuy-img.jpg" />
							 </div>
						 </div>
						 
						 <!-- 购买安全 -->
						 <div class="buyer-protection">
							 <div class="buyer-protection1">
								 <div class="buyer-protection-title">
									 <van-icon name="award" />
									 <span>Buyer Protection</span>
								 </div>
								 <div class="buyer-protection-info">
									 <p><van-icon name="certificate" /><span><em>Full Refund</em> if you don't receive your order.</span></p>
									 <p><van-icon name="certificate" /><span><em>Full or Partial Refund</em> if the item is not as described.</span></p>
								 </div>
							 </div>
						 </div>
						 
						 <!-- 购买导航 -->
						 <van-goods-action v-if="ifpd==0">
						   <van-goods-action-icon icon="cart-o" text="Cart" @click="showattr('0')" />
						   <van-goods-action-icon icon="shop-o" text="Store" @click="hankOpen" />
						   <van-goods-action-button type="warning" text="Buy Now" @click="showattr('1')" />
						   <van-goods-action-button type="danger" text="Group Shopping" @click="showattr('2')" />
						 </van-goods-action>
						 <van-goods-action v-if="ifpd==1">
							 <van-goods-action-icon icon="comment-o" text="Help" @click="helpShow=true" />
							 <van-goods-action-button type="warning" text="Share Get" @click="showattr('3')" />
						 </van-goods-action>
						 <van-goods-action v-if="ifpd==3">
							 <van-goods-action-icon icon="comment-o" text="Help" @click="helpShow=true" />
						 	<van-goods-action-button type="warning" text="Free Get" @click="showattr('4')" />
						 </van-goods-action>
						 <div style="height: 50px;width: 100vw;"></div>
					 </div>
				 </van-tab>
				 <!--店铺产品-->
				 <van-tab title="Store" name="Store">
					 <div class="detail-store" ref="storeInfo" id="storeInfo">
						 <router-link :to="'/shop/'+detaildata.pstoreid" style="display: block;">
							 <h3>{{detaildata.pstorename}}</h3>
							 <p>Visit Store</p>
						 </router-link>
					 </div>
					 <div v-if="isstore">
						 <div id='parentId'>
							<ProductList :productList="shopProductList" :replace="true" @loadproductdata="loadproductdata" :productTotal="shopProductTotal" />
						 </div>
					 </div>
				 </van-tab>
			</van-tabs>
		</div>
		
		<Loading :load="loading" />
		
		<!-- 属性 -->
		<van-sku  v-model="show" :sku="sku" :goods-id="pid" :goods="goods" :reset-selected-sku-on-hide="true"
			stepper-title="Quantity" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" ref="getSkuData">
			<!-- 自定义 sku-header-price -->
			  <template #sku-header-price="props">
			    <div class="van-sku__goods-price">
			      <span class="van-sku__price-symbol">$</span
			      ><span class="van-sku__price-num">{{ props.price}}</span>
			    </div>
			  </template>
			<!-- 自定义 sku actions -->
			  <template #sku-actions="props">
			    <div class="van-sku-actions">
						<van-button v-if="isBtn==0" square size="large" type="warning" @click="props.skuEventBus.$emit('sku:buy')">Add Cart</van-button>
						<van-button v-else-if="isBtn==1" square size="large" type="warning" @click="props.skuEventBus.$emit('sku:buy')">Buy Now</van-button>
						<!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
						<van-button v-else-if="isBtn==3" square size="large" type="danger" @click="props.skuEventBus.$emit('sku:buy')" >Share Get</van-button>
						<van-button v-else square size="large" type="danger" @click="props.skuEventBus.$emit('sku:buy')" >Group Shopping</van-button>
			    </div>
			  </template>
		</van-sku>
		
		<!-- 如何免费领产品弹出层 -->
		<van-popup v-model="helpShow" round position="bottom">
			<div class="help-show">
				<h3>Free Get Procedures</h3>
				<p>1. Click Free Get button to enter the claim page.</p>
				<p>2. Complete the payment via Amazon within 1 hour.</p>
				<p>3. We will refund to you after we confirm the order status and you can use the balance to purchase products online or withdraw cash.</p>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import Header from "@/components/Header"
	import { Tab, Tabs,Sku,Button,GoodsAction, GoodsActionIcon, GoodsActionButton,Popup  } from 'vant';
	import JoinSocial from "@/components/JoinSocial"
	import Swiper from '@/components/Swiper'
	import {mapGetters,mapActions,mapMutations} from 'vuex'
	import Loading from '@/components/Loading' //加载
	export default({
		name:'ProductDetail',
		components: {
			[Tab.name]:Tab,
			[Tabs.name]:Tabs,
			[Sku.name]:Sku,
			[Button.name]:Button,
			[GoodsAction.name]:GoodsAction,
			[GoodsActionIcon.name]:GoodsActionIcon,
			[GoodsActionButton.name]:GoodsActionButton,
			[Popup.name]:Popup,
			Header,
			JoinSocial,
			Swiper,
			Loading,
			ProductList:()=>import('@/components/ProductList')
		},
		data(){
			return{
				detaildata:{}, //产品数据
				productimg:[], //轮播图片
				isLike:false,  //是否收藏产品
				activeTabName:'Overview',
				isstore:false,  //
				loading:{//加载组件
					isload:true,  //是否加载中
					istype:'circular',  //加载类型
					iscolor:'#c9c9c9',	//加载颜色
					opacity:false  //背景是否透明/true为不透明
				}, 
				pid:this.$route.query.pid,
				show:true,  //显示属性组件
				sku:{},  //商品属性信息
				goods:{},
				isBtn:0,  //判断是点击哪个按钮，0购物车  1正常购买 3拼单 2.5拼团
				productlist:[],  //店铺产品列表
				productTotal:false,  //是否没有产品可加载
				index:0,
				intAttrdata:[] ,//初始属性数据
				ifpd:0   ,//产品类型   0正常产品  1是Share Get 2是TOP20  3是Free Get  4是拼团
				helpShow:false,
				fromName:'/',
				isSkuLoad:false,//是否已经加载sku，针对空得sku，防止重复加载
				GroupShoppingNodeCom:null,  //拼团模块
				ptInfo:[]  ,//拼团产品信息,
				ptorderno:''  //拼团订单号/加入别人拼团时有用
			}
		},
		beforeRouteEnter(to,from,next){
			let {pid}=to.query;
			if(pid!=''){
				next(vm=>{
					vm.fromName=from
				})
			}else{
				next(from.path)
			}
		},
		beforeRouteUpdate(to,from,next){
			this.pid=to.query.pid;
			this.activeTabName='Overview'
			document.documentElement.scrollTop=0
			//获取商品信息
			this.getSCProductInfo();
			this.getSCPTOrderInfo();
			//获取是否关注商品
			this.getLike();
		},
		created(){
			//获取商品信息
			this.getSCProductInfo();
			this.getSCPTOrderInfo();
			//获取是否关注商品
			this.getLike();
		},
		computed:{
			...mapGetters([
				'shopProductList',
				'shopIndex',
				'shopProductTotal',
				'shopPid'  //获取该产品店铺
			])
		},
		methods:{
			//打开店铺页面
			hankOpen(){
				this.$router.push({path:`/shop/${this.detaildata.pstoreid}`});
			},
			//获取商品信息
			async getSCProductInfo(){
				this.loading.isload=true
				await this.$api.product.getSCProductInfo({pid:this.pid}).then((res)=>{
					
					if(res!=''){
						this.detaildata=res;
						this.ifpd=res.ifpd;
						let pimg=res.pimg;
						this.productimg=pimg.split(',');
						this.goods.picture=this.productimg[0];
						document.title=res.ptitle;
						
					}else{
						this.$toast('The goods do not exist or are out of stock!')
						if(this.fromName=='/'){
							this.$router.push({path:'/productlist'})
						}else{
							this.$router.push({path:this.fromName.path})
						}
						
					}
					this.loading.isload=false
				}).catch((err)=>{
					console.log(err);
					this.$toast('The goods do not exist or are out of stock!')
					if(this.fromName=='/'){
						this.$router.push({path:'/productlist'})
					}else{
						this.$router.push({path:this.fromName.path})
					}
				});
			},
			//获取拼团信息
			async getSCPTOrderInfo(){
				const res=await this.$api.product.getSCPTOrderInfo({pid:this.pid});
				if(res && res.rows.length>0){
					this.ptInfo=res.rows;
					if(this.GroupShoppingNodeCom==null){
						this.GroupShoppingNodeCom=()=>import('@/components/GroupShoppingNode');
					}
					
				}
			},
			//获取是否关注商品
			async getLike(){
				await this.$api.product.getSaleFocus({pid:this.pid}).then((res)=>{
					//console.log(res)
					if(res==1){
						this.isLike=true
					}else{
						this.isLike=false
					}
				}).catch((err)=>{
					console.log(err)
				});
			},
			//分享
			showSocial(){
				this.$refs.showSocial.showSocial();
			},
			//关注
			like(){
				let token=this.$store.getters.token;
				if(token){
					let key=''
					if(this.isLike){
						key='cancelFocus'
					}else{
						key='focusProduct';
					}
					
					let params={
						pid:this.pid
					}
					
					this.$api.product[key](params).then(res=>{
						if(res==2){
							this.isLike=!this.isLike;
						}else{
							this.$Toast('Please try again');
						}
					}).catch(err=>{console.log(err)
						this.$Toast('Please try again');
					})
				}else{
					this.$router.push({path:'/login',query:{plan:this.$route.fullPath}})
				}
				
			},
			//店铺产品
			loadproductdata(i=0){
				if(i!=0){
					this.SET_INDEX(0)
				}
				
				let params={
					s:this.detaildata.pstoreid,
					pageindex:this.shopIndex
				}
				this.getProductList(params).then(),(err=>{
					this.$toast('Data loading error')
				})
			},
			//切换
			handleClick(name,title){
				
				if(name=='Store'){
					this.isstore=true;
					//判断不一致先销毁店铺的数据
					if(this.shopPid!=0 && this.shopPid!=this.detaildata.pstoreid){
						this.$store.commit('shop/SET_PID',this.detaildata.pstoreid)
						this.DEL_STORE_DATA()
					}
					
					if(this.shopProductList.length<1){
						
						this.loadproductdata();
						setTimeout(()=>{
							this.scrollView=document.documentElement.clientHeight-document.getElementById('storeInfo').offsetHeight-105;
						},100)
					}
				}
			},
			//属性SKU获取
			getAttrDate(isprice){
				let params={
					pid:this.pid,
					ifpd:0
				}
				this.$api.product.getSCProductColumnsSKU(params).then(res=>{
					//console.log(res);
					if(res!=""){
						this.intAttrdata=res;
						this.skudata(res,isprice);
					}
					this.isSkuLoad=true//已经加载过属性
				}).catch((xhr)=>{
					console.log(xhr);
				})
			},
			//解析属性数据
			skudata(data,isprice){
				
				let attrSku=data.SKUInfos;
				let attrTitle=data.attrConfig;
				let attrtitle1;
				let dataIndex
				let skuinfo={}
				let skuattr=[];
				
				for(let i=0;i<attrTitle.length;i++){
					attrtitle1=attrTitle[i].title;
					dataIndex=attrTitle[i].dataIndex;
					let tree={
						'k':attrtitle1,
						'k_s':'s'+(i+1),
						'v':[]
					}
					for(let j=0;j<attrSku.length;j++){
						if(tree.v.find(n=>n.name==attrSku[j][dataIndex])==undefined){
							let imgUrl=dataIndex+'_simg'
							let previewImgUrl=dataIndex+'_bimg'
							tree.v.push({
								'id':attrtitle1+':'+attrSku[j][dataIndex],
								'name':attrSku[j][dataIndex],
								'imgUrl':attrSku[j][imgUrl],
								'previewImgUrl':attrSku[j][previewImgUrl]
							})
						}
					}
					skuattr.push(tree);
					
				}
				let newlist=[]
				attrSku.forEach(skuinfo=>{  //遍历返回的数组sku组合
					let objs={}
					attrTitle.forEach(title=>{  //遍历sku熟悉属性
						let attrtitle=title.dataIndex
						skuattr.forEach(item=>{ //遍历整个sku信息
							let ks=item.k_s
							item.v.forEach(itemchildren=>{  //遍历sku属性的具体信息
								if(skuinfo[attrtitle]==itemchildren.name){ //判断属性的title是否和后台传回的sku标题一致，一致加入对象
									objs[ks]=itemchildren.id
								}
							})
						})
					})
					let objk={
						'id':skuinfo.sku,
						'price':isprice>1?skuinfo.price_pt*100:skuinfo.price*100,
						'stock_num':skuinfo.kc
					}
					newlist.push({...objs,...objk})
				});
				skuinfo.tree=skuattr;
				skuinfo.list=newlist;
				skuinfo.price=this.detaildata.minspjg
				skuinfo.stock_num=eval(this.detaildata.pkc)
				this.sku=skuinfo;
				this.loading.isload=false
			},
			//弹出属性选择
			// orderno 加入已有拼团时有用
			showattr(el,orderno=''){
				this.loading={
					isload:true,  //是否加载中
					istype:'spinner',  //加载类型
					iscolor:'#1989fa',	//加载颜色
					opacity:true  //背景是否透明/true为不透明
				};
				console.log(this.loading)
				if(el!=0){  //加入购物车不用登录，其余都要登录
					let token=this.$store.getters.token;
					if(!token){  //判断是否登录,未登录跳转登录
						this.$router.push({path:'/login',query:{plan:this.$route.fullPath}})
					}else{
						this.show=true;
						if(Object.keys(this.sku).length==0){
							if(!this.isSkuLoad){
								this.getAttrDate(el)
							}
						}else{
							this.skudata(this.intAttrdata,el)
						}
						this.isBtn=el
						this.ptorderno=orderno
					}
				}else{
					this.show=true;
					if(Object.keys(this.sku).length==0){
						if(!this.isSkuLoad){
							this.getAttrDate(el)
						}
					}else{
						this.skudata(this.intAttrdata,el)
					}
					this.isBtn=el
				}
			},
			onBuyClicked(skudata){
				let xdsku='';
				if(Object.keys(this.sku).length>0){
					if(skudata.selectedSkuComb==null){
						this.$toast('Please select product specifications')
						return
					}else{
						xdsku=skudata.selectedSkuComb.id
					}
				}else{
					xdsku=this.detaildata.psku
				}
				
				let cartInfo={
					sku:xdsku,
					price:skudata.selectedSkuComb.price/100,
					num:skudata.selectedNum
				}
				
				if(this.isBtn==3){  //拼单
					 let zfinfos = 0.00 + "," + 0.00 + "," + 0 + "," + 0.00 + "," + 0.00 + "," + 0.00 + "," + 0.00 + "," + 0 + "," + 0.00 + "," + 0;
					 let zfobj = xdsku + "|1|0|" + zfinfos + "|0|0|" + ""; //支付数据
					 this.$api.product.CommitPay_AD_PD({zfobj}).then(res=>{
						 if(res!=''){
							 if (res.fsstate != 0) {
								 if (res.fsstate == 2){ //登录超时
									 this.$router.push({path:'/login',query:{plan:this.$route.fullPath}})
									 return
								 }
							 }else{
								 this.$router.push({path:'/groupswait/'+res.fsmes})
								 return
							 }
						 }
					 }).catch(xhr=>{
						 
					 })
				}else if(this.isBtn==2){  //拼团
					this.$router.push({path:'/payment',query:{skus:xdsku,pt:skudata.selectedNum}})
				}else if(this.isBtn==5){  //拼团
					this.$router.push({path:'/payment',query:{skus:xdsku,pt:skudata.selectedNum,ptorderno:this.ptorderno}})
				}else{  //正常购买
					this.show=false
					this.$store.commit('cart/SET_CART',cartInfo);
					if(this.isBtn==1){
						this.$router.push({path:'/payment',query:{skus:"'"+xdsku+"'"}})
					}else{
						this.$toast.success('Add cart success')
					}
					
				}	
				
			},
			onAddCartClicked(){
				
			},
			...mapActions({
				getProductList:'shop/getProductList'
				
			}),
			...mapMutations({
				SET_INDEX:'shop/SET_INDEX',
				DEL_STORE_DATA:'shop/DEL_STORE_DATA'
			})
		},
		filters:{
			isprice(val){
				console.log(val)
				return val.split("?")[0]
			}
		},
		beforeRouteLeave(to,from,next){
			//下一个页面如果不是返回列表页面，就清空列表页面的缓存
			if(to.path!='productlist'){
				if(this.keepAliveName && this.keepAliveName.includes('productlist')){
					this.$store.dispatch('keepAliveName/DEL_NAME_LIST','productlist')
				}
			}
			next();
		}
	})
</script>

<style scoped>
	.header-icon .iconfont{font-size:24px;position: relative;}
	.cartnum{height:18px;line-height:18px;padding: 0 6px;background-color: #e41c1d;color:#fff;border-radius: 10px;font-size: 12px;font-style: normal;position: absolute;top: -8px;right: -13px;}
	
	.product-info{padding: 10px;position:relative;}
	.product-info-desc h4{font-size: 16px;}
	.product-info-desc p{color: #e41c1d;font-size:24px;padding:10px 0;}
	.product-info-desc span{color:#777;text-decoration: line-through;}
	.product-icon{position:absolute;right: 0;top: -40px;display: flex;}
	.product-icon>div{width: 50px;height: 50px;line-height: 68px;text-align: center;background-color: #fff;border-radius: 40px;box-shadow:0 2px 2px #ccc;margin:0 10px}
	.product-icon i{color: #ee0a24;font-size: 26px;}
	
	.joinsocial{border-top:20px solid #f7f7f7;border-bottom:20px solid #f7f7f7}
	.groupbuy-item{width: 90vw;margin:10px auto;display: flex; flex-direction: column;}
	.groupbuy-item-title{display: flex;}
	.groupbuy-item-title span{font-size:16px;font-weight: bold;display: inline-block; flex: 1;}
	.groupbuy-item-title a{width:80px;display: inline-block;text-align: right;color: #757575;}
	.groupbuy-item-info{padding:15px 0;color: #666;}
	.groupbuy-step img{width: 100%;}
	.buyer-protection{border-top:20px solid #f7f7f7;border-bottom:20px solid #f7f7f7}
	.buyer-protection1{width: 90vw;margin:0 auto}
	.buyer-protection-title{display: flex;height:50px;line-height: 50px;align-items:center;}
	.buyer-protection-title i{font-size:30px; vertical-align: middle;padding-right: 10px;}
	.buyer-protection-title span{vertical-align: middle;font-size: 16px;}
	.buyer-protection-info{display: flex;flex-direction:column;}
	.buyer-protection-info p i{font-size: 22px;padding-right:8px;vertical-align: middle;}
	.buyer-protection-info p span{vertical-align: middle;}
	.buyer-protection-info p em{font-style: normal;font-weight: bold;}
	.help-show{padding:10px;}
	.help-show h3{font-size:18px;font-weight: bold;}
	.help-show p{padding:5px 0}
	
	.buy-btn{width: 100vw;height: 56px;background-color: #fff;position: fixed;left: 0;bottom: 0;display: flex;}
	.buy-btn .buy-car-item{width: 50px;}
	.buy-car-btn{width: 100%;height: 60px;line-height: 60px;text-align: center;}
	.buy-car-btn i{color:#ff8f00;font-size: 26px;}
	.buy-btn .buy-now-item{flex: 3;}
	.buy-now{width: 90%;height:50px;margin: 3px auto;border-radius: 3px;border:1px solid #e41c1d;text-align: center;background:#fff;color: #e41c1d;box-sizing: border-box;}
	.buy-btn .buy-shopping-item{flex:4;}
	.buy-shopping{width: 90%;height:50px;margin: 3px auto;border-radius: 3px;border:1px solid #e41c1d;text-align: center;background:#e41c1d;color: #fff;box-sizing: border-box;}
	.buy-info p{height: 24px;line-height: 24px;margin: 0;}
	.buy-info soan{height: 26px;line-height: 26px;margin: 0;display: block;}
	.buynull{height: 50px;}
	
	.detail-store{width: 100vw;height: 100px;margin:10px auto;background-color: #fff;text-align: center;border-bottom: 30px solid #f7f7f7;}
	.detail-store a{color: #222;}
	.detail-store a h3{padding-top: 10px;}
	.detail-store a p{color: #E41C1D;margin-top: 10px;}
	
	.love-item{width:94%;display: flex;flex-wrap:wrap;margin:10px auto 0;justify-content: space-between;}
	.love-item-info{width: 46%;margin:10px 0;}
	.love-item-info a{display: block;color: #000;}
	.love-item-info a img{width: 100%;display: block;margin:0 auto;border-radius: 5px;}
	.love-item-info a .py{color: #888;text-decoration: line-through;}
	.love-item-info a .px{color: #000;padding-left: 10px;font-weight: bold;}
	.love-item-info a p{max-height:30px;line-height: 15px;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;margin:8px 0 4px}
	.love-loading{width: 100%;text-align: center;line-height: 30px;}
	
	.van-goods-action-button--last{
		border-top-right-radius:26.64rem !important;
		border-bottom-right-radius:26.64rem !important;
	}
	.van-goods-action-button--first{
		border-top-left-radius:26.64rem !important;
		border-bottom-left-radius:26.64rem !important;
	}
	.van-goods-action-button{
		height: 1.06667rem !important;
		border: none !important;
	}
</style>
