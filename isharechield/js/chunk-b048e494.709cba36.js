(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b048e494","chunk-81f68f56"],{1146:function(t,e,i){},"1a04":function(t,e,i){},"482d":function(t,e,i){"use strict";function n(t,e,i){return Math.min(Math.max(t,e),i)}function r(t,e,i){var n=t.indexOf(e);return-1===n?t:"-"===e&&0!==n?t.slice(0,n):t.slice(0,n+1)+t.slice(n).replace(i,"")}function a(t,e,i){void 0===e&&(e=!0),void 0===i&&(i=!0),t=e?r(t,".",/\./g):t.split(".")[0],t=i?r(t,"-",/-/g):t.replace(/-/,"");var n=e?/[^-0-9.]/g:/[^-0-9]/g;return t.replace(n,"")}i.d(e,"b",(function(){return n})),i.d(e,"a",(function(){return a}))},"48f4":function(t,e,i){"use strict";function n(t){return"NavigationDuplicated"===t.name||t.message&&-1!==t.message.indexOf("redundant navigation")}function r(t,e){var i=e.to,r=e.url,a=e.replace;if(i&&t){var s=t[a?"replace":"push"](i);s&&s.catch&&s.catch((function(t){if(t&&!n(t))throw t}))}else r&&(a?location.replace(r):location.href=r)}function a(t){r(t.parent&&t.parent.$router,t.props)}i.d(e,"b",(function(){return r})),i.d(e,"a",(function(){return a})),i.d(e,"c",(function(){return s}));var s={url:String,replace:Boolean,to:[String,Object]}},"565f":function(t,e,i){"use strict";var n=i("2638"),r=i.n(n),a=i("c31d"),s=i("a8fa"),o=i("482d"),c=i("1325"),l=i("d282"),u=i("a142"),h=i("ea8e"),d=i("ad06"),f=i("7744"),v=i("dfaf"),b=Object(l["a"])("field"),g=b[0],p=b[1];e["a"]=g({inheritAttrs:!1,provide:function(){return{vanField:this}},inject:{vanForm:{default:null}},props:Object(a["a"])({},v["a"],{name:String,rules:Array,disabled:Boolean,readonly:Boolean,autosize:[Boolean,Object],leftIcon:String,rightIcon:String,clearable:Boolean,formatter:Function,maxlength:[Number,String],labelWidth:[Number,String],labelClass:null,labelAlign:String,inputAlign:String,placeholder:String,errorMessage:String,errorMessageAlign:String,showWordLimit:Boolean,value:{type:[Number,String],default:""},type:{type:String,default:"text"},error:{type:Boolean,default:null},colon:{type:Boolean,default:null},clearTrigger:{type:String,default:"focus"},formatTrigger:{type:String,default:"onChange"}}),data:function(){return{focused:!1,validateFailed:!1,validateMessage:""}},watch:{value:function(){this.updateValue(this.value),this.resetValidation(),this.validateWithTrigger("onChange"),this.$nextTick(this.adjustSize)}},mounted:function(){this.updateValue(this.value,this.formatTrigger),this.$nextTick(this.adjustSize),this.vanForm&&this.vanForm.addField(this)},beforeDestroy:function(){this.vanForm&&this.vanForm.removeField(this)},computed:{showClear:function(){if(this.clearable&&!this.readonly){var t=Object(u["c"])(this.value)&&""!==this.value,e="always"===this.clearTrigger||"focus"===this.clearTrigger&&this.focused;return t&&e}},showError:function(){return null!==this.error?this.error:!!(this.vanForm&&this.vanForm.showError&&this.validateFailed)||void 0},listeners:function(){return Object(a["a"])({},this.$listeners,{blur:this.onBlur,focus:this.onFocus,input:this.onInput,click:this.onClickInput,keypress:this.onKeypress})},labelStyle:function(){var t=this.getProp("labelWidth");if(t)return{width:Object(h["a"])(t)}},formValue:function(){return this.children&&(this.$scopedSlots.input||this.$slots.input)?this.children.value:this.value}},methods:{focus:function(){this.$refs.input&&this.$refs.input.focus()},blur:function(){this.$refs.input&&this.$refs.input.blur()},runValidator:function(t,e){return new Promise((function(i){var n=e.validator(t,e);if(Object(u["f"])(n))return n.then(i);i(n)}))},isEmptyValue:function(t){return Array.isArray(t)?!t.length:0!==t&&!t},runSyncRule:function(t,e){return(!e.required||!this.isEmptyValue(t))&&!(e.pattern&&!e.pattern.test(t))},getRuleMessage:function(t,e){var i=e.message;return Object(u["d"])(i)?i(t,e):i},runRules:function(t){var e=this;return t.reduce((function(t,i){return t.then((function(){if(!e.validateFailed){var t=e.formValue;return i.formatter&&(t=i.formatter(t,i)),e.runSyncRule(t,i)?i.validator?e.runValidator(t,i).then((function(n){!1===n&&(e.validateFailed=!0,e.validateMessage=e.getRuleMessage(t,i))})):void 0:(e.validateFailed=!0,void(e.validateMessage=e.getRuleMessage(t,i)))}}))}),Promise.resolve())},validate:function(t){var e=this;return void 0===t&&(t=this.rules),new Promise((function(i){t||i(),e.resetValidation(),e.runRules(t).then((function(){e.validateFailed?i({name:e.name,message:e.validateMessage}):i()}))}))},validateWithTrigger:function(t){if(this.vanForm&&this.rules){var e=this.vanForm.validateTrigger===t,i=this.rules.filter((function(i){return i.trigger?i.trigger===t:e}));this.validate(i)}},resetValidation:function(){this.validateFailed&&(this.validateFailed=!1,this.validateMessage="")},updateValue:function(t,e){void 0===e&&(e="onChange"),t=Object(u["c"])(t)?String(t):"";var i=this.maxlength;if(Object(u["c"])(i)&&t.length>i&&(t=this.value&&this.value.length===+i?this.value:t.slice(0,i)),"number"===this.type||"digit"===this.type){var n="number"===this.type;t=Object(o["a"])(t,n,n)}this.formatter&&e===this.formatTrigger&&(t=this.formatter(t));var r=this.$refs.input;r&&t!==r.value&&(r.value=t),t!==this.value&&this.$emit("input",t)},onInput:function(t){t.target.composing||this.updateValue(t.target.value)},onFocus:function(t){this.focused=!0,this.$emit("focus",t),this.readonly&&this.blur()},onBlur:function(t){this.focused=!1,this.updateValue(this.value,"onBlur"),this.$emit("blur",t),this.validateWithTrigger("onBlur"),Object(s["a"])()},onClick:function(t){this.$emit("click",t)},onClickInput:function(t){this.$emit("click-input",t)},onClickLeftIcon:function(t){this.$emit("click-left-icon",t)},onClickRightIcon:function(t){this.$emit("click-right-icon",t)},onClear:function(t){Object(c["c"])(t),this.$emit("input",""),this.$emit("clear",t)},onKeypress:function(t){var e=13;if(t.keyCode===e){var i=this.getProp("submitOnEnter");i||"textarea"===this.type||Object(c["c"])(t),"search"===this.type&&this.blur()}this.$emit("keypress",t)},adjustSize:function(){var t=this.$refs.input;if("textarea"===this.type&&this.autosize&&t){t.style.height="auto";var e=t.scrollHeight;if(Object(u["e"])(this.autosize)){var i=this.autosize,n=i.maxHeight,r=i.minHeight;n&&(e=Math.min(e,n)),r&&(e=Math.max(e,r))}e&&(t.style.height=e+"px")}},genInput:function(){var t=this.$createElement,e=this.type,i=this.slots("input"),n=this.getProp("inputAlign");if(i)return t("div",{class:p("control",[n,"custom"]),on:{click:this.onClickInput}},[i]);var s={ref:"input",class:p("control",n),domProps:{value:this.value},attrs:Object(a["a"])({},this.$attrs,{name:this.name,disabled:this.disabled,readonly:this.readonly,placeholder:this.placeholder}),on:this.listeners,directives:[{name:"model",value:this.value}]};if("textarea"===e)return t("textarea",r()([{},s]));var o,c=e;return"number"===e&&(c="text",o="decimal"),"digit"===e&&(c="tel",o="numeric"),t("input",r()([{attrs:{type:c,inputmode:o}},s]))},genLeftIcon:function(){var t=this.$createElement,e=this.slots("left-icon")||this.leftIcon;if(e)return t("div",{class:p("left-icon"),on:{click:this.onClickLeftIcon}},[this.slots("left-icon")||t(d["a"],{attrs:{name:this.leftIcon,classPrefix:this.iconPrefix}})])},genRightIcon:function(){var t=this.$createElement,e=this.slots,i=e("right-icon")||this.rightIcon;if(i)return t("div",{class:p("right-icon"),on:{click:this.onClickRightIcon}},[e("right-icon")||t(d["a"],{attrs:{name:this.rightIcon,classPrefix:this.iconPrefix}})])},genWordLimit:function(){var t=this.$createElement;if(this.showWordLimit&&this.maxlength){var e=(this.value||"").length;return t("div",{class:p("word-limit")},[t("span",{class:p("word-num")},[e]),"/",this.maxlength])}},genMessage:function(){var t=this.$createElement;if(!this.vanForm||!1!==this.vanForm.showErrorMessage){var e=this.errorMessage||this.validateMessage;if(e){var i=this.getProp("errorMessageAlign");return t("div",{class:p("error-message",i)},[e])}}},getProp:function(t){return Object(u["c"])(this[t])?this[t]:this.vanForm&&Object(u["c"])(this.vanForm[t])?this.vanForm[t]:void 0},genLabel:function(){var t=this.$createElement,e=this.getProp("colon")?":":"";return this.slots("label")?[this.slots("label"),e]:this.label?t("span",[this.label+e]):void 0}},render:function(){var t,e=arguments[0],i=this.slots,n=this.getProp("labelAlign"),r={icon:this.genLeftIcon},a=this.genLabel();a&&(r.title=function(){return a});var s=this.slots("extra");return s&&(r.extra=function(){return s}),e(f["a"],{attrs:{icon:this.leftIcon,size:this.size,center:this.center,border:this.border,isLink:this.isLink,required:this.required,clickable:this.clickable,titleStyle:this.labelStyle,valueClass:p("value"),titleClass:[p("label",n),this.labelClass],arrowDirection:this.arrowDirection},scopedSlots:r,class:p((t={error:this.showError,disabled:this.disabled},t["label-"+n]=n,t["min-height"]="textarea"===this.type&&!this.autosize,t)),on:{click:this.onClick}},[e("div",{class:p("body")},[this.genInput(),this.showClear&&e(d["a"],{attrs:{name:"clear"},class:p("clear"),on:{touchstart:this.onClear}}),this.genRightIcon(),i("button")&&e("div",{class:p("button")},[i("button")])]),this.genWordLimit(),this.genMessage()])}})},5852:function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("1a04"),i("1146"),i("f032")},"5f85":function(t,e,i){"use strict";i.r(e);var n,r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("van-tabbar",{attrs:{placeholder:""},on:{change:t.onChange},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[i("van-tabbar-item",{attrs:{name:"home",icon:"home-o"}},[t._v("Home")]),i("van-tabbar-item",{attrs:{name:"productlist",icon:"goods-collect-o"}},[t._v("Product")]),i("van-tabbar-item",{attrs:{name:"cart",icon:"shopping-cart-o"}},[t._v("Cart")]),i("van-tabbar-item",{attrs:{name:"user",icon:"manager-o"}},[t._v("User")])],1)],1)},a=[],s=(i("b0c0"),i("ade3")),o=(i("68ef"),i("9d70"),i("3743"),i("ae73"),i("c31d")),c=i("d282"),l=i("a142"),u=i("48f4"),h=i("9884"),d=i("ad06"),f=i("6f2f"),v=Object(c["a"])("tabbar-item"),b=v[0],g=v[1],p=b({mixins:[Object(h["a"])("vanTabbar")],props:Object(o["a"])({},u["c"],{dot:Boolean,icon:String,name:[Number,String],info:[Number,String],badge:[Number,String],iconPrefix:String}),data:function(){return{active:!1}},computed:{routeActive:function(){var t=this.to,e=this.$route;if(t&&e){var i=Object(l["e"])(t)?t:{path:t},n=i.path===e.path,r=Object(l["c"])(i.name)&&i.name===e.name;return n||r}}},methods:{onClick:function(t){this.parent.onChange(this.name||this.index),this.$emit("click",t),Object(u["b"])(this.$router,this)},genIcon:function(t){var e=this.$createElement,i=this.slots("icon",{active:t});return i||(this.icon?e(d["a"],{attrs:{name:this.icon,classPrefix:this.iconPrefix}}):void 0)}},render:function(){var t,e=arguments[0],i=this.parent.route?this.routeActive:this.active,n=this.parent[i?"activeColor":"inactiveColor"];return e("div",{class:g({active:i}),style:{color:n},on:{click:this.onClick}},[e("div",{class:g("icon")},[this.genIcon(i),e(f["a"],{attrs:{dot:this.dot,info:null!=(t=this.badge)?t:this.info}})]),e("div",{class:g("text")},[this.slots("default",{active:i})])])}}),m=(i("9312"),i("b1d2")),y=i("7e3e"),x=Object(c["a"])("tabbar"),O=x[0],k=x[1],j=O({mixins:[Object(h["b"])("vanTabbar")],props:{route:Boolean,zIndex:[Number,String],placeholder:Boolean,activeColor:String,beforeChange:Function,inactiveColor:String,value:{type:[Number,String],default:0},border:{type:Boolean,default:!0},fixed:{type:Boolean,default:!0},safeAreaInsetBottom:{type:Boolean,default:null}},data:function(){return{height:null}},computed:{fit:function(){return null!==this.safeAreaInsetBottom?this.safeAreaInsetBottom:this.fixed}},watch:{value:"setActiveItem",children:"setActiveItem"},mounted:function(){this.placeholder&&this.fixed&&(this.height=this.$refs.tabbar.getBoundingClientRect().height)},methods:{setActiveItem:function(){var t=this;this.children.forEach((function(e,i){e.active=(e.name||i)===t.value}))},onChange:function(t){var e=this;t!==this.value&&Object(y["a"])({interceptor:this.beforeChange,args:[t],done:function(){e.$emit("input",t),e.$emit("change",t)}})},genTabbar:function(){var t,e=this.$createElement;return e("div",{ref:"tabbar",style:{zIndex:this.zIndex},class:[(t={},t[m["e"]]=this.border,t),k({unfit:!this.fit,fixed:this.fixed})]},[this.slots()])}},render:function(){var t=arguments[0];return this.placeholder&&this.fixed?t("div",{class:k("placeholder"),style:{height:this.height+"px"}},[this.genTabbar()]):this.genTabbar()}}),S={name:"NavTab",components:(n={},Object(s["a"])(n,j.name,j),Object(s["a"])(n,p.name,p),n),data:function(){return{active:""}},created:function(){switch(this.$route.path){case"/":this.active="home";break;case"/menulist":this.active="productlist";break;case"/cart":this.active="cart";break;case"/usercenter":this.active="user";break}},methods:{onChange:function(t){switch(t){case"home":this.$router.push("/");break;case"productlist":this.$router.push("/menulist");break;case"cart":this.$router.push("/cart");break;case"user":this.$router.push("/usercenter");break}}}},$=S,C=i("2877"),I=Object(C["a"])($,r,a,!1,null,null,null);e["default"]=I.exports},7744:function(t,e,i){"use strict";var n=i("c31d"),r=i("2638"),a=i.n(r),s=i("d282"),o=i("a142"),c=i("ba31"),l=i("48f4"),u=i("dfaf"),h=i("ad06"),d=Object(s["a"])("cell"),f=d[0],v=d[1];function b(t,e,i,n){var r=e.icon,s=e.size,u=e.title,d=e.label,f=e.value,b=e.isLink,g=i.title||Object(o["c"])(u);function p(){var n=i.label||Object(o["c"])(d);if(n)return t("div",{class:[v("label"),e.labelClass]},[i.label?i.label():d])}function m(){if(g)return t("div",{class:[v("title"),e.titleClass],style:e.titleStyle},[i.title?i.title():t("span",[u]),p()])}function y(){var n=i.default||Object(o["c"])(f);if(n)return t("div",{class:[v("value",{alone:!g}),e.valueClass]},[i.default?i.default():t("span",[f])])}function x(){return i.icon?i.icon():r?t(h["a"],{class:v("left-icon"),attrs:{name:r,classPrefix:e.iconPrefix}}):void 0}function O(){var n=i["right-icon"];if(n)return n();if(b){var r=e.arrowDirection;return t(h["a"],{class:v("right-icon"),attrs:{name:r?"arrow-"+r:"arrow"}})}}function k(t){Object(c["a"])(n,"click",t),Object(l["a"])(n)}var j=b||e.clickable,S={clickable:j,center:e.center,required:e.required,borderless:!e.border};return s&&(S[s]=s),t("div",a()([{class:v(S),attrs:{role:j?"button":null,tabindex:j?0:null},on:{click:k}},Object(c["b"])(n)]),[x(),m(),y(),O(),null==i.extra?void 0:i.extra()])}b.props=Object(n["a"])({},u["a"],l["c"]),e["a"]=f(b)},"7e3e":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var n=i("a142");function r(t){var e=t.interceptor,i=t.args,r=t.done;if(e){var a=e.apply(void 0,i);Object(n["f"])(a)?a.then((function(t){t&&r()})).catch(n["h"]):a&&r()}else r()}},9312:function(t,e,i){},9884:function(t,e,i){"use strict";i.d(e,"a",(function(){return r})),i.d(e,"b",(function(){return a}));var n=i("db85");function r(t,e){var i,r;void 0===e&&(e={});var a=e.indexKey||"index";return{inject:(i={},i[t]={default:null},i),computed:(r={parent:function(){return this.disableBindRelation?null:this[t]}},r[a]=function(){return this.bindRelation(),this.parent?this.parent.children.indexOf(this):null},r),watch:{disableBindRelation:function(t){t||this.bindRelation()}},mounted:function(){this.bindRelation()},beforeDestroy:function(){var t=this;this.parent&&(this.parent.children=this.parent.children.filter((function(e){return e!==t})))},methods:{bindRelation:function(){if(this.parent&&-1===this.parent.children.indexOf(this)){var t=[].concat(this.parent.children,[this]);Object(n["a"])(t,this.parent),this.parent.children=t}}}}}function a(t){return{provide:function(){var e;return e={},e[t]=this,e},data:function(){return{children:[]}}}}},a8fa:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var n=i("a142");function r(){return!n["g"]&&/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())}var a=i("a8c1"),s=r();function o(){s&&Object(a["g"])(Object(a["b"])())}},ae73:function(t,e,i){},d961:function(t,e,i){"use strict";var n=i("2638"),r=i.n(n),a=i("c31d"),s=i("d282"),o=i("ba31"),c=i("1325"),l=i("565f"),u=Object(s["a"])("search"),h=u[0],d=u[1],f=u[2];function v(t,e,i,n){function s(){if(i.label||e.label)return t("div",{class:d("label")},[i.label?i.label():e.label])}function u(){if(e.showAction)return t("div",{class:d("action"),attrs:{role:"button",tabindex:"0"},on:{click:r}},[i.action?i.action():e.actionText||f("cancel")]);function r(){i.action||(Object(o["a"])(n,"input",""),Object(o["a"])(n,"cancel"))}}var h={attrs:n.data.attrs,on:Object(a["a"])({},n.listeners,{keypress:function(t){13===t.keyCode&&(Object(c["c"])(t),Object(o["a"])(n,"search",e.value)),Object(o["a"])(n,"keypress",t)}})},v=Object(o["b"])(n);return v.attrs=void 0,t("div",r()([{class:d({"show-action":e.showAction}),style:{background:e.background}},v]),[null==i.left?void 0:i.left(),t("div",{class:d("content",e.shape)},[s(),t(l["a"],r()([{attrs:{type:"search",border:!1,value:e.value,leftIcon:e.leftIcon,rightIcon:e.rightIcon,clearable:e.clearable,clearTrigger:e.clearTrigger},scopedSlots:{"left-icon":i["left-icon"],"right-icon":i["right-icon"]}},h]))]),u()])}v.props={value:String,label:String,rightIcon:String,actionText:String,background:String,showAction:Boolean,clearTrigger:String,shape:{type:String,default:"square"},clearable:{type:Boolean,default:!0},leftIcon:{type:String,default:"search"}},e["a"]=h(v)},db85:function(t,e,i){"use strict";function n(t){var e=[];function i(t){t.forEach((function(t){e.push(t),t.componentInstance&&i(t.componentInstance.$children.map((function(t){return t.$vnode}))),t.children&&i(t.children)}))}return i(t),e}function r(t,e){var i=e.$vnode.componentOptions;if(i&&i.children){var r=n(i.children);t.sort((function(t,e){return r.indexOf(t.$vnode)-r.indexOf(e.$vnode)}))}}i.d(e,"a",(function(){return r}))},dfaf:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var n={icon:String,size:String,center:Boolean,isLink:Boolean,required:Boolean,clickable:Boolean,iconPrefix:String,titleStyle:null,titleClass:null,valueClass:null,labelClass:null,title:[Number,String],value:[Number,String],label:[Number,String],arrowDirection:String,border:{type:Boolean,default:!0}}},f032:function(t,e,i){}}]);