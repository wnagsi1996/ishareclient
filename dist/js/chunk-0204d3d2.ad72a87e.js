(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0204d3d2"],{"02de":function(t,i,e){"use strict";function n(t){var i=window.getComputedStyle(t),e="none"===i.display,n=null===t.offsetParent&&"fixed"!==i.position;return e||n}e.d(i,"a",(function(){return n}))},"12fb":function(t,i,e){"use strict";e.r(i);var n,s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"gifts"},[e("Header",{attrs:{title:"My Gifts"}}),e("RefreshLoading",{attrs:{ismore:t.ismore,list:t.list},on:{load:t.load}},[e("div",{staticClass:"gifts-node"},t._l(t.list,(function(i,n){return e("van-card",{key:n,attrs:{num:"1",price:i.price,desc:i.productattr,title:i.ptitle,thumb:i.pimg},on:{click:function(e){return t.onClick(i.pdorderno)}},scopedSlots:t._u([{key:"footer",fn:function(){return[e("p",{staticStyle:{"margin-top":"10px",color:"#e41c1d"}},[t._v(t._s(i.pdorderstate))])]},proxy:!0}],null,!0)})})),1)])],1)},r=[],o=(e("99af"),e("b0c0"),e("ade3")),a=(e("9cb7"),e("66fd")),c=e("e7f3"),l={name:"MyGifts",components:(n={},Object(o["a"])(n,a["a"].name,a["a"]),Object(o["a"])(n,"RefreshLoading",c["a"]),n),data:function(){return{ismore:!1,list:[],index:0}},methods:{load:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;0!=i&&(this.index=0),this.$api.user.getUserPDProductList({pdtype:"-1",pageindex:this.index}).then((function(e){""!=e?(0!=i&&(t.list=[]),t.index++,t.list=t.list.concat(e.rows)):t.$toast("Data loading error"),0==e.rows.length&&(t.ismore=!0)})).catch((function(t){}))},onClick:function(t){this.$router.push({path:"/groupswait/"+t})}}},u=l,d=(e("791f"),e("2877")),h=Object(d["a"])(u,s,r,!1,null,null,null);i["default"]=h.exports},2994:function(t,i,e){"use strict";e("68ef"),e("e3b3"),e("c0c2")},"2bdd":function(t,i,e){"use strict";var n=e("d282"),s=e("02de"),r=e("a8c1"),o=e("5fbe"),a=e("543e"),c=Object(n["a"])("list"),l=c[0],u=c[1],d=c[2];i["a"]=l({mixins:[Object(o["a"])((function(t){this.scroller||(this.scroller=Object(r["d"])(this.$el)),t(this.scroller,"scroll",this.check)}))],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:[Number,String],default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var t=this;this.$nextTick((function(){if(!(t.innerLoading||t.finished||t.error)){var i,e=t.$el,n=t.scroller,r=t.offset,o=t.direction;i=n.getBoundingClientRect?n.getBoundingClientRect():{top:0,bottom:n.innerHeight};var a=i.bottom-i.top;if(!a||Object(s["a"])(e))return!1;var c=!1,l=t.$refs.placeholder.getBoundingClientRect();c="up"===o?i.top-l.top<=r:l.bottom-i.bottom<=r,c&&(t.innerLoading=!0,t.$emit("input",!0),t.$emit("load"))}}))},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var t=this.$createElement;if(this.innerLoading&&!this.finished)return t("div",{key:"loading",class:u("loading")},[this.slots("loading")||t(a["a"],{attrs:{size:"16"}},[this.loadingText||d("loading")])])},genFinishedText:function(){var t=this.$createElement;if(this.finished){var i=this.slots("finished")||this.finishedText;if(i)return t("div",{class:u("finished-text")},[i])}},genErrorText:function(){var t=this.$createElement;if(this.error){var i=this.slots("error")||this.errorText;if(i)return t("div",{on:{click:this.clickErrorText},class:u("error-text")},[i])}}},render:function(){var t=arguments[0],i=t("div",{ref:"placeholder",key:"placeholder",class:u("placeholder")});return t("div",{class:u(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():i,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():i])}})},"58e6":function(t,i,e){"use strict";var n=e("d282"),s=e("1325"),r=e("a8c1"),o=e("3875"),a=e("543e"),c=Object(n["a"])("pull-refresh"),l=c[0],u=c[1],d=c[2],h=50,f=["pulling","loosing","success"];i["a"]=l({mixins:[o["a"]],props:{disabled:Boolean,successText:String,pullingText:String,loosingText:String,loadingText:String,value:{type:Boolean,required:!0},successDuration:{type:[Number,String],default:500},animationDuration:{type:[Number,String],default:300},headHeight:{type:[Number,String],default:h}},data:function(){return{status:"normal",distance:0,duration:0}},computed:{touchable:function(){return"loading"!==this.status&&"success"!==this.status&&!this.disabled},headStyle:function(){if(this.headHeight!==h)return{height:this.headHeight+"px"}}},watch:{value:function(t){this.duration=this.animationDuration,t?this.setStatus(+this.headHeight,!0):this.slots("success")||this.successText?this.showSuccessTip():this.setStatus(0,!1)}},mounted:function(){this.bindTouchEvent(this.$refs.track),this.scrollEl=Object(r["d"])(this.$el)},methods:{checkPullStart:function(t){this.ceiling=0===Object(r["c"])(this.scrollEl),this.ceiling&&(this.duration=0,this.touchStart(t))},onTouchStart:function(t){this.touchable&&this.checkPullStart(t)},onTouchMove:function(t){this.touchable&&(this.ceiling||this.checkPullStart(t),this.touchMove(t),this.ceiling&&this.deltaY>=0&&"vertical"===this.direction&&(Object(s["c"])(t),this.setStatus(this.ease(this.deltaY))))},onTouchEnd:function(){var t=this;this.touchable&&this.ceiling&&this.deltaY&&(this.duration=this.animationDuration,"loosing"===this.status?(this.setStatus(+this.headHeight,!0),this.$emit("input",!0),this.$nextTick((function(){t.$emit("refresh")}))):this.setStatus(0))},ease:function(t){var i=+this.headHeight;return t>i&&(t=t<2*i?i+(t-i)/2:1.5*i+(t-2*i)/4),Math.round(t)},setStatus:function(t,i){var e;e=i?"loading":0===t?"normal":t<this.headHeight?"pulling":"loosing",this.distance=t,e!==this.status&&(this.status=e)},genStatus:function(){var t=this.$createElement,i=this.status,e=this.distance,n=this.slots(i,{distance:e});if(n)return n;var s=[],r=this[i+"Text"]||d(i);return-1!==f.indexOf(i)&&s.push(t("div",{class:u("text")},[r])),"loading"===i&&s.push(t(a["a"],{attrs:{size:"16"}},[r])),s},showSuccessTip:function(){var t=this;this.status="success",setTimeout((function(){t.setStatus(0)}),this.successDuration)}},render:function(){var t=arguments[0],i={transitionDuration:this.duration+"ms",transform:this.distance?"translate3d(0,"+this.distance+"px, 0)":""};return t("div",{class:u()},[t("div",{ref:"track",class:u("track"),style:i},[t("div",{class:u("head"),style:this.headStyle},[this.genStatus()]),this.slots()])])}})},"66fd":function(t,i,e){"use strict";var n=e("2638"),s=e.n(n),r=e("d282"),o=e("a142"),a=e("ba31"),c=e("a3e2"),l=e("44bf"),u=Object(r["a"])("card"),d=u[0],h=u[1];function f(t,i,e,n){var r,u=i.thumb,d=e.num||Object(o["c"])(i.num),f=e.price||Object(o["c"])(i.price),g=e["origin-price"]||Object(o["c"])(i.originPrice),p=d||f||g||e.bottom;function m(t){Object(a["a"])(n,"click-thumb",t)}function b(){if(e.tag||i.tag)return t("div",{class:h("tag")},[e.tag?e.tag():t(c["a"],{attrs:{mark:!0,type:"danger"}},[i.tag])])}function v(){if(e.thumb||u)return t("a",{attrs:{href:i.thumbLink},class:h("thumb"),on:{click:m}},[e.thumb?e.thumb():t(l["a"],{attrs:{src:u,width:"100%",height:"100%",fit:"cover","lazy-load":i.lazyLoad}}),b()])}function S(){return e.title?e.title():i.title?t("div",{class:[h("title"),"van-multi-ellipsis--l2"]},[i.title]):void 0}function x(){return e.desc?e.desc():i.desc?t("div",{class:[h("desc"),"van-ellipsis"]},[i.desc]):void 0}function k(){var e=i.price.toString().split(".");return t("div",[t("span",{class:h("price-currency")},[i.currency]),t("span",{class:h("price-integer")},[e[0]]),".",t("span",{class:h("price-decimal")},[e[1]])])}function y(){if(f)return t("div",{class:h("price")},[e.price?e.price():k()])}function T(){if(g){var n=e["origin-price"];return t("div",{class:h("origin-price")},[n?n():i.currency+" "+i.originPrice])}}function O(){if(d)return t("div",{class:h("num")},[e.num?e.num():"x"+i.num])}function $(){if(e.footer)return t("div",{class:h("footer")},[e.footer()])}return t("div",s()([{class:h()},Object(a["b"])(n,!0)]),[t("div",{class:h("header")},[v(),t("div",{class:h("content",{centered:i.centered})},[t("div",[S(),x(),null==e.tags?void 0:e.tags()]),p&&t("div",{class:"van-card__bottom"},[null==(r=e["price-top"])?void 0:r.call(e),y(),T(),O(),null==e.bottom?void 0:e.bottom()])])]),$()])}f.props={tag:String,desc:String,thumb:String,title:String,centered:Boolean,lazyLoad:Boolean,thumbLink:String,num:[Number,String],price:[Number,String],originPrice:[Number,String],currency:{type:String,default:"¥"}},i["a"]=d(f)},"6ab3":function(t,i,e){},"791f":function(t,i,e){"use strict";e("ee97")},"9b7e":function(t,i,e){},"9cb7":function(t,i,e){"use strict";e("68ef"),e("9d70"),e("3743"),e("09fe"),e("9b7e"),e("ea82")},a3e2:function(t,i,e){"use strict";var n=e("2638"),s=e.n(n),r=e("d282"),o=e("ba31"),a=e("ad06"),c=Object(r["a"])("tag"),l=c[0],u=c[1];function d(t,i,e,n){var r,c=i.type,l=i.mark,d=i.plain,h=i.color,f=i.round,g=i.size,p=d?"color":"backgroundColor",m=(r={},r[p]=h,r);i.textColor&&(m.color=i.textColor);var b={mark:l,plain:d,round:f};g&&(b[g]=g);var v=i.closeable&&t(a["a"],{attrs:{name:"cross"},class:u("close"),on:{click:function(t){t.stopPropagation(),Object(o["a"])(n,"close")}}});return t("transition",{attrs:{name:i.closeable?"van-fade":null}},[t("span",s()([{key:"content",style:m,class:u([b,c])},Object(o["b"])(n,!0)]),[null==e.default?void 0:e.default(),v])])}d.props={size:String,mark:Boolean,color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean,type:{type:String,default:"default"}},i["a"]=l(d)},ab71:function(t,i,e){"use strict";e("68ef"),e("e3b3"),e("6ab3")},c0c2:function(t,i,e){},e7f3:function(t,i,e){"use strict";var n,s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(i){t.refreshing=i},expression:"refreshing"}},[e("van-list",{attrs:{finished:t.finished,"finished-text":"No more data"},on:{load:t.onLoad},model:{value:t.loading,callback:function(i){t.loading=i},expression:"loading"}},[t._t("default")],2)],1)},r=[],o=(e("b0c0"),e("ade3")),a=(e("ab71"),e("58e6")),c=(e("2994"),e("2bdd")),l={name:"ProductList",components:(n={},Object(o["a"])(n,c["a"].name,c["a"]),Object(o["a"])(n,a["a"].name,a["a"]),n),props:{ismore:{type:Boolean,default:!1},list:{type:Array,default:new Array}},data:function(){return{finished:!0,loading:!1,refreshing:!1}},mounted:function(){this.onRefresh()},methods:{onRefresh:function(){this.loading=!0,this.finished=!1,this.$emit("load","1")},onLoad:function(){this.$emit("load")}},watch:{list:function(t,i){this.finished=!1,this.loading=!1,this.refreshing=!1},ismore:function(t,i){t&&(this.finished=!0)},finished:function(t,i){this.$emit("update:ismore",t)}}},u=l,d=e("2877"),h=Object(d["a"])(u,s,r,!1,null,"7572cbd4",null);i["a"]=h.exports},ea82:function(t,i,e){},ee97:function(t,i,e){}}]);