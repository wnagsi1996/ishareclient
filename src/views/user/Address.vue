<template>
	<div class="memberBJ">
		<Header title="My Address">
			<!-- <template #node>
				<div class="del" @click="onDel">Delect</div>
			</template> -->
		</Header>
		<div class="address-list">
			<addressItem v-for="item in list" :key="item.id" :addressInfo="item"></addressItem>
		</div> 
		<div class="add-btn">
			<van-button type="danger" round block @click="onAdd">Add Address</van-button>
		</div>
	</div>
</template>

<script>
	import {Button} from 'vant'
	import addressItem from '@/components/AddressItem'
	import {mapGetters} from 'vuex'
	export default({
		name:'Address',
		components:{
			addressItem,
			[Button.name]:Button
		},
		data(){
			return{
				list:[],
				isPay:false,
			}
		},
		beforeRouteEnter(to,from,next) {
			if(from.path=='/payment'){
				next(vm=>{
					vm.isPay=true; 
					vm.$store.commit('address/SET_ISPAY',true)
				})
			}else{
				next()
			}
		},
		beforeRouteLeave(to,from,next) {
			if(to.path!='/addaddress'){
				this.$store.commit('address/SET_ISPAY',false)
			}
			next()
		},
		computed:{
			...mapGetters(['addressList','addressIsPay'])
		},
		created() {
			this.getAddress();
		},
		methods:{
			//获取地址
			getAddress(){
				if(this.addressList.length==0){
					this.$store.dispatch('address/getAddressList')
				}else{
					this.list=this.addressList
				}
			},
			//添加地址
			onAdd(){
				this.$router.push({path:'/addaddress'})
			},
			//编辑地址
			onEdit(item){
				this.$router.push({path:'/addaddress',query:{sid:item.id}})
			}
		},
		watch:{
			addressList(newVal){
				this.list=newVal
			}
		}
	})
</script>

<style scoped>
	.address-list{width:96vw;max-height:calc(100vh - 110px);margin:10px auto 0;}
	.del{color: red;}
	.add-btn{position: fixed;left:2.5%;right:2.5%;bottom:5px;}
</style>
