(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38ec1f30"],{"0f01":function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("b0c0"),core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("ac1f"),core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("5319"),core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__),G_ishareclient_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("5530"),G_ishareclient_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("ade3"),vant_es_field_style__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("be7f"),vant_es_field__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("565f"),vant_es_form_style__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("38d5"),vant_es_form__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("772a"),vant_es_button_style__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("66b9"),vant_es_button__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("b650"),vuex__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("2f62"),_assets_js_public_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("466f"),_utils_regular_js__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("a63d"),_components;__webpack_exports__["a"]={name:"ModifyEmail",components:(_components={},Object(G_ishareclient_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["a"])(_components,vant_es_button__WEBPACK_IMPORTED_MODULE_10__["a"].name,vant_es_button__WEBPACK_IMPORTED_MODULE_10__["a"]),Object(G_ishareclient_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["a"])(_components,vant_es_form__WEBPACK_IMPORTED_MODULE_8__["a"].name,vant_es_form__WEBPACK_IMPORTED_MODULE_8__["a"]),Object(G_ishareclient_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["a"])(_components,vant_es_field__WEBPACK_IMPORTED_MODULE_6__["a"].name,vant_es_field__WEBPACK_IMPORTED_MODULE_6__["a"]),_components),data:function(){return{isCode:!1,email:"",emailCode:"",imgCode:"",disabled:!1,timeshow:!1,time:"300",emailOld:!0,newemail:"",newemailCode:"",newtimeshow:!1,newtime:"300"}},computed:Object(G_ishareclient_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__["a"])({},Object(vuex__WEBPACK_IMPORTED_MODULE_11__["c"])(["userCenterInfo"])),created:function(){this.userInfo()},methods:{userInfo:function(){var e=this;this.userCenterInfo.college?this.email=this.userCenterInfo.loginname:this.$store.dispatch("user/getUserCenterInfo").then((function(t){e.email=t.loginname}))},counDown:function counDown(val){var time=eval(val);if(""!=time&&time>=0)return time-1},onCode:function(){var e=this;this.$api.user.ComitBindPayPalYzmFs({VerifyCode:this.imgCode}).then((function(t){if(e.$toast(t.fsmes),0==t.fsstate){var i=t.fssj,n=t.fcffssj,_=Object(_assets_js_public_js__WEBPACK_IMPORTED_MODULE_12__["a"])();"ios"==_&&(i=i.replace(/-/,"/"),n=n.replace(/-/,"/")),e.time=Object(_assets_js_public_js__WEBPACK_IMPORTED_MODULE_12__["b"])(i,n);var a=setInterval((function(){e.time=e.counDown(e.time),0==e.time&&clearInterval(a)}),1e3);e.timeshow=!0}else 5==t.fsstate&&(e.isCode=!0,e.showCode())}))},next:function(){var e=this;this.disabled=!0,this.$api.user.ComitUpdateBindPhoneOldAuth({Yzm:this.emailCode}).then((function(t){0!=t.fsstate?e.$toast(t.fsmes):e.emailOld=!1,e.disabled=!1})).catch((function(t){e.$toast("Operation failed, please try again!"),e.disabled=!1}))},onNewCode:function(){var e=this,t=this.newemail;if(""!=t)return _utils_regular_js__WEBPACK_IMPORTED_MODULE_13__["a"].email.test(t)?void this.$api.user.ComitNewBindPhoneYzmFs({Email:this.newemail}).then((function(t){if(e.$toast(t.fsmes),0==t.fsstate){var i=t.fssj,n=t.fcffssj,_=Object(_assets_js_public_js__WEBPACK_IMPORTED_MODULE_12__["a"])();"ios"==_&&(i=i.replace(/-/,"/"),n=n.replace(/-/,"/")),e.time=Object(_assets_js_public_js__WEBPACK_IMPORTED_MODULE_12__["b"])(i,n);var a=setInterval((function(){e.newtime=e.counDown(e.newtime),0==e.newtime&&clearInterval(a)}),1e3);e.newtimeshow=!0}})):(this.$toast("The Email is invalid."),!1);this.$toast("Enter new email!")},setNewEmail:function(){var e=this,t=this.newemail;if(""!=t){if(!_utils_regular_js__WEBPACK_IMPORTED_MODULE_13__["a"].email.test(t))return this.$toast("The Email is invalid."),!1;var i={newphone:t,Yzm:this.emailCode,Yzm1:this.newemailCode};this.disabled=!0,this.$api.user.ComitUpdateBindPhone(i).then((function(t){0!=t.fsstate?e.$toast(t.fsmes):(e.$toast("Bind email to modify successfully."),e.$store.dispatch("user/getUserCenterInfo").then((function(t){e.$router.go(-1)}))),e.disabled=!1})).catch((function(t){e.$toast("Operation failed, please try again!"),e.disabled=!1}))}else this.$toast("Enter new email!")}}}},3110:function(e,t,i){},"38d5":function(e,t,i){"use strict";i("68ef")},"466d":function(e,t,i){"use strict";var n=i("d784"),_=i("825a"),a=i("50c4"),s=i("1d80"),o=i("8aa5"),r=i("14c3");n("match",1,(function(e,t,i){return[function(t){var i=s(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,i):new RegExp(t)[e](String(i))},function(e){var n=i(t,e,this);if(n.done)return n.value;var s=_(e),l=String(this);if(!s.global)return r(s,l);var c=s.unicode;s.lastIndex=0;var u,d=[],m=0;while(null!==(u=r(s,l))){var f=String(u[0]);d[m]=f,""===f&&(s.lastIndex=o(l,a(s.lastIndex),c)),m++}return 0===m?null:d}]}))},"466f":function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"a",(function(){return _}));i("ac1f"),i("466d");function n(e,t){var i=new Date(e),n=new Date(t),_=n.getTime()-i.getTime(),a=_/1e3;return a}function _(){var e=navigator.userAgent,t=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return t?"ios":"andriod"}},"772a":function(e,t,i){"use strict";var n=i("d282"),_=i("db85"),a=Object(n["a"])("form"),s=a[0],o=a[1];t["a"]=s({props:{colon:Boolean,labelWidth:[Number,String],labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,errorMessageAlign:String,submitOnEnter:{type:Boolean,default:!0},validateTrigger:{type:String,default:"onBlur"},showError:{type:Boolean,default:!0},showErrorMessage:{type:Boolean,default:!0}},provide:function(){return{vanForm:this}},data:function(){return{fields:[]}},methods:{validateSeq:function(){var e=this;return new Promise((function(t,i){var n=[];e.fields.reduce((function(e,t){return e.then((function(){if(!n.length)return t.validate().then((function(e){e&&n.push(e)}))}))}),Promise.resolve()).then((function(){n.length?i(n):t()}))}))},validateAll:function(){var e=this;return new Promise((function(t,i){Promise.all(e.fields.map((function(e){return e.validate()}))).then((function(e){e=e.filter((function(e){return e})),e.length?i(e):t()}))}))},validate:function(e){return e?this.validateField(e):this.validateFirst?this.validateSeq():this.validateAll()},validateField:function(e){var t=this.fields.filter((function(t){return t.name===e}));return t.length?new Promise((function(e,i){t[0].validate().then((function(t){t?i(t):e()}))})):Promise.reject()},resetValidation:function(e){this.fields.forEach((function(t){e&&t.name!==e||t.resetValidation()}))},scrollToField:function(e,t){this.fields.some((function(i){return i.name===e&&(i.$el.scrollIntoView(t),!0)}))},addField:function(e){this.fields.push(e),Object(_["a"])(this.fields,this)},removeField:function(e){this.fields=this.fields.filter((function(t){return t!==e}))},getValues:function(){return this.fields.reduce((function(e,t){return e[t.name]=t.formValue,e}),{})},onSubmit:function(e){e.preventDefault(),this.submit()},submit:function(){var e=this,t=this.getValues();this.validate().then((function(){e.$emit("submit",t)})).catch((function(i){e.$emit("failed",{values:t,errors:i}),e.scrollToError&&e.scrollToField(i[0].name)}))}},render:function(){var e=arguments[0];return e("form",{class:o(),on:{submit:this.onSubmit}},[this.slots()])}})},a63d:function(e,t,i){"use strict";t["a"]={email:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/}},c5a1:function(e,t,i){"use strict";i("3110")},db85:function(e,t,i){"use strict";function n(e){var t=[];function i(e){e.forEach((function(e){t.push(e),e.componentInstance&&i(e.componentInstance.$children.map((function(e){return e.$vnode}))),e.children&&i(e.children)}))}return i(e),t}function _(e,t){var i=t.$vnode.componentOptions;if(i&&i.children){var _=n(i.children);e.sort((function(e,t){return _.indexOf(e.$vnode)-_.indexOf(t.$vnode)}))}}i.d(t,"a",(function(){return _}))},e7e2:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"modify-email"},[i("Header",{attrs:{title:"Modify Email"}}),e.emailOld?i("div",{staticClass:"oldemail login"},[i("P",[e._v("Current Bind Email:"+e._s(e.userCenterInfo.loginname))]),i("van-form",{ref:"emailForm",on:{submit:e.next}},[i("div",{staticClass:"inp"},[i("van-field",{attrs:{name:"email",placeholder:"Email",readonly:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),e.isCode?i("div",{staticClass:"inp code"},[i("van-field",{attrs:{name:"imgCode",placeholder:"verify code"},model:{value:e.imgCode,callback:function(t){e.imgCode=t},expression:"imgCode"}}),i("img",{staticClass:"codeimg",attrs:{src:"",id:"codeimg"},on:{click:e.showCode}})],1):e._e(),i("div",{staticClass:"inp code"},[i("van-field",{attrs:{name:"emailCode",placeholder:"Enter verify code"},model:{value:e.emailCode,callback:function(t){e.emailCode=t},expression:"emailCode"}}),i("van-button",{directives:[{name:"show",rawName:"v-show",value:!e.timeshow,expression:"!timeshow"}],staticClass:"code-btn",attrs:{plain:"",hairline:"",type:"info","native-type":"button"},on:{click:e.onCode}},[e._v("GetCode")]),i("van-button",{directives:[{name:"show",rawName:"v-show",value:e.timeshow,expression:"timeshow"}],staticClass:"code-btn",attrs:{plain:"",hairline:"",disabled:"",type:"info"}},[e._v("getCode again "+e._s(e.time))])],1),i("div",{staticStyle:{margin:"16px"}},[i("van-button",{attrs:{round:"",disabled:e.disabled,block:"",type:"info","native-type":"submit"}},[e._v(" Next ")])],1)])],1):i("div",{staticClass:"login"},[i("van-form",{ref:"emailForm",on:{submit:e.setNewEmail}},[i("div",{staticClass:"inp"},[i("van-field",{attrs:{name:"email",placeholder:"Enter new email"},model:{value:e.newemail,callback:function(t){e.newemail=t},expression:"newemail"}})],1),i("div",{staticClass:"inp code"},[i("van-field",{attrs:{name:"newemailCode",placeholder:"Enter verify code"},model:{value:e.newemailCode,callback:function(t){e.newemailCode=t},expression:"newemailCode"}}),i("van-button",{directives:[{name:"show",rawName:"v-show",value:!e.newtimeshow,expression:"!newtimeshow"}],staticClass:"code-btn",attrs:{plain:"",hairline:"",type:"info","native-type":"button"},on:{click:e.onNewCode}},[e._v("GetCode")]),i("van-button",{directives:[{name:"show",rawName:"v-show",value:e.newtimeshow,expression:"newtimeshow"}],staticClass:"code-btn",attrs:{plain:"",hairline:"",disabled:"",type:"info"}},[e._v("getCode again "+e._s(e.newtime))])],1),i("div",{staticStyle:{margin:"16px"}},[i("van-button",{attrs:{round:"",disabled:e.disabled,block:"",type:"info","native-type":"submit"}},[e._v(" Submit ")])],1)])],1)],1)},_=[],a=i("0f01"),s=a["a"],o=(i("c5a1"),i("2877")),r=Object(o["a"])(s,n,_,!1,null,"51840d0d",null);t["default"]=r.exports}}]);