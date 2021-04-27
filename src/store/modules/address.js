import api from '@/api/index.js'
const state={
	addressList:[]
}

const mutations={
	SET_ADDRESS_LIST(state,item){
		state.addressList=item;
	},
	DEL_ADDRESS(state,id){
		state.addressList=state.addressList.filter(item=> item.id!= id);
	},
	SET_DEFAULT(state,id){
		let list=state.addressList;
		let listFind='',linsIndex='';
		list.forEach((n,i)=>{
			if(n.id==id){
				n.isDefault=true;
				listFind=n;
				linsIndex=i
			}else{
				n.isDefault=false
			}
		});
		list.splice(linsIndex,1);
		list.unshift(listFind);
		state.addressList=list
	}
}

const actions={
	getAddressList({commit}){
		return new Promise((resolve,reject)=>{
			api.user.GetAddress().then(res=>{
				let list=[];
				let addressList=res.rows;
				//直接遍历更换成想要的格式
				addressList.forEach(n=>{
					list.push({
						id:n.rid,
						name:n.firstname+' '+n.lastname,
						tel:n.lxfs,
						address:n.xxdz + " " + n.city + " " + n.province + " " + n.postcode + " " + n.county,
						isDefault:n.mrdz==1?true:false
					});
				});
				commit('SET_ADDRESS_LIST',list)
				resolve(res);
			}).catch(err=> reject(err));
		})
	}
}


 export default {
     namespaced: true,
     state,
     mutations,
     actions
 }