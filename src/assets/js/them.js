//获取本地储存主题配色方案
const Them = 'them';
function getThem(){
	return window.localStorage.getItem(Them)
}
function setThem(token){
	return window.localStorage.setItem(Them,token)
}
function removeThem(){
	return window.localStorage.removeItem(Them)
}

export{
	getThem,
	setThem,
	removeThem
}