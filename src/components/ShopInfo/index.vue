<template>
	<div class="store-info">
		<div class="store-info-img">
			<van-image :src='shopInfo.simg' width="60px" height="60px" />
		</div>
		<div class="store-info-node">
			<div class="store-info-p">
				<p>{{shopInfo.sname}}</p>
			</div>
			<div class="store-info-btn">
				<p @click="followVary"><van-icon :name="shopIsLike?'like':'like-o'" :class="shopIsLike?'active':''" /><span>{{shopIsLike | type}}</span></p>
				<p @click="openUrl">{{text}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters,mapActions,mapMutations} from 'vuex'
	export default({
		name:'ShopInfo',
		props:{
			id:{  //店铺id
				type:String,
				default:''
			},
			storeName:{ //店铺名称，给父组件传
				type:String,
				default:''
			},
			ishome:{ //判断是首页true还是详情页false
				type:Boolean,
				default:true
			}
		},
		computed:{
			...mapGetters([
				'token',
				'keepAliveName',
				'shopIsLike',
				'shopInfo'
			])
		},
		data(){
			return{
				storeData:[],
				text:''
			}
		},
		created(){
			//判断是首页还是详情页
			if(this.ishome){
				this.text='About Us'
			}else{
				this.text='Store Product'
			}
			this.getStoreData();
			this.getfocus();
		},
		methods:{
			//获取店铺数据
			async getStoreData(){
				let params={
					sid:this.id
				}
				if(Object.keys(this.shopInfo).length==0){
					await this.getShopInfo(params).then(),(err=>{
						this.$toast('Store data loading error')
					});
				}
				this.$emit('update:storeName',this.shopInfo.sname);
			},
			//获取店铺收藏
			async getfocus(){
				let params={
					sid:this.id
				}
				await this.getShopLive(params);
			},
			//关注
			followVary(){
				//判断是否登录状态
				if(this.token){
					//判断是否是关注状态
					if(!this.shopIsLike){
						this.$api.product.focusUserStore({sid:this.id}).then(res=>{console.log(res)
							if(res=='2'){
								this.$toast('successful');
								this.SET_ISLIKE(true)
							}else{
								this.$toast(res);
							}
						})
					}else{
						this.$api.product.cancelUserStoreFocus({sid:this.id}).then(res=>{
							if(res=='2'){
								this.$toast('successful');
								this.SET_ISLIKE(false)
							}else{
								this.$toast('Unfollow Fial');
							}
						})
					}
				}else{
					this.$router.push({path:'/login',query:{plan:this.$route.path}})
				}
			},
			//打开页面
			openUrl(){
				if(this.ishome){
					this.$router.replace({path:'/shopdetail?id='+this.id})
				}else{
					this.$router.replace({path:'/shop?id='+this.id})
				}
			},
			...mapActions({
				getShopInfo:'shop/getShopInfo',
				getShopLive:'shop/getShopLive'
			}),
			...mapMutations({
				SET_ISLIKE:'shop/SET_ISLIKE'
			})
		},
		watch:{
			id(newVal,oldVal){
				this.id=newVal;
				this.getStoreData();
				this.getfocus();
			}
		},
		filters:{
			type(value){
				if(value){
					return 'UnFollow'
				}else{
					return 'Follow'
				}
			}
		}
	})
</script>

<style scoped>
	.store-info{display: flex;}
	.store-info-img{width: 70px;}
	.store-info-node{flex: 1;}
	.store-info-p p{font-size:18px;}
	.store-info-btn{display: flex;align-items: center;margin-top: 10px;justify-content:space-between;}
	.store-info-btn p{width:50%;color: #777;}
	.store-info-btn p:first-child{display:flex;align-items: center;}
	.store-info-btn p:first-child span{padding-left:5px}
	.active{color: red;}
</style>
