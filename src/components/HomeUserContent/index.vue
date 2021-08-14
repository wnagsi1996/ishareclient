<template>
	<div class="usercenter-box">
		<div class="user-info">
			<div class="user-info-unlogin" v-if="!isLogin">
				<p>
					<van-icon name="user-o" />
					<router-link to="/login">Login</router-link> or 
					<router-link to="/register">Register</router-link>
				</p>
				<van-icon name="arrow" />
			</div>
			<div class="user-info-login" v-else>
				<div class="user-info-item">
					<p>{{user.name}}</p>
					<p>{{user.email}}</p>
				</div>
				<div class="user-info-icon">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
		<div class="usercontent-list" :style="{height:treeHeight}">
			<ul>
				<li v-for="(item,index) in menulist" :key="item.index" v-if="item.istrue">
					<router-link :to="item.url" @click.native="signout(item)">
						<van-icon :name="item.icon" />
						<p>{{item.name}}</p>
					</router-link>
				</li>
			</ul>
			<ul class="ulList">
				<li v-for="(item,index) in menulist2" :key="item.index">
					<router-link :to="item.url">
						<van-icon :name="item.icon" />
						<p>{{item.name}}</p>
					</router-link>
					
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	export default({
		name:"HomeUserContnet",
		data(){
			return{
				isLogin:false,
				user:{
					name:'',
					email:''
				},
				menulist:[
					{
						'icon':'manager-o',
						'name':'User',
						'url':'/usercenter',
						'istrue':true
					},
					{
						'icon':'like-o',
						'name':'Wish List',
						'url':'/mylike',
						'istrue':true
					},
					{
						'icon':'orders-o',
						'name':'My Order',
						'url':'/myorder',
						'istrue':true
					},
					{
						'icon':'gift-o',
						'name':'My Gifts',
						'url':'/mygifts',
						'istrue':true
					},
					{
						'icon':'manager',
						'name':'My Member',
						'url':'/mymembers',
						'istrue':true
					},
					{
						'icon':'exchange',
						'name':'Sign out',
						'url':'',
						'istrue':true
					}
				],
				menulist2:[
					{
						'icon':'shop-o',
						'name':'Product',
						'url':'/productlist'
					},
					{
						'icon':'points',
						'name':'Deals Prdocut',
						'url':'/dealslist'
					},
					{
						'icon':'gift-card-o',
						'name':'Free Gifts',
						'url':'/freelist'
					},
					{
						'icon':'chat-o',
						'name':'Contact Us',
						'url':'/contactus'
					},
					{
						'icon':'envelop-o',
						'name':'Categories & Help',
						'url':'/help'
					}
				]
			}
		},
		computed:{
			treeHeight(){
				const winHeight= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				return winHeight-100+'px'
			}
		},
		created() {
			let token=this.$store.getters.token;  //获取是否有登录
			let userinfo=this.$store.getters.userInfo;
			if(token){
				this.isLogin=true
				this.user.name=userinfo.ncname;
				this.user.email=userinfo.loginname;
			}
			this.menulist.forEach(item=>{
				if(item.icon=='exchange'){
					if(token){
						item.istrue=true
					}else{
						item.istrue=false
					}
					
				}
			})
		},
		methods:{
			signout(item){
				if(item.icon=='exchange'){
					this.$store.dispatch('user/resetToken').then(res=>{
						console.log('sign out success');
						location.reload()
					})
				}
			}
		}
	});
</script>

<style scoped>
	.user-info{height: 100px;background-color: #f9f9f9;}
	.user-info-unlogin{height:100px;line-height: 100px;padding-left: 40px;display: flex;}
	.user-info-unlogin p{font-size: 18px;flex: 1;color:#333}
	.user-info-unlogin p i.van-icon-user-o{font-size:36px;padding-right: 10px;color: #CCCCCC;vertical-align: middle;}
	.user-info-unlogin i.van-icon-arrow,.user-info-icon{width: 50px;height: 50px;display: block;text-align: center;line-height: 50px;margin:25px 0;}
	.usercontent-list{width: 100%;overflow: auto;}
	.usercontent-list ul{margin-top: 20px;}
	.usercontent-list ul li{padding-left: 20px;height: 60px;line-height: 50px;}
	.usercontent-list ul li a{display: flex;color: #222;}
	.usercontent-list ul li i{width: 40px;height: 50px;line-height: 50px;display: block;font-size: 22px;}
	.usercontent-list ul li p{flex: 1;font-size: 14px; text-align: left;}
	.ulList{border-top: 15px solid #f9f9f9;}
	.user-info-login{display: flex;}
	.user-info-item{flex: 1;margin: 30px;}
	.user-info-item p{font-size: 16px;text-align: left;}
	.user-info-item p:last-child{color:#888}
	.user-info-unlogin a{color: #e41c1d;}
</style>
