//判断是否是微信浏览器的函数
const isWeiXin = ()=>{
   var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {return true;} else {return false;}
}
export {
	isWeiXin
}