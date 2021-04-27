
const state={
	cart:JSON.parse(window.localStorage.getItem('cart')) || []
}

const mutations={
	SET_CART:(state,cart)=>{
		let newcart=state.cart;
		if(newcart.length==0){
			state.cart.push(cart);
		}else{
			newcart.forEach((item)=>{
				if(item.sku==cart.sku){
					item.num=item.num+cart.num
				}
			});
			if(newcart.findIndex(item=>item.sku==cart.sku)!=-1){
				state.cart=newcart
			}else{
				state.cart.push(cart);
			}
		}
		window.localStorage.setItem('cart',JSON.stringify(state.cart));
	},
	DEL_CART:(state,cartsku)=>{console.log(state.cart)
		let newcart=[];
		state.cart.forEach(item=>{
			if(item.sku!=cartsku){
				newcart.push(item)
			}
		})
		state.cart=newcart;
		window.localStorage.setItem('cart',JSON.stringify(newcart));
	},
	DELALL_CART:(state)=>{
		state.cart=[]
		window.localStorage.removeItem('cart')
	}
}

export default({
	namespaced: true,
	state,
	mutations
})