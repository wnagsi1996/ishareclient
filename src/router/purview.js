import router from './index'
import store from '../store/index'
import { saveId } from '@/utils/public.js'

router.beforeEach((to,from,next) => {
	//路由未匹配直接跳转404
	if(to.matched.length==0){
		next('/404');
	}
	let token=store.getters.token;
	let userinfo=store.getters.userInfo;
	let u=to.query.u;
	
	//获取谁推荐的，保存id
	if(u){
		saveId(u);
	}

	if(to.meta.bjColor){
		document.querySelector('body').setAttribute('style',`background-color: ${to.meta.bjColor};`)
	}else{
		document.querySelector('body').setAttribute('style',`background-color: #fff`)
	}
	//设置title
	document.title=to.meta.title
	
	if(!token){
		if(Object.keys(userinfo).length>0){  //已获取过
			if(to.meta.login){  //判断页面是否需要登录，需要直接跳到登录页面
				next({path:'/login',query:{plan:to.path}})
			}else{
				next()
			}
		}else{  //没获取过
 			store.dispatch('user/getInfo').then(data=>{
				if(data.rescode == 0 && data.uid != ""){//已登录
					if(to.path=='/login'){
						next('/user');
					}else{
						next()
					}
				}else{
					if(to.meta.login){  //判断页面是否需要登录，需要直接跳到登录页面
						next({path:'/login',query:{plan:to.path}})
					}else{
						next()
					}
				}
				
			});
		}
	}else{
		if(to.path=='/login'){
			next('/');
		}else{
			next()
		}
	}
})