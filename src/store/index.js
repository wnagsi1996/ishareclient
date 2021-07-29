import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/userInfo'  //用户信息
import cart from './modules/cart'  //购物车信息
import address from './modules/address'  //地址信息
import keepAliveName from './modules/keepAliveName'  //缓存页面
import pay from './modules/pay'  //支付页面
import shop from './modules/Shop'  //店铺页面

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
	  user,
	  cart,
	  address,
	  keepAliveName,
	  pay,
	  shop
  },
  getters:{
	  token: state => state.user.token,  //记录有没有登录
	  userInfo: state => state.user.userInfo,  //用户信息
	  userCenterInfo: state => state.user.userCenterInfo,  //用户中心首页信息
	  cart:state=>state.cart.cart,  //购物车
	  addressList:state=>state.address.addressList, //地址列表
	  addressIsPay:state=>state.address.isPay, //地址列表
	  keepAliveName:state=>state.keepAliveName.nameList,  //缓存页面的name
	  addressid:state=>state.pay.addressid   ,//收货地址id
	  coupon:state=>state.pay.coupon   ,//抵用券
	  shopIsLike:state=>state.shop.isLike,  //店铺页面是否关注
	  shopProductList:state=>state.shop.productList,  //店铺产品列表
	  shopInfo:state=>state.shop.storeInfo  ,//店铺信息
	  shopIndex:state=>state.shop.index  ,//店铺产品列表页码
	  shopProductTotal:state=>state.shop.productTotal,  //店铺产品是否还有数据可以加载
	  shopPid:state=>state.shop.pid  //店铺id
  }
})
