<template>
	<div>
		<span class="autocopy"><slot></slot></span>
	</div>
</template>

<script>
	import Clipboard from 'clipboard';  //复制
	export default({
		name:'AutoCopy',
		props:{
			txt:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				copytxt:''
			}
		},
		mounted() {
			this.copytxt=this.txt;
			let clipboard = new Clipboard('.autocopy',{
				text:()=>{
					return this.copytxt
				}
			});
			  clipboard.on('success', e => {
				  this.$toast('Copy Success')
				//console.log('复制成功')
				// 释放内存
				clipboard.destroy();
			  })
			  clipboard.on('error', e => {
				  this.$toast('Copy failed')
				// 不支持复制
				//console.log('该浏览器不支持自动复制')
				// 释放内存
				clipboard.destroy();
			  })
		},
		methods:{
			
		},
		watch:{
			txt(newVal,oldVal){
				this.copytxt=newVal;
			}
		}
	})
</script>

<style scoped>
</style>
