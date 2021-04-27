//支付页面
const state={
	addressid:''
}

const mutations={
	SET_ADDRESS_ID(state,id){
		state.addressid=id
	}
}

export default {
	namespaced: true,
	state,
	mutations
}