<template>
	<div class="v-simple-cropper">
		<slot name="btn"></slot>
		<!-- <div class="upload-btn-item">
			<van-button type="info" class="upload-btn" block round @click="upload">Upload Photo</van-button>
		</div> -->
		

		<input class="file" ref="file" type="file" accept="image/*" @change="uploadChange">
		
		<div class="v-cropper-layer" ref="layer">
			<div class="layer-header">
				<p class="cancel" @click="cancelHandle">Cancel</p>
				<p class="confirm" @click="confirmHandle">Upload</p>
			</div>
			<img ref="cropperImg">
		</div>
	</div>
</template>

<script>
	import Cropper from 'cropperjs'
	import 'cropperjs/dist/cropper.css'
	export default {
		name: 'v-simple-cropper',
		props: {
			initParam: Object,
			
		},
		data() {
			return {
				cropper: {},
				filename: ''
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			// 初始化裁剪插件 
			init() {
				let cropperImg = this.$refs['cropperImg']
				this.cropper = new Cropper(cropperImg, {
					viewMode:3,  //限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
					cropBoxResizable:false,  //是否可以改变裁剪框的尺寸
					cropBoxMovable:false,   //是否可以拖拽裁剪框
					// movable :false,
					aspectRatio: 1 / 1,
					dragMode: 'move'
				})
			},
			// 点击上传按钮 
			upload() {
				this.$refs['file'].click()
			},
			// 选择上传文件 
			uploadChange(e) {
				let file = e.target.files[0]
				this.filename = file['name']
				let URL = window.URL || window.webkitURL
				this.$refs['layer'].style.display = 'block'
				this.cropper.replace(URL.createObjectURL(file))
			},
			// 取消上传 
			cancelHandle() {
				this.cropper.reset()
				this.$refs['layer'].style.display = 'none'
				this.$refs['file'].value = ''
			},
			// 确定上传 
			confirmHandle() {
				let cropBox = this.cropper.getCropBoxData()
				let scale = this.initParam['scale'] || 1
				let cropCanvas = this.cropper.getCroppedCanvas({
					width: cropBox.width * scale,
					height: cropBox.height * scale
				})
				let imgData = cropCanvas.toDataURL('image/jpeg');
				let params={
					_img64:imgData
				}
				this.$emit('uploadHandle',params)
			}
		}
	}
</script>

<style>
	.upload-btn-item{text-align: center;}
	/* //.upload-btn{margin: 30px auto;} */
	.file {
		display: none;
	}

	.v-cropper-layer {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		z-index: 99999;
		display: none;
	}

	.layer-header {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 99999;
		background-color: rgba(0,0,0,.9);
		width: 100%;
		height: 50px;
		line-height: 50px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.layer-header p{
		width: 40%;
		color: #fff;
		font-size: 18px;
		text-align: center;
	}
	/* .cancel,
	.confirm {
		line-height: .8rem;
		font-size: .28rem;
		background: inherit;
		border: 0;
		outline: 0;
		float: left;
	} */

	.confirm {
		float: right;
	}

	.v-cropper-layer img {
		position: inherit !important;
		border-radius: inherit !important;
		float: inherit !important;
	}
</style>
