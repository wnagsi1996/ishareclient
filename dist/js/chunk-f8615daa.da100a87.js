(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f8615daa"],{"02ab":function(t,i,e){},2994:function(t,i,e){"use strict";e("68ef"),e("e3b3"),e("c0c2")},"2bdd":function(t,i,e){"use strict";var s=e("d282"),n=e("02de"),a=e("a8c1"),o=e("5fbe"),r=e("543e"),c=Object(s["a"])("list"),h=c[0],u=c[1],l=c[2];i["a"]=h({mixins:[Object(o["a"])((function(t){this.scroller||(this.scroller=Object(a["d"])(this.$el)),t(this.scroller,"scroll",this.check)}))],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:[Number,String],default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var t=this;this.$nextTick((function(){if(!(t.innerLoading||t.finished||t.error)){var i,e=t.$el,s=t.scroller,a=t.offset,o=t.direction;i=s.getBoundingClientRect?s.getBoundingClientRect():{top:0,bottom:s.innerHeight};var r=i.bottom-i.top;if(!r||Object(n["a"])(e))return!1;var c=!1,h=t.$refs.placeholder.getBoundingClientRect();c="up"===o?i.top-h.top<=a:h.bottom-i.bottom<=a,c&&(t.innerLoading=!0,t.$emit("input",!0),t.$emit("load"))}}))},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var t=this.$createElement;if(this.innerLoading&&!this.finished)return t("div",{key:"loading",class:u("loading")},[this.slots("loading")||t(r["a"],{attrs:{size:"16"}},[this.loadingText||l("loading")])])},genFinishedText:function(){var t=this.$createElement;if(this.finished){var i=this.slots("finished")||this.finishedText;if(i)return t("div",{class:u("finished-text")},[i])}},genErrorText:function(){var t=this.$createElement;if(this.error){var i=this.slots("error")||this.errorText;if(i)return t("div",{on:{click:this.clickErrorText},class:u("error-text")},[i])}}},render:function(){var t=arguments[0],i=t("div",{ref:"placeholder",key:"placeholder",class:u("placeholder")});return t("div",{class:u(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():i,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():i])}})},3122:function(t,i,e){"use strict";e("02ab")},"4d63":function(t,i,e){var s=e("83ab"),n=e("da84"),a=e("94ca"),o=e("7156"),r=e("9bf2").f,c=e("241c").f,h=e("44e7"),u=e("ad6d"),l=e("9f7f"),d=e("6eeb"),f=e("d039"),p=e("69f3").set,g=e("2626"),v=e("b622"),m=v("match"),b=n.RegExp,x=b.prototype,S=/a/g,T=/a/g,k=new b(S)!==S,y=l.UNSUPPORTED_Y,$=s&&a("RegExp",!k||y||f((function(){return T[m]=!1,b(S)!=S||b(T)==T||"/a/i"!=b(S,"i")})));if($){var w=function(t,i){var e,s=this instanceof w,n=h(t),a=void 0===i;if(!s&&n&&t.constructor===w&&a)return t;k?n&&!a&&(t=t.source):t instanceof w&&(a&&(i=u.call(t)),t=t.source),y&&(e=!!i&&i.indexOf("y")>-1,e&&(i=i.replace(/y/g,"")));var r=o(k?new b(t,i):b(t,i),s?this:x,w);return y&&e&&p(r,{sticky:e}),r},E=function(t){t in w||r(w,t,{configurable:!0,get:function(){return b[t]},set:function(i){b[t]=i}})},_=c(b),C=0;while(_.length>C)E(_[C++]);x.constructor=w,w.prototype=x,d(n,"RegExp",w)}g("RegExp")},"58e6":function(t,i,e){"use strict";var s=e("d282"),n=e("1325"),a=e("a8c1"),o=e("3875"),r=e("543e"),c=Object(s["a"])("pull-refresh"),h=c[0],u=c[1],l=c[2],d=50,f=["pulling","loosing","success"];i["a"]=h({mixins:[o["a"]],props:{disabled:Boolean,successText:String,pullingText:String,loosingText:String,loadingText:String,value:{type:Boolean,required:!0},successDuration:{type:[Number,String],default:500},animationDuration:{type:[Number,String],default:300},headHeight:{type:[Number,String],default:d}},data:function(){return{status:"normal",distance:0,duration:0}},computed:{touchable:function(){return"loading"!==this.status&&"success"!==this.status&&!this.disabled},headStyle:function(){if(this.headHeight!==d)return{height:this.headHeight+"px"}}},watch:{value:function(t){this.duration=this.animationDuration,t?this.setStatus(+this.headHeight,!0):this.slots("success")||this.successText?this.showSuccessTip():this.setStatus(0,!1)}},mounted:function(){this.bindTouchEvent(this.$refs.track),this.scrollEl=Object(a["d"])(this.$el)},methods:{checkPullStart:function(t){this.ceiling=0===Object(a["c"])(this.scrollEl),this.ceiling&&(this.duration=0,this.touchStart(t))},onTouchStart:function(t){this.touchable&&this.checkPullStart(t)},onTouchMove:function(t){this.touchable&&(this.ceiling||this.checkPullStart(t),this.touchMove(t),this.ceiling&&this.deltaY>=0&&"vertical"===this.direction&&(Object(n["c"])(t),this.setStatus(this.ease(this.deltaY))))},onTouchEnd:function(){var t=this;this.touchable&&this.ceiling&&this.deltaY&&(this.duration=this.animationDuration,"loosing"===this.status?(this.setStatus(+this.headHeight,!0),this.$emit("input",!0),this.$nextTick((function(){t.$emit("refresh")}))):this.setStatus(0))},ease:function(t){var i=+this.headHeight;return t>i&&(t=t<2*i?i+(t-i)/2:1.5*i+(t-2*i)/4),Math.round(t)},setStatus:function(t,i){var e;e=i?"loading":0===t?"normal":t<this.headHeight?"pulling":"loosing",this.distance=t,e!==this.status&&(this.status=e)},genStatus:function(){var t=this.$createElement,i=this.status,e=this.distance,s=this.slots(i,{distance:e});if(s)return s;var n=[],a=this[i+"Text"]||l(i);return-1!==f.indexOf(i)&&n.push(t("div",{class:u("text")},[a])),"loading"===i&&n.push(t(r["a"],{attrs:{size:"16"}},[a])),n},showSuccessTip:function(){var t=this;this.status="success",setTimeout((function(){t.setStatus(0)}),this.successDuration)}},render:function(){var t=arguments[0],i={transitionDuration:this.duration+"ms",transform:this.distance?"translate3d(0,"+this.distance+"px, 0)":""};return t("div",{class:u()},[t("div",{ref:"track",class:u("track"),style:i},[t("div",{class:u("head"),style:this.headStyle},[this.genStatus()]),this.slots()])])}})},"6ab3":function(t,i,e){},7156:function(t,i,e){var s=e("861d"),n=e("d2bb");t.exports=function(t,i,e){var a,o;return n&&"function"==typeof(a=i.constructor)&&a!==e&&s(o=a.prototype)&&o!==e.prototype&&n(t,o),t}},ab71:function(t,i,e){"use strict";e("68ef"),e("e3b3"),e("6ab3")},c0c2:function(t,i,e){},dce0:function(t,i,e){"use strict";e.r(i);var s,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(i){t.refreshing=i},expression:"refreshing"}},[e("van-list",{attrs:{finished:t.finished,"finished-text":"No more data"},on:{load:t.onLoad},model:{value:t.loading,callback:function(i){t.loading=i},expression:"loading"}},[e("div",{staticClass:"love-item"},t._l(t.productList,(function(i,s){return e("div",{key:s,staticClass:"love-item-info infinite-list-item"},[e("router-link",{attrs:{to:t._f("urlCompile")(i)}},[e("van-image",{attrs:{src:i.pimg,fit:"scale-down"}}),i.ptitle?e("p",{staticClass:"ptitle"},[t._v(t._s(i.ptitle))]):t._e(),i.price?[e("span",{staticClass:"py"},[t._v(t._s("$"+i.price))]),"0"!=i.pnum?e("p",{staticClass:"bold"},[t._v("Share Get")]):e("p",{staticClass:"bold"},[t._v("Free Get")])]:[e("span",{staticClass:"py"},[t._v(t._s("$"+i.pscjg))]),e("span",{staticClass:"px"},[t._v(t._s("$"+i.pjg))])]],2)],1)})),0)])],1)},a=[],o=(e("b0c0"),e("4d63"),e("ac1f"),e("25f0"),e("5319"),e("ade3")),r=(e("ab71"),e("58e6")),c=(e("2994"),e("2bdd")),h={name:"ProductList",components:(s={},Object(o["a"])(s,c["a"].name,c["a"]),Object(o["a"])(s,r["a"].name,r["a"]),s),props:{productList:{type:Array,default:new Array},productTotal:{type:Boolean,default:!1}},data:function(){return{finished:!0,loading:!1,refreshing:!1}},created:function(){this.onRefresh()},methods:{onRefresh:function(){this.loading=!0,this.finished=!1,this.$emit("loadproductdata","1")},onLoad:function(){this.$emit("loadproductdata")}},watch:{productList:function(t,i){0==t.length&&this.onRefresh(),this.productList=t,this.finished=!1,this.loading=!1,this.refreshing=!1},productTotal:function(t,i){t&&(this.finished=!0)}},filters:{urlCompile:function(t){var i=t.ptitle.replace(/ /g,"-").replace(/'/g,"").replace(new RegExp("/","gm"),"-").replace(/:/g,"-").replace(/,/g,"-");return"/productdetail/"+i+"/"+t.pid}}},u=h,l=(e("3122"),e("2877")),d=Object(l["a"])(u,n,a,!1,null,"2ed8929a",null);i["default"]=d.exports}}]);