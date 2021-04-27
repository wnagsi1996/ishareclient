<template>
	<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
	  <van-list v-model="loading" :finished="finished" finished-text="No more" @load="onLoad">
	    <div class="love-item">
			<div class="love-item-info infinite-list-item" v-for="(item,index) in productList" :key="index">
				<router-link :to="item | urlCompile">
					<van-image :src="item.img"  fit="scale-down"></van-image>
					<span class="ptype">{{item.platformname}} · {{item | typeTxt}}</span>
					<p class="ptitle" >{{item.title}}</p>
					<p class="px">{{item.zkj| priceFiler}}</p>
					<p class="py">{{item.oriprice | priceFiler}}</p>
					<div class="detail"><span>Detail</span> <van-icon name="arrow" /></div>
				</router-link>
			</div>
		</div>
	  </van-list>
	</van-pull-refresh>
</template>

<script>
	import {List,PullRefresh} from 'vant'
	export default({
		name:'ProductList',
		components:{
			[List.name]:List,
			[PullRefresh.name]:PullRefresh
		},
		props:{
			productList:{
				type:Array,
				default:new Array()
			},
			productTotal:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				finished:true,
				loading:false,
				refreshing:false
			}
		},
		mounted(){
			this.onRefresh()
		},
		methods:{
			onRefresh(){
				this.loading=true
				this.finished=false
				this.$emit("loadproductdata",'1')
			},
			onLoad(){
				this.$emit("loadproductdata")
				
			}
		},
		watch:{
			productList(newVal,oldVal){
				if(newVal.length==0){
					//this.onRefresh()
					this.finished=true
				}else{
					this.finished=false
				}
				
				this.productList=newVal
				
				this.loading=false
				this.refreshing=false
			},
			productTotal(newVal,oldVal){
				if(newVal){
					this.finished=true
				}
			}
		},
		filters:{
			//url
			urlCompile:(item)=>{
				let newurl=item.title.replace(/ /g, '-').replace(/'/g, '').replace(new RegExp('/','gm'), '-').replace(/:/g, '-').replace(/,/g, '-')
				
				return '/dealsdetail/'+newurl+'/'+item.rid
			},
			//价格
			priceFiler:(price)=>{
				let newPrice=price;
				let re = /^[0-9]+.?[0-9]*/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
				if (re.test(price)) {
					newPrice = "$" + price;
				};
				return newPrice;
			},
			//时间显示
			typeTxt:(txt)=>{
				let total = txt.fcjsj_span;
				let minute = parseInt(total / 60); //计算整数分钟数
				let jsday = parseInt(total / (24 * 60 * 60)); //计算整数天数
				let jsafterDay = total - jsday * 24 * 60 * 60; //取得算出天数后剩余的秒数
				let jshour = parseInt(total / (60 * 60)); //计算整数小时数
				let week = parseInt(jsday / 7);
				let month = parseInt(jsday / 30);
				let year = parseInt(jsday / 365);
				let showdate = "";
				if (minute == 0) {
					showdate = "just recently";
				} else if (minute > 0 && jshour == 0) {
					if (minute == 1)
						showdate = minute + " minute ago";
					else
						showdate = minute + " minutes ago";
				} else if (jshour > 0 && jsday == 0) {
					if (jshour == 1)
						showdate = jshour + " hr ago";
					else
						showdate = jshour + " hrs ago";
				} else if (jsday > 0 && week == 0) {
					if (jsday == 1)
						showdate = jsday + " day ago";
					else
						showdate = jsday + " days ago";
				} else if (0 < week && month == 0) {
					if (week == 1)
						showdate = week + " week ago";
					else
						showdate = week + " weeks ago";
				} else if (0 < month && year == 0) {
					if (month == 1)
						showdate = month + " month ago";
					else
						showdate = month + " months ago";
				} else if (year > 0) {
					if (year == 1)
						showdate = year + " year ago";
					else
						showdate = year + " years ago";
				}
				return showdate;
			}
		}
	})
</script>

<style scoped>
	.love-item{display: flex;flex-wrap:wrap;margin:10px auto 0;justify-content: space-between;}
	.love-item-info{width: 50vw;padding: 0 2vw;border-bottom: 1px solid #ccc;box-sizing: border-box;}
	.love-item-info:first-child,.love-item-info:nth-child(2){border-top: 1px solid #ccc;}
	.love-item-info:nth-child(odd){border-right: 1px solid #ccc;}
	.love-item-info a{display: block;color: #000;}
	.love-item-info a img{width: 100%;display: block;margin:0 auto;border-radius: 5px;}
	.love-item-info a .ptype{font-size:12px;color: #a0a0a0;}
	.love-item-info a .py{color: #888;text-decoration: line-through;}
	.love-item-info a .px{color: #e41c1d;height: 20px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:top}
	.love-item-info a .ptitle{height:40px;line-height: 20px;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;margin:8px 0 4px}
	.love-item-info a .bold{font-weight: bold;}
	.love-item-info a .detail{text-align: right;height: 20px;line-height: 20px;margin:5px 0;color: #e41c1d;display: flex;align-items: center;justify-content: flex-end;}
	.van-image{width: 100%;height: 46vw;}
</style>
