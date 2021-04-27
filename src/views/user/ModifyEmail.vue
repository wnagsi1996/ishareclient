<template>
	<div class="modify-email">
		<Header title="Modify Email" />
		<div class="oldemail login" v-if="emailOld">
			<P>Current Bind Email:{{userCenterInfo.loginname}}</P>
			<van-form @submit="next" ref="emailForm">
				<div class="inp">
					<van-field
					  v-model="email"
					  name="email"
					  placeholder="Email"
					  readonly
					/>
				</div>
				<div class="inp code" v-if="isCode">
					<van-field
					  v-model="imgCode"
					  name="imgCode"
					  placeholder="verify code"
					/>
					<img class="codeimg" src='' id="codeimg" @click="showCode" />
				</div>
			  <div class="inp code">
			  	<van-field
			  	  v-model="emailCode"
			  	  name="emailCode"
			  	  placeholder="Enter verify code"
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
		<div class="login" v-else>
			<van-form @submit="setNewEmail" ref="emailForm">
				<div class="inp">
					<van-field
					  v-model="newemail"
					  name="email"
					  placeholder="Enter new email"
					/>
				</div>
			  <div class="inp code">
			  	<van-field
			  	  v-model="newemailCode"
			  	  name="newemailCode"
			  	  placeholder="Enter verify code"
			  	/>
				<van-button v-show="!newtimeshow" plain hairline type="info" class="code-btn" native-type="button" @click="onNewCode">GetCode</van-button>
				<van-button v-show="newtimeshow" plain hairline disabled type="info" class="code-btn">getCode again {{ newtime }}</van-button>
			  </div>
			  <div style="margin: 16px;">
			    <van-button round :disabled="disabled" block type="info" native-type="submit">
			      Submit
			    </van-button>
			  </div>
			</van-form>
		</div>
	</div>
</template>

<script>
	import {Button,Field,Form} from 'vant'
	import {mapGetters} from 'vuex'
	import {getSecondByDateSub,appSource} from '@/assets/js/public.js'  //时间计算/判断设备
	import parent from '@/utils/regular.js'
	export default({
		name:'ModifyEmail',
		components:{
			[Button.name]:Button,
			[Form.name]:Form,
			[Field.name]:Field
		},
		data(){
			return{
				isCode:false,  //是否需要验证码
				email:'',
				emailCode:'',  //邮箱验证码
				imgCode:'',  //图片验证码
				disabled:false,
				timeshow:false,
				time:'300' ,//倒计时秒数
				emailOld:true,
				newemail:'',  //新邮箱
				newemailCode:''  ,//新邮箱验证码
				newtimeshow:false,  //
				newtime:'300'  //新邮箱的倒计时
			}
		},
		computed:{
			...mapGetters([
				'userCenterInfo'
			])
		},
		created() {
			this.userInfo()
		},
		methods:{
			//获取用户信息
			userInfo(){
				if(!this.userCenterInfo.college){
					this.$store.dispatch('user/getUserCenterInfo').then(res=>{
						this.email=res.loginname
					})
				}else{
					this.email=this.userCenterInfo.loginname
				}
			},
			//倒计时
			counDown(val){
				let time=eval(val);
				if(time!='' && time>=0){
					return time-1
				}
			},
			//获取邮箱验证码
			onCode(){
				this.$api.user.ComitBindPayPalYzmFs({VerifyCode:this.imgCode}).then(res=>{
					console.log(res);
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
						this.timeshow=true
					}else if(res.fsstate==5){
						this.isCode=true
						this.showCode();
					}
				})
			},
			//下一步
			next(){
				this.disabled=true
				this.$api.user.ComitUpdateBindPhoneOldAuth({Yzm:this.emailCode}).then(res=>{console.log(res)
					if(res.fsstate!=0){
						this.$toast(res.fsmes)
					}else{
						this.emailOld=false;
					}
					this.disabled=false
				}).catch(err=>{
					this.$toast('Operation failed, please try again!')
					this.disabled=false
				})
			},
			//获取新邮箱验证码
			onNewCode(){
				let email=this.newemail
				if(email==''){
					this.$toast('Enter new email!');
					return;
				}
				
				if(!parent.email.test(email)){
					this.$toast('The Email is invalid.');
					return false;
				}
				
				this.$api.user.ComitNewBindPhoneYzmFs({Email:this.newemail}).then(res=>{
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
							this.newtime=this.counDown(this.newtime)
							if(this.newtime==0){
								clearInterval(timer);
							}
						},1000)
						this.newtimeshow=true
					}
				})
			},
			//提交新邮箱验证
			setNewEmail(){
				let email=this.newemail
				if(email==''){
					this.$toast('Enter new email!');
					return;
				}
				
				if(!parent.email.test(email)){
					this.$toast('The Email is invalid.');
					return false;
				}
				let params={
					newphone:email,  //新邮箱
					Yzm:this.emailCode,   //旧邮箱验证码
					Yzm1:this.newemailCode   //新邮箱验证码
				}
				this.disabled=true;
				this.$api.user.ComitUpdateBindPhone(params).then(res=>{
					console.log(res);
					if(res.fsstate != 0){
						this.$toast(res.fsmes)
					}else{
						this.$toast('Bind email to modify successfully.')
						this.$store.dispatch('user/getUserCenterInfo').then(res=>{
							this.$router.go(-1)
						})
					}
					this.disabled=false;
				}).catch(err=>{
					this.$toast('Operation failed, please try again!')
					this.disabled=false;
				})
			}
		}
	})
</script>

<style scoped>
	@import url("../../assets/css/style.css");
	.oldemail{background-color: #fff;padding:0 0 5px;}
	.oldemail p{width: 96%;margin:auto;font-size: 16px;padding-bottom: 10px;}
	.next-btn{width: 96%;margin:20px auto;}
</style>
