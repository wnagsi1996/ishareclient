<template>
	<van-swipe :autoplay="3000">
	  <van-swipe-item v-for="(image, index) in images" :key="index" @click="selImg">
	    <img :src="image" :key="image" width="100%" />
	  </van-swipe-item>
	</van-swipe>
</template>

<script>
	import { Swipe, SwipeItem, Lazyload } from 'vant';
	export default({
		name:'Swiper',
		props:{
			images:{
				type:Array,
				default:new Array()
			}
		},
		components:{
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem,
			[Lazyload.name]:Lazyload
		},
		mounted(){
			
		},
		methods:{
			selImg(e){
				console.log(e);
			}
		}
	})
</script>

<style>
</style>
