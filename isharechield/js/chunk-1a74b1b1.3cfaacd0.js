(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a74b1b1"],{6685:function(e,t,n){},8988:function(e,t,n){"use strict";n("6685")},d536:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"usercenter-box"},[n("div",{staticClass:"user-info"},[e.isLogin?n("div",{staticClass:"user-info-login"},[n("div",{staticClass:"user-info-item"},[n("p",[e._v(e._s(e.user.name))]),n("p",[e._v(e._s(e.user.email))])]),n("div",{staticClass:"user-info-icon"},[n("van-icon",{attrs:{name:"arrow"}})],1)]):n("div",{staticClass:"user-info-unlogin"},[n("p",[n("van-icon",{attrs:{name:"user-o"}}),n("router-link",{attrs:{to:"/login"}},[e._v("Login")]),e._v(" or "),n("router-link",{attrs:{to:"/register"}},[e._v("Register")])],1),n("van-icon",{attrs:{name:"arrow"}})],1)]),n("div",{staticClass:"usercontent-list",style:{height:e.treeHeight}},[n("ul",e._l(e.menulist,(function(t,i){return t.istrue?n("li",{key:t.index},[n("router-link",{attrs:{to:t.url},nativeOn:{click:function(n){return e.signout(t)}}},[n("van-icon",{attrs:{name:t.icon}}),n("p",[e._v(e._s(t.name))])],1)],1):e._e()})),0),n("ul",{staticClass:"ulList"},e._l(e.menulist2,(function(t,i){return n("li",{key:t.index},[n("router-link",{attrs:{to:t.url}},[n("van-icon",{attrs:{name:t.icon}}),n("p",[e._v(e._s(t.name))])],1)],1)})),0)])])},s=[],r=(n("4160"),n("b0c0"),n("159b"),{name:"HomeUserContnet",data:function(){return{isLogin:!1,user:{name:"",email:""},menulist:[{icon:"manager-o",name:"User",url:"/usercenter",istrue:!0},{icon:"like-o",name:"Wish List",url:"/mylike",istrue:!0},{icon:"orders-o",name:"My Order",url:"/myorder",istrue:!0},{icon:"gift-o",name:"My Gifts",url:"/mygifts",istrue:!0},{icon:"manager",name:"My Member",url:"/mymembers",istrue:!0},{icon:"exchange",name:"Sign out",url:"",istrue:!0}],menulist2:[{icon:"shop-o",name:"Product",url:"/productlist"},{icon:"points",name:"Deals Prdocut",url:"/dealslist"},{icon:"gift-card-o",name:"Free Gifts",url:"/freeproductlist"},{icon:"chat-o",name:"Contact Us",url:"/contactus"},{icon:"envelop-o",name:"Categories & Help",url:"/help"}]}},computed:{treeHeight:function(){var e=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;return e-100+"px"}},created:function(){var e=this.$store.getters.token,t=this.$store.getters.userInfo;e&&(this.isLogin=!0,this.user.name=t.ncname,this.user.email=t.loginname),this.menulist.forEach((function(t){"exchange"==t.icon&&(t.istrue=!!e)}))},methods:{signout:function(e){"exchange"==e.icon&&this.$store.dispatch("user/resetToken").then((function(e){location.reload()}))}}}),o=r,a=(n("8988"),n("2877")),u=Object(a["a"])(o,i,s,!1,null,"482c8ab4",null);t["default"]=u.exports}}]);