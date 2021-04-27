<template>
	<div>
		<Header title="User Photo" />
		<div class="upload-img">
			<van-image width="90vw" height="90vw" radius="4" :src="userCenterInfo.headimg"></van-image>
		</div>
		<simple-cropper :initParam="uploadParam" @uploadHandle="uploadHandle" :img64="img64" ref="cropper">
			<template #btn>
				<div class="upload-btn-item">
					<van-button type="info" class="upload-btn" block @click="upload">Upload Photo</van-button>
				</div>
			</template>
			<img :src="userImg" @click="upload">
		</simple-cropper>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import {Button} from 'vant'
	import SimpleCropper from '@/components/SimpleCropper'
	export default {
		name: 'info',
		data() {
			return {
				uploadParam: {
					fileType: 'recruit', // 其他上传参数 
					uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址 
					scale: 4 // 相对手机屏幕放大的倍数: 4倍 
				},
				userImg: this.$dataURL + 'test.png',
				img64:''
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
		methods: {
			//获取用户信息
			userInfo(){
				if(Object.keys(this.userCenterInfo).length==0){
					this.$store.dispatch('user/getUserCenterInfo')
				}
			},
			// 点击上传头像 
			upload() {
				this.$refs['cropper'].upload()
			},
			// 确认上传头像
			uploadHandle(params) {
				this.$api.user.UploadHeadimg(params).then(res=>{
					if(res.fsstate==0){
						this.getUserCenterInfo();
						this.$router.go(-1);
					}else{
						this.$toast(res.fsmes);
						this.$refs['cropper'].cancelHandle()
					}
				})
			},
			...mapActions({
				getUserCenterInfo:'user/getUserCenterInfo'
			})
		},
		components: {
			SimpleCropper,
			[Button.name]:Button
		}
	}
</script>

<style>
	.upload-img{text-align: center;margin:20px auto;}
	.upload-btn-item{width: 90%;margin:0 auto}
</style>
