<template>
	<div>
		<div class="address-item">
			<div class="address-top">
				<div class="address-info" @click="onSel(addressInfo.id)">
					<div class="address-name">
						{{addressInfo.name}}{{addressInfo.tel}}
					</div>
					<div class="address-detail">
						{{addressInfo.address}}
					</div>
				</div>
				<div class="address-deit">
					<van-icon name="edit" size="24" @click="onEdit(addressInfo.id)" />
				</div>
			</div>
			<div class="address-bottom">
				<div class="address-default" @click="onDefault(addressInfo.id)">
					<van-icon :name="addressInfo.isDefault?'checked':'circle'" size="20" :class="addressInfo.isDefault?'check':''" />
					<p>Sel Default</p>
				</div>
				<div class="address-del">
					<van-icon name="delete" size="20" @click="onDel(addressInfo.id)" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// addressInfo={id,name,tel,address,isDefault}  格式 id/名称/电话/详细地址/是否默认
	export default({
		name:'addressItem',
		props:{
			addressInfo:{
				type:Object,
				default:new Object()
			},
			isPay:{
				type:Boolean,
				default:false
			}
		},
		created(){
			console.log(this.addressInfo)
		},
		methods:{
			//编辑地址
			onEdit(id){
				this.$router.push({path:'/addaddress',query:{sid:id}})
			},
			//删除地址
			onDel(id){
				if(id!=''){
					this.$api.user.DelAddress({rid:id}).then(res=>{
						if(res>0){
							this.$toast('Delete successfully.')
							this.$store.commit('address/DEL_ADDRESS',id);
						}else{
							this.$toast('Deletion failed. Please try again')
						}
					}).catch(err=>{
						console.log(err);
					})
				}else{
					this.$toast('Select the address to delete')
				}
			},
			//设为默认
			onDefault(id){
				this.$api.user.selDefaultAddress({rid:id}).then(res=>{
					if(res>0){
						this.$toast('Set success.');
						this.$store.commit('address/SET_DEFAULT',id);
					}else{
						this.$toast('Set failed. Please try again.');
					}
				})
			},
			//地址点击
			onSel(id){
				//支付页面返回判断
				if(this.isPay){
					//添加地址id到vuex
					this.$store.commit('pay/SET_ADDRESS_ID',id);
					this.$router.go(-1);
				}
			}
		},
		watch:{
			addressInfo(newVal){
				this.list=newVal;
			}
		}
	})
</script>

<style scoped>
	.address-item{background-color: #fff;border-radius: 8px;padding:10px;margin-bottom:8px;}
	.address-top{display: flex;align-items: center;}
	.address-info{width:80%}
	.address-name{font-size:16px}
	.address-detail{margin:5px 0}
	.address-deit{width:20%;text-align: center;}
	.address-bottom{border-top:1px solid #f7f7f7;padding-top:8px;margin-top:8px;display: flex;justify-content: space-between;}
	.address-default{display: flex;}
	.address-default p{padding-left:8px}
	.address-default .check{color:#e41c1d}
	.address-del{width: 50%;text-align: right;}
</style>
