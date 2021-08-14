<template>
	<div class="bj">
		<Header ref="header" title="Groups" shareshow />
		<div v-if="Object.keys(orderInfo).length>0">
			<div class="orderimg"><img :src="orderInfo.shareimg" /></div>
			<div class="order-info">
				<div class="order-info-desc bjWhite">
					<h3>{{orderInfo.pname}}</h3>
					<span  v-if="isHelp">You have helped {{orderInfo.loginname}} to get free gift and you can click I ALSO WANT IT to get it free.</span>
					<span  v-else>{{orderInfo.state | state}}</span>
				</div>
				<div class="order-info-p" v-if="isWeiXin">
					<p>Sorry that Wechat offcial rules doesn't allowed us to share this now,please choose facebook friends to help you.</p>
				</div>
				<div v-if="!isHelp">
					<van-button type="info" block round v-if="orderInfo.state==0" @click="onHelp">Help / Get</van-button>
					<van-button type="info" block round v-else @click="onProduct()">I Also Want This</van-button>
				</div>
			</div>
			<!-- 加入群组 -->
			<div class="joinsocial">
				<JoinSocial />
			</div>
		</div>
		
		<!-- 属性 -->
		<van-sku  v-model="show" :sku="sku" :goods-id="orderInfo.pid" :goods="goods" :reset-selected-sku-on-hide="true"
			stepper-title="Quantity" :quota="1" @buy-clicked="onBuyClicked" :show-add-cart-btn="false" buy-text="Help" ref="getSkuData">
			<!-- 自定义 sku-header-price -->
			  <template #sku-header-price="props">
			    <div class="van-sku__goods-price">
			      <span class="van-sku__price-symbol">$</span
			      ><span class="van-sku__price-num">{{ props.price}}</span>
			    </div>
			  </template>
		</van-sku>
	</div>
</template>

<script>
	import {Button,Sku} from 'vant'
	import {mapGetters} from 'vuex'
	import JoinSocial from "@/components/JoinSocial"
	import {isWeiXin} from '@/utils/isWeixin.js'
	export default({
		name:'Groups',
		components:{
			[Button.name]:Button,
			[Sku.name]:Sku,
			JoinSocial
		},
		computed:{
			...mapGetters(['token'])  //获取是否登录
		},
		data(){
			return{
				orderno:'',  //拼单订单号
				orderInfo:[],  //拼单订单数据
				show:true,  //显示属性组件
				sku:{},  //商品属性信息
				goods:{},  //商品信息
				intAttrdata:[],
				isWeiXin:isWeiXin(),
				isHelp:false  //是否已经帮助过
			}
		},
		created() {
			this.orderno=this.$route.query.orderno;
			this.getPDOrderInfo();
		},
		methods:{
			//弹出层选完属性帮助
			onBuyClicked(skudata){
				let xdsku='';
				if(Object.keys(this.sku).length>0){
					if(skudata.selectedSkuComb==null){
						this.$toast('Please select product specifications')
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
				 let zfinfos = 0.00 + "," + 0.00 + "," + 0 + "," + 0.00 + "," + 0.00 + "," + 0.00 + "," + 0.00 + "," + 0 + "," + 0.00 + "," + 0;
				 let zfobj = xdsku + "|1|0|" + zfinfos + "|0|0|" + ""; //支付数据
				 this.$api.product.CommitPay_PD({zfobj,pdorderno:this.orderno}).then(res=>{
					 if(res!=''){
						 switch(res.fsstate){
							 case 0:
								if(res.fsmes==''){  //单纯帮助
									this.$toast('Help Success');
									this.isHelp=true
								}else{  //帮助自己并发起拼单
									this.$router.push({path:'/groupswait?orderno='+res.fsmes+'&nc='+this.orderInfo.loginname+'pdnum=1'})
								}
								break;
							case 1:
								this.$toast(res.fsmes);
								break;
							case 2:
								this.$router.push({path:'/login'});
								break;
						 }
						 if (res.fsstate != 0) {
							 if (res.fsstate == 2){ //登录超时
								 this.$router.push({path:'/login'})
								 return
							 }
						 }else{
							 this.$router.push({path:'/groupswait?orderno='+res.fsmes})
							 return
						 }
					 }
				 }).catch(xhr=>{
					 
				 })
			},
			//打开图片产品地址
			onProduct(){
				this.$router.push({path:'/product?pid='+this.orderInfo.pid})
			},
			//获取拼单信息
			getPDOrderInfo(){
				this.$api.product.getPDProductOrderInfo({pdorderno:this.orderno}).then(res=>{
					console.log(res);
					if(res!=''){
						this.orderInfo=res;
						document.title=`${res.loginname} can get it free and invite you to get free too.${res.pname}`;
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			//获取商品信息
			getProductAttr(pid){
				this.$api.product.getSCProductColumnsSKU({pid}).then(res=>{
					console.log(res);
					if(res!=""){
						this.intAttrdata=res;
						this.skudata(res)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//点击帮助按钮弹出选择商品属性
			onHelp(){
				if(this.token){
					this.show=true;
					if(Object.keys(this.sku).length==0){
						this.getProductAttr(this.orderInfo.pid);
					}
				}else{
					this.$router.push({path:'/login',query:{from:'/groups/'+this.orderno}})
				}
			},
			//解析属性数据
			skudata(data){
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
						'price':skuinfo.price_pt*100,
						'stock_num':skuinfo.kc
					}
					newlist.push({...objs,...objk})
				});
				skuinfo.tree=skuattr;
				skuinfo.list=newlist;
				skuinfo.price=this.orderInfo.price
				this.sku=skuinfo;
				//console.log(skuinfo)
			},
		},
		filters:{
			//拼单状态
			state(val){
				let txt='';
				switch(val){
					case 0:
						txt='Click HELP&GET to help your friend and get it free now.'
						break;
					case 1:
						txt=`Congratulations!${this.orderInfo.loginname} have got the free gift and you can get it free, too.`;
						break;
					case 2:
						txt='Click Invite Friends to invite your friends to help you now.';
						break;
				}
				return txt
			}
		}
	})
</script>

<style scoped>
	.bj{background-color: #f7f7f7;min-height: 100vh;}
	.orderimg{width: 100vw;}
	.orderimg img{width: 100%;}
	.order-info{width: 96vw;margin:10px auto 0;}
	.bjWhite{background-color: #fff;border-radius: 5px;padding:10px;margin:10px auto;}
	.order-info-desc p{color: #777;margin:10px 0}
	.order-info-desc span{color: #e41c1d;padding:10px 0;display: block;}
	.order-info-p{padding:20px 10px}
	.joinsocial{border-top:20px solid #f7f7f7;}
</style>
