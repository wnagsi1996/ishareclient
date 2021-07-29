<template>
	<div class="usercenter">
		<div class="usercenter-top">
			<div class="usercenter-top-img">
				<van-image :src="userCenterInfo.headimg" width="60px" height="60px" />
			</div>
			<div class="usercenter-top-node">
				<div class="usercenter-top-p">
					<p>{{userCenterInfo.ncname}}</p>
					<p>{{userCenterInfo.loginname}}</p>
				</div>
			</div>
			<div class="usercenter-top-msg" @click="toNotice">
				<van-icon name="chat-o" :badge="userCenterInfo.NotReadNoticeNum" size="24px" />
			</div>
		</div>
		<div class="usercenter-node">
			<div class="usercenter-node-item">
				<router-link to="/myincome">
					<p>Income</p>
					<span>${{userCenterInfo.sr}}</span>
				</router-link>
			</div>
			<div class="usercenter-node-item">
				<router-link to="/mymembers">
					<p>Members</p>
					<span>{{userCenterInfo.hy1}}</span>
				</router-link>
			</div>
		</div>
		<div class="user-nav">
			<ul>
				<li>
					<router-link to="/mygifts">
						<van-icon name="gift-o" size="20px" />
						<p>My Gifts</p>
					</router-link>
				</li>
				<li>
					<router-link to="/myorder">
						<van-icon name="orders-o" size="20px" />
						<p>My Order</p>
					</router-link>
				</li>
				<li>
					<router-link to="/mycoupon">
						<van-icon name="coupon-o" size="20px" />
						<p>Coupon</p>
					</router-link>
				</li>
				<li>
					<router-link to="/mylike">
						<van-icon name="like-o" size="20px" />
						<p>My Like</p>
					</router-link>
				</li>
				<li>
					<router-link to="/myprofile">
						<van-icon name="points" size="20px" />
						<p>My Profile</p>
					</router-link>
				</li>
				<li>
					<router-link to="/address">
						<van-icon name="location-o" size="20px" />
						<p>Address</p>
					</router-link>
				</li>
				<li>
					<router-link to="/setting">
						<van-icon name="setting-o" size="20px" />
						<p>Settings</p>
					</router-link>
				</li>
				<li>
					<router-link to="/help">
						<van-icon name="notes-o" size="20px" />
						<p>Help</p>
					</router-link>
				</li>
				<li @click="logout">
					<a href="javascript:">
						<van-icon name="exchange" size="20px" />
						<p>Logout</p>
					</a>
				</li>
			</ul>
		</div>
		<NavTab />
	</div>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default({
		name:'UserCenter',
		components:{
			NavTab:()=>import('@/components/NavTab')
		},
		computed:{
			...mapGetters([
				'token',
				'userCenterInfo',
				'keepAliveName'
			])
		},
		beforeRouteEnter(to,from,next){
			
			next(vm=>{
				// if(!vm.keepAliveName.includes('UserCenter')){
				// 	vm.$store.commit('keepAliveName/SET_NAME_LIST','UserCenter')
				// 	//vm.SET_NAME_LIST('UserCenter')
				// }
			})
		},
		data(){
			return{
				loadNav:false
			}
		},
		created(){
			this.userInfo();
		},
		methods:{
			//获取用户信息
			userInfo(){
				if(!this.userCenterInfo.college){
					this.$store.dispatch('user/getUserCenterInfo')
				}
			},
			//退出登录
			logout(){
				this.$store.dispatch('user/resetToken').then(res=>{
					if(res.rescode=='0'){
						this.$router.push({path:'/'})
					}
				})
			},
			//前往消息列表
			toNotice(){
				this.$router.push({path:'/noticelist'});
			},
			...mapMutations([
				'SET_NAME_LIST',
				'DEL_NAME_LIST'
			])
		}
	})
</script>

<style scoped>
	.usercenter{min-height:calc(100vh - 20px);background-color: #f7f7f7;padding:10px 0}
	.usercenter-top{width:90vw;padding: 10px;background-color: #fff;margin:auto;display: flex;}
	.usercenter-top-img{width: 70px;}
	.usercenter-top-node{flex: 1;}
	.usercenter-top-p p:first-child{font-size:18px}
	.usercenter-top-p p:last-child{font-size:16px;color: #333;padding-top: 3px;}
	.usercenter-top-msg{width:30px;}
	.usercenter-node{width:90vw;padding: 10px;background-color: #fff;margin:10px auto;display: flex;justify-content: center;}
	.usercenter-node-item{width:44%;padding:0 3%}
	.usercenter-node-item:first-child{border-right:1px dashed #666;box-sizing: border-box;}
	.usercenter-node-item p{font-size: 16px;color: #666;}
	.usercenter-node-item span{font-size:28px;color: #e41c1d;margin-top: 12px;display: block;}
	.user-nav{width:90vw;padding:0 10px;background-color: #fff;margin:10px auto;}
	.user-nav ul li{height:50px;line-height:50px}
	.user-nav ul li:not(:last-child){border-bottom:1px solid #f1f1f1;box-sizing: border-box;}
	.user-nav ul li a{display: flex;align-items: center;color: #222;}
	.user-nav ul li a p{padding-left:20px}
</style>
