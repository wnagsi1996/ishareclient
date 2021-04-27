<template>
	<div>
		<van-tabbar v-model="active" route placeholder @change="onChange">
		  <van-tabbar-item name="home" replace to="/" icon="home-o">Home</van-tabbar-item>
		  <van-tabbar-item name="productlist" replace to="/menulist" icon="goods-collect-o">Product</van-tabbar-item>
		  <van-tabbar-item name="cart" replace to="/cart" icon="shopping-cart-o">Cart</van-tabbar-item>
		  <van-tabbar-item name="user" replace icon="manager-o">User</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vant';
	export default({
		name:'NavTab',
		components:{
			[Tabbar.name]:Tabbar,
			[TabbarItem.name]:TabbarItem
		},
		data(){
			return{
				active:''
			}
		},
		created() {
			let path=this.$route.path;console.log(this.$route.path)
			switch(path){
				case '/':
					this.active='home';
					break;
				case '/menulist' || '/productlist':
					this.active='menulist';
					break;
				// case '/productlist':
				// 	this.active='productlist';
				// 	break;
				case '/cart':
					this.active='cart';
					break;
				case '/user':
					this.active='user';
					break;
			}
		},
		methods:{
			onChange(val){
				if(val=='user'){
					let token=this.$store.getters.token;  //获取是否有登录
					if(!token){
						this.$router.push({path:'/login',query:{plan:'/user'}})
					}else{
						this.$router.push('/user')
					}
				}
				
			}
		}
	})
</script>

<style>
</style>
