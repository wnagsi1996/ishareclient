import api from '@/api/index.js'
import {
	Toast
} from 'vant'

//保存id
export const saveId = (u) => {
	api.user.savetjID({
		u
	}).then(res => {
		if (res.rescode == 0) {
			console.log('ID submitted successfully')
		}
	}).catch(xhr => {

	})
}

//调用微信JS api 支付
export const wxPayjsApiCall = (wxJsApiParam, returl, failreturl) => {
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', jsApiCall);
			document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		}
	} else {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			wxJsApiParam, //josn串
			function(res) {
				WeixinJSBridge.log(res.err_msg);
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					window.location.href = returl; //页面跳转
				} else {
					Toast("The payment failed or you canceled the payment."); //支付失败或者您取消了支付

					if (failreturl != "")
						window.location.href = failreturl; //页面跳转
				}
			}
		);
	}
}
