<template>
	<div class="contactNode">
		<Header title='Contact Us' />
		<van-form @submit="onSubmit">
		  <van-field
		    v-model="email"
		    name="Email"
		    label="Email:"
		    placeholder="Email"
			@blur="formatter"
			:error-message="errorText"
		  />
		  <br/>
		  <van-field
		    v-model="message"
			type="textarea"
			rows="5"
			autosize
		    name="Message"
		    label="Message"
		    placeholder="Message"
		    :rules="[{ required: true, message: 'Enter Message' }]"
		  />
		  <br/>
		  <van-field
		    v-model="code"
		    center
		    clearable
			type="number"
		    label="Code"
		    placeholder="Code"
			:rules="[{ required: true, message: 'Enter Code' }]"
		  >
		    <template #button>
		      <img class="digit" src='' id="codeimg" @click="showCode" height="35" />
		    </template>
		  </van-field>
		  <div style="margin: 16px;">
		    <van-button round block type="info" :disabled="disabled" native-type="submit">提交</van-button>
		  </div>
		</van-form>
	</div>
</template>

<script>
	import {Form,Field,Button} from 'vant'
	export default({
		name:'ContactUs',
		components:{
			[Form.name]:Form,
			[Field.name]:Field,
			[Button.name]:Button
		},
		data(){
			return{
				email:'',
				message:'',
				code:'',
				disabled:false,
				errorText:''
			}
		},
		mounted(){
			this.showCode();
		},
		methods:{
			//验证邮箱
			formatter(){
				let val=this.email
				const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				if(val==''){
					this.errorText='Enter Email'
				}else if(!reg.test(val)){
					this.errorText = 'Incorrect email format';
				}else{
					this.errorText=''
				}
				return val;
			},
			//提交
			onSubmit(val){
				this.disabled=true;
				let params={
					suggestContent:val.message,
					suggestLxfs:val.email,
					yzm:this.code
				}
				this.$api.product.ComiitSuggest(params).then(res=>{
					//console.log(res);
					this.$toast(res.fsmes)
					if(res.fsstate==0){
						this.message=''
						this.email=''
						this.code=''
					}
					this.disabled=false
				}).catch(err=>{
					console.log(err);
					this.disabled=false
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
	.contactNode{height: 100vh;background-color: #f7f7f7;padding:20px 10px 10px;}
</style>
