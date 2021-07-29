<template>
	<div>
		<van-search v-model="searchval" placeholder="Search Product" @search="search" />
		<van-tree-select
		class="tree-select"
		  :items="item"
		  :active-id.sync="activeId"
		  :height="treeHeight"
		  :main-active-index.sync="activeIndex"
		  @click-item="hankmenu"
		/>
		<!-- 底部导航 -->
		<NavTab/>
	</div>
</template>

<script>
	import {Search,TreeSelect} from 'vant'
	import NavTab from "@/components/NavTab"
	import {menu} from '@/utils/menujson.js'
	export default({
		name:'MenuList',
		components:{
			[TreeSelect.name]:TreeSelect,
			[Search.name]:Search,
			NavTab
		},
		data(){
			return{
				item:[],
				activeId:'',
				activeIndex:'',
				searchval:''
			}
		},
		computed:{
			treeHeight(){
				const winHeight= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				return winHeight-105+'px'
			}
		},
		created() {
			this.item=menu
		},
		methods:{
			hankmenu(e){
				this.$router.push({
					path:'/productlist',
					query:{
						typeID:e.id
					}
				})
			},
			search(){
				this.$router.push({
					path:'/productlist',
					query:{
						key:this.searchval
					}
				})
			}
		}
	})
</script>

<style>
</style>
