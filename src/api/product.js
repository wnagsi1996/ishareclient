//产品模块接口的管理
import {get,post} from '@/request/http.js'
import base from '@/request/base.js' //管理接口地址

const product={
	//搜索产品
	searchProduct(params){
		return get(`${base.ajaxhandler}?cmd=searchDZProduct`,params)
	},
	//获取8个折扣产品数据
	getTop8DealsList(params={}){
		return get(`${base.WebHandler}?cmd=getTop8DealsList`,params)
	},
	//商品详情
	getSCProductInfo(params){
		return get(`${base.ajaxhandler}?cmd=getSCProductInfo`,params)
	},
	//商品详情获取拼团信息
	getSCPTOrderInfo(params){
		return get(`${base.ajaxhandler}?cmd=getSCPTOrderInfo`,params)
	},
	//获取是否关注商品
	getSaleFocus(params){
		return get(`${base.ajaxhandler}?cmd=getSaleFocus`,params)
	},
	//产品关注
	focusProduct(params){
		return get(`${base.ajaxhandler}?cmd=focusProduct`,params)
	},
	//产品取消关注
	cancelFocus(params){
		return get(`${base.ajaxhandler}?cmd=cancelFocus`,params)
	},
	//获取店铺产品
	getUserStoreProductList(params){
		return get(`${base.ajaxhandler}?cmd=getUserStoreProductList`,params)
	},
	//获取商品sku
	getSCProductColumnsSKU(params){
		return get(`${base.ajaxhandler}?cmd=getSCProductColumnsSKU`,params)
	},
	//购物车获取产品信息
	Get_MyCarSCProductsSaleList(params){
		return get(`${base.WebHandler}?cmd=Get_MyCarSCProductsSaleList`,params)
	},
	//获取拼团产品信息
	Get_MyCarSCProductsSaleList_PT(params){
		return get(`${base.WebHandler}?cmd=Get_MyCarSCProductsSaleList_PT`,params)
	},
	//获取拼团订单信息
	getPDProductOrder_FreeWait(params){
		return get(`${base.WebHandler}?cmd=getPDProductOrder_FreeWait`,params)
	},
	//获取抵用券
	getMaxVoucher(params){
		return get(`${base.WebHandler}?cmd=getMaxVoucher`,params)
	},
	//获取地址
	GetAddressByAddressID(params){
		return get(`${base.WebHandler}?cmd=GetAddressByAddressID`,params)
	},
	//支付
	CommitPay_SC(params){
		return post(`${base.WebHandler}?cmd=CommitPay_SC`,params)
	},
	//拼团支付
	CommitPay_PT(params){
		return post(`${base.WebHandler}?cmd=CommitPay_PT`,params)
	},
	//拼单帮助未登录用户看的产品信息
	getPDProductOrderInfo(params){
		return get(`${base.WebHandler}?cmd=getPDProductOrderInfo`,params)
	},
	//拼单帮助产品sku属性
	getSCProductColumnsSKU(params){
		return get(`${base.ajaxhandler}?cmd=getSCProductColumnsSKU`,params)
	},
	//拼单支付
	CommitPay_PD(params){
		return get(`${base.ADDoBus}?cmd=CommitPay_PD`,params)
	},
	//拼主拼单页面
	getPDProductOrderInfo_Wait(params){
		return get(`${base.WebHandler}?cmd=getPDProductOrderInfo_Wait`,params)
	},
	//拼主拼单页支付
	CommitPay_Buy_PD(params){
		return get(`${base.WebHandler}?cmd=CommitPay_Buy_PD`,params)
	},
	//折扣产品详情
	getDealsInfo(params){
		return get(`${base.WebHandler}?cmd=getDealsInfo`,params)
	},
	//折扣产品列表
	getDealsList(params){
		return get(`${base.WebHandler}?cmd=getDealsList`,params)
	},
	//加载拼单产品
	loadPDProductList(params){
		return get(`${base.ajaxhandler}?cmd=loadPDProductList`,params)
	},
	//产品详情页购买
	CommitPay_AD_PD(params){
		return get(`${base.ADDoBus}?cmd=CommitPay_AD_PD`,params)
	},
	//店铺数据
	getUserStoreBaseInfoByStoreID(params){
		return get(`${base.WebHandler}?cmd=getUserStoreBaseInfoByStoreID`,params)
	},
	//获取店铺收藏
	getIfUserStoreFocus(params){
		return get(`${base.WebHandler}?cmd=getIfUserStoreFocus`,params)
	},
	//收藏店铺
	focusUserStore(params){
		return get(`${base.WebHandler}?cmd=focusUserStore`,params)
	},
	// 取消收藏店铺
	cancelUserStoreFocus(params){
		return get(`${base.WebHandler}?cmd=cancelUserStoreFocus`,params)
	},
	//店铺详情
	getUserStoreAboutInfoByStoreID(params={}){
		return get(`${base.WebHandler}?cmd=getUserStoreAboutInfoByStoreID`,params)
	},
	// 意见反馈
	ComiitSuggest(params){
		return get(`${base.WebHandler}?cmd=ComiitSuggest`,params)
	},
	//帮助页面
	getPDProductOrder_FreeHelp(params){
		return get(`${base.WebHandler}?cmd=getPDProductOrder_FreeHelp`,params)
	},
	//帮助页面
	getPDProductOrder_Groups(params){
		return get(`${base.WebHandler}?cmd=getPDProductOrder_Groups`,params)
	}
}

export default product;