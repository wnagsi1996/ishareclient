<template>
	<div>
		<van-nav-bar left-arrow :border="false" @click-left="onClickLeft"/>
		<div class="login">
			<div class="login_info">
				<div class="login-title">Sign In</div>
				<van-form @submit="login">
					<div class="inp">
						<van-field
						  v-model="email"
						  name="Email"
						  placeholder="Email"
						/>
					</div>
					<div class="inp">
						<van-field
						  v-model="password"
						  type="password"
						  name="password"
						  placeholder="password"
						/>
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
				      Login
				    </van-button>
				  </div>
				</van-form>
				<div class="reg-node">
					<router-link to="/register">Register</router-link>
					<router-link to="/findpassword">Find Password</router-link>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	import { NavBar,Form ,Field,Button } from 'vant';
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
				code:'',
				disabled:false
			}
		},
		mounted() {
			this.showCode();
			
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			async login(value){
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
				this.disabled=true;
				try{
					//获取后台传过来的公钥
					let rsa=await this.$api.verify.CreateRSAKey();
					if(rsa.rescode!=0){
						this.$toast.fail('Login eror')
						this.disabled = false;
						return 
					}
					//加密
					let pass = cmdEncrypt(this.password, rsa.strPublicKeyExponent, rsa.strPublicKeyModulus);
					//登录参数
					let loginForm={VerifyCode:this.code,lname:value.Email,pass,VerifyType:'valiregister'};	
					let login=await this.$store.dispatch('user/login',loginForm);
					if(login){
						await this.$store.dispatch('user/getInfo');
						//登陆成功后重定向
						this.$router.replace({
							path: this.$route.query.plan || '/usercenter'
						})
					}
					this.disabled = false;
				}catch(e){
					console.log(e)
					this.$toast.fail('Login eror')
					this.disabled = false;
				}
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
