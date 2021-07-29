<template>
	<div>
		<Header title='Modify Profile' />
		<div>
			<van-form @submit="onSubmit">
			  <van-field
			    v-model="userCenterInfo.name"
				readonly
			    name="name"
			    label="Family Name"
			    placeholder="Family Name"
			    :rules="[{ required: true, message: 'Enter Family Name' }]"
			  />
			  <van-field
			    v-model="userCenterInfo.ncname"
			    name="ncname"
			    label="Nick Name"
			    placeholder="Nick Name"
			    :rules="[{ required: true, message: 'Enter Nick Name' }]"
			  />
			  <van-field
			    v-model="sex.text"
			    name="sex"
				readonly
				@click="showPicker=true"
			    label="Sex"
			    placeholder="Sex"
			    :rules="[{ required: true, message: 'Enter Sex' }]"
			  />
			  <van-field
			    v-model="userCenterInfo.college"
			    name="schoolName"
			    label="School Name"
			    placeholder="School Name"
			    :rules="[{ required: true, message: 'Enter School Name' }]"
			  />
			  <van-field
			    v-model="userCenterInfo.loginname"
			    name="loginName"
			    label="Alternate mailbox"
			    placeholder="Alternate mailbox"
			    :rules="[{ required: true, message: 'Enter Alternate mailbox' }]"
			  />
			  <van-field
			    v-model="userCenterInfo.gxqm"
			    name="gxqm"
				type="textarea"
				autosize
				rows="1"
			    label="Signature"
			    placeholder="Signature"
			    :rules="[{ required: true, message: 'Enter Signature' }]"
			  />
			  <div style="margin: 16px;">
			    <van-button round block type="info" native-type="submit" :dispatch="dispatch">Submit</van-button>
			  </div>
			</van-form>
		</div>
		<van-popup v-model="showPicker" position="bottom">
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
	import { Form,Field,Button,Picker,Popup } from 'vant';
	import {mapGetters} from 'vuex'
	export default({
		name:'MyProfileModify',
		components:{
			[Form.name]:Form,
			[Field.name]:Field,
			[Button.name]:Button,
			[Picker.name]:Picker,
			[Popup.name]:Popup
		},
		data(){
			return{
				columns:[
					{
						text:'Male',
						value:'1'
					},
					{
						text:'Famale',
						value:'0'
					},
					{
						text:'Secrecy',
						value:'2'
					}
				],
				sex:{},
				showPicker:false,
				dispatch:false
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
				let userCenterInfo=this.userCenterInfo;
				if(Object.keys(userCenterInfo).length==0){
					this.$store.dispatch('user/getUserCenterInfo').then(res=>{
						this.sex=this.columns.find(val=> res.sex==val.value);
					})
				}else{
					this.sex=this.columns.find(val=> userCenterInfo.sex==val.value)
				}
			},
			//弹出框确认
			onConfirm(item){
				this.sex.value=item.value;
				this.sex.text=item.text;
				this.showPicker=false;
			},
			//提交修改
			onSubmit(val){
				this.dispatch=true;
				let params={
					name:val.name,
					nickname:val.ncname,
					sex:this.sex.value,
					bylxfs:val.loginName,
					gxqm:val.gxqm,
					college:val.schoolName
				}
				this.$api.user.savePersonInfo(params).then(res=>{
					if(res=='1'){
						this.$toast('Modify Success!');
						this.$store.dispatch('user/getUserCenterInfo')
					}else{
						if(res=='0'){
							this.$toast('Modify Failed!');
						}else{
							this.$toast(res);
						}
					}
					this.dispatch=false;
				}).catch(err=>{
					console.log(err)
					this.dispatch=false;
				})
			}
		},
		filters:{
			sexFilter(val){
				console.log(val)
				switch(val){
					case 1:
						return 'Male';
						break;
					case 0:
						return 'Famale';
						break;
					case 2:
						return 'Secrecy'
						break;
				}
			}
		}
	})
</script>

<style>
</style>
