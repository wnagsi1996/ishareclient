//支付页面
const state={
	addressid:'',
	coupon:{
		id:0,
		money:0
	}
}

const mutations={
	SET_ADDRESS_ID(state,id){
		state.addressid=id
	},
	SET_COUPON(state,params={}){
		Object.assign(state.coupon,params)
	}
}

export default {
	namespaced: true,
	state,
	mutations
}