import axios from 'axios'
import qs from 'qs'
import {Toast} from 'vant'

//环境切换
// console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV=='development'){  //开发版本
	axios.defaults.baseURL='/Handler';
}else if(process.env.NODE_ENV=='production'){  //生产版本
	axios.defaults.baseURL=''
}

//axios.defaults.timeout=10000;  //设置请求超时时间

//设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


//请求拦截器
axios.interceptors.request.use(config=>{
	return config
},error=>{ //数据请求错误
	Toast('Request timed out');
	return Promise.reject(error);
})

//响应拦截器
axios.interceptors.response.use(result=>{
	return result;
},(error)=>{
	let {response}=error;
	if(response){
		errorHandle(response.status,response.data.message)
	}
	return Promise.reject(error)
})




//封装get请求
export const get=((url,params={},config={})=>{
	return new Promise((resolve,reject)=>{
		axios({
			url,
			method:'get',
			params,
			...config
		}).then(res=>{console.log(res)
			resolve(res.data);
		}).catch(err=>{
			reject(err)
		})
	})
});

//封装post请求
export const post=((url,params={},config={})=>{
	return new Promise((resolve,reject)=>{
		axios({
			url,
			method:'post',
			data:qs.stringify(params),
			...config
		}).then(res=>{console.log(res)
			resolve(res.data);
		}).catch(err=>{
			reject(err)
		})
	})
});

//封装post请求图片上传
export const uploadImg=((url,params={},config={})=>{
	return new Promise((resolve,reject)=>{
		axios({
			url,
			method:'post',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data:qs.stringify(params),
			...config
		}).then(res=>{console.log(res)
			resolve(res.data);
		}).catch(err=>{
			reject(err)
		})
	})
});

//登录
const toLogin =()=>{
	router.replace({
		path:'/login',
		query:{
			plan: router.currentRoute.fullPath
		}
	})
}

//状态
const errorHandle=(state,other)=>{
	switch(state){
		case 400: //请求参数错误
			Toast('Request parameter error');
			break;
		case 401: //未登录状态，跳转登录页
			Toast('Insufficient permissions, please log in again');
			toLogin();
			break;
		case 403:  //服务器拒绝本次访问
			Toast('The server denied this access');
			break;
		case 404:  //请求资源未找到
			Toast('The requested resource was not found');
			break;
		case 500:  //内部服务器错误
			Toast('Internal server error');
			break;
		case 501:  //服务器不支持该请求中使用的方法
			Toast('The server does not support the method used in the request');
			break;
		case 502:  //网关错误
			Toast('Gateway error');
			break;
		case 504:  //网关超时
			Toast('Gateway timeout');
			break;
	}
}