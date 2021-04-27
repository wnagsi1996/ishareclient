<template>
	<div>
		<van-nav-bar left-arrow :border="false" @click-left="onClickLeft"/>
		<div class="login">
			<div class="login_info">
				<div class="login-title">Register Account</div>
				<van-form @submit="register">
					<div class="inp">
						<van-field
						  v-model="email"
						  name="Email"
						  placeholder="enter your email."
						/>
					</div>
					<div class="inp">
						<van-field
						  v-model="password"
						  type="password"
						  name="password"
						  placeholder="Enter password."
						/>
					</div>
					<div class="inp">
						<van-field
						  v-model="password1"
						  type="password"
						  name="password1"
						  placeholder="Enter password again."
						/>
						<p>1.The password must consist of numbers and letters.</p>
						<p>2.Password length must be 6-16 characters. </p>
					</div>
					
				  <div class="inp code">
				  	<van-field
				  	  v-model="code"
				  	  name="code"
				  	  placeholder="verify code"
				  	/>
					<img class="codeimg" src='' id="codeimg" @click="showCode" />
				  </div>
				  <div style="margin: 16px 0 0;">
				    <van-button round :disabled="disabled" block type="info" native-type="submit">
				      Register
				    </van-button>
				  </div>
				</van-form>
				<div class="reg-node">
					<router-link to="/login">Login</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	import { NavBar,Form ,Field,Button } from 'vant';
	import qs from 'qs'
	export default({
		name:'Login',
		components:{
			[NavBar.name]:NavBar,
			[Form.name]:Form,
			[Field.name]:Field,
			[Button.name]:Button,
		},
		data(){
			return{
				email:'',
				password:'',
				password1:'',
				code:'',
				disabled:false,
			}
		},
		mounted() {
			this.showCode();
		},
		methods:{
			//...mapMutations('user',['setToken']),
			onClickLeft(){
				this.$router.go(-1)
			},
			register(value){
				
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(value.Email==''){
					this.$toast.fail('Enter email')
					return false
				}else if(!reg.test(value.Email)){
					this.$toast.fail('E-mail format is incorrect')
					return false
				}
				
				if(value.password==''){
					this.$toast.fail('Enter password')
					return false
				}
				if(value.password1==''){
					this.$toast.fail('Please enter password again.')
					return false
				}
				
				if(value.password!=value.password1){
					this.$toast.fail('The password is not consistent with the confirmation password.')
					return false
				}
				
				let patrn1 = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,16}$/;
				if (!patrn1.test(value.password)) {
					alert('The password format does not meet the requirements.');
					return false;
				}
				
				this.disabled=true
				let strPublicKeyExponent,strPublicKeyModulus,pass
				//获取后台传过来的公钥
				this.$api.verify.CreateRSAKey().then(res=>{
					if(res.rescode==0){
						strPublicKeyExponent=res.strPublicKeyExponent
						strPublicKeyModulus=res.strPublicKeyModulus;
						pass = cmdEncrypt(value.password, strPublicKeyExponent, strPublicKeyModulus);
						//注册提交
						let params={
							Email:value.Email,
							password1:pass,
							password2:pass,
							Yzm:value.code
						}
						this.$api.user.register(params).then(res=>{console.log(res);
							if(res.fsstate=='0'){
								this.$toast.success('Resgister Success');
								this.$store.commit('user/SET_TOKEN',true);
								window.sessionStorage.setItem("token",1);
								this.$router.go(-1);
							}else{
								this.$toast.fail(res.fsmes)
							}
						}).catch(xhr=>{
							this.$toast.fail('Register Fail')
						})
					}
					else{
						this.$toast.fail('Failed to create encrypted data. Please try again！')
					}
				}).catch((xhr)=>{
					console.log(xhr)
					this.$toast.fail('Failed to create encrypted data. Please try again！')
					this.disabled=false;
				})
				
			},
			//获取图片验证码
			showCode(){
				let url=""
				process.env.NODE_ENV==='development'?url="/Handler":url='';  //区分开发环境加‘/Handler’，生产环境不加
				document.getElementById("codeimg").src=url+'/UserControl/Validata.aspx?ValiType=valiregister&' + Math.random();
			}
		}
	})
</script>

<style scoped>
	@import url("../../assets/css/style.css");
</style>
