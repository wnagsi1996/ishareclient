<template>
	<div>
		<Header title="Modify Password" />
		<div class="setting">
			<van-form @submit="onSubmit">
				<div class="inp">
					<van-field
					  v-model="formdata.pass"
					  type="password"
					  name="pass"
					  label="Current password"
					  label-width="120px"
					  placeholder="Current password"
					  :rules="[{ required: true, message: 'Enter Current password' }]"
					/>
				</div>
				<div class="inp">
					<van-field
					  v-model="formdata.pass1"
					  type="password"
					  name="pass1"
					  label="New password"
					  label-width="120px"
					  placeholder="New password"
					  :rules="[{ required: true, message: 'Enter new password' }]"
					/>
				</div>
			    <div class="inp">
					<van-field
					  v-model="formdata.pass2"
					  type="password"
					  name="pass2"
					  label="New password"
					  label-width="120px"
					  placeholder="New password"
					  :rules="[{ required: true, message: 'Enter new password' }]"
					/>
					<p>1.The password must consist of numbers and letters.</p>
					<p>2.Password length must be 6-16 characters. </p>
				</div>
			  
			  <div style="margin: 10px 0 0;">
			    <van-button round block type="info" :disabled="disabled" native-type="submit">Submit</van-button>
			  </div>
			</van-form>
		</div>
	</div>
</template>

<script>
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	import { Form ,Field,Button, } from 'vant';
	import qs from 'qs'
	export default({
		name:'ModifyPass',
		components:{
			[Form.name]:Form,
			[Field.name]:Field,
			[Button.name]:Button
		},
		data(){
			return{
				formdata:{
					pass:'',
					pass1:'',
					pass2:''
				},
				disabled:false
			}
		},
		methods:{
			onSubmit(val){
				if(val.pass1!=val.pass2){
					this.$toast.fail('The password is not consistent with the confirmation password.')
					return false
				}
				
				let patrn1 = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,16}$/;
				if (!patrn1.test(val.pass1)) {
					alert('The password format does not meet the requirements.');
					return false;
				}
				
				this.disabled=true
				let strPublicKeyExponent,strPublicKeyModulus,pass,pass1
				
				//获取后台传过来的公钥
				this.$api.verify.CreateRSAKey().then(res=>{
					// /console.log(res);
					if(res.rescode==0){
						strPublicKeyExponent=res.strPublicKeyExponent
						strPublicKeyModulus=res.strPublicKeyModulus;
						pass = cmdEncrypt(val.pass, strPublicKeyExponent, strPublicKeyModulus);
						pass1 = cmdEncrypt(val.pass1, strPublicKeyExponent, strPublicKeyModulus);
						//console.log(this.code)
						//提交
						let params={
							password1:pass,
							password2:pass1,
							password3:pass1
						}
						this.$api.user.modifyPassUser(params).then(res=>{
							console.log(res)
							this.$toast.success(res.fsmes);
							if(res.fsstate=='0'){
								this.formdata.pass=''
								this.formdata.pass1=''
								this.formdata.pass2=''
							}
							this.disabled=false
						}).catch(xhr=>{
							this.$toast.fail('Modify Password Fail')
							this.disabled=false
						})
					}
					else{
						this.$toast.fail('Modify Password Fail')
						this.disabled=false
					}
				}).catch((xhr)=>{
					console.log(xhr)
					this.$toast.fail('Modify Password Fail')
					this.disabled=false;
					//window.sessionStorage.setItem("isLogin",0);
				})
			}
		}
	})
</script>

<style scoped>
	.setting{width: 90vw;margin: 0 auto;}
	.inp{margin:30px 0 20px;}
	.inp>.van-cell{background-color: #f7f7f7;border-radius: 5px;}
	.inp.code>.van-cell{width:50%;display: inline-block;}
	.inp p{padding:8px 4px 2px;color:#666}
</style>
