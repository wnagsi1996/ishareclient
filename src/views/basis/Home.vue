<template>
  <div class="bj">
	  <!-- 头部 -->
	  <Header :searchshow="true" />
	  <!-- 轮播图 -->
	  <Swiper :images='carouselImg' />
	  <PopularProducts :dealsList="dealsList" title="Deals Product" />
	  <PopularProducts :dealsList="sharegeList" title="Share Get" />
	  <!--大类类目-->
	  <div class="featured spacing">
	  	<div class="featured-title"><h3>Featured Categories</h3></div>
	  	<div class="featured-product">
	  		<div class="featured-product-item" v-for="item in featuredList" :key="item.id"> 
	  			<div class="featured-item-title">
	  				{{item.name}}
	  			</div>
	  			<div class="featured-item">
	  				<div class="featured-item-a" v-for="(itemimg,index) in item.detail" :key="index">
	  					<img v-if="index<2" :src="itemimg.imgsrc" />
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	  </div>
	  <!--网红-->
	  <div class="spacing media">
	  	<div class="media-title"><h3>Featured Categories</h3></div>
	  	<div class="media-item" v-for="(item,index) in mediaList" :key="index">
	  		<a target="_blank" :href="item.url">
	  			<div class="media-item-info">
	  				<div class="media-img">
	  					<van-image round width="60px" :src="'https://www.isharelike.com/'+item.pohosrc" ></van-image>
	  				</div>
	  				<div class="media-info">
	  					<h4>{{item.name}}</h4>
	  					<p>{{item.description}}</p>
	  				</div>
	  			</div>
	  		</a>
	  	</div>
	  </div>
	  
	  <ProductList :productList="productList" @loadproductdata="loadproductdata" :productTotal="productTotal"></ProductList>
	  <NavTab/>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper'
import PopularProducts from "@/components/PopularProducts"
import {shartget,Categories,celebrities} from "@/utils/indexdata.js"
import ProductList from "@/components/ProductList"
import NavTab from "@/components/NavTab"

export default {
  name: 'Home',
  components:{
	  Swiper,
	  PopularProducts,
	  ProductList,
	  NavTab
  },
  data(){
	  return{
		  show:true,
		  carouselImg:[
			  require('@/assets/images/taijibanner-m.jpg'),
			  require('@/assets/images/vapesoulbanner-m.jpg')
		  ],
		  dealsList:[],
		  sharegeList:[],
		  featuredList:[], //类目
		  mediaList:[],    //网红
		  productList:[],
		  productTotal:false,  //是否没有产品可加载
		  index:0
	  }
  },
  created() {
	  this.getTop8DealsList()
	  //免费领取重构数据
	  for(let i=0;i<shartget.length;i++){
		this.sharegeList.push({
		  "img":shartget[i].imgsrc,
		  "oriprice":"Free",
		  "zkj":shartget[i].price,
		  "rid":i,
		  "url":shartget[i].url
		})
	  }
	  //类目
	  if(Categories){
		this.featuredList=Categories;
	  }
	  if(celebrities){
		this.mediaList=celebrities
	  }
  },
  methods:{
	  //获取8个折扣产品数据
	  async getTop8DealsList(){
		  try{
		  	let list=await this.$api.product.getTop8DealsList();
			if(list.rows!=''){
				this.dealsList=list.rows;
				this.isloading=false;
			}
		  }catch(err){
		  	console.log(err);
		  }
	  },
	  //加载无限下来数据
	  async loadproductdata(i=0){
		  if(i!=0){
			  this.index=0
		  }
		  
		  let params={
			  SellUserID: "-1",
			  ifbook: "0",
			  ifdx: "1",
			  ifjk: "-1",
			  ifkq: "-1",
			  pageindex: 0,
			  sorttype: "0",
			  sptitle: "",
			  sptype: ""
		  }
		 
		 try{
			 //获取数据
		 	let list=await this.$api.product.searchProduct(params);
			this.index++;
			if(i!=0){
				this.productList=[]
			}
			this.productList = this.productList.concat(list.rows);
			if(list.rows.length==0){
				this.productTotal=true
			}
		 }catch(err){
		 	console.log(err);
		 }
	  }
  }
}
</script>
<style scoped>
	.bj{background-color: #f7f7f7;}
	.spacing{margin:20px 5px 0;}
	.featured-product{width: 100%;display: flex;flex-wrap: wrap;justify-content: space-between;}
	.featured-product-item{width: 49%;background-color: #fff;margin: 5px 0;}
	.featured-item-title{font-size: 14px;padding: 8px;}
	.featured-item{display: flex;flex-wrap: wrap;}
	.featured-item-a{width: 50%;}
	.featured-item-a img{width: 80%;display: block;margin: 5px auto;}
	.media-item{display: flex; flex-direction: column;margin-top: 5px;}
	.media-item a{display: block;color: #000;}
	.media-item-info{display: flex;background-color: #fff;padding:10px 5px;border-radius: 5px;}
	.media-img{width: 70px;}
	.media-info{flex: 1;padding-left: 10px;}
	.media-info h4{font-weight: bold;}
	.media-info p{height: 40px;line-height: 20px;margin-top:3px;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2 ;}
	.media-title h3,.featured-title h3{font-size:18px}
</style>
