<template>
	<div>
		<van-search v-model="searchval" placeholder="Search Product" @search="search" />
		<van-tree-select
		  :items="item"
		  height="100vh"
		  :active-id.sync="activeId"
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
		mounted() {
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
