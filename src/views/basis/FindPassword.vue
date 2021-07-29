<template>
	<div>
		<van-nav-bar left-arrow :border="false" @click-left="onClickLeft"/>
		<div class="login">
			<div class="login_info">
				<div class="login-title">Forgot Password</div>
				<div v-if="!passNode">
					<P>Please enter the login id of the account to retrieve your password</P>
					<van-form @submit="next" ref="emailForm">
						<div class="inp">
							<van-field
							  v-model="email"
							  name="email"
							  placeholder="Email"
							/>
						</div>
						<div class="inp code" v-if="isCode">
							<van-field
							  v-model="code"
							  name="code"
							  placeholder="verify code"
							/>
							<img class="codeimg" src='' id="codeimg" @click="showCode" />
						</div>
					  <div class="inp code">
					  	<van-field
					  	  v-model="code"
					  	  name="code"
					  	  placeholder="verify code"
					  	/>
						<van-button v-show="!timeshow" plain hairline type="info" class="code-btn" native-type="button" @click="onCode">GetCode</van-button>
						<van-button v-show="timeshow" plain hairline disabled type="info" class="code-btn">getCode again {{ time }}</van-button>
					  </div>
					  
					  <div style="margin: 16px;">
					    <van-button round :disabled="disabled" block type="info" native-type="submit">
					      Next
					    </van-button>
					  </div>
					</van-form>
				</div>
				<div v-else>
					<van-form @submit="onSubmit">
						<div class="inp">
							<van-field
							  v-model="pass1"
								type="password"
							  name="pass1"
							  label="New password"
								label-width="100px"
							  placeholder="New password"
							  :rules="[{ required: true, message: 'Enter new password' }]"
							/>
						</div>
					    <div class="inp">
							<van-field
							  v-model="pass2"
							  type="password"
							  name="pass2"
							  label="New password"
													label-width="100px"
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
					<div class="reg-node"  v-if="!passNode">
						<router-link to="/register">Register</router-link>
						<router-link to="/login">Login</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	import { Form ,Field,Button,NavBar, } from 'vant';
	import {getSecondByDateSub,appSource} from '@/assets/js/public.js'  //时间计算/判断设备
	import qs from 'qs'
	export default({
		name:'Login',
		components:{
			[Form.name]:Form,
			[Field.name]:Field,
			[Button.name]:Button,
			[NavBar.name]:NavBar
		},
		data(){
			return{
				email:'',
				code:'',  //邮箱验证码
				imgCode:'',  //图形验证码
				disabled:false,
				pass1:'',
				pass2:'',
				passNode:false,
				time:'300' ,//倒计时秒数
				timeshow:false,
				isCode:false  //图形验证码，默认不需要
			}
		},
		mounted() {
			
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			//倒计时
			counDown(val){
				let time=eval(val);
				if(time!='' && time>=0){
					return time-1
				}
			},
			//获取验证码
			onCode(){
				let patrn = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if(this.email==''){
					this.$toast('Please enter your Email');
					return false;
				}
				if(!patrn.test(this.email)){
					this.$toast('The Email is invalid.');
					return false;
				}
				this.$api.verify.getEmailVerify({Phone:this.email,VerifyCode:this.imgCode}).then(res=>{
					console.log(res)
					this.$toast(res.fsmes)
					if(res.fsstate==0){
						let fssj=res.fssj;
						let fcffssj=res.fcffssj;
						let appSource1=appSource();
						if(appSource1=='ios'){
							fssj=fssj.replace(/-/,'\/');
							fcffssj=fcffssj.replace(/-/,'\/');
						}
						this.time=getSecondByDateSub(fssj,fcffssj);
						let timer=setInterval(()=>{
							this.time=this.counDown(this.time)
							if(this.time==0){
								clearInterval(timer);
							}
						},1000)
					}else if(res.fsstate==5){
						this.isCode=true
						this.showCode();
					}
					
				}).catch(err=>{
					console.log(err)
				})
			},
			//下一步设置新密码
			next(val){
				let patrn = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if(val.email==''){
					this.$toast('Please enter your Email');
					return false;
				}
				if(!patrn.test(val.email)){
					this.$toast('The Email is invalid.');
					return false;
				}
				if(val.code==''){
					this.$toast('Please enter the code in your email.');
					return false;
				}
				this.disabled=true;
				this.$api.verify.comitEmailVerify({Phone:val.email,Yzm:val.code}).then(res=>{
					console.log(res)
					if(res.fsstate==0){
						this.passNode=true;
						//this.$refs.emailForm.resetValidation();
					}else{
						this.$toast(res.fsmes)
					}
					this.disabled=false
				}).catch(xhr=>{
					this.$toast('Failed, please try again')
					this.disabled=false
				})
			},
			//新密码提交
			onSubmit(value){
				
				if(value.pass1==''){
					this.$toast.fail('Enter password')
					return false
				}
				if(value.pass2==''){
					this.$toast.fail('Please enter password again.')
					return false
				}
				
				if(value.pass1!=value.pass2){
					this.$toast.fail('The password is not consistent with the confirmation password.')
					return false
				}
				
				let patrn1 = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,16}$/;
				if (!patrn1.test(value.pass1)) {
					this.$toast.fail('The password format does not meet the requirements.');
					return false;
				}
				
				this.disabled=true
				let strPublicKeyExponent,strPublicKeyModulus,pass
				//获取后台传过来的公钥
				this.$api.verify.CreateRSAKey().then(res=>{
					// /console.log(res);
					if(res.rescode==0){
						strPublicKeyExponent=res.strPublicKeyExponent
						strPublicKeyModulus=res.strPublicKeyModulus;
						pass = cmdEncrypt(value.pass1, strPublicKeyExponent, strPublicKeyModulus);
						//console.log(this.code)
						//提交
						let params={
							Phone:this.email,
							Yzm:this.code,
							password1:pass,
							password2:pass
						}
						this.$api.verify.ComitPassWord(params).then(res=>{
							console.log(res)
							if(res.fsstate=='0'){
								this.$toast.success('Password reset succeeded.');
								this.$store.commit('user/SET_TOKEN',true);
								window.sessionStorage.setItem("token",1);
								this.$router.push({path:'/'})
							}else{
								this.$toast.fail(res.data.fsmes)
							}
							this.disabled=false
						}).catch(xhr=>{
							this.$toast.fail('Register Fail')
							this.disabled=false
						})
					}
					else{
						this.$toast.fail('Register Fail')
						false
					}
				}).catch(xhr=>{
					console.log(xhr)
					this.$toast.fail('Register Fail')
					this.disabled=false;
					//window.sessionStorage.setItem("isLogin",0);
				})
				
			},
			//获取图片验证码
			showCode(){
				let url=""
				process.env.NODE_ENV==='development'?url="/Handler":url='';  //区分开发环境加‘/Handler’，生产环境不加
				document.getElementById("codeimg").src=url+'/UserControl/Validata.aspx?ValiType=valiregister&' + Math.random();
			}
		},
		watch:{
			time(newVal,oldVal){
				if(newVal=='' || newVal=='0'){
					this.timeshow= false
				}else{
					this.timeshow=true
				}
			}
		}
	})
</script>

<style scoped>
	@import url("../../assets/css/style.css");
</style>
