<template>
	<div class="couponBJ">
		<Header title="My Coupon" />
		<van-tabs v-model="vtype" :before-change="beforeChange">
		  <van-tab title="All" name='-1' />
		  <van-tab title="Unused" name='0'  />
		  <van-tab title="Used" name='1' />
		  <van-tab title="Expired" name='2' />
		</van-tabs>
		<RefreshLoading :ismore.sync="ismore" :list="list" @load="load">
			<div class="coupon">
				<div class="coupon-node" v-for="(item,index) in list" :key="index">
					<div class="coupon-node-money">
						<p>{{item.vprice}}</p>
						<p>USD</p>
					</div>
					<div class="coupon-node-info">
						<h3>{{item.vtitle}}</h3>
						<p>Above ${{item.vminmoney}} is available</p>
						<p>Valid until：{{item.vyxq}}</p>
						<p>{{item.vremark}}</p>
						<div class="coupon-status"></div>
						<div class="coupon-status-text">{{item.vstate | status}}</div>
					</div>
				</div>
			</div>
		</RefreshLoading>
	</div>
</template>

<script>
	import RefreshLoading from '@/components/RefreshLoading'
	import { Tab, Tabs } from 'vant';
	export default({
		name:'MyMember',
		components:{
			RefreshLoading,
			[Tab.name]:Tab,
			[Tabs.name]:Tabs
		},
		data(){
			return{
				ismore:false,
				list:[],
				index:0,
				vtype:'0'    ,//-1全部  0待使用  1使用过  2过期
			}
		},
		created(){
			
		},
		methods:{
			//加载数据
			load(i=0){
				if(i!=0){
					this.index=0
				}
				this.$api.user.getVoucher({vtype:this.vtype,pageindex:this.index}).then(res=>{
					// /console.log(res)
					if(res!=''){
						if(i!=0){
							this.list=[]
						}
						this.index++
						this.list=this.list.concat(res.rows)
					}
					if(res.rows.length==0){
						this.ismore=true
					}
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			beforeChange(index){
				if(index!=this.vtype){
					this.vtype=index;
					this.load(1)
				}
			}
		},
		filters:{
			status(n){
				let text='';
				switch(n){
					case '0':
						text='Unused';
						break;
					case '1':
						text='Used';
						break;
					case '2':
						text='Expired';
						break;
				}
				return text
			}
		}
	})
</script>

<style scoped>
	.coupon{width: 96vw;margin: auto;}
	.coupon-node{display: flex;margin:10px auto;align-items: center;overflow: hidden;position: relative;border-radius: 10px;height: 120px;}
	.coupon-node-money{width:25%;height:120px;border-radius:10px;color: #e41c1d;text-align: center;padding:0 10px;background-color: #fff;border-right: 2px dashed #f7f7f7;box-sizing: border-box;}
	.coupon-node-money p{font-size:24px}
	.coupon-node-money p:first-child{margin-top:30px}
	.coupon-node-info{width:75%;height:120px;background-color: #fff;border-radius:10px;}
	.coupon-node-info h3{padding:10px 0 8px 10px;}
	.coupon-node-info p{padding: 2px 10px 0 10px;color:#666;font-size: 12px;}
	.coupon-status{width:80px;height:80px;position: absolute;top: -40px;right: -40px;background-color: red;transform:rotate(45deg);color: #fff;}
	.coupon-status-text{position: absolute;top: 14px;right: 0;transform:rotate(45deg);color: #fff;z-index: 2;font-size:12px}
</style>
