(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e6625aa"],{"02de":function(t,e,i){"use strict";function n(t){var e=window.getComputedStyle(t),i="none"===e.display,n=null===t.offsetParent&&"fixed"!==e.position;return i||n}i.d(e,"a",(function(){return n}))},"1a02":function(t,e,i){},"1a8c":function(t,e,i){"use strict";i("1a02")},2994:function(t,e,i){"use strict";i("68ef"),i("e3b3"),i("c0c2")},"2bdd":function(t,e,i){"use strict";var n=i("d282"),s=i("02de"),a=i("a8c1"),o=i("5fbe"),r=i("543e"),c=Object(n["a"])("list"),l=c[0],u=c[1],d=c[2];e["a"]=l({mixins:[Object(o["a"])((function(t){this.scroller||(this.scroller=Object(a["d"])(this.$el)),t(this.scroller,"scroll",this.check)}))],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:[Number,String],default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var t=this;this.$nextTick((function(){if(!(t.innerLoading||t.finished||t.error)){var e,i=t.$el,n=t.scroller,a=t.offset,o=t.direction;e=n.getBoundingClientRect?n.getBoundingClientRect():{top:0,bottom:n.innerHeight};var r=e.bottom-e.top;if(!r||Object(s["a"])(i))return!1;var c=!1,l=t.$refs.placeholder.getBoundingClientRect();c="up"===o?e.top-l.top<=a:l.bottom-e.bottom<=a,c&&(t.innerLoading=!0,t.$emit("input",!0),t.$emit("load"))}}))},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var t=this.$createElement;if(this.innerLoading&&!this.finished)return t("div",{key:"loading",class:u("loading")},[this.slots("loading")||t(r["a"],{attrs:{size:"16"}},[this.loadingText||d("loading")])])},genFinishedText:function(){var t=this.$createElement;if(this.finished){var e=this.slots("finished")||this.finishedText;if(e)return t("div",{class:u("finished-text")},[e])}},genErrorText:function(){var t=this.$createElement;if(this.error){var e=this.slots("error")||this.errorText;if(e)return t("div",{on:{click:this.clickErrorText},class:u("error-text")},[e])}}},render:function(){var t=arguments[0],e=t("div",{ref:"placeholder",key:"placeholder",class:u("placeholder")});return t("div",{class:u(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():e,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():e])}})},"48f4":function(t,e,i){"use strict";function n(t){return"NavigationDuplicated"===t.name||t.message&&-1!==t.message.indexOf("redundant navigation")}function s(t,e){var i=e.to,s=e.url,a=e.replace;if(i&&t){var o=t[a?"replace":"push"](i);o&&o.catch&&o.catch((function(t){if(t&&!n(t))throw t}))}else s&&(a?location.replace(s):location.href=s)}function a(t){s(t.parent&&t.parent.$router,t.props)}i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return a})),i.d(e,"c",(function(){return o}));var o={url:String,replace:Boolean,to:[String,Object]}},"58e6":function(t,e,i){"use strict";var n=i("d282"),s=i("1325"),a=i("a8c1"),o=i("3875"),r=i("543e"),c=Object(n["a"])("pull-refresh"),l=c[0],u=c[1],d=c[2],h=50,f=["pulling","loosing","success"];e["a"]=l({mixins:[o["a"]],props:{disabled:Boolean,successText:String,pullingText:String,loosingText:String,loadingText:String,value:{type:Boolean,required:!0},successDuration:{type:[Number,String],default:500},animationDuration:{type:[Number,String],default:300},headHeight:{type:[Number,String],default:h}},data:function(){return{status:"normal",distance:0,duration:0}},computed:{touchable:function(){return"loading"!==this.status&&"success"!==this.status&&!this.disabled},headStyle:function(){if(this.headHeight!==h)return{height:this.headHeight+"px"}}},watch:{value:function(t){this.duration=this.animationDuration,t?this.setStatus(+this.headHeight,!0):this.slots("success")||this.successText?this.showSuccessTip():this.setStatus(0,!1)}},mounted:function(){this.bindTouchEvent(this.$refs.track),this.scrollEl=Object(a["d"])(this.$el)},methods:{checkPullStart:function(t){this.ceiling=0===Object(a["c"])(this.scrollEl),this.ceiling&&(this.duration=0,this.touchStart(t))},onTouchStart:function(t){this.touchable&&this.checkPullStart(t)},onTouchMove:function(t){this.touchable&&(this.ceiling||this.checkPullStart(t),this.touchMove(t),this.ceiling&&this.deltaY>=0&&"vertical"===this.direction&&(Object(s["c"])(t),this.setStatus(this.ease(this.deltaY))))},onTouchEnd:function(){var t=this;this.touchable&&this.ceiling&&this.deltaY&&(this.duration=this.animationDuration,"loosing"===this.status?(this.setStatus(+this.headHeight,!0),this.$emit("input",!0),this.$nextTick((function(){t.$emit("refresh")}))):this.setStatus(0))},ease:function(t){var e=+this.headHeight;return t>e&&(t=t<2*e?e+(t-e)/2:1.5*e+(t-2*e)/4),Math.round(t)},setStatus:function(t,e){var i;i=e?"loading":0===t?"normal":t<this.headHeight?"pulling":"loosing",this.distance=t,i!==this.status&&(this.status=i)},genStatus:function(){var t=this.$createElement,e=this.status,i=this.distance,n=this.slots(e,{distance:i});if(n)return n;var s=[],a=this[e+"Text"]||d(e);return-1!==f.indexOf(e)&&s.push(t("div",{class:u("text")},[a])),"loading"===e&&s.push(t(r["a"],{attrs:{size:"16"}},[a])),s},showSuccessTip:function(){var t=this;this.status="success",setTimeout((function(){t.setStatus(0)}),this.successDuration)}},render:function(){var t=arguments[0],e={transitionDuration:this.duration+"ms",transform:this.distance?"translate3d(0,"+this.distance+"px, 0)":""};return t("div",{class:u()},[t("div",{ref:"track",class:u("track"),style:e},[t("div",{class:u("head"),style:this.headStyle},[this.genStatus()]),this.slots()])])}})},5924:function(t,e,i){"use strict";i.r(e);var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"gifts"},[i("Header",{attrs:{title:"My Like"}}),i("RefreshLoading",{attrs:{ismore:t.ismore,list:t.list},on:{load:t.load}},[i("div",{staticClass:"gifts-node"},t._l(t.list,(function(e,n){return i("van-card",{key:n,attrs:{price:e.spjg,title:e.sptitle,thumb:e.pimg,currency:"$"},scopedSlots:t._u([{key:"footer",fn:function(){return[i("van-button",{attrs:{size:"mini"},on:{click:function(i){return t.cancelFollow(e.spid)}}},[t._v("Cancel Follow")])]},proxy:!0}],null,!0)})})),1)])],1)},a=[],o=(i("99af"),i("4de4"),i("b0c0"),i("ade3")),r=(i("66b9"),i("b650")),c=(i("9cb7"),i("66fd")),l=i("e7f3"),u={name:"MyLike",components:(n={},Object(o["a"])(n,c["a"].name,c["a"]),Object(o["a"])(n,r["a"].name,r["a"]),Object(o["a"])(n,"RefreshLoading",l["a"]),n),data:function(){return{ismore:!1,list:[],index:0}},methods:{load:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;0!=e&&(this.index=0),this.$api.user.getUserSCFocusSaleList({pageindex:this.index}).then((function(i){""!=i?(0!=e&&(t.list=[]),t.index++,t.list=t.list.concat(i.rows)):t.$toast("Data loading error"),0==i.rows.length&&(t.ismore=!0)})).catch((function(t){}))},cancelFollow:function(t){var e=this,i={pid:t};this.$api.user.cancelFocus(i).then((function(i){"2"==i?(e.$toast("success"),e.list=e.list.filter((function(e){return e.spid!=t}))):"0"==i?e.$toast("Fuccess"):e.$toast(i)}))}}},d=u,h=(i("1a8c"),i("2877")),f=Object(h["a"])(d,s,a,!1,null,"14e332a5",null);e["default"]=f.exports},"66b9":function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("e3b3"),i("bc1b")},"66fd":function(t,e,i){"use strict";var n=i("2638"),s=i.n(n),a=i("d282"),o=i("a142"),r=i("ba31"),c=i("a3e2"),l=i("44bf"),u=Object(a["a"])("card"),d=u[0],h=u[1];function f(t,e,i,n){var a,u=e.thumb,d=i.num||Object(o["c"])(e.num),f=i.price||Object(o["c"])(e.price),g=i["origin-price"]||Object(o["c"])(e.originPrice),p=d||f||g||i.bottom;function b(t){Object(r["a"])(n,"click-thumb",t)}function m(){if(i.tag||e.tag)return t("div",{class:h("tag")},[i.tag?i.tag():t(c["a"],{attrs:{mark:!0,type:"danger"}},[e.tag])])}function v(){if(i.thumb||u)return t("a",{attrs:{href:e.thumbLink},class:h("thumb"),on:{click:b}},[i.thumb?i.thumb():t(l["a"],{attrs:{src:u,width:"100%",height:"100%",fit:"cover","lazy-load":e.lazyLoad}}),m()])}function S(){return i.title?i.title():e.title?t("div",{class:[h("title"),"van-multi-ellipsis--l2"]},[e.title]):void 0}function x(){return i.desc?i.desc():e.desc?t("div",{class:[h("desc"),"van-ellipsis"]},[e.desc]):void 0}function y(){var i=e.price.toString().split(".");return t("div",[t("span",{class:h("price-currency")},[e.currency]),t("span",{class:h("price-integer")},[i[0]]),".",t("span",{class:h("price-decimal")},[i[1]])])}function k(){if(f)return t("div",{class:h("price")},[i.price?i.price():y()])}function O(){if(g){var n=i["origin-price"];return t("div",{class:h("origin-price")},[n?n():e.currency+" "+e.originPrice])}}function T(){if(d)return t("div",{class:h("num")},[i.num?i.num():"x"+e.num])}function j(){if(i.footer)return t("div",{class:h("footer")},[i.footer()])}return t("div",s()([{class:h()},Object(r["b"])(n,!0)]),[t("div",{class:h("header")},[v(),t("div",{class:h("content",{centered:e.centered})},[t("div",[S(),x(),null==i.tags?void 0:i.tags()]),p&&t("div",{class:"van-card__bottom"},[null==(a=i["price-top"])?void 0:a.call(i),k(),O(),T(),null==i.bottom?void 0:i.bottom()])])]),j()])}f.props={tag:String,desc:String,thumb:String,title:String,centered:Boolean,lazyLoad:Boolean,thumbLink:String,num:[Number,String],price:[Number,String],originPrice:[Number,String],currency:{type:String,default:"¥"}},e["a"]=d(f)},"6ab3":function(t,e,i){},"9b7e":function(t,e,i){},"9cb7":function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("09fe"),i("9b7e"),i("ea82")},a3e2:function(t,e,i){"use strict";var n=i("2638"),s=i.n(n),a=i("d282"),o=i("ba31"),r=i("ad06"),c=Object(a["a"])("tag"),l=c[0],u=c[1];function d(t,e,i,n){var a,c=e.type,l=e.mark,d=e.plain,h=e.color,f=e.round,g=e.size,p=d?"color":"backgroundColor",b=(a={},a[p]=h,a);e.textColor&&(b.color=e.textColor);var m={mark:l,plain:d,round:f};g&&(m[g]=g);var v=e.closeable&&t(r["a"],{attrs:{name:"cross"},class:u("close"),on:{click:function(t){t.stopPropagation(),Object(o["a"])(n,"close")}}});return t("transition",{attrs:{name:e.closeable?"van-fade":null}},[t("span",s()([{key:"content",style:b,class:u([m,c])},Object(o["b"])(n,!0)]),[null==i.default?void 0:i.default(),v])])}d.props={size:String,mark:Boolean,color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean,type:{type:String,default:"default"}},e["a"]=l(d)},ab71:function(t,e,i){"use strict";i("68ef"),i("e3b3"),i("6ab3")},b650:function(t,e,i){"use strict";var n=i("c31d"),s=i("2638"),a=i.n(s),o=i("d282"),r=i("ba31"),c=i("b1d2"),l=i("48f4"),u=i("ad06"),d=i("543e"),h=Object(o["a"])("button"),f=h[0],g=h[1];function p(t,e,i,n){var s,o=e.tag,h=e.icon,f=e.type,p=e.color,b=e.plain,m=e.disabled,v=e.loading,S=e.hairline,x=e.loadingText,y=e.iconPosition,k={};function O(t){v||m||(Object(r["a"])(n,"click",t),Object(l["a"])(n))}function T(t){Object(r["a"])(n,"touchstart",t)}p&&(k.color=b?p:c["g"],b||(k.background=p),-1!==p.indexOf("gradient")?k.border=0:k.borderColor=p);var j=[g([f,e.size,{plain:b,loading:v,disabled:m,hairline:S,block:e.block,round:e.round,square:e.square}]),(s={},s[c["c"]]=S,s)];function $(){return v?i.loading?i.loading():t(d["a"],{class:g("loading"),attrs:{size:e.loadingSize,type:e.loadingType,color:"currentColor"}}):h?t(u["a"],{attrs:{name:h,classPrefix:e.iconPrefix},class:g("icon")}):void 0}function B(){var n,s=[];return"left"===y&&s.push($()),n=v?x:i.default?i.default():e.text,n&&s.push(t("span",{class:g("text")},[n])),"right"===y&&s.push($()),s}return t(o,a()([{style:k,class:j,attrs:{type:e.nativeType,disabled:m},on:{click:O,touchstart:T}},Object(r["b"])(n)]),[t("div",{class:g("content")},[B()])])}p.props=Object(n["a"])({},l["c"],{text:String,icon:String,color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:String,loadingText:String,loadingType:String,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"},loadingSize:{type:String,default:"20px"},iconPosition:{type:String,default:"left"}}),e["a"]=f(p)},bc1b:function(t,e,i){},c0c2:function(t,e,i){},e7f3:function(t,e,i){"use strict";var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[i("van-list",{attrs:{finished:t.finished,"finished-text":"No more data"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[t._t("default")],2)],1)},a=[],o=(i("b0c0"),i("ade3")),r=(i("ab71"),i("58e6")),c=(i("2994"),i("2bdd")),l={name:"ProductList",components:(n={},Object(o["a"])(n,c["a"].name,c["a"]),Object(o["a"])(n,r["a"].name,r["a"]),n),props:{ismore:{type:Boolean,default:!1},list:{type:Array,default:new Array}},data:function(){return{finished:!0,loading:!1,refreshing:!1}},mounted:function(){this.onRefresh()},methods:{onRefresh:function(){this.loading=!0,this.finished=!1,this.$emit("load","1")},onLoad:function(){this.$emit("load")}},watch:{list:function(t,e){this.finished=!1,this.loading=!1,this.refreshing=!1},ismore:function(t,e){t&&(this.finished=!0)},finished:function(t,e){this.$emit("update:ismore",t)}}},u=l,d=i("2877"),h=Object(d["a"])(u,s,a,!1,null,"7572cbd4",null);e["a"]=h.exports},ea82:function(t,e,i){}}]);