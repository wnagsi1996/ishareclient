<template>
	<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
	  <van-list v-model="loading" :finished="finished" finished-text="No more data" @load="onLoad">
	    <slot></slot>
	  </van-list>
	</van-pull-refresh>
</template>

<script>
	import {List,PullRefresh} from 'vant'
	export default({
		name:'ProductList',
		components:{
			[List.name]:List,
			[PullRefresh.name]:PullRefresh
		},
		props:{
			ismore:{
				type:Boolean,
				default:false
			},
			list:{
				type:Array,
				default:new Array()
			}
		},
		data(){
			return{
				finished:true,
				loading:false,
				refreshing:false
			}
		},
		mounted(){
			this.onRefresh()
		},
		methods:{
			onRefresh(){
				this.loading=true
				this.finished=false
				this.$emit("load",'1')
			},
			onLoad(){
				
				if(!this.finished){
					this.$emit("load")
					
				}
				
			}
		},
		watch:{
			list(newVal,oldVal){
				
				this.finished=false
				this.loading=false
				this.refreshing=false
			},
			ismore(newVal,oldVal){
				console.log(newVal)
				if(newVal){
					this.finished=true
					this.loading=false
					this.refreshing=false
				}
			},
			//监听该值变化，变化的同时把值传给父组件，防止二次刷新监听不到值变化一直重复加载
			finished(newVal,oldVal){
				this.$emit('update:ismore',newVal)
			}
		}
	})
</script>

<style scoped>
</style>
