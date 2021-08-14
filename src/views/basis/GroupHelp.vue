<template>
	<div>
		<Header title="Groups Help" />
		<div class="head">
			<div class="img">
				<van-image fit="scale-down" :src="orderInfo.shareimg" alt="" />
			</div>
			<div class="info">
				<div class="title">{{orderInfo.pname}}</div>
				
			</div>
		</div>
		<div class="coninter">
			<div class="orderstate">{{orderInfo | state}}</div>
			<van-button type="primary" block class="btn" v-if="orderInfo.state==0" @click="getProductDetail">HELP & GET</van-button>
			<van-button type="info" class="btn" block v-else >I Also Want This</van-button>
		</div>
		
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
	import {mapGetters} from 'vuex'
	import {Button,Sku} from 'vant'
	export default ({
		name: 'GroupHelp',
		components:{
			[Sku.name]:Sku,
			[Button.name]:Button
		},
		data() {
			return {
				orderno: this.$route.query.orderno,
				orderInfo: {},
				isattr:false, //是否有属性
				loading:{//加载组件
					isload:true,  //是否加载中
					istype:'circular',  //加载类型
					iscolor:'#c9c9c9',	//加载颜色
					opacity:false  //背景是否透明/true为不透明
				},
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
		computed:{
			...mapGetters([
				'token'
			])
		},
		created() {
			this.getPDProductOrder_Groups()
		},
		methods: {
			async getPDProductOrder_Groups() {
				const res = await this.$api.product.getPDProductOrder_Groups({
					pdorderno: this.orderno
				});
				console.log(res)
				if (res.rescode == 0) {
					this.orderInfo = Object.assign({}, res)
				} else if (res.rescode == 4) {
					this.$router.push({
						path: `/groupswait?orderno=${res.resdesc}`
					})
				}
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
		},
		filters: {
			state(item) {
				switch (item.state) {
					case 0:
						return 'Click HELP&GET to help your friend and get it free now.';
						break;
					case 1:
						return `Congratulations! ${item.loginname} have got the free gift and you can get it free, too.`;
						break;
					case 2:
						return 'Click Invite Friends to invite your friends to help you now.';
						break;
				}
			}
		}
	})
</script>

<style scoped>
	.head {
		display: flex;
		padding: 15px;
		background-color: #fff;
	}

	.head .img {
		width: 100px;
		height: 100px;
	}

	.head .info {
		flex: 1;
		margin-left: 10px;

	}

	.head .info .title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.coninter{
		margin-top: 30px;padding:20px;background-color: #fff;
	}
	.coninter .btn{
		margin: 20px auto 0;
	}
</style>
