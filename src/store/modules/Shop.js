import api from '@/api/index.js'
//店铺相关数据
const state={
	index:0,   //分页页码
	productList:[], //产品数据 
	isLike:false,  //是否关注店铺
	storeInfo:{}  ,//店铺数据
	productTotal:false  ,//店铺产品数据是否还有
	pid:0  //店铺id
}

const mutations={
	//设置页码
	SET_INDEX(state,num){
		state.index=num
	},
	//设置产品数据
	SET_PRODUCT_LIST(state,data){
		state.productList=[...state.productList,...data];
	},
	//设置是否关注
	SET_ISLIKE(state,node){
		state.isLike=node;
	},
	//设置店铺信息
	SET_STORE_INFO(state,data){
		state.storeInfo=data;
	},
	//删除店铺相关信息
	DEL_STORE_DATA(state,isindex=0){
		state.productList=[]
		if(isindex==0){  //判断是否全部删除或者只是单纯刷新清空产品列表数据
			state.isLike=false
			state.storeInfo={}
			state.index=0
		}
	},
	//设置是否还可以继续加载数据
	SET_PRODUCT_TOTAL(state,node){
		state.productTotal=node
	},
	//设置店铺ID
	SET_PID(state,pid){
		state.pid=pid
	}
}

const actions={
	//获取店铺数据
	getProductList({commit},params){
		return new Promise((resolve,reject)=>{
			api.product.getUserStoreProductList(params).then(res=>{
				if(res.rows!=''){
					if(params.pageindex==0){  //传入的是0，表示第一次载入或者刷新，先清空数据
						commit('DEL_STORE_DATA','1')
					}
					commit('SET_INDEX',params.pageindex+1)
					commit('SET_PRODUCT_LIST',res.rows);
					if(res.rows.length==0){
						commit('SET_PRODUCT_TOTAL',true)
					}
				}
				resolve(res);
			}).catch(err=>{
				reject(err);
			})
		})
	},
	//获取店铺信息
	getShopInfo({commit},params){
		return new Promise((resolve,reject)=>{
			api.product.getUserStoreBaseInfoByStoreID(params).then(res=>{
				if(res!=''){
					commit('SET_STORE_INFO',res)
				}
				resolve(res);
			}).catch(err=>{
				reject(err)
			})
		})
	},
	//获取是否收藏店铺
	getShopLive({commit},params){
		return new Promise((resolve,reject)=>{
			api.product.getIfUserStoreFocus(params).then(res=>{
				if(res==0){
					commit('SET_ISLIKE',false);
				}else{
					commit('SET_ISLIKE',true);
				}
			})
		})
	}
}

export default{
	namespaced:true,
	state,
	mutations,
	actions
}