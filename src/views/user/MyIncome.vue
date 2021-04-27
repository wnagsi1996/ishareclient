<template>
	<div class="incomeBJ">
		<Header title="My Income" />
		<div class="income-total" v-if="Object.keys(income).length>0">
			<div class="income-total-left">
				<p>Remaining:<span>{{income.tjyjye}}</span></p>
				<p>History:<span>{{income.tjyjlj}}</span></p>
			</div>
			<div class="income-total-right">
				<van-button type="info" size="mini" @click="onCash">Withdraw Cash</van-button>
			</div>
		</div>
		<RefreshLoading :ismore="ismore" :list="list" @load="load">
			<div class="income">
				<div class="income-node" v-for="(item,index) in list" :key="index">
					<div class="income-status">{{item.yjlx}}</div>
					<div class="income-info">
						<div class="income-money">{{item.yjje}}</div>
						<div class="income-date">{{item.wgsj}}</div>
					</div>
				</div>
			</div>
		</RefreshLoading>
	</div>
</template>

<script>
	import RefreshLoading from '@/components/RefreshLoading'
	import {Button,Dialog } from 'vant'
	export default({
		name:'MyMember',
		components:{
			RefreshLoading,
			[Button.name]:Button,
			[Dialog.Component.name]: Dialog.Component
		},
		data(){
			return{
				ismore:false,
				list:[],
				index:0,
				income:{}
			}
		},
		created(){
			this.getUserTjYj()
		},
		methods:{
			//加载数据
			load(i=0){
				if(i!=0){
					this.index=0
				}
				this.$api.user.getShareYJMXRecordList({pageindex:this.index}).then(res=>{
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
			//获取用户提现佣金
			getUserTjYj(){
				this.$api.user.getUserTjYj().then(res=>{
					if(res!=''){
						this.income=res;
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			//提现
			onCash(){
				let yjye=this.income.tjyjye.substring(1);
				if(yjye<30){  //余额大于30才能提现
					this.$toast('Income less than $30 can not be extracted.');
					return;
				}
				
				let paypal=this.income.paypal;
				let accountType=paypal.substring(paypal.indexOf('[')+1,paypal.indexOf(']'));  //截取提现渠道
				if(paypal==''){
					
				}
				paypal=paypal.substring(0,paypal.indexOf('['));
				
				let payInfo=''
				if(accountType=='PayPal'){
					payInfo=',PayPal will charge a fee'
				}
				
				Dialog.confirm({
				  confirmButtonText:'Confirm',
				  cancelButtonText:'Cancel',
				  message: `Do you confirm withdraw your income to your ${accountType} account: ${paypal} ${payInfo}`,
				  beforeClose(action,done){
					  if(action==='confirm'){
						  this.$api.user.TjYjTX().then(res=>{
							  console.log(res);
					  		this.$toast(res.fsmes)
					  		if(res.fsstate!=0){
					  			if(res.fsstate==2){  //绑定账户
					  				
					  			}
					  		}else{
					  			this.getUserTjYj();
					  		}
					  		done();
					  	}).catch(err=>{
					  		console.log(err);
					  		this.$toast('Please try again')
					  		done();
					  	})
					  }else{
					  	done();
					  }
				  },
				  
				}).catch(() => {
					// on cancel
				});
			},
		}
		
	})
</script>

<style scoped>
	.income-total{width: 90vw;padding: 10px;background-color: #fff;margin:10px auto 0;border-radius: 5px;display: flex;justify-content: space-between;}
	.income-total-left{width: 50%;}
	.income-total-left p{padding:5px 0}
	.income-total-left p:first-child span{font-size: 16px;}
	.income-total-left p span{color:#e41c1d;}
	.income-total-right{}
	.income{width:90vw;padding: 10px;background-color: #fff;border-radius: 5px;margin: 10px auto;}
	.income-node{padding:10px 0;border-bottom:1px solid #f7f7f7;display: flex;}
	.income-status{width: 50%;}
	.income-info{width:50%;text-align: right;}
	.income-money{color: #e41c1d;}
	.income-date{margin-top:4px;font-size:12px}
</style>
