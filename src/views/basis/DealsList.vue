<template>
	<div>
		<Header shareshow />
		<div class="nav-search">
			<div class="nav-search-key" @click="onPick" :class="param.pick=='-1'?'':'nav-search-key-aceive'">
				<p><van-icon name="award" /><span>Staff Pick</span></p>
			</div>
			<div class="nav-search-key" @click="selSearch('Category')" :class="categoryName=='Category'?'':'nav-search-key-aceive'">
				<p><span>{{categoryName}}</span><van-icon name="arrow-down" /></p>
			</div>
			<div class="nav-search-key" @click="selSearch('Store')" :class="storeName=='Store'?'':'nav-search-key-aceive'">
				<p><span>{{storeName}}</span><van-icon name="arrow-down" /></p>
			</div>
		</div>
		<div class="nav-search-null"></div>
		<!-- 产品列表 -->
		<DealProductList :productList="productlist" @loadproductdata="loadproductdata" :productTotal="productTotal"></DealProductList>
		
		
		<van-popup v-model="actionshow" round position="bottom">
		  <van-picker
		    :title="popupTitle"
		    show-toolbar
		    :columns="columns"
			@cancel="actionshow=false"
			@confirm="onConfirm"
		  />
		</van-popup>
		
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import DealProductList from "@/components/DealProductList"
	import { Popup,Picker } from 'vant';
	export default({
		name:'DealsList',
		components:{
			Header,
			DealProductList,
			[Popup.name]:Popup,
			[Picker.name]:Picker
		},
		data(){
			return{
				productlist:[],
				productTotal:'',
				index:0,
				param:{
					sptitle:'',
					sptype:'',
					platid:'-1',
					pick:'-1',
					popul:'-1'
				},
				actionshow:false,
				popupTitle:'',
				categoryName:'Category',
				storeName:'Store',
				catelist:[
					{id:'',txt:'All'},
					{id:'1212',txt:'Women\'s Clothing'},
					{id:'1251',txt:'Men’s Clothing'},
					{id:'1566',txt:'Cellphones & Telecommunications'},
					{id:'1213',txt:'Consumer Electronics'},
					{id:'1550',txt:'Office & School Supplies'},
					{id:'1513',txt:'Computer & Office'},
					{id:'1217',txt:'Mother & Kids'},
					{id:'1215',txt:'Luggage & Bags'},
					{id:'1219',txt:'Shoes'},
					{id:'1220',txt:'Weddings & Events'},
					{id:'1214',txt:'Jewelry & Watches'},
					{id:'1234',txt:'Toys & Hobbies'},
					{id:'1218',txt:'Sports & Outdoors'},
					{id:'1216',txt:'Home & Garden'},
					{id:'1533',txt:'Security & Protection'},
					{id:'1436',txt:'Beauty & Health'},
					{id:'1588',txt:'Beauty & Automobiles & Motorcycles'},
					{id:'1599',txt:'Beauty & Tools'}
				],
				storelist:[
					{id:'-1',txt:'All'},
					{id:'1',txt:'Amazon'},
					{id:'2',txt:'Walmart'},
					{id:'3',txt:'eBay'},
					{id:'4',txt:'Rakuten'},
					{id:'5',txt:'AliExpress'},
					{id:'6',txt:'Wish'},
					{id:'7',txt:"Macy's"},
					{id:'8',txt:'Home Depot'},
					{id:'9',txt:'Groupon'},
					{id:'10',txt:'Daily Steals'},
					{id:'11',txt:'JCPenney'},
					{id:'12',txt:'StackSocial'},
					{id:'13',txt:'Bed Bath & Beyond'},
					{id:'14',txt:'Tanga Sears'},
					{id:'15',txt:'Sears'},
					{id:'16',txt:'Dell Small Business'},
					{id:'17',txt:'Ashford'},
					{id:'18',txt:'Samsung'},
					{id:'19',txt:'HP'},
					{id:'20',txt:"Sam's Club"},
					{id:'21',txt:"The Children's Place"},
					{id:'22',txt:'WatchMaxx'},
					{id:'23',txt:'Lenovo'},
					{id:'24',txt:'Abt'},
					{id:'25',txt:'Staples'},
					{id:'26',txt:'Quill'},
					{id:'27',txt:'Buckle'},
					{id:'28',txt:"Men's Wearhouse"},
					{id:'29',txt:'Sierra'},
					{id:'30',txt:"Kohl's"},
					{id:'31',txt:'Wayfair'},
					{id:'32',txt:'Apple'},
					{id:'33',txt:'Dell Home'},
					{id:'34',txt:'Dell Outlet'},
					{id:'35',txt:'AlphabetDeal'},
					{id:'36',txt:'Barnes & Noble'},
					{id:'37',txt:'Walgreens'},
					{id:'38',txt:'Jos. A. Bank'},
					{id:'39',txt:'Banggood'},
					{id:'40',txt:'Checks Unlimited'},
					{id:'41',txt:'Nordstrom Rack'},
					{id:'42',txt:'Target'},
					{id:'43',txt:'Best Buy'},
					{id:'44',txt:'Lumens'},
					{id:'45',txt:'iMyFone'},
					{id:'46',txt:'BBQGuys'},
					{id:'47',txt:'REI'},
					{id:'48',txt:'Shoes.com'},
					{id:'49',txt:'Proozy'},
					{id:'50',txt:'Supplement Hunt'},
					{id:'51',txt:'Sephora'},
					{id:'52',txt:'Greek Gear'},
					{id:'53',txt:'Jomashop'},
					{id:'54',txt:'Gap Factory'},
					{id:'55',txt:'Fossil'},
					{id:'56',txt:'DealBase'},
					{id:'57',txt:'Columbia'},
					{id:'58',txt:'Reebok'},
					{id:'59',txt:'Credit-Land'},
					{id:'60',txt:'Travelzoo'},
					{id:'61',txt:'Chase'},
					{id:'62',txt:'TD Bank Checking/Savings'},
					{id:'63',txt:'B&amp;H Photo Video'},
					{id:'64',txt:'Citi'}
				],
				columns:[]
			}
		},
		mounted() {
			this.catelist.forEach(n=>{
				this.columns.push(n.txt);
			})
		},
		methods:{
			loadproductdata(i=0){
				if(i!=0){
					this.index=0
				}
				let params={
					sptitle:this.param.sptitle,
					sptype:this.param.sptype,
					platid:this.param.platid,
					pick:this.param.pick,
					popul:this.param.popul,
					pageindex:this.index
				}
				this.$api.product.getDealsList(params).then(res=>{
					console.log(res)
					if(i!=0){
						this.productlist=[];
					}
					this.index++;
					this.productlist = this.productlist.concat(res.rows);
					if(res.rows.length==0){
						this.productTotal=true
					}
				}).catch((err)=>{
				  console.log(err);
				});
			},
			selSearch(txt=''){
				this.columns=[],
				this.popupTitle=txt;
				if(txt=='Category'){
					this.catelist.forEach(n=>{
						this.columns.push(n.txt);
					})
				}else{
					this.storelist.forEach(n=>{
						this.columns.push(n.txt);
					})
				}
				this.actionshow=true
			},
			onConfirm(e){
				if(this.popupTitle=='Category'){
					this.catelist.forEach(n=>{
						if(n.txt==e){
							this.param.sptype=n.id
							if(n.id==''){
								this.categoryName='Category'
							}else{
								this.categoryName=n.txt
							}
							
						}
					})
				}else{
					this.storelist.forEach(n=>{
						if(n.txt==e){
							this.param.platid=n.id
							if(n.id=='-1'){
								this.storeName='Store'
							}else{
								this.storeName=n.txt
							}
						}
						
					})
				}
				this.actionshow=false;
				this.loadproductdata('1')
			},
			onPick(){
				if(this.param.pick=='-1'){
					this.param.pick='1'
				}else{
					this.param.pick='-1'
				}
				this.loadproductdata('1')
			}
		}
	})
</script>

<style>
	.nav-search{height: 40px;display: flex;align-items: center;overflow: auto;position: fixed;left: 0;top:50px;background-color: #f7f7f7;position: fixed;left: 0;top:40px;z-index: 2;width: 100%;}
	.nav-search-key{border-radius: 20px;border: 1px solid #ccc;padding:0 10px;margin:0 10px;flex: none;}
	.nav-search-key.nav-search-key-aceive{border: 1px solid #e41c1d;color: #e41c1d;}
	.nav-search-key p{height:26px;line-height:26px;margin:0 auto;display: flex;align-items: center;justify-content: center;}
	.nav-search-null{width: 100vw;height: 40px;}
</style>
