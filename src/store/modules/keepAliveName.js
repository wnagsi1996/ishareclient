//缓存路由器名称name
const state={
	nameList:[]
}

const mutations={
	SET_NAME_LIST(state,item){
		if(!state.nameList.includes(item)){  //先判断存不存在，有则不添加
			state.nameList.push(item);console.log(state.nameList)
		}
	},
	DEL_NAME_LIST(state,item){
		state.nameList=state.nameList.filter(n=>n!=item);console.log(state.nameList)
	}
}

export default {
	namespaced: true,
	state,
	mutations
}