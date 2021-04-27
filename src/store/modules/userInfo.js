import api from '@/api/index.js'
import {
	Toast
} from 'vant'

import router from '@/router/index.js'

const state = {
	token: false,
	userInfo: {}, //用户信息
	userCenterInfo: {} //用户中心展示得用户信息
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
	},
	SET_USERINFO: (state, userinfo) => {
		state.userInfo = userinfo;
	},
	SET_USERCENTERINFO: (state, userinfo) => {
		state.userCenterInfo = userinfo;
	}
}

const actions = {
	//登录
	login({
		dispatch,
		commit
	}, userInfo) {
		return new Promise((resolve,reject) => {
			api.user.login(userInfo).then(res => {
				console.log(res)
				if (res.rescode == "0") {
					Toast.success("Login success")
					commit('SET_TOKEN', true);
					window.sessionStorage.setItem("token", 1);
					resolve(true)
				} else {
					Toast.fail(res.resdesc)
					resolve(false)
				}
			}).catch(err => {
				console.log(err);
				Toast.fail('Login fail')
				reject(err)
			})
		})
	},
	// 获取用户角色信息
	getInfo({commit,state}) {
		return new Promise(resolve => {
			api.user.getheadUserInfo().then(res => {
				console.log(res)
				if (res != '') {
					if (res.rescode == 0 && res.uid != "") { //已登录
						commit('SET_TOKEN', true)
					} else {
						commit('SET_TOKEN', false)
					}
					commit('SET_USERINFO', res);
				} else {
					Toast('No data')
				}
				resolve(res);
			}).catch(err => {
				console.log(err)
			})
		});
	},
	//用户中心获取用户信息
	getUserCenterInfo({commit,state}) {
		return new Promise(resolve => {
			api.user.getUserCenterInfo().then(res => {
				if (res != '') {
					commit('SET_USERCENTERINFO', res);
				}
				resolve(res)
			}).catch(err => {
				console.log(err)
			})
		})
	},
	// 重置令牌
	resetToken({commit}) {
		return new Promise((resolve, reject) => {
			api.user.loginout().then(res => {
				if (res.rescode == "0") {
					Toast.success("Sign out")
					commit('SET_TOKEN', false)
					commit('SET_USERINFO', {})
					window.sessionStorage.removeItem('token');
					//router.push({path:'/'})
					resolve(res)
				} else {
					console.log(res.resdesc)
					reject('Sign out error')
				}
			}).catch(xhr => {
				console.log(xhr);
				reject(xhr)
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
