(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-544c281a"],{"02de":function(t,i,e){"use strict";function s(t){var i=window.getComputedStyle(t),e="none"===i.display,s=null===t.offsetParent&&"fixed"!==i.position;return e||s}e.d(i,"a",(function(){return s}))},1803:function(t,i,e){},"256d":function(t,i,e){"use strict";e("1803")},2994:function(t,i,e){"use strict";e("68ef"),e("e3b3"),e("c0c2")},"2bdd":function(t,i,e){"use strict";var s=e("d282"),n=e("02de"),a=e("a8c1"),o=e("5fbe"),r=e("543e"),c=Object(s["a"])("list"),h=c[0],d=c[1],l=c[2];i["a"]=h({mixins:[Object(o["a"])((function(t){this.scroller||(this.scroller=Object(a["d"])(this.$el)),t(this.scroller,"scroll",this.check)}))],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:[Number,String],default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var t=this;this.$nextTick((function(){if(!(t.innerLoading||t.finished||t.error)){var i,e=t.$el,s=t.scroller,a=t.offset,o=t.direction;i=s.getBoundingClientRect?s.getBoundingClientRect():{top:0,bottom:s.innerHeight};var r=i.bottom-i.top;if(!r||Object(n["a"])(e))return!1;var c=!1,h=t.$refs.placeholder.getBoundingClientRect();c="up"===o?i.top-h.top<=a:h.bottom-i.bottom<=a,c&&(t.innerLoading=!0,t.$emit("input",!0),t.$emit("load"))}}))},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var t=this.$createElement;if(this.innerLoading&&!this.finished)return t("div",{key:"loading",class:d("loading")},[this.slots("loading")||t(r["a"],{attrs:{size:"16"}},[this.loadingText||l("loading")])])},genFinishedText:function(){var t=this.$createElement;if(this.finished){var i=this.slots("finished")||this.finishedText;if(i)return t("div",{class:d("finished-text")},[i])}},genErrorText:function(){var t=this.$createElement;if(this.error){var i=this.slots("error")||this.errorText;if(i)return t("div",{on:{click:this.clickErrorText},class:d("error-text")},[i])}}},render:function(){var t=arguments[0],i=t("div",{ref:"placeholder",key:"placeholder",class:d("placeholder")});return t("div",{class:d(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():i,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():i])}})},4016:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"memberBJ"},[e("Header",{attrs:{title:"My 2 Level Members"}}),e("RefreshLoading",{attrs:{ismore:t.ismore,list:t.list},on:{load:t.load}},[e("div",{staticClass:"member"},t._l(t.list,(function(i,s){return e("div",{key:s,staticClass:"member-node"},[e("div",{staticClass:"member-node-img"},[e("van-image",{attrs:{src:i.headimg,width:"40",round:""}})],1),e("div",{staticClass:"member-node-info"},[e("div",{staticClass:"member-node-title"},[t._v(" "+t._s(i.yhname)+" ")]),e("div",{staticClass:"member-node-desc"},[e("div",{staticClass:"member-node-date"},[t._v(" "+t._s(i.zcsj)+" ")])])])])})),0)])],1)},n=[],a=(e("99af"),e("e7f3")),o={name:"MyMember",components:{RefreshLoading:a["a"]},data:function(){return{ismore:!1,list:[],index:0,id:""}},created:function(){this.id=this.$route.params.id},methods:{load:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;0!=i&&(this.index=0),this.$api.user.getShareYQRecordList2({hyid:this.id,pageindex:this.index}).then((function(e){""!=e&&(0!=i&&(t.list=[]),t.index++,t.list=t.list.concat(e.rows)),0==e.rows.length&&(t.ismore=!0)})).catch((function(t){}))}}},r=o,c=(e("256d"),e("2877")),h=Object(c["a"])(r,s,n,!1,null,"56a25748",null);i["default"]=h.exports},"58e6":function(t,i,e){"use strict";var s=e("d282"),n=e("1325"),a=e("a8c1"),o=e("3875"),r=e("543e"),c=Object(s["a"])("pull-refresh"),h=c[0],d=c[1],l=c[2],u=50,f=["pulling","loosing","success"];i["a"]=h({mixins:[o["a"]],props:{disabled:Boolean,successText:String,pullingText:String,loosingText:String,loadingText:String,value:{type:Boolean,required:!0},successDuration:{type:[Number,String],default:500},animationDuration:{type:[Number,String],default:300},headHeight:{type:[Number,String],default:u}},data:function(){return{status:"normal",distance:0,duration:0}},computed:{touchable:function(){return"loading"!==this.status&&"success"!==this.status&&!this.disabled},headStyle:function(){if(this.headHeight!==u)return{height:this.headHeight+"px"}}},watch:{value:function(t){this.duration=this.animationDuration,t?this.setStatus(+this.headHeight,!0):this.slots("success")||this.successText?this.showSuccessTip():this.setStatus(0,!1)}},mounted:function(){this.bindTouchEvent(this.$refs.track),this.scrollEl=Object(a["d"])(this.$el)},methods:{checkPullStart:function(t){this.ceiling=0===Object(a["c"])(this.scrollEl),this.ceiling&&(this.duration=0,this.touchStart(t))},onTouchStart:function(t){this.touchable&&this.checkPullStart(t)},onTouchMove:function(t){this.touchable&&(this.ceiling||this.checkPullStart(t),this.touchMove(t),this.ceiling&&this.deltaY>=0&&"vertical"===this.direction&&(Object(n["c"])(t),this.setStatus(this.ease(this.deltaY))))},onTouchEnd:function(){var t=this;this.touchable&&this.ceiling&&this.deltaY&&(this.duration=this.animationDuration,"loosing"===this.status?(this.setStatus(+this.headHeight,!0),this.$emit("input",!0),this.$nextTick((function(){t.$emit("refresh")}))):this.setStatus(0))},ease:function(t){var i=+this.headHeight;return t>i&&(t=t<2*i?i+(t-i)/2:1.5*i+(t-2*i)/4),Math.round(t)},setStatus:function(t,i){var e;e=i?"loading":0===t?"normal":t<this.headHeight?"pulling":"loosing",this.distance=t,e!==this.status&&(this.status=e)},genStatus:function(){var t=this.$createElement,i=this.status,e=this.distance,s=this.slots(i,{distance:e});if(s)return s;var n=[],a=this[i+"Text"]||l(i);return-1!==f.indexOf(i)&&n.push(t("div",{class:d("text")},[a])),"loading"===i&&n.push(t(r["a"],{attrs:{size:"16"}},[a])),n},showSuccessTip:function(){var t=this;this.status="success",setTimeout((function(){t.setStatus(0)}),this.successDuration)}},render:function(){var t=arguments[0],i={transitionDuration:this.duration+"ms",transform:this.distance?"translate3d(0,"+this.distance+"px, 0)":""};return t("div",{class:d()},[t("div",{ref:"track",class:d("track"),style:i},[t("div",{class:d("head"),style:this.headStyle},[this.genStatus()]),this.slots()])])}})},"6ab3":function(t,i,e){},ab71:function(t,i,e){"use strict";e("68ef"),e("e3b3"),e("6ab3")},c0c2:function(t,i,e){},e7f3:function(t,i,e){"use strict";var s,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(i){t.refreshing=i},expression:"refreshing"}},[e("van-list",{attrs:{finished:t.finished,"finished-text":"No more data"},on:{load:t.onLoad},model:{value:t.loading,callback:function(i){t.loading=i},expression:"loading"}},[t._t("default")],2)],1)},a=[],o=(e("b0c0"),e("ade3")),r=(e("ab71"),e("58e6")),c=(e("2994"),e("2bdd")),h={name:"ProductList",components:(s={},Object(o["a"])(s,c["a"].name,c["a"]),Object(o["a"])(s,r["a"].name,r["a"]),s),props:{ismore:{type:Boolean,default:!1},list:{type:Array,default:new Array}},data:function(){return{finished:!0,loading:!1,refreshing:!1}},mounted:function(){this.onRefresh()},methods:{onRefresh:function(){this.loading=!0,this.finished=!1,this.$emit("load","1")},onLoad:function(){this.finished||this.$emit("load")}},watch:{list:function(t,i){this.finished=!1,this.loading=!1,this.refreshing=!1},ismore:function(t,i){t&&(this.finished=!0,this.loading=!1,this.refreshing=!1)},finished:function(t,i){this.$emit("update:ismore",t)}}},d=h,l=e("2877"),u=Object(l["a"])(d,n,a,!1,null,"6d7318a6",null);i["a"]=u.exports}}]);