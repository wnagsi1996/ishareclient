<template>
	<div class="order">
		<Header title="My Order" />
		<div class="nav">
			<ul>
				<li v-for="(item,index) in stateJson" :key="index" @click="search(item.val)" :class="item.val==orderState?'active':''">{{item.text}}</li>
			</ul>
		</div>
		<div style="height: 40px;"></div>
		<RefreshLoading :ismore="ismore" :list="list" @load="load">
			<div class="order-item" v-for="(item,index) in list" :key="index">
				<div class="order-item-top">
					{{item.ddzt | state}}
				</div>
				<div class="order-item-bottom" @click="hankDetail(item.ddbh)">
					<p>Order number：{{item.ddbh}}</p>
					<p>Order time：{{item.ddxdsj}}</p>
					<p>Payment time：{{item.ddfksj}}</p>
					<p>Total price：${{item.ddje}}</p>
					<p>Remark：{{item.ddly}}</p>
					<div v-if="item.ddzt=='0'" class="order-btn">
						<van-button size="small" type="danger" @click.stop="hankCancel(item.ddbh)">Cancel order</van-button>
						<van-button size="small" type="primary" @click.stop="hankPay(item.ddbh)">Pay order</van-button>
					</div>
					<div v-if="item.ddzt=='2'" class="order-btn">
						<van-button size="small" type="primary" @click.stop="hankConfirm(item.ddbh)">Confirm Receipt</van-button>
					</div>
				</div>
			</div>
		</RefreshLoading>
		<van-popup v-model="show" position="bottom" round  :style="{ minHeight: '20%' }">
			<div class="detail-item">
				
				<van-card
				  v-for="n in detail[orderno]"
				  :key="orderno"
				  currency="$"
				  :num="n.ddmxnum"
				  :price="n.ddmxdj"
				  :desc="n.ddmxsx"
				  :title="n.ddmxtitle"
				  :thumb="n.ddmximg"
				  class="card-item"
				  @click="toURL(n)"
				>
				<template #tags>
				    <p>State:{{n.ddmxzt | state}}</p>
				  </template>
				</van-card>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import RefreshLoading from '@/components/RefreshLoading'
	import { Card,Popup,Button,Dialog  } from 'vant';
	export default({
		name:'MyOrder',
		data(){
			return{
				orderState:'',
				index:0,
				list:[],
				ismore:false,
				detail:{},
				show:false,
				orderno:'',
				stateJson:[
					{
						val:'',
						text:'All'
					},
					{
						val:'0',
						text:'Pending'
					},
					{
						val:'1',
						text:'Processing'
					},
					{
						val:'2,9',
						text:'Shipping'
					},
					{
						val:'3,4,5',
						text:'Completed'
					},
					{
						val:'8',
						text:'Close'
					},
					{
						val:'10',
						text:'Sharing'
					}
				]
			}
		},
		components:{
			RefreshLoading,
			[Card.name]:Card,
			[Popup.name]:Popup,
			[Button.name]:Button,
			[Dialog.Component.name]: Dialog.Component
		},
		methods:{
			toURL(item){
				let orderno=this.orderno;
				if(orderno.startsWith('PT')){
					let orderattr=orderno.split("_");
					this.$router.push(`/groupswaitbuy?orderno=${orderattr[0]}`) 
				}else{
					this.$router.push(`/product?pid=${item.ddpid}`) 
				}
			},
			load(i=0){
				if(i!=0){
					this.index=0
				}
				let params={
					ddzt:this.orderState,
					pageindex:this.index
				}
				
				this.$api.user.getMySCSaleList(params).then(res=>{
					console.log(res);
					
					if(res.rows.length>0){
						if(i!=0){
							this.list=[];
							this.ismore=false
						}
						this.index++
						this.list=[...this.list,...res.rows]
					}else{
						this.ismore=true
						//this.$toast('Data Null')
					}
				}).catch(err=>{
					this.$toast('Data loading error')
					console.log(err)
				})
			},
			//订单详情
			hankDetail(orderno){
				this.show=true
				this.orderno=orderno
				if(!this.detail[orderno]){
					this.$api.user.getMySCSaleDetailList({orderno,ddzt:''}).then(res=>{
						if(res.rows!=''){
							this.$set(this.detail,orderno,res.rows);
						}
						console.log(this.detail)
					})
				}
			},
			//取消订单
			hankCancel(orderno){
				Dialog.confirm({
				  message: 'Are you sure want to cancel the order?',
				  async beforeClose(action, done){
					  if (action === 'confirm') {
					      await this.$api.user.cancelSCOrder({orderno}).then(res=>{
							  if(res.fsstate=='1'){
								  this.$toast('Order canceled');
								  this.load(1)
							  }else{
								  this.$toast(res.fsmes);
							  }
						  }).catch(err=>{
							  console.log(err)
						  })
						  done();
					    } else {
					      done();
					    }
				  }
				});
			},
			//支付订单
			hankPay(orderno){
				this.$api.user.doPaySCOrder({orderno}).then(res=>{
					if(res!=''){
						if(res.fsstate==1){
							//paypal支付
							if(res.fzffs==2){
								window.location.href = res.fsmes;
							}else{
								//微信支付
								if(res.fzffs==1){
									
								}
							}
						}else{
							this.$toast(res.fsmes)
						}
					}else{
						this.$toast('operation exception .please try again.')
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			//确认收货
			hankConfirm(orderno){
				Dialog.confirm({
				  message: 'Are you sure that you have received all the products in this order?',
				  async beforeClose(action, done){
					  if (action === 'confirm') {
					      await this.$api.user.comitshTotalOrder({orderno}).then(res=>{
							  if(res.fsstate=='1'){
								  this.$toast('Receipt success')
								  this.load('1')
							  }else{
								  this.$toast(res.fsmes);
							  }
						  }).catch(err=>{
							  console.log(err)
						  });
						  done();
					    } else {
					      done();
					    }
				  }
				});
			},
			//搜索
			search(i){
				this.list=[]
				this.orderState=i;
				this.load('1');
			}
		},
		filters:{
			state(val){
				let txt
				switch(val){
					case '0':
						txt= 'Pending';
						break;
					case '1':
						txt='Processing';
						break;
					case '2':
						txt='Shipping'
						break;
					case '3':
						txt='Completed';
						break;
					case '4':
						txt='Completed';
						break;
					case '5':
						txt='Completed';
						break;
					case '6':
						txt='After Sales';
						break;
					case '7':
						txt='Finish After Sale';
						break;
					case '8':
						txt='Close';
						break;
					case '9':
						txt='Shipping';
						break;
					case '10':
						txt='Confirming';
						break;
					case 'sharing':
						txt='sharing';
						break;
				}
				return txt;
			}
		}
	})
</script>

<style scoped>
	.order{width:96vw;margin:0 auto}
	.order-item{background-color: #fff;padding: 10px;border-radius: 5px;margin:10px auto}
	.order-item-top{height:30px;line-height: 30px;text-align: right;border-bottom: 1px solid #f7f7f7;color: #e41c1d;}
	.order-item-bottom{margin-top: 5px;}
	.order-item-bottom p{height:25px;line-height: 25px;}
	.order-btn{text-align: right;}
	.order-btn button{margin-left: 15px;}
	.detail-item{width: 96vw;margin:10px auto}
	.nav{width: 100vw;height:40px;line-height:40px;text-align:center;position: fixed;left: 0;top: 40px;z-index: 2;background-color: #fff;overflow: auto;}
	.nav ul{display: flex;height: 40px;}
	.nav ul li{padding:0 15px}
	.nav ul li.active{color: #e41c1d;border-bottom: 1px solid #e41c1d;}
</style>
