<template>
	<div class="loading" :class="load.opacity?'whitebj':''" v-if="load.isload">
		<van-loading :color="load.iscolor" type="load.istype" />
	</div>
</template>

<script>
	import {Loading} from 'vant'
	export default({
		name:'Loading',
		components:{
			[Loading.name]:Loading
		},
		props:{
			load:{
				type:Object,
				default:()=>({
					isload:true,  //是否加载中
					istype:'circular',  //加载类型
					iscolor:'#c9c9c9',	//加载颜色
					opacity:false  //背景是否透明/true为不透明
				})
			}
		},
		watch:{
			load(newVal,oldVal){
				console.log(newVal.opacity)
				this.load=newVal
			}
		}
	})
</script>

<style scoped>
	.loading{width: 100vw;height: 100vh;line-height:100vh;text-align:center;background-color:#fff; position: fixed;left:0;top:0;right: 0;bottom: 0;z-index: 9;}
	.whitebj{background-color:rgba(0,0,0,0);}
</style>
