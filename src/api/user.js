//产品模块接口的管理
import {get,post,uploadImg} from '@/request/http.js'
import base from '@/request/base.js' //管理接口地址

const user={
	//登录
	login(params){
		return get(`${base.WebHandler}?cmd=Login`,params)
	},
	//获取头部用户信息/也是用来判断用户是否登录
	getheadUserInfo(params={}){
		return get(`${base.WebHandler}?cmd=getWebheadInfo`,params)
	},
	//用户中心获取用户信息
	getUserCenterInfo(params={}){
		return get(`${base.WebHandler}?cmd=getUserCenterInfo`,params)
	},
	//退出登录
	loginout(params={}){
		return get(`${base.WebHandler}?cmd=logout`,params)
	},
	//保存推荐用户ID
	savetjID(params){
		return get(`${base.WebHandler}?cmd=savetjID`,params)
	},
	//用户注册
	register(params){
		return post(`${base.WebHandler}?cmd=ComitUserRegister`,params)
	},
	//获取收货地址--编辑
	GetAddressByAddressID(params){
		return get(`${base.WebHandler}?cmd=GetAddressByAddressID`,params)
	},
	//添加收货地址
	AddAddress(params){
		return get(`${base.WebHandler}?cmd=AddAddress`,params)
	},
	//收货地址列表
	GetAddress(params={}){
		return get(`${base.WebHandler}?cmd=GetAddress`,params)
	},
	//删除地址
	DelAddress(params){
		return get(`${base.WebHandler}?cmd=DelAddress`,params)
	},
	//设置默认收货地址
	selDefaultAddress(params){
		return get(`${base.WebHandler}?cmd=SetMrAddress`,params)
	},
	// 修改登录密码
	modifyPassUser(params){
		return post(`${base.WebHandler}?cmd=modifyPasswordByCurUser`,params)
	},
	//获取抵用券列表
	getVoucher(params){
		return get(`${base.ajaxhandler}?cmd=getVoucher`,params)
	},
	//获取免费领取的产品列表
	getUserPDProductList(params){
		return get(`${base.ajaxhandler}?cmd=getUserPDProductList`,params)
	},
	//获取佣金明细列表
	getShareYJMXRecordList(params={}){
		return get(`${base.ajaxhandler}?cmd=getShareYJMXRecordList`,params)
	},
	//获取用户佣金数据
	getUserTjYj(params={}){
		return get(`${base.WebHandler}?cmd=getUserTjYj`,params)
	},
	//佣金提现
	TjYjTX(params={}){
		return get(`${base.WebHandler}?cmd=TjYjTX`,params)
	},
	//收藏商品列表
	getUserSCFocusSaleList(params={}){
		return get(`${base.ajaxhandler}?cmd=getUserSCFocusSaleList`,params)
	},
	//取消收藏商品
	cancelFocus(params){
		return get(`${base.WebHandler}?cmd=cancelFocus`,params)
	},
	//会员一级列表
	getShareYQRecordList(params={}){
		return get(`${base.ajaxhandler}?cmd=getShareYQRecordList`,params)
	},
	//会员二级列表
	getShareYQRecordList2(params={}){
		return get(`${base.ajaxhandler}?cmd=getShareYQRecordList2`,params)
	},
	//用户信息修改
	savePersonInfo(params={}){
		return get(`${base.WebHandler}?cmd=savePersonInfo`,params)
	},
	//绑定提现账号
	ComitBindPayPal(params={}){
		return get(`${base.WebHandler}?cmd=ComitBindPayPal`,params)
	},
	//获取邮箱验证码
	ComitBindPayPalYzmFs(params){
		return get(`${base.WebHandler}?cmd=ComitBindPayPalYzmFs`,params)
	},
	//邮箱验证码下一步
	ComitUpdateBindPhoneOldAuth(params){
		return get(`${base.WebHandler}?cmd=ComitUpdateBindPhoneOldAuth`,params)
	},
	//获取新邮箱验证码
	ComitNewBindPhoneYzmFs(params){
		return get(`${base.WebHandler}?cmd=ComitNewBindPhoneYzmFs`,params)
	},
	//提交绑定新邮箱
	ComitUpdateBindPhone(params){
		return get(`${base.WebHandler}?cmd=ComitUpdateBindPhone`,params)
	},
	//消息列表
	getUserNoticeList(params){
		return get(`${base.WebHandler}?cmd=getUserNoticeList`)
	},
	//消息具体内容
	getNoticeDetails(params){
		return get(`${base.WebHandler}?cmd=getNoticeDetails`,params)
	},
	//上传头像
	UploadHeadimg(params){
		return post(`${base.WebHandler}?cmd=UploadHeadimg`,params)
	},
	//我的订单列表
	getMySCSaleList(params){
		return get(`${base.ajaxhandler}?cmd=getMySCSaleList`,params)
	},
	//我的订单详情
	getMySCSaleDetailList(params){
		return get(`${base.WebHandler}?cmd=getMySCSaleDetailList`,params)
	},
	//取消订单
	cancelSCOrder(params){
		return get(`${base.WebHandler}?cmd=cancelSCOrder`,params)
	},
	//支付订单（我的订单）
	doPaySCOrder(params){
		return get(`${base.WebHandler}?cmd=doPaySCOrder`,params)
	},
	//确认收货（我的订单）
	comitshTotalOrder(params){
		return get(`${base.WebHandler}?cmd=comitshTotalOrder`,params)
	}
}

export default user