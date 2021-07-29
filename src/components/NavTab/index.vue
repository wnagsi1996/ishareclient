<template>
	<div>
		<van-tabbar v-model="active" placeholder @change="onChange">
			<van-tabbar-item name="home" icon="home-o">Home</van-tabbar-item>
			<van-tabbar-item name="productlist" icon="goods-collect-o">Product</van-tabbar-item>
			<van-tabbar-item name="cart" icon="shopping-cart-o">Cart</van-tabbar-item>
			<van-tabbar-item name="user" icon="manager-o">User</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import {
		Tabbar,
		TabbarItem
	} from 'vant';
	export default ({
		name: 'NavTab',
		components: {
			[Tabbar.name]: Tabbar,
			[TabbarItem.name]: TabbarItem
		},
		data(){
			return{
				active:''
			}
		},
		created() {
			switch (this.$route.path) {
				case '/':
					this.active = 'home';
					break;
				case '/menulist' || '/productlist':
					this.active = 'productlist';
					break;
				case '/cart':
					this.active = 'cart';
					break;
				case '/usercenter':
					this.active = 'user';
					break;
			}
		},
		methods: {
			onChange(val) {
				switch (val) {
					case 'home':
						this.$router.push('/')
						break;
					case 'productlist':
						this.$router.push('/menulist')
						break;
					case 'cart':
						this.$router.push('/cart')
						break;
					case 'user':
						this.$router.push('/usercenter')
						break;
				}
			}
		}
	})
</script>

<style>
</style>
