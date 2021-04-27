//验证模块接口的管理
import {get,post} from '@/request/http.js'
import base from '@/request/base.js' //管理接口地址

const verify={
	//加密
	CreateRSAKey(params){
		return get(`${base.RSAKey}?cmd=CreateRSAKey`,params);
	},
	// 忘记密码获取邮箱验证码
	getEmailVerify(params){
		return get(`${base.WebHandler}?cmd=ComitFindPassWordYzmFs`,params)
	},
	//忘记密码验证邮箱和验证码
	comitEmailVerify(params){
		return get(`${base.WebHandler}?cmd=ComitFindPassWordAuth`,params)
	},
	//忘记密码修改新密码
	ComitPassWord(params){
		return post(`${base.WebHandler}?cmd=ComitUserResetPassWord`,params)
	},
	//注册
	register(params){
		return get(`${base.WebHandler}?cmd=ComitUserRegister`,params)
	}
}

export default verify