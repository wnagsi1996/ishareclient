<template>
	<div class="header">
		<van-nav-bar :title="title" left-arrow fixed placeholder>
		  <template #left>
		    <van-icon v-if="searchshow" class="header-left" name="wap-nav" size="24" @click="showUserContent" />
		    <van-icon v-else class="header-left" name="arrow-left" size="24" @click="back" />
		  </template>
			<template #right>
				<div class="header-right">
					<!-- <div class="header-right-icon">
						<van-icon name="shopping-cart-o" size="22" dot badge="1" />
					</div> -->
					<div class="header-right-icon" v-if="searchshow" @click="search">
						<van-icon name="search" size="24" />
					</div>
					<div class="header-right-icon" v-if="shareshow" @click="shareLink">
						<van-icon name="share-o" size="22" />
					</div>
					<slot name="node"></slot>
				</div>
			</template>
		</van-nav-bar>
		<van-popup v-model="show" position="left" :style="{ width:'80vw',height: '100vh',overflow:'auto' }">
			<!-- <component :is="HomeUserContent"></component> -->
			<HomeUserContent></HomeUserContent>
		</van-popup>
		<van-share-sheet title="Share with your friends" v-model="showShare" :options="shareOptions" @select="selShare" />
	</div>
</template>

<script>
	import {NavBar,Popup,ShareSheet} from 'vant';
	//import HomeUserContent from '@/components/HomeUserContent'
	import Clipboard from 'clipboard';
	export default {
	  name: 'Home',
	  components:{
		  [NavBar.name]:NavBar,
		  [Popup.name]:Popup,
		  [ShareSheet.name]:ShareSheet,
		  HomeUserContent:()=>import('@/components/HomeUserContent')
	  },
	  props:{
		title:{
			type:String,
			default:''
		},
		searchshow:{
			type:Boolean,
			default:false
		},
		shareshow:{
			type:Boolean,
			default:false
		},
	  },
	  data(){
		  return{
			  show:false,
			  showShare:false,
			  shareOptions:[
				{ name: 'Facebook', icon: require('../../assets/icon/Facebook.svg') },
				{ name: 'Twitter', icon: require('../../assets/icon/Twitter.svg') },
				{ name: 'Messenger', icon: require('../../assets/icon/Messenger.png'), description: '' },
				{ name: 'Pinterest', icon: require('../../assets/icon/Pinterest.svg') },
				{ name: 'Linkedin', icon:require('../../assets/icon/LinkedIn.svg')},
				{ name: 'Whatapp', icon: require('../../assets/icon/Whatapp.png')},
				{ name: 'Picture QR code', icon: require('../../assets/icon/Whatapp.png')},
				{ name: 'Copy', icon: require('../../assets/icon/copy.png'),className:'copy' }
			  ],
			  HomeUserContent:null,
			  url:''
		  }
	  },
	  mounted() {
	  	
	  },
	  methods:{
		  //显示左边滑出
		  showUserContent(){
			 this.show=true 
		  },
		   //显示分享
		  shareLink(){
			  let token=this.$store.getters.token;
			  if(token){
				  this.showShare=true
			  }else{
				  this.$router.push({path:'/login'})
			  }
			  
		  },
		  //选中分享
		  selShare(val){
			  let userinfo=this.$store.getters.userInfo;
			  let url='';
			  if(this.url==''){
				  this.url=window.location.href+'?u='+userinfo.uid
			  }
			  url=this.url;
			  switch (val.name){
				  case "Facebook":
					window.open('https://www.facebook.com/sharer/sharer.php?' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
					break;
				  case "Twitter":
					window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(url));
					break;
				  case "Messenger":
					window.open('fb-messenger://share?link=' + encodeURIComponent(url) + '&app_id=' + encodeURIComponent(2150569971849396));
					break;
				  case "Pinterest":
					window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(url) + '&description=' +  encodeURIComponent(document.title));
					break;
				  case "Linkedin":
					window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(url) + '&title=' +  encodeURIComponent(document.title));
					break;
				  case "Whatapp":
					window.open('whatsapp://send?text='+encodeURIComponent(url));
					break;
				  case "Picture":
					window.open('');
					break;
				  case "Copy":
					let clipboard = new Clipboard('.copy',{
						text:()=>{
							return this.url
						}
					});console.log(clipboard)
					  clipboard.on('success', e => {
						  this.$toast('Copy Success')
						//console.log('复制成功')
						// 释放内存
						clipboard.destroy();
					  })
					  clipboard.on('error', e => {
						  this.$toast('Copy failed')
						// 不支持复制
						//console.log('该浏览器不支持自动复制')
						// 释放内存
						clipboard.destroy();
					  })
					break;
			  }
		  },
		  //后退
		  back(){
			  this.$router.go(-1);
		  },
		  search(){
			  this.$router.push({path:'/menulist'})
		  }
	  }
	}
</script>

<style scoped>
	.header{position: relative;z-index: 2;}
	.header-left{color: #666;}
	.header-right{display: flex;}
	.header-right-icon{width:50px;text-align: right}
	.header-right-icon i{color: #666;}
</style>
