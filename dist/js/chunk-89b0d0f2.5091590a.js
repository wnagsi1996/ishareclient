(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-89b0d0f2"],{"1b10":function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return s}));var i=44,s={title:String,loading:Boolean,readonly:Boolean,itemHeight:[Number,String],showToolbar:Boolean,cancelButtonText:String,confirmButtonText:String,allowHtml:{type:Boolean,default:!0},visibleItemCount:{type:[Number,String],default:6},swipeDuration:{type:[Number,String],default:1e3}}},"38d5":function(t,e,n){"use strict";n("68ef")},"5f5f":function(t,e,n){"use strict";n("68ef"),n("e3b3"),n("a526")},"6d5f":function(t,e,n){"use strict";n.r(e);var i,s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Header",{attrs:{title:"Modify Profile"}}),n("div",[n("van-form",{on:{submit:t.onSubmit}},[n("van-field",{attrs:{readonly:"",name:"name",label:"Family Name",placeholder:"Family Name",rules:[{required:!0,message:"Enter Family Name"}]},model:{value:t.userCenterInfo.name,callback:function(e){t.$set(t.userCenterInfo,"name",e)},expression:"userCenterInfo.name"}}),n("van-field",{attrs:{name:"ncname",label:"Nick Name",placeholder:"Nick Name",rules:[{required:!0,message:"Enter Nick Name"}]},model:{value:t.userCenterInfo.ncname,callback:function(e){t.$set(t.userCenterInfo,"ncname",e)},expression:"userCenterInfo.ncname"}}),n("van-field",{attrs:{name:"sex",readonly:"",label:"Sex",placeholder:"Sex",rules:[{required:!0,message:"Enter Sex"}]},on:{click:function(e){t.showPicker=!0}},model:{value:t.sex.text,callback:function(e){t.$set(t.sex,"text",e)},expression:"sex.text"}}),n("van-field",{attrs:{name:"schoolName",label:"School Name",placeholder:"School Name",rules:[{required:!0,message:"Enter School Name"}]},model:{value:t.userCenterInfo.college,callback:function(e){t.$set(t.userCenterInfo,"college",e)},expression:"userCenterInfo.college"}}),n("van-field",{attrs:{name:"loginName",label:"Alternate mailbox",placeholder:"Alternate mailbox",rules:[{required:!0,message:"Enter Alternate mailbox"}]},model:{value:t.userCenterInfo.loginname,callback:function(e){t.$set(t.userCenterInfo,"loginname",e)},expression:"userCenterInfo.loginname"}}),n("van-field",{attrs:{name:"gxqm",type:"textarea",autosize:"",rows:"1",label:"Signature",placeholder:"Signature",rules:[{required:!0,message:"Enter Signature"}]},model:{value:t.userCenterInfo.gxqm,callback:function(e){t.$set(t.userCenterInfo,"gxqm",e)},expression:"userCenterInfo.gxqm"}}),n("div",{staticStyle:{margin:"16px"}},[n("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit",dispatch:t.dispatch}},[t._v("Submit")])],1)],1)],1),n("van-popup",{attrs:{position:"bottom"},model:{value:t.showPicker,callback:function(e){t.showPicker=e},expression:"showPicker"}},[n("van-picker",{attrs:{"show-toolbar":"",columns:t.columns},on:{confirm:t.onConfirm,cancel:function(e){t.showPicker=!1}}})],1)],1)},o=[],a=(n("7db0"),n("b0c0"),n("b64b"),n("5530")),r=n("ade3"),u=(n("8a58"),n("e41f")),l=(n("5f5f"),n("f253")),c=(n("66b9"),n("b650")),h=(n("be7f"),n("565f")),f=(n("38d5"),n("772a")),d=n("2f62"),m={name:"MyProfileModify",components:(i={},Object(r["a"])(i,f["a"].name,f["a"]),Object(r["a"])(i,h["a"].name,h["a"]),Object(r["a"])(i,c["a"].name,c["a"]),Object(r["a"])(i,l["a"].name,l["a"]),Object(r["a"])(i,u["a"].name,u["a"]),i),data:function(){return{columns:[{text:"Male",value:"1"},{text:"Famale",value:"0"},{text:"Secrecy",value:"2"}],sex:{},showPicker:!1,dispatch:!1}},computed:Object(a["a"])({},Object(d["c"])(["userCenterInfo"])),created:function(){this.userInfo()},methods:{userInfo:function(){var t=this,e=this.userCenterInfo;0==Object.keys(e).length?this.$store.dispatch("user/getUserCenterInfo").then((function(e){t.sex=t.columns.find((function(t){return e.sex==t.value}))})):this.sex=this.columns.find((function(t){return e.sex==t.value}))},onConfirm:function(t){this.sex.value=t.value,this.sex.text=t.text,this.showPicker=!1},onSubmit:function(t){var e=this;this.dispatch=!0;var n={name:t.name,nickname:t.ncname,sex:this.sex.value,bylxfs:t.loginName,gxqm:t.gxqm,college:t.schoolName};this.$api.user.savePersonInfo(n).then((function(t){"1"==t?(e.$toast("Modify Success!"),e.$store.dispatch("user/getUserCenterInfo")):"0"==t?e.$toast("Modify Failed!"):e.$toast(t),e.dispatch=!1})).catch((function(t){e.dispatch=!1}))}},filters:{sexFilter:function(t){switch(t){case 1:return"Male";case 0:return"Famale";case 2:return"Secrecy"}}}},g=m,v=n("2877"),p=Object(v["a"])(g,s,o,!1,null,null,null);e["default"]=p.exports},"772a":function(t,e,n){"use strict";var i=n("d282"),s=n("db85"),o=Object(i["a"])("form"),a=o[0],r=o[1];e["a"]=a({props:{colon:Boolean,labelWidth:[Number,String],labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,errorMessageAlign:String,submitOnEnter:{type:Boolean,default:!0},validateTrigger:{type:String,default:"onBlur"},showError:{type:Boolean,default:!0},showErrorMessage:{type:Boolean,default:!0}},provide:function(){return{vanForm:this}},data:function(){return{fields:[]}},methods:{validateSeq:function(){var t=this;return new Promise((function(e,n){var i=[];t.fields.reduce((function(t,e){return t.then((function(){if(!i.length)return e.validate().then((function(t){t&&i.push(t)}))}))}),Promise.resolve()).then((function(){i.length?n(i):e()}))}))},validateAll:function(){var t=this;return new Promise((function(e,n){Promise.all(t.fields.map((function(t){return t.validate()}))).then((function(t){t=t.filter((function(t){return t})),t.length?n(t):e()}))}))},validate:function(t){return t?this.validateField(t):this.validateFirst?this.validateSeq():this.validateAll()},validateField:function(t){var e=this.fields.filter((function(e){return e.name===t}));return e.length?new Promise((function(t,n){e[0].validate().then((function(e){e?n(e):t()}))})):Promise.reject()},resetValidation:function(t){this.fields.forEach((function(e){t&&e.name!==t||e.resetValidation()}))},scrollToField:function(t,e){this.fields.some((function(n){return n.name===t&&(n.$el.scrollIntoView(e),!0)}))},addField:function(t){this.fields.push(t),Object(s["a"])(this.fields,this)},removeField:function(t){this.fields=this.fields.filter((function(e){return e!==t}))},getValues:function(){return this.fields.reduce((function(t,e){return t[e.name]=e.formValue,t}),{})},onSubmit:function(t){t.preventDefault(),this.submit()},submit:function(){var t=this,e=this.getValues();this.validate().then((function(){t.$emit("submit",e)})).catch((function(n){t.$emit("failed",{values:e,errors:n}),t.scrollToError&&t.scrollToField(n[0].name)}))}},render:function(){var t=arguments[0];return t("form",{class:r(),on:{submit:this.onSubmit}},[this.slots()])}})},"7db0":function(t,e,n){"use strict";var i=n("23e7"),s=n("b727").find,o=n("44d2"),a=n("ae40"),r="find",u=!0,l=a(r);r in[]&&Array(1)[r]((function(){u=!1})),i({target:"Array",proto:!0,forced:u||!l},{find:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),o(r)},a526:function(t,e,n){},db85:function(t,e,n){"use strict";function i(t){var e=[];function n(t){t.forEach((function(t){e.push(t),t.componentInstance&&n(t.componentInstance.$children.map((function(t){return t.$vnode}))),t.children&&n(t.children)}))}return n(t),e}function s(t,e){var n=e.$vnode.componentOptions;if(n&&n.children){var s=i(n.children);t.sort((function(t,e){return s.indexOf(t.$vnode)-s.indexOf(e.$vnode)}))}}n.d(e,"a",(function(){return s}))},f253:function(t,e,n){"use strict";var i=n("c31d"),s=n("d282"),o=n("1325"),a=n("b1d2"),r=n("1b10"),u=n("ea8e"),l=n("543e"),c=n("2638"),h=n.n(c),f=n("1128");function d(t){return Array.isArray(t)?t.map((function(t){return d(t)})):"object"===typeof t?Object(f["a"])({},t):t}var m=n("a142"),g=n("482d"),v=n("3875"),p=200,b=300,x=15,I=Object(s["a"])("picker-column"),y=I[0],C=I[1];function O(t){var e=window.getComputedStyle(t),n=e.transform||e.webkitTransform,i=n.slice(7,n.length-1).split(", ")[5];return Number(i)}function S(t){return Object(m["e"])(t)&&t.disabled}var w=y({mixins:[v["a"]],props:{valueKey:String,readonly:Boolean,allowHtml:Boolean,className:String,itemHeight:Number,defaultIndex:Number,swipeDuration:[Number,String],visibleItemCount:[Number,String],initialOptions:{type:Array,default:function(){return[]}}},data:function(){return{offset:0,duration:0,options:d(this.initialOptions),currentIndex:this.defaultIndex}},created:function(){this.$parent.children&&this.$parent.children.push(this),this.setIndex(this.currentIndex)},mounted:function(){this.bindTouchEvent(this.$el)},destroyed:function(){var t=this.$parent.children;t&&t.splice(t.indexOf(this),1)},watch:{initialOptions:"setOptions",defaultIndex:function(t){this.setIndex(t)}},computed:{count:function(){return this.options.length},baseOffset:function(){return this.itemHeight*(this.visibleItemCount-1)/2}},methods:{setOptions:function(t){JSON.stringify(t)!==JSON.stringify(this.options)&&(this.options=d(t),this.setIndex(this.defaultIndex))},onTouchStart:function(t){if(!this.readonly){if(this.touchStart(t),this.moving){var e=O(this.$refs.wrapper);this.offset=Math.min(0,e-this.baseOffset),this.startOffset=this.offset}else this.startOffset=this.offset;this.duration=0,this.transitionEndTrigger=null,this.touchStartTime=Date.now(),this.momentumOffset=this.startOffset}},onTouchMove:function(t){if(!this.readonly){this.touchMove(t),"vertical"===this.direction&&(this.moving=!0,Object(o["c"])(t,!0)),this.offset=Object(g["b"])(this.startOffset+this.deltaY,-this.count*this.itemHeight,this.itemHeight);var e=Date.now();e-this.touchStartTime>b&&(this.touchStartTime=e,this.momentumOffset=this.offset)}},onTouchEnd:function(){var t=this;if(!this.readonly){var e=this.offset-this.momentumOffset,n=Date.now()-this.touchStartTime,i=n<b&&Math.abs(e)>x;if(i)this.momentum(e,n);else{var s=this.getIndexByOffset(this.offset);this.duration=p,this.setIndex(s,!0),setTimeout((function(){t.moving=!1}),0)}}},onTransitionEnd:function(){this.stopMomentum()},onClickItem:function(t){this.moving||this.readonly||(this.transitionEndTrigger=null,this.duration=p,this.setIndex(t,!0))},adjustIndex:function(t){t=Object(g["b"])(t,0,this.count);for(var e=t;e<this.count;e++)if(!S(this.options[e]))return e;for(var n=t-1;n>=0;n--)if(!S(this.options[n]))return n},getOptionText:function(t){return Object(m["e"])(t)&&this.valueKey in t?t[this.valueKey]:t},setIndex:function(t,e){var n=this;t=this.adjustIndex(t)||0;var i=-t*this.itemHeight,s=function(){t!==n.currentIndex&&(n.currentIndex=t,e&&n.$emit("change",t))};this.moving&&i!==this.offset?this.transitionEndTrigger=s:s(),this.offset=i},setValue:function(t){for(var e=this.options,n=0;n<e.length;n++)if(this.getOptionText(e[n])===t)return this.setIndex(n)},getValue:function(){return this.options[this.currentIndex]},getIndexByOffset:function(t){return Object(g["b"])(Math.round(-t/this.itemHeight),0,this.count-1)},momentum:function(t,e){var n=Math.abs(t/e);t=this.offset+n/.003*(t<0?-1:1);var i=this.getIndexByOffset(t);this.duration=+this.swipeDuration,this.setIndex(i,!0)},stopMomentum:function(){this.moving=!1,this.duration=0,this.transitionEndTrigger&&(this.transitionEndTrigger(),this.transitionEndTrigger=null)},genOptions:function(){var t=this,e=this.$createElement,n={height:this.itemHeight+"px"};return this.options.map((function(i,s){var o,a=t.getOptionText(i),r=S(i),u={style:n,attrs:{role:"button",tabindex:r?-1:0},class:[C("item",{disabled:r,selected:s===t.currentIndex})],on:{click:function(){t.onClickItem(s)}}},l={class:"van-ellipsis",domProps:(o={},o[t.allowHtml?"innerHTML":"textContent"]=a,o)};return e("li",h()([{},u]),[t.slots("option",i)||e("div",h()([{},l]))])}))}},render:function(){var t=arguments[0],e={transform:"translate3d(0, "+(this.offset+this.baseOffset)+"px, 0)",transitionDuration:this.duration+"ms",transitionProperty:this.duration?"all":"none"};return t("div",{class:[C(),this.className]},[t("ul",{ref:"wrapper",style:e,class:C("wrapper"),on:{transitionend:this.onTransitionEnd}},[this.genOptions()])])}}),T=Object(s["a"])("picker"),$=T[0],k=T[1],E=T[2];e["a"]=$({props:Object(i["a"])({},r["b"],{defaultIndex:{type:[Number,String],default:0},columns:{type:Array,default:function(){return[]}},toolbarPosition:{type:String,default:"top"},valueKey:{type:String,default:"text"}}),data:function(){return{children:[],formattedColumns:[]}},computed:{itemPxHeight:function(){return this.itemHeight?Object(u["b"])(this.itemHeight):r["a"]},dataType:function(){var t=this.columns,e=t[0]||{};return e.children?"cascade":e.values?"object":"text"}},watch:{columns:{handler:"format",immediate:!0}},methods:{format:function(){var t=this.columns,e=this.dataType;"text"===e?this.formattedColumns=[{values:t}]:"cascade"===e?this.formatCascade():this.formattedColumns=t},formatCascade:function(){var t=[],e={children:this.columns};while(e&&e.children){var n,i=e,s=i.children,o=null!=(n=e.defaultIndex)?n:+this.defaultIndex;while(s[o]&&s[o].disabled){if(!(o<s.length-1)){o=0;break}o++}t.push({values:e.children,className:e.className,defaultIndex:o}),e=s[o]}this.formattedColumns=t},emit:function(t){var e=this;if("text"===this.dataType)this.$emit(t,this.getColumnValue(0),this.getColumnIndex(0));else{var n=this.getValues();"cascade"===this.dataType&&(n=n.map((function(t){return t[e.valueKey]}))),this.$emit(t,n,this.getIndexes())}},onCascadeChange:function(t){for(var e={children:this.columns},n=this.getIndexes(),i=0;i<=t;i++)e=e.children[n[i]];while(e&&e.children)t++,this.setColumnValues(t,e.children),e=e.children[e.defaultIndex||0]},onChange:function(t){var e=this;if("cascade"===this.dataType&&this.onCascadeChange(t),"text"===this.dataType)this.$emit("change",this,this.getColumnValue(0),this.getColumnIndex(0));else{var n=this.getValues();"cascade"===this.dataType&&(n=n.map((function(t){return t[e.valueKey]}))),this.$emit("change",this,n,t)}},getColumn:function(t){return this.children[t]},getColumnValue:function(t){var e=this.getColumn(t);return e&&e.getValue()},setColumnValue:function(t,e){var n=this.getColumn(t);n&&(n.setValue(e),"cascade"===this.dataType&&this.onCascadeChange(t))},getColumnIndex:function(t){return(this.getColumn(t)||{}).currentIndex},setColumnIndex:function(t,e){var n=this.getColumn(t);n&&(n.setIndex(e),"cascade"===this.dataType&&this.onCascadeChange(t))},getColumnValues:function(t){return(this.children[t]||{}).options},setColumnValues:function(t,e){var n=this.children[t];n&&n.setOptions(e)},getValues:function(){return this.children.map((function(t){return t.getValue()}))},setValues:function(t){var e=this;t.forEach((function(t,n){e.setColumnValue(n,t)}))},getIndexes:function(){return this.children.map((function(t){return t.currentIndex}))},setIndexes:function(t){var e=this;t.forEach((function(t,n){e.setColumnIndex(n,t)}))},confirm:function(){this.children.forEach((function(t){return t.stopMomentum()})),this.emit("confirm")},cancel:function(){this.emit("cancel")},genTitle:function(){var t=this.$createElement,e=this.slots("title");return e||(this.title?t("div",{class:["van-ellipsis",k("title")]},[this.title]):void 0)},genCancel:function(){var t=this.$createElement;return t("button",{attrs:{type:"button"},class:k("cancel"),on:{click:this.cancel}},[this.slots("cancel")||this.cancelButtonText||E("cancel")])},genConfirm:function(){var t=this.$createElement;return t("button",{attrs:{type:"button"},class:k("confirm"),on:{click:this.confirm}},[this.slots("confirm")||this.confirmButtonText||E("confirm")])},genToolbar:function(){var t=this.$createElement;if(this.showToolbar)return t("div",{class:k("toolbar")},[this.slots()||[this.genCancel(),this.genTitle(),this.genConfirm()]])},genColumns:function(){var t=this.$createElement,e=this.itemPxHeight,n=e*this.visibleItemCount,i={height:e+"px"},s={height:n+"px"},r={backgroundSize:"100% "+(n-e)/2+"px"};return t("div",{class:k("columns"),style:s,on:{touchmove:o["c"]}},[this.genColumnItems(),t("div",{class:k("mask"),style:r}),t("div",{class:[a["f"],k("frame")],style:i})])},genColumnItems:function(){var t=this,e=this.$createElement;return this.formattedColumns.map((function(n,i){var s;return e(w,{attrs:{readonly:t.readonly,valueKey:t.valueKey,allowHtml:t.allowHtml,className:n.className,itemHeight:t.itemPxHeight,defaultIndex:null!=(s=n.defaultIndex)?s:+t.defaultIndex,swipeDuration:t.swipeDuration,visibleItemCount:t.visibleItemCount,initialOptions:n.values},scopedSlots:{option:t.$scopedSlots.option},on:{change:function(){t.onChange(i)}}})}))}},render:function(t){return t("div",{class:k()},["top"===this.toolbarPosition?this.genToolbar():t(),this.loading?t(l["a"],{class:k("loading")}):t(),this.slots("columns-top"),this.genColumns(),this.slots("columns-bottom"),"bottom"===this.toolbarPosition?this.genToolbar():t()])}})}}]);