(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1dcfbd66"],{1276:function(t,e,r){"use strict";var n=r("d784"),i=r("44e7"),o=r("825a"),a=r("1d80"),c=r("4840"),s=r("8aa5"),u=r("50c4"),l=r("14c3"),f=r("9263"),d=r("d039"),h=[].push,p=Math.min,v=4294967295,g=!d((function(){return!RegExp(v,"y")}));n("split",2,(function(t,e,r){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,r){var n=String(a(this)),o=void 0===r?v:r>>>0;if(0===o)return[];if(void 0===t)return[n];if(!i(t))return e.call(n,t,o);var c,s,u,l=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,g=new RegExp(t.source,d+"g");while(c=f.call(g,n)){if(s=g.lastIndex,s>p&&(l.push(n.slice(p,c.index)),c.length>1&&c.index<n.length&&h.apply(l,c.slice(1)),u=c[0].length,p=s,l.length>=o))break;g.lastIndex===c.index&&g.lastIndex++}return p===n.length?!u&&g.test("")||l.push(""):l.push(n.slice(p)),l.length>o?l.slice(0,o):l}:"0".split(void 0,0).length?function(t,r){return void 0===t&&0===r?[]:e.call(this,t,r)}:e,[function(e,r){var i=a(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,i,r):n.call(String(i),e,r)},function(t,i){var a=r(n,t,this,i,n!==e);if(a.done)return a.value;var f=o(t),d=String(this),h=c(f,RegExp),m=f.unicode,y=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(g?"y":"g"),b=new h(g?f:"^(?:"+f.source+")",y),w=void 0===i?v:i>>>0;if(0===w)return[];if(0===d.length)return null===l(b,d)?[d]:[];var x=0,k=0,_=[];while(k<d.length){b.lastIndex=g?k:0;var S,L=l(b,g?d:d.slice(k));if(null===L||(S=p(u(b.lastIndex+(g?0:k)),d.length))===x)k=s(d,k,m);else{if(_.push(d.slice(x,k)),_.length===w)return _;for(var O=1;O<=L.length-1;O++)if(_.push(L[O]),_.length===w)return _;k=x=S}}return _.push(d.slice(x)),_}]}),!g)},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("d3b7");function n(t,e,r,n,i,o,a){try{var c=t[o](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,i)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(i,o){var a=t.apply(e,r);function c(t){n(a,i,o,c,s,"next",t)}function s(t){n(a,i,o,c,s,"throw",t)}c(void 0)}))}}},"2ca0":function(t,e,r){"use strict";var n=r("23e7"),i=r("06cf").f,o=r("50c4"),a=r("5a34"),c=r("1d80"),s=r("ab13"),u=r("c430"),l="".startsWith,f=Math.min,d=s("startsWith"),h=!u&&!d&&!!function(){var t=i(String.prototype,"startsWith");return t&&!t.writable}();n({target:"String",proto:!0,forced:!h&&!d},{startsWith:function(t){var e=String(c(this));a(t);var r=o(f(arguments.length>1?arguments[1]:void 0,e.length)),n=String(t);return l?l.call(e,n,r):e.slice(r,r+n.length)===n}})},6459:function(t,e,r){},"66fd":function(t,e,r){"use strict";var n=r("2638"),i=r.n(n),o=r("d282"),a=r("a142"),c=r("ba31"),s=r("a3e2"),u=r("44bf"),l=Object(o["a"])("card"),f=l[0],d=l[1];function h(t,e,r,n){var o,l=e.thumb,f=r.num||Object(a["c"])(e.num),h=r.price||Object(a["c"])(e.price),p=r["origin-price"]||Object(a["c"])(e.originPrice),v=f||h||p||r.bottom;function g(t){Object(c["a"])(n,"click-thumb",t)}function m(){if(r.tag||e.tag)return t("div",{class:d("tag")},[r.tag?r.tag():t(s["a"],{attrs:{mark:!0,type:"danger"}},[e.tag])])}function y(){if(r.thumb||l)return t("a",{attrs:{href:e.thumbLink},class:d("thumb"),on:{click:g}},[r.thumb?r.thumb():t(u["a"],{attrs:{src:l,width:"100%",height:"100%",fit:"cover","lazy-load":e.lazyLoad}}),m()])}function b(){return r.title?r.title():e.title?t("div",{class:[d("title"),"van-multi-ellipsis--l2"]},[e.title]):void 0}function w(){return r.desc?r.desc():e.desc?t("div",{class:[d("desc"),"van-ellipsis"]},[e.desc]):void 0}function x(){var r=e.price.toString().split(".");return t("div",[t("span",{class:d("price-currency")},[e.currency]),t("span",{class:d("price-integer")},[r[0]]),".",t("span",{class:d("price-decimal")},[r[1]])])}function k(){if(h)return t("div",{class:d("price")},[r.price?r.price():x()])}function _(){if(p){var n=r["origin-price"];return t("div",{class:d("origin-price")},[n?n():e.currency+" "+e.originPrice])}}function S(){if(f)return t("div",{class:d("num")},[r.num?r.num():"x"+e.num])}function L(){if(r.footer)return t("div",{class:d("footer")},[r.footer()])}return t("div",i()([{class:d()},Object(c["b"])(n,!0)]),[t("div",{class:d("header")},[y(),t("div",{class:d("content",{centered:e.centered})},[t("div",[b(),w(),null==r.tags?void 0:r.tags()]),v&&t("div",{class:"van-card__bottom"},[null==(o=r["price-top"])?void 0:o.call(r),k(),_(),S(),null==r.bottom?void 0:r.bottom()])])]),L()])}h.props={tag:String,desc:String,thumb:String,title:String,centered:Boolean,lazyLoad:Boolean,thumbLink:String,num:[Number,String],price:[Number,String],originPrice:[Number,String],currency:{type:String,default:"¥"}},e["a"]=f(h)},"7a1c":function(t,e,r){"use strict";r.r(e);var n,i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order"},[r("Header",{attrs:{title:"My Order"}}),r("div",{staticClass:"nav"},[r("ul",t._l(t.stateJson,(function(e,n){return r("li",{key:n,class:e.val==t.orderState?"active":"",on:{click:function(r){return t.search(e.val)}}},[t._v(t._s(e.text))])})),0)]),r("div",{staticStyle:{height:"40px"}}),r("RefreshLoading",{attrs:{ismore:t.ismore,list:t.list},on:{load:t.load}},t._l(t.list,(function(e,n){return r("div",{key:n,staticClass:"order-item"},[r("div",{staticClass:"order-item-top"},[t._v(" "+t._s(t._f("state")(e.ddzt))+" ")]),r("div",{staticClass:"order-item-bottom",on:{click:function(r){return t.hankDetail(e.ddbh)}}},[r("p",[t._v("Order number："+t._s(e.ddbh))]),r("p",[t._v("Order time："+t._s(e.ddxdsj))]),r("p",[t._v("Payment time："+t._s(e.ddfksj))]),r("p",[t._v("Total price：$"+t._s(e.ddje))]),r("p",[t._v("Remark："+t._s(e.ddly))]),"0"==e.ddzt?r("div",{staticClass:"order-btn"},[r("van-button",{attrs:{size:"small",type:"danger"},on:{click:function(r){return r.stopPropagation(),t.hankCancel(e.ddbh)}}},[t._v("Cancel order")]),r("van-button",{attrs:{size:"small",type:"primary"},on:{click:function(r){return r.stopPropagation(),t.hankPay(e.ddbh)}}},[t._v("Pay order")])],1):t._e(),"2"==e.ddzt?r("div",{staticClass:"order-btn"},[r("van-button",{attrs:{size:"small",type:"primary"},on:{click:function(r){return r.stopPropagation(),t.hankConfirm(e.ddbh)}}},[t._v("Confirm Receipt")])],1):t._e()])])})),0),r("van-popup",{style:{minHeight:"20%"},attrs:{position:"bottom",round:""},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[r("div",{staticClass:"detail-item"},t._l(t.detail[t.orderno],(function(e){return r("van-card",{key:t.orderno,staticClass:"card-item",attrs:{currency:"$",num:e.ddmxnum,price:e.ddmxdj,desc:e.ddmxsx,title:e.ddmxtitle,thumb:e.ddmximg},on:{click:function(r){return t.toURL(e)}},scopedSlots:t._u([{key:"tags",fn:function(){return[r("p",[t._v("State:"+t._s(t._f("state")(e.ddmxzt)))])]},proxy:!0}],null,!0)})})),1)])],1)},o=[],a=(r("99af"),r("b0c0"),r("ac1f"),r("1276"),r("2ca0"),r("96cf"),r("1da1")),c=r("2909"),s=r("ade3"),u=(r("e17f"),r("2241")),l=(r("66b9"),r("b650")),f=(r("8a58"),r("e41f")),d=(r("9cb7"),r("66fd")),h=r("e7f3"),p={name:"MyOrder",data:function(){return{orderState:"",index:0,list:[],ismore:!1,detail:{},show:!1,orderno:"",stateJson:[{val:"",text:"All"},{val:"0",text:"Pending"},{val:"1",text:"Processing"},{val:"2,9",text:"Shipping"},{val:"3,4,5",text:"Completed"},{val:"8",text:"Close"},{val:"10",text:"Sharing"}]}},components:(n={RefreshLoading:h["a"]},Object(s["a"])(n,d["a"].name,d["a"]),Object(s["a"])(n,f["a"].name,f["a"]),Object(s["a"])(n,l["a"].name,l["a"]),Object(s["a"])(n,u["a"].Component.name,u["a"].Component),n),methods:{toURL:function(t){var e=this.orderno;if(e.startsWith("PT")){var r=e.split("_");this.$router.push("/groupswaitbuy/".concat(r[0]))}else this.$router.push("/product?pid=".concat(t.ddpid))},load:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;0!=e&&(this.index=0);var r={ddzt:this.orderState,pageindex:this.index};this.$api.user.getMySCSaleList(r).then((function(r){r.rows.length>0?(0!=e&&(t.list=[],t.ismore=!1),t.index++,t.list=[].concat(Object(c["a"])(t.list),Object(c["a"])(r.rows))):t.ismore=!0})).catch((function(e){t.$toast("Data loading error")}))},hankDetail:function(t){var e=this;this.show=!0,this.orderno=t,this.detail[t]||this.$api.user.getMySCSaleDetailList({orderno:t,ddzt:""}).then((function(r){""!=r.rows&&e.$set(e.detail,t,r.rows)}))},hankCancel:function(t){u["a"].confirm({message:"Are you sure want to cancel the order?",beforeClose:function(e,r){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if("confirm"!==e){i.next=6;break}return i.next=3,n.$api.user.cancelSCOrder({orderno:t}).then((function(t){"1"==t.fsstate?(n.$toast("Order canceled"),n.load(1)):n.$toast(t.fsmes)})).catch((function(t){}));case 3:r(),i.next=7;break;case 6:r();case 7:case"end":return i.stop()}}),i)})))()}})},hankPay:function(t){var e=this;this.$api.user.doPaySCOrder({orderno:t}).then((function(t){""!=t?1==t.fsstate?2==t.fzffs?window.location.href=t.fsmes:t.fzffs:e.$toast(t.fsmes):e.$toast("operation exception .please try again.")})).catch((function(t){}))},hankConfirm:function(t){u["a"].confirm({message:"Are you sure that you have received all the products in this order?",beforeClose:function(e,r){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if("confirm"!==e){i.next=6;break}return i.next=3,n.$api.user.comitshTotalOrder({orderno:t}).then((function(t){"1"==t.fsstate?(n.$toast("Receipt success"),n.load("1")):n.$toast(t.fsmes)})).catch((function(t){}));case 3:r(),i.next=7;break;case 6:r();case 7:case"end":return i.stop()}}),i)})))()}})},search:function(t){this.list=[],this.orderState=t,this.load("1")}},filters:{state:function(t){var e;switch(t){case"0":e="Pending";break;case"1":e="Processing";break;case"2":e="Shipping";break;case"3":e="Completed";break;case"4":e="Completed";break;case"5":e="Completed";break;case"6":e="After Sales";break;case"7":e="Finish After Sale";break;case"8":e="Close";break;case"9":e="Shipping";break;case"10":e="Confirming";break;case"sharing":e="sharing";break}return e}}},v=p,g=(r("f70b"),r("2877")),m=Object(g["a"])(v,i,o,!1,null,"6a99cdba",null);e["default"]=m.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(z){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var i=e&&e.prototype instanceof g?e:g,o=Object.create(i.prototype),a=new E(n||[]);return o._invoke=L(t,r,a),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(z){return{type:"throw",arg:z}}}t.wrap=u;var f="suspendedStart",d="suspendedYield",h="executing",p="completed",v={};function g(){}function m(){}function y(){}var b={};b[o]=function(){return this};var w=Object.getPrototypeOf,x=w&&w(w(P([])));x&&x!==r&&n.call(x,o)&&(b=x);var k=y.prototype=g.prototype=Object.create(b);function _(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function r(i,o,a,c){var s=l(t[i],t,o);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(f).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,c)}))}c(s.arg)}var i;function o(t,n){function o(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(o,o):o()}this._invoke=o}function L(t,e,r){var n=f;return function(i,o){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw o;return $()}r.method=i,r.arg=o;while(1){var a=r.delegate;if(a){var c=O(a,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var s=l(t,e,r);if("normal"===s.type){if(n=r.done?p:d,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=p,r.method="throw",r.arg=s.arg)}}}function O(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,O(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=l(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,v;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function P(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function r(){while(++i<t.length)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:$}}function $(){return{value:e,done:!0}}return m.prototype=k.constructor=y,y.constructor=m,m.displayName=s(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,c,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},_(S.prototype),S.prototype[a]=function(){return this},t.AsyncIterator=S,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var a=new S(u(e,r,n,i),o);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},_(k),s(k,c,"Generator"),k[o]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=P,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return c.type="throw",c.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;j(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(i){Function("r","regeneratorRuntime = r")(n)}},"9b7e":function(t,e,r){},"9cb7":function(t,e,r){"use strict";r("68ef"),r("9d70"),r("3743"),r("09fe"),r("9b7e"),r("ea82")},a3e2:function(t,e,r){"use strict";var n=r("2638"),i=r.n(n),o=r("d282"),a=r("ba31"),c=r("ad06"),s=Object(o["a"])("tag"),u=s[0],l=s[1];function f(t,e,r,n){var o,s=e.type,u=e.mark,f=e.plain,d=e.color,h=e.round,p=e.size,v=f?"color":"backgroundColor",g=(o={},o[v]=d,o);e.textColor&&(g.color=e.textColor);var m={mark:u,plain:f,round:h};p&&(m[p]=p);var y=e.closeable&&t(c["a"],{attrs:{name:"cross"},class:l("close"),on:{click:function(t){t.stopPropagation(),Object(a["a"])(n,"close")}}});return t("transition",{attrs:{name:e.closeable?"van-fade":null}},[t("span",i()([{key:"content",style:g,class:l([m,s])},Object(a["b"])(n,!0)]),[null==r.default?void 0:r.default(),y])])}f.props={size:String,mark:Boolean,color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean,type:{type:String,default:"default"}},e["a"]=u(f)},ea82:function(t,e,r){},f70b:function(t,e,r){"use strict";r("6459")}}]);