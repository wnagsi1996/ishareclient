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
					<van-count-down class="count" millisecond :time="orderInfo.djsms*1000" format="HH:mm:ss:SSS" />
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
				<van-button type="info" block @click="showattr">Group Buy</van-button>
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
		
		<!-- 属性 -->
		<van-sku  v-model="show" :sku="sku" :goods-id="pid" :goods="goods" :reset-selected-sku-on-hide="true"
			stepper-title="Quantity" @buy-clicked="onBuyClicked" ref="getSkuData">
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
					<!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
					<van-button square size="large" type="danger" @click="props.skuEventBus.$emit('sku:buy')" >Group Shopping</van-button>
			    </div>
			  </template>
		</van-sku>
	</div>
</template>

<script>
	import {CountDown,Button,Icon,Sku} from 'vant'
	import Header from '@/components/Header'
	import Loading from '@/components/Loading' //加载
	export default({
		name:'GroupsBuy',
		components:{
			Header,
			[CountDown.name]:CountDown,
			[Button.name]:Button,
			[Icon.name]:Icon,
			[Sku.name]:Sku,
			Loading
		},
		data(){
			return{
				orderno:this.$route.query.orderno, //拼团订单号
				orderInfo:{},
				loading:{//加载组件
					isload:true,  //是否加载中
					istype:'circular',  //加载类型
					iscolor:'#c9c9c9',	//加载颜色
					opacity:false  //背景是否透明/true为不透明
				},
				detaildata:{},
				selectSku:{},
				liimgs:[],
				pid:0,
				show:true,  //显示属性组件
				sku:{},  //商品属性信息
				goods:{},
				isSkuLoad:false,//是否已经加载sku，针对空得sku，防止重复加载
				intAttrdata:[] ,//初始属性数据
			}
		},
		beforeRouteEnter(to,from,next) {
			if(to.query.orderno!='' && to.query.orderno){
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
				this.$api.product.getPDProductOrder_FreeHelp({pdorderno:this.orderno}).then(res=>{
					console.log(res) //状态0：拼单中 1：已经完成拼单 2：拼单失败 4:已经支付（等待第三方回调确认）
					if(res.rescode==0){
						this.liimgs=res.liimgs.split(',');
						Object.assign(this.orderInfo,res)
						Object.assign(this.loading,{isload:false})
						if(res.state==0){
							this.pid=res.pid;
							this.getProductDetail(res.pid)
						}
					}else if(res.rescode==2){
						let orderno=res.resdesc
					}else if(res.rescode==4){
						this.$router.push(`/groupswaitbuy?orderno=${res.resdesc}`)
					}else{
						this.$message.warning('data loading fail')
					}
					
				}).catch(xhr=>{
					
				})
			},
			//获取详情信息
			async getProductDetail(pid){
				const res=await this.$api.product.getSCProductInfo({pid})
				if(Object.keys(res).length>0){
					this.detaildata=res;
				}
			},
			//属性SKU获取
			getAttrDate(){
				let params={
					pid:this.pid,
					ifpd:0
				}
				this.$api.product.getSCProductColumnsSKU(params).then(res=>{
					//console.log(res);
					if(res!=""){
						this.intAttrdata=res;
						this.skudata(res);
					}
					this.isSkuLoad=true//已经加载过属性
				}).catch((xhr)=>{
					console.log(xhr);
				})
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
				skuinfo.price=this.detaildata.minspjg
				skuinfo.stock_num=eval(this.detaildata.pkc);
				console.log(1)
				this.sku=skuinfo;
				this.loading.isload=false
			},
			//弹出属性选择
			// orderno 加入已有拼团时有用
			showattr(){
				this.loading={
					isload:true,  //是否加载中
					istype:'spinner',  //加载类型
					iscolor:'#1989fa',	//加载颜色
					opacity:true  //背景是否透明/true为不透明
				};
					let token=this.$store.getters.token;
					if(!token){  //判断是否登录,未登录跳转登录
						this.$router.push({path:'/login',query:{plan:this.$route.path}})
					}else{
						this.show=true;
						if(Object.keys(this.sku).length==0){
							if(!this.isSkuLoad){
								this.getAttrDate()
							}
						}else{
							this.skudata(this.intAttrdata)
						}
					}
			},
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
				this.$router.push({path:'/payment',query:{skus:xdsku,pt:skudata.selectedNum,ptorderno:this.orderno}})
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
