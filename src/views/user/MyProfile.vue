<template>
	<div>
		<Header title="My Profile" >
			<template #node>
				<router-link class="modify-btn" to="/profilemodify">Modify</router-link>
			</template>
		</Header>
		<van-cell-group>
		  <van-cell title="Avatar" is-link to="/uploadphoto">
			  <van-image
			    width="36"
			    height="36"
				radius="5"
			    :src="userCenterInfo.headimg"
				class="photo-img"
			  />
		  </van-cell>
		  <van-cell title="Family Name" :value="userCenterInfo.name" />
		  <van-cell title="Nick Name" :value="userCenterInfo.ncname" />
		  <van-cell title="Sex" :value="userCenterInfo.sex | sex" />
		  <van-cell title="School Name" :value="userCenterInfo.college" />
		  <van-cell title="Alternate mailbox" :value="userCenterInfo.loginname" />
		  <van-cell title="Signature" :value="userCenterInfo.gxqm" />
		</van-cell-group>
	</div>
</template>

<script>
	import { Cell, CellGroup} from 'vant';
	import {mapGetters} from 'vuex'
	export default({
		name:'MyProfile',
		components:{
			[Cell.name]:Cell,
			[CellGroup.name]:CellGroup
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
				if(Object.keys(this.userCenterInfo).length==0){
					this.$store.dispatch('user/getUserCenterInfo')
				}
			}
		},
		filters:{
			sex(val){
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

<style scoped>
	.modify-btn{color:#1989FA;}
	.photo-img{position: absolute;right: 0;top: 50%;margin-top:-18px}
	.van-cell__value{overflow: initial;}
</style>
