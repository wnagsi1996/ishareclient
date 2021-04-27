<template>
	<div class="memberBJ">
		<Header title="Add Address" />
		<div>
			<van-form @submit="onSubmit">
			  <van-field
			    v-model="firstName"
			    name="firstName"
			    label="First Name"
			    placeholder="First Name"
			    :rules="[{ required: true, message: 'Enter First Name' }]"
			  />
			  <van-field
			    v-model="lastName"
			    name="LastName"
			    label="Last Name"
			    placeholder="Last Name"
			    :rules="[{ required: true, message: 'Enter Last Name' }]"
			  />
			  <van-field
			    v-model="street"
			    name="street"
			    label="Street Address"
			    placeholder="Street/Address:"
			    :rules="[{ required: true, message: 'Enter Street/Address:' }]"
			  />
			  <van-field
			    v-model="city"
			    name="city"
			    label="City"
			    placeholder="City"
			    :rules="[{ required: true, message: 'Enter City' }]"
			  />
			  <van-field
			    v-model="province"
			    name="province"
			    label="Province"
			    placeholder="Province"
				@click="showPick(3)"
			    :rules="[{ required: true, message: 'Select Province' }]"
			  />
			  <van-field
			    v-model="country"
			    name="country"
			    label="Country"
			    placeholder="Country"
			  	@click="showPick(2)"
			    :rules="[{ required: true, message: 'Select Country' }]"
			  />
			  <van-field
			    v-model="phone"
			    name="Phone"
			    label="Phone number"
			    placeholder="Phone number"
			    :rules="[{ required: true, message: 'Enter Phone number' }]"
			  />
			  <van-field
			    v-model="zip"
			    name="zip"
			    label="ZIP/Postal code"
			    placeholder="ZIP/Postal code"
			    :rules="[{ required: true, message: 'Enter ZIP/Postal code' }]"
			  />
			  <van-field
			    v-model="sns"
			    name="sns"
			    label="SNS Account"
			    placeholder="webchat\FB\Email"
			    :rules="[{ required: true, message: 'Enter SNS Account' }]"
			  />
			  <van-checkbox style="padding:10px 15px" v-model="checked">Default shipping address</van-checkbox>
			  <div style="margin: 16px;">
			    <van-button round block type="info" native-type="submit">Submit</van-button>
			  </div>
			</van-form>
		</div>
		<van-popup v-model="popShow" position="bottom" round>
			<van-picker
			  show-toolbar
			  :columns="columns"
			  @confirm="onConfirm"
			  @cancel="onCancel"
			  :default-index='defaultIndex'
			/>
		</van-popup>
		
	</div>
</template>

<script>
	import {country_arr,province_arr} from '@/assets/js/global.js'
	import {Button,Form,Field,Picker,Popup,Checkbox} from 'vant'
	export default({
		name:'AddAddress',
		components:{
			[Button.name]:Button,
			[Form.name]:Form,
			[Field.name]:Field,
			[Picker.name]:Picker,
			[Popup.name]:Popup,
			[Checkbox.name]:Checkbox
		},
		data(){
			return{
				firstName:'',
				lastName:'',
				street:'',
				city:'',  //城市
				country:'',  //国家
				province:'',  //省
				phone:'',
				zip:'',
				sns:'',
				rid:0,  //新增就0，编辑就用传过来的参数
				checked:false,  //默认收货地址
				columns:country_arr ,//列表数据
				popShow:false,  //弹出框显示隐藏
				pickerIndex:0, //判断选择器是选择什么 2是国家 3是省份
				defaultIndex:0, //默认选中项
				countryIndex:0,//国家默认选中项
				provinceIndex:0//省份默认选中项
			}
		},
		created() {
			if(this.$route.query.sid!='' && this.$route.query.sid!=undefined){
				this.rid=this.$route.query.sid;
				this.getAddressInfo();
			}
		},
		methods:{
			//获取地址
			getAddressInfo(){
				this.$api.user.GetAddressByAddressID({addressid:this.rid}).then(res=>{
					//console.log(res);
					if(res!=''){
						this.firstName=res.firstname
						this.lastName=res.lastname
						this.street=res.address
						this.city=res.city
						this.country=res.county
						this.province=res.province
						this.phone=res.lxfs
						this.zip=res.Postcode
						this.sns=res.sns
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			showPick(i){
				this.pickerIndex=i
				if(i==2){
					this.columns=country_arr;
					this.defaultIndex=this.countryIndex
				}else if(i==3){
					if(this.country==''){
						this.$toast('Please select a country!');
						return;
					}else{
						let index=country_arr.findIndex(n=>n==this.country)
						let arr=province_arr[index].split("|");
						this.columns=arr;
						this.defaultIndex=this.provinceIndex
					}
				}
				this.popShow=true
			},
			onSubmit(val){
				let params={
					bjdzrid:this.rid,
					firstname:val.firstName,
					lastname:val.LastName,
					lxfs:val.Phone,
					postcode:val.zip,
					country:val.country,
					state:val.province,
					city:val.city,
					xxdz:val.street,
					mrdz:this.checked?1:0,
					sns:val.sns
				}
				this.$api.user.AddAddress(params).then(res=>{
					//console.log(res)
					let that=this;
					if(res.fsstate=='0'){
						this.$store.dispatch('address/getAddressList');
						this.$toast({
							message:res.fsmes,
							duration:1000,
							onClose(){
								that.$router.go(-1);
							}
						})
						
					}else{
						this.$toast(res.fsmes)
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			//选择框确认
			onConfirm(val){
				//console.log(val)
				if(this.pickerIndex==2){
					if(this.country!=val){
						this.country=val;
						this.province='';
						this.provinceIndex=''
					}
					this.countryIndex=country_arr.findIndex(n=>n==this.country)
				}else if(this.pickerIndex==3){
					this.province=val;
					this.provinceIndex=this.columns.findIndex(n=>n==val);
				}
				this.popShow=false
			},
			onCancel(){
				this.popShow=false
			}
		}
	})
</script>

<style>
</style>
