import router from './index'
import store from '../store/index'

import {
	saveId
} from '@/utils/public.js'

import {
	setSession,
	getSession,
	removeSession
} from '@/assets/js/them.js'

const IsPC = () => {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

router.beforeEach((to, from, next) => {
	if (process.env.NODE_ENV == 'production'){
		const {protocol,hostname} =window.location;console.log(protocol);
		if (IsPC()) {
			if (to.path.includes('/pc')) {
				setSession('autopc', to.fullPath.substring(3))
			}else{
				setSession('autopc', to.fullPath)
			}
			if(protocol=='http' && !hostname.includes('192.168')){
				window.location.href = "https://www.isharelike.com/pc";
			}else{
				window.location.href = "/pc";
			 }
			
			return;
		}else{
			if(protocol=='http:' && !hostname.includes('192.168')){
				window.location.href = `https://www.isharelike.com/mobile${to.fullPath}`;
			}
			const path=getSession('automobile');console.log(path)
			removeSession('automobile');
			if(path){
				next(path.substring(1,path.length-1))
			}
		}
	}
	

	//路由未匹配直接跳转404
	if (to.matched.length == 0) {
		next('/404');
	}
	let {
		token,
		userInfo
	} = store.getters;
	let {
		u
	} = to.query;
	//获取谁推荐的，保存id
	if (u) {
		saveId(u);
	}

	if (to.meta.bjColor) {
		document.querySelector('body').setAttribute('style', `background-color: ${to.meta.bjColor};`)
	} else {
		document.querySelector('body').setAttribute('style', `background-color: #fff`)
	}
	//设置title
	document.title = to.meta.title || 'iSHARE'

	if (!token) {
		if (Object.keys(userInfo).length > 0) { //已获取过
			if (to.meta.login) { //判断页面是否需要登录，需要直接跳到登录页面
				next({
					path: '/login',
					query: {
						plan: to.path
					}
				})
			} else {
				next()
			}
		} else { //没获取过
			store.dispatch('user/getInfo').then(data => {
				if (data.rescode == 0 && data.uid != "") { //已登录
					if (to.path == '/login') {
						next('/user');
					} else {
						next()
					}
				} else {
					if (to.meta.login) { //判断页面是否需要登录，需要直接跳到登录页面
						next({
							path: '/login',
							query: {
								plan: to.path
							}
						})
					} else {
						next()
					}
				}

			});
		}
	} else {
		if (to.path == '/login') {
			next('/');
		} else {
			next()
		}
	}
})
