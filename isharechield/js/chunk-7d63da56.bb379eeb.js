(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d63da56","chunk-8dc7c288","chunk-5311a6a4"],{"02de":function(t,e,n){"use strict";function r(t){var e=window.getComputedStyle(t),n="none"===e.display,r=null===t.offsetParent&&"fixed"!==e.position;return n||r}n.d(e,"a",(function(){return r}))},"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("d3b7");function r(t,e,n,r,i,o,a){try{var s=t[o](a),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var a=t.apply(e,n);function s(t){r(a,i,o,s,c,"next",t)}function c(t){r(a,i,o,s,c,"throw",t)}s(void 0)}))}}},2994:function(t,e,n){"use strict";n("68ef"),n("e3b3"),n("c0c2")},"2bdd":function(t,e,n){"use strict";var r=n("d282"),i=n("02de"),o=n("a8c1"),a=n("5fbe"),s=n("543e"),c=Object(r["a"])("list"),u=c[0],l=c[1],h=c[2];e["a"]=u({mixins:[Object(a["a"])((function(t){this.scroller||(this.scroller=Object(o["d"])(this.$el)),t(this.scroller,"scroll",this.check)}))],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:[Number,String],default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var t=this;this.$nextTick((function(){if(!(t.innerLoading||t.finished||t.error)){var e,n=t.$el,r=t.scroller,o=t.offset,a=t.direction;e=r.getBoundingClientRect?r.getBoundingClientRect():{top:0,bottom:r.innerHeight};var s=e.bottom-e.top;if(!s||Object(i["a"])(n))return!1;var c=!1,u=t.$refs.placeholder.getBoundingClientRect();c="up"===a?e.top-u.top<=o:u.bottom-e.bottom<=o,c&&(t.innerLoading=!0,t.$emit("input",!0),t.$emit("load"))}}))},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var t=this.$createElement;if(this.innerLoading&&!this.finished)return t("div",{key:"loading",class:l("loading")},[this.slots("loading")||t(s["a"],{attrs:{size:"16"}},[this.loadingText||h("loading")])])},genFinishedText:function(){var t=this.$createElement;if(this.finished){var e=this.slots("finished")||this.finishedText;if(e)return t("div",{class:l("finished-text")},[e])}},genErrorText:function(){var t=this.$createElement;if(this.error){var e=this.slots("error")||this.errorText;if(e)return t("div",{on:{click:this.clickErrorText},class:l("error-text")},[e])}}},render:function(){var t=arguments[0],e=t("div",{ref:"placeholder",key:"placeholder",class:l("placeholder")});return t("div",{class:l(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():e,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():e])}})},"4d63":function(t,e,n){var r=n("83ab"),i=n("da84"),o=n("94ca"),a=n("7156"),s=n("9bf2").f,c=n("241c").f,u=n("44e7"),l=n("ad6d"),h=n("9f7f"),d=n("6eeb"),f=n("d039"),p=n("69f3").set,g=n("2626"),v=n("b622"),y=v("match"),m=i.RegExp,b=m.prototype,x=/a/g,w=/a/g,k=new m(x)!==x,L=h.UNSUPPORTED_Y,E=r&&o("RegExp",!k||L||f((function(){return w[y]=!1,m(x)!=x||m(w)==w||"/a/i"!=m(x,"i")})));if(E){var S=function(t,e){var n,r=this instanceof S,i=u(t),o=void 0===e;if(!r&&i&&t.constructor===S&&o)return t;k?i&&!o&&(t=t.source):t instanceof S&&(o&&(e=l.call(t)),t=t.source),L&&(n=!!e&&e.indexOf("y")>-1,n&&(e=e.replace(/y/g,"")));var s=a(k?new m(t,e):m(t,e),r?this:b,S);return L&&n&&p(s,{sticky:n}),s},T=function(t){t in S||s(S,t,{configurable:!0,get:function(){return m[t]},set:function(e){m[t]=e}})},_=c(m),O=0;while(_.length>O)T(_[O++]);b.constructor=S,S.prototype=b,d(i,"RegExp",S)}g("RegExp")},5729:function(t,e,n){"use strict";n("77dc")},"58e6":function(t,e,n){"use strict";var r=n("d282"),i=n("1325"),o=n("a8c1"),a=n("3875"),s=n("543e"),c=Object(r["a"])("pull-refresh"),u=c[0],l=c[1],h=c[2],d=50,f=["pulling","loosing","success"];e["a"]=u({mixins:[a["a"]],props:{disabled:Boolean,successText:String,pullingText:String,loosingText:String,loadingText:String,value:{type:Boolean,required:!0},successDuration:{type:[Number,String],default:500},animationDuration:{type:[Number,String],default:300},headHeight:{type:[Number,String],default:d}},data:function(){return{status:"normal",distance:0,duration:0}},computed:{touchable:function(){return"loading"!==this.status&&"success"!==this.status&&!this.disabled},headStyle:function(){if(this.headHeight!==d)return{height:this.headHeight+"px"}}},watch:{value:function(t){this.duration=this.animationDuration,t?this.setStatus(+this.headHeight,!0):this.slots("success")||this.successText?this.showSuccessTip():this.setStatus(0,!1)}},mounted:function(){this.bindTouchEvent(this.$refs.track),this.scrollEl=Object(o["d"])(this.$el)},methods:{checkPullStart:function(t){this.ceiling=0===Object(o["c"])(this.scrollEl),this.ceiling&&(this.duration=0,this.touchStart(t))},onTouchStart:function(t){this.touchable&&this.checkPullStart(t)},onTouchMove:function(t){this.touchable&&(this.ceiling||this.checkPullStart(t),this.touchMove(t),this.ceiling&&this.deltaY>=0&&"vertical"===this.direction&&(Object(i["c"])(t),this.setStatus(this.ease(this.deltaY))))},onTouchEnd:function(){var t=this;this.touchable&&this.ceiling&&this.deltaY&&(this.duration=this.animationDuration,"loosing"===this.status?(this.setStatus(+this.headHeight,!0),this.$emit("input",!0),this.$nextTick((function(){t.$emit("refresh")}))):this.setStatus(0))},ease:function(t){var e=+this.headHeight;return t>e&&(t=t<2*e?e+(t-e)/2:1.5*e+(t-2*e)/4),Math.round(t)},setStatus:function(t,e){var n;n=e?"loading":0===t?"normal":t<this.headHeight?"pulling":"loosing",this.distance=t,n!==this.status&&(this.status=n)},genStatus:function(){var t=this.$createElement,e=this.status,n=this.distance,r=this.slots(e,{distance:n});if(r)return r;var i=[],o=this[e+"Text"]||h(e);return-1!==f.indexOf(e)&&i.push(t("div",{class:l("text")},[o])),"loading"===e&&i.push(t(s["a"],{attrs:{size:"16"}},[o])),i},showSuccessTip:function(){var t=this;this.status="success",setTimeout((function(){t.setStatus(0)}),this.successDuration)}},render:function(){var t=arguments[0],e={transitionDuration:this.duration+"ms",transform:this.distance?"translate3d(0,"+this.distance+"px, 0)":""};return t("div",{class:l()},[t("div",{ref:"track",class:l("track"),style:e},[t("div",{class:l("head"),style:this.headStyle},[this.genStatus()]),this.slots()])])}})},"6ab3":function(t,e,n){},7156:function(t,e,n){var r=n("861d"),i=n("d2bb");t.exports=function(t,e,n){var o,a;return i&&"function"==typeof(o=e.constructor)&&o!==n&&r(a=o.prototype)&&a!==n.prototype&&i(t,a),t}},"77dc":function(t,e,n){},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var i=e&&e.prototype instanceof v?e:v,o=Object.create(i.prototype),a=new j(r||[]);return o._invoke=S(t,n,a),o}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(P){return{type:"throw",arg:P}}}t.wrap=u;var h="suspendedStart",d="suspendedYield",f="executing",p="completed",g={};function v(){}function y(){}function m(){}var b={};b[o]=function(){return this};var x=Object.getPrototypeOf,w=x&&x(x($([])));w&&w!==n&&r.call(w,o)&&(b=w);var k=m.prototype=v.prototype=Object.create(b);function L(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function n(i,o,a,s){var c=l(t[i],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,a,s)}),(function(t){n("throw",t,a,s)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return n("throw",t,a,s)}))}s(c.arg)}var i;function o(t,r){function o(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(o,o):o()}this._invoke=o}function S(t,e,n){var r=h;return function(i,o){if(r===f)throw new Error("Generator is already running");if(r===p){if("throw"===i)throw o;return N()}n.method=i,n.arg=o;while(1){var a=n.delegate;if(a){var s=T(a,n);if(s){if(s===g)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var c=l(t,e,n);if("normal"===c.type){if(r=n.done?p:d,c.arg===g)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}function T(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,T(t,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=l(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,g;var o=i.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function $(t){if(t){var n=t[o];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function n(){while(++i<t.length)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:N}}function N(){return{value:e,done:!0}}return y.prototype=k.constructor=m,m.constructor=y,y.displayName=c(m,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},L(E.prototype),E.prototype[a]=function(){return this},t.AsyncIterator=E,t.async=function(e,n,r,i,o){void 0===o&&(o=Promise);var a=new E(u(e,n,r,i),o);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(k),c(k,s,"Generator"),k[o]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=$,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;O(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:$(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=r}catch(i){Function("r","regeneratorRuntime = r")(r)}},ab71:function(t,e,n){"use strict";n("68ef"),n("e3b3"),n("6ab3")},ae7b:function(t,e,n){"use strict";n.r(e);var r,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-search",{attrs:{placeholder:"Search Product"},on:{search:t.search},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}}),n("ProductList",{attrs:{productList:t.productlist,productTotal:t.productTotal},on:{loadproductdata:t.loadproductdata}}),n("NavTab")],1)},o=[],a=(n("99af"),n("caad"),n("b0c0"),n("2532"),n("96cf"),n("1da1")),s=n("5530"),c=n("ade3"),u=(n("5852"),n("d961")),l=n("2f62"),h=n("dce0"),d=n("5f85"),f={name:"productlist",components:(r={},Object(c["a"])(r,u["a"].name,u["a"]),Object(c["a"])(r,"ProductList",h["default"]),Object(c["a"])(r,"NavTab",d["default"]),r),data:function(){return{productlist:[],productTotal:!1,key:this.$route.query.key?this.$route.query.key:"",index:0,typeID:this.$route.query.typeID?this.$route.query.typeID:""}},beforeRouteEnter:function(t,e,n){n((function(t){t.keepAliveName.includes("productlist")||t.$store.commit("keepAliveName/SET_NAME_LIST","productlist")}))},created:function(){},computed:Object(s["a"])({},Object(l["c"])(["keepAliveName"])),methods:{search:function(){this.$router.push({query:{key:this.key}}),this.typeID="",this.productlist=[]},loadproductdata:function(){var t=arguments,e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var r,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>0&&void 0!==t[0]?t[0]:0,0!=r&&(e.index=0),i={ifbook:"0",sptitle:e.key,sptype:e.typeID,ifkq:"-1",ifjk:"-1",sorttype:"0",ifdx:"1",SellUserID:"-1",pageindex:e.index},n.next=5,e.$api.product.searchProduct(i).then((function(t){0!=r&&(e.productlist=[]),e.index++,e.productlist=e.productlist.concat(t.rows),0==t.rows.length&&(e.productTotal=!0)})).catch((function(t){}));case 5:case"end":return n.stop()}}),n)})))()}},beforeRouteLeave:function(t,e,n){"ProductDetail"!=t.name?this.keepAliveName.includes("productlist")&&this.$store.commit("keepAliveName/DEL_NAME_LIST","productlist"):this.keepAliveName.includes("productlist")||this.$store.commit("keepAliveName/SET_NAME_LIST","productlist"),n()}},p=f,g=n("2877"),v=Object(g["a"])(p,i,o,!1,null,null,null);e["default"]=v.exports},c0c2:function(t,e,n){},dce0:function(t,e,n){"use strict";n.r(e);var r,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[n("van-list",{attrs:{finished:t.finished,"finished-text":"No more data"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[n("div",{staticClass:"love-item"},t._l(t.productList,(function(e,r){return n("div",{key:r,staticClass:"love-item-info infinite-list-item"},[n("router-link",{attrs:{to:t._f("urlCompile")(e),replace:t.replace}},[n("van-image",{attrs:{src:e.pimg,"lazy-load":"",fit:"scale-down"}}),e.ptitle?n("p",{staticClass:"ptitle"},[t._v(t._s(e.ptitle))]):t._e(),e.price?[n("span",{staticClass:"py"},[t._v(t._s("$"+e.price))]),"0"!=e.pnum?n("p",{staticClass:"bold"},[t._v("Share Get")]):n("p",{staticClass:"bold"},[t._v("Free Get")])]:[n("span",{staticClass:"py"},[t._v(t._s("$"+e.pscjg))]),n("span",{staticClass:"px"},[t._v(t._s("$"+e.pjg))])]],2)],1)})),0)])],1)},o=[],a=(n("b0c0"),n("4d63"),n("ac1f"),n("25f0"),n("5319"),n("ade3")),s=(n("ab71"),n("58e6")),c=(n("2994"),n("2bdd")),u={name:"ProductList",components:(r={},Object(a["a"])(r,c["a"].name,c["a"]),Object(a["a"])(r,s["a"].name,s["a"]),r),props:{productList:{type:Array,default:new Array},productTotal:{type:Boolean,default:!1},replace:{type:Boolean,default:!1}},data:function(){return{finished:!0,loading:!1,refreshing:!1}},created:function(){this.onRefresh()},methods:{onRefresh:function(){this.loading=!0,this.finished=!1,this.$emit("loadproductdata","1")},onLoad:function(){this.$emit("loadproductdata")}},watch:{productList:function(t,e){0==t.length&&this.onRefresh(),this.productList=t,this.finished=!1,this.loading=!1,this.refreshing=!1},productTotal:function(t,e){t&&(this.finished=!0)}},filters:{urlCompile:function(t){t.ptitle.replace(/ /g,"-").replace(/'/g,"").replace(new RegExp("/","gm"),"-").replace(/:/g,"-").replace(/,/g,"-");return"/product?pid="+t.pid}}},l=u,h=(n("5729"),n("2877")),d=Object(h["a"])(l,i,o,!1,null,"7bbde51e",null);e["default"]=d.exports}}]);