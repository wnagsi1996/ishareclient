<template>
	<div class="set-bj">
		<Header title="Setting Receipt Account" />
		<div class="set-account">
			<p>Your Current Receipt {{accountType}} Account:<span class="account"> {{account}}</span></p>
			<van-form @submit="onSubmit">
				<div class="inp">
					<van-field v-model="formData.accountType.text" label="Collection channel" name="accountType" readonly @click="showPicker=true"
					 label-width="120" placeholder="Collection channel" :rules="[{ required: true, message: 'Select Receipt Account Type'}]"/>
				</div>
				<div class="inp">
					<van-field v-model="formData.account" label="Account" name="account"
					 label-width="120" placeholder="Account" :rules="[{ required: true, message: 'Enter Receipt Account'}]"/>
				</div>
				 <div style="margin: 16px;">
				   <van-button round block type="info" native-type="submit" :dispatch="dispatch">Submit</van-button>
				 </div>
			</van-form>
		</div>
		<van-popup v-model="showPicker" position="bottom" round>
		  <van-picker
		    show-toolbar
		    :columns="columns"
		    @confirm="onConfirm"
		    @cancel="showPicker = false"
		  />
		</van-popup>
	</div>
</template>

<script>
	import {Form,Field,Button,Picker,Popup} from 'vant'
	import {mapGetters} from 'vuex'
	export default({
		name:'SettingReceiptAccoun',
		components:{
			[Form.name]:Form,
			[Field.name]:Field,
			[Button.name]:Button,
			[Picker.name]:Picker,
			[Popup.name]:Popup,
		},
		data(){
			return{
				accountType:'',
				account:'',
				formData:{
					accountType:{
						text:'',
						value:''
					},
					account:''
				},
				showPicker:false,
				columns:[
					{
						text:'PayPal',
						value:'1'
					},
					{
						text:'WebChat',
						value:'0'
					},
					{
						text:'CashApp',
						value:'2'
					}
				],
				dispatch:false
			}
		},
		computed:{
			...mapGetters(['userCenterInfo'])
		},
		mounted(){
			this.userInfo();
		},
		methods:{
			//获取用户信息
			async userInfo(){
				if(Object.keys(this.userCenterInfo).length==0){
					await this.$store.dispatch('user/getUserCenterInfo')
				};
				console.log(this.userCenterInfo)
				let pay= this.userCenterInfo.paypal; 
				let payType=pay.substring(pay.indexOf('[')+1,pay.length-1);
				let payattr=this.columns.filter(n=>{return n.text==payType});
				this.formData.accountType=payattr[0]
				this.accountType=payType;
				this.formData.account=this.account=pay.substring(0,pay.indexOf('['));
			},
			//关闭弹出层
			onConfirm(val){
				if(val.text!=this.formData.accountType.text){
					this.formData.accountType={text:val.text,value:val.value};
					if(val.text==this.accountType){
						this.formData.account=this.account;
					}else{
						this.formData.account='';
					}
				}
				this.showPicker=false
			},
			//修改提交
			onSubmit(val){
				//console.log(val)
				this.dispatch=true;
				let params={
					Yzm:'',
					paypal:val.account,
					ktype:this.formData.accountType.value
				}
				this.$api.user.ComitBindPayPal(params).then(res=>{
					console.log(res)
					this.$toast(res.fsmes)
					this.dispatch=false;
					if(res.fsstate==0){
						this.accountType=this.formData.accountType.text
						this.account=this.formData.account
					}
				}).catch(err=>{
					console.log(err)
					this.dispatch=false;
				})
			}
		}
	})
</script>

<style>
	.set-account{width: 96vw;margin: 10px auto;}
	.set-account p{margin:15px 0;}
	.account{color: #e41c1d;}
</style>
