<template>
	<div>
		<div class="cart-header">
			<div class="cart-title">Cart</div>
			<div v-if="cartproduct.length>0" class="cart-edit" @click="statuSwitch">{{switchRun}}</div>
		</div>
		<div class="cart-null-20"></div>
		<div class="cart-info" v-if="cartShow">
			<div v-if="cartproduct.length>0">
				<div class="cart-content">
					<van-swipe-cell v-for="(item,value) in cartproduct" :key="value" class="goods-swipe">
						<div class="goods-item">
							<van-checkbox v-model="item.check" class="goods-check" @click="countPrice" />
							<van-card num="2" :price="item.spdj" :title="item.sptitle" :thumb="item.pimg" currency="$" class="goods-card">
							  <template #tags>
							    <van-tag plain type="danger">{{item.skuattr}}</van-tag>
							  </template>
							  <template #num>
								  <van-stepper v-model="item.num" @change="countPrice" :name="item.sku" />
							  </template>
							</van-card>
						</div>
						<template #right>
						  <van-button square text="Del" type="danger" class="delete-button" @click="delprocuct(item.sku)" />
						</template>
					</van-swipe-cell>
				</div>
				<van-submit-bar :price="totalPrice" :button-text="buttonText" @submit="onSubmit" currency="$" class="cart-submit" >
					<van-checkbox v-model="checked" @change="selectall">Select all</van-checkbox>
				</van-submit-bar>
				<div class="cart-submit-null"></div>
			</div>
			<div v-else class="Cart-null">
				<van-icon name="cart-circle-o" />
				<p>Shopping cart is empty</p>
			</div>
		</div>
		<NavTab/>
	</div>
</template>

<script>
	import Header from "@/components/Header"
	import { Card,Button,Tag,SwipeCell,Stepper,Checkbox, CheckboxGroup,SubmitBar } from 'vant';
	import NavTab from "@/components/NavTab"
	export default({
		name:'Cart',
		components:{
			[Card.name]:Card,
			[Button.name]:Button,
			[Tag.name]:Tag,
			[SwipeCell.name]:SwipeCell,
			[Stepper.name]:Stepper,
			[CheckboxGroup.name]:CheckboxGroup,
			[Checkbox.name]:Checkbox,
			[SubmitBar.name]:SubmitBar,
			Header,
			NavTab
		},
		data(){
			return{
				cartproduct:[],
				checked:false,
				totalPrice:0,
				switchRun:'Edit',
				buttonText:'Pay',
				cartShow:false
			}
		},
		mounted() {
			this.getCartInfo()
		},
		methods:{
			//获取产品信息
			getCartInfo(){
				let cartproduct=this.$store.getters.cart;
				let skus=''
				if(cartproduct.length>0){
					cartproduct.forEach(item=>{
						skus += "'" + item.sku + "',";
					})
					skus=skus.substring(0,skus.length-1);
					this.$api.product.Get_MyCarSCProductsSaleList({skus}).then(res=>{
						this.cartShow=true;
						let list= res.rows;
						list.forEach(item=>{
							cartproduct.forEach(n=>{
								if(item.sku==n.sku){
									item.num=n.num
								}
							})
							item.check=false
						});
						this.cartproduct=list;
					}).catch(xhr=>{
						
					})
				}else{
					this.cartShow=true;
				}
			},
			onSubmit(){
				
				let skus=''
				this.cartproduct.forEach(item=>{
					if(item.check){
						skus += "'" + item.sku + "',";
					}
				})
				skus=skus.substring(0,skus.length-1);
				if(this.buttonText=='Pay'){
					this.$router.push({path:'/payment',query:{skus:skus}})
					
				}else{
					this.$store.commit('cart/DELALL_CART');
					this.cartproduct==[]
				}
			},
			//全选
			selectall(e){
				let price=0;
				this.cartproduct.forEach(item=>{
					if(e){
						item.check=true;
						price+=item.spdj*item.num;
					}else{
						item.check=false
					}
				})
				this.totalPrice=e?price*100:0
			},
			//计算总价
			countPrice(value='',detail={}){
				let price=0;
				this.cartproduct.forEach(item=>{
					if(item.check){
						price+=item.spdj*item.num;
					}
				})
				this.totalPrice=price*100;
				let cartproduct=this.$store.getters.cart;
				if(detail.name!=''){
					let obj={};
					cartproduct.forEach(item=>{
						if(item.sku==detail.name){
							let val=eval(value)-eval(item.num)
							obj={
								sku:item.sku,
								num:val,
								price:item.price
							};
							
						}
					})
					this.$store.commit('cart/SET_CART',obj)
				}
			},
			//删除
			delprocuct(sku){
				this.$store.commit('cart/DEL_CART',sku);
				this.cartproduct=this.cartproduct.filter(item=>item.sku!=sku);
			},
			statuSwitch(){
				if(this.switchRun=='Edit'){
					this.switchRun='Complete'
					this.buttonText='Delete All'
				}else{
					this.switchRun='Edit'
					this.buttonText='Pay'
				}
			}
		}
	})
</script>

<style scoped>
	.cart-header{display: flex;height: 50px;margin:10px 20px;align-items: flex-end;}
	.cart-null-20{width: 100vw;height: 20px;background-color: #f7f7f7;}
	.cart-content{padding:0 0 0 10px}
	.cart-title{font-size:36px;width: 60%;}
	.cart-edit{flex: 1;text-align: right;font-size:16px;}
	.goods-swipe{padding:15px 0;}
	.goods-item{background-color: #fff;display: flex; align-items: center;}
	.goods-check{width: 20px;background-color: #fff;text-align: center;}
	.goods-check .van-checkbox__icon{padding-left: 10px;}
	.goods-card{margin: 6px 0;background-color: #fff;flex: 1;}
	.delete-button{height: 100%;}
	.cart-submit{bottom: 50px;}
	.cart-submit-null{height: 60px;width: 100vw;background-color: #f7f7f7;}
	.Cart-null{text-align: center;margin: 50px 0;}
	.Cart-null i{font-size: 48px; color: #666;}
	.Cart-null p{margin-top: 10px;font-size: 18px;color: #222;}
</style>
