/*! hello-grunt 2015-10-19 */
"use strict";define("bus/testKiss/main",["common/base","./config"],function(a,b,c){var d=a("common/base"),e=a("./config"),f=new d(e);console.log(f.get("kiss"))}),define("common/base",["common/class","common/attrs","common/aspect","common/limit"],function(a,b){function c(a){var b=(a.getAttrs("attrs"),a.getAttrs("attrsName"));a.limit.breakEach(b,function(b){if(h.test(b)){var c=a.get(b);"function"==typeof c&&a.on(RegExp.$1.toLowerCase()+RegExp.$2,c)}})}var d=a("common/class"),e=a("common/attrs"),f=a("common/aspect"),g=a("common/limit"),h=/^on([A-Z])(.*)/,i=d.create({Implements:[e,f,{limit:g}],Statics:{limit:g},className:"Base",init:function(a){var b=this,d=b.getAttrs("attrs");return d.me=b,d.get=function(a){return b.get(a)},d.set=function(a,c){return b.get(a,c)},b.initAttrs(a),c(b),b.initBase(),b},initBase:g.K,destroy:function(){var a=this;a.clearEvents(),a.clearAttrs();for(var b in a)a.hasOwnProperty(b)&&delete a[b];return a}});return i}),define("common/class",[],function(a,b){function c(a){return"extend"!==a&&"superClass"!==a}function d(a,b,c,d){d="function"==typeof d?d:k;for(var e in b)(b.hasOwnProperty(e)||c)&&d(e)&&(a[e]=b[e]);return a}function e(){}function f(a){var b=Object.create;return b?b(a):a.__proto__?{__proto__:a}:(e.prototype=a,new e)}function g(a,b){return a.prototype=f(b.prototype),a.prototype.constructor=a,a.superClass=b.prototype,a}function h(a,b){return"Implements,Statics".replace(l,function(c){b&&(!b[c]&&(b[c]=j),b.hasOwnProperty(c)&&i[c](a,b[c]),delete b[c])}),d(a.prototype,b),a}var i={},j=[],k=function(a){return a},l=/\w+/g;return i.create=function(a){function b(){var a=this.init;return a&&a.apply(this,arguments)}return h(b,a),b.prototype.constructor=b,b.extend=function(a){return i.extend(b,a)},b},i.extend=function(a,b){if("function"!=typeof a)throw"Class extend error!! parent class need a function";return h(g(i.create(),a),b)},i.instanceOf=function(a,b){return a instanceof b&&a.constructor===b},i.Statics=function(a,b){b=[].concat(b);var e;for(a.superClass&&d(a,a.superClass.constructor,!1,c);e=b.shift();)d(a,e,!1,c)},i.Implements=function(a,b){var c,e=a.prototype;for(b=[].concat(b);c=b.shift();)d(e,c.prototype||c,!0)},i}),define("common/attrs",["common/class"],function(a,b){function c(a){return a}function d(a){return a===Object(a)&&!a.nodeType&&!a.jquery}function e(a,b,c){if(a.indexOf)return a.indexOf(b,c);var d=a.length;for(c=~~c;d>c;c++)if(a[c]===b)return c;return-1}function f(a,b,c){if(!a.forEach)return a.forEach(b,c);for(var d=0,e=a.length;e>d;d++)b.call(c,a[d],d,a)}function g(a,b){for(var c in a)a.hasOwnProperty(c)&&b(a[c],c)}function h(a,b,c){return c?g(b,function(b,c){void 0===a[c]&&(a[c]=b)}):g(b,function(b,c){a[c]=b}),a}function i(a){return!a||!a.hasOwnProperty("set")&&!a.hasOwnProperty("get")}function j(a){return void 0===a?!0:!!a}function k(a,b){return b=b||{},i(b)?{value:b.value||a,writable:j(b.writable),enumerable:!0,configurable:!0,__isAttr__:!0}:{get:b.get||c,set:b.set||c,enumerable:!0,configurable:!0,__isAttr__:!0}}function l(a,b,c,d,e){if(i(a)){if(!j(d&&d.writable))throw"TypeError: Cannot redefine property: "+c;a.value=b}else d&&a.set.call(e,b)}function m(a,b){var c;return i(a)?a&&a.value:(c=a.get.call(b),c&&c.__isAttr__?m(c,b):c)}var n=a("common/class"),o=Object.defineProperty,p=(Object.getOwnPropertyDescriptor,!!Object.create),q=/\w+/g,r=Array.prototype.unshift,s=n.create({initBseAttr:function(){var a=this;a.__attrs__=a.__attrs__||{},a.__attrsName__=a.__attrsName__||[]},initAttrs:function(a){var b=this;g(h(b.recursiveAttrs("attrs").origin,a),function(a,c){b.set(c,a)})},resetAttrs:function(a){var b=this;g(a,function(a,c){b.set(c,a)})},set:function(a,b,c){var e,f=this,g=f.getAttrs("attrs"),h=f.getAttrs("attrsName"),j=g[a],m=g.hasOwnProperty(a);return!m&&h.push(a),!d(b)||!b.hasOwnProperty("value")&&i(b)||(c=b,b=c.value),e=k(b,c),p?m&&!c?g[a]=b:o(g,a,e):l(m&&!c?j:g[a]=e,e.value,a,j,g),f},get:function(a){var b=this,c=b.getAttrs("attrs");return p?c[a]:m(c[a],c)},getAttrs:function(a){var b=this,c=b["__"+a+"__"];return c?c:(b.initBseAttr(),b["__"+a+"__"])},eachAttrs:function(a){var b=this,c=(b.getAttrs("attrs"),b.getAttrs("attrsName"));return a=a||b.K,f(c,function(c,d){a(b.get(c),c)}),b},removeAttrs:function(a){var b=this,c=b.getAttrs("attrs"),d=b.getAttrs("attrsName");return a.replace(q,function(a){var b;-1!==(b=e(d,a))&&(d.splice(b,1),delete c[a])}),b},clearAttrs:function(){var a=this;return a.__attrs__={},a.__attrsName__=[],a},recursiveAttrs:function(a){for(var b,c,d=this,e=d.constructor.prototype,f={},i=[],j=[];(b=e.constructor.superClass)&&e;)e.hasOwnProperty(a)&&(c=e[a])&&(j.length=0,g(c,function(a,b){void 0===f[b]&&j.push(b)}),r.apply(i,j),h(f,c,!0)),e=b;return{origin:f,arr:i}}});return s}),define("common/class",[],function(a,b){function c(a){return"extend"!==a&&"superClass"!==a}function d(a,b,c,d){d="function"==typeof d?d:k;for(var e in b)(b.hasOwnProperty(e)||c)&&d(e)&&(a[e]=b[e]);return a}function e(){}function f(a){var b=Object.create;return b?b(a):a.__proto__?{__proto__:a}:(e.prototype=a,new e)}function g(a,b){return a.prototype=f(b.prototype),a.prototype.constructor=a,a.superClass=b.prototype,a}function h(a,b){return"Implements,Statics".replace(l,function(c){b&&(!b[c]&&(b[c]=j),b.hasOwnProperty(c)&&i[c](a,b[c]),delete b[c])}),d(a.prototype,b),a}var i={},j=[],k=function(a){return a},l=/\w+/g;return i.create=function(a){function b(){var a=this.init;return a&&a.apply(this,arguments)}return h(b,a),b.prototype.constructor=b,b.extend=function(a){return i.extend(b,a)},b},i.extend=function(a,b){if("function"!=typeof a)throw"Class extend error!! parent class need a function";return h(g(i.create(),a),b)},i.instanceOf=function(a,b){return a instanceof b&&a.constructor===b},i.Statics=function(a,b){b=[].concat(b);var e;for(a.superClass&&d(a,a.superClass.constructor,!1,c);e=b.shift();)d(a,e,!1,c)},i.Implements=function(a,b){var c,e=a.prototype;for(b=[].concat(b);c=b.shift();)d(e,c.prototype||c,!0)},i}),define("common/aspect",["common/events"],function(a,b){function c(a,b,c){if(a.indexOf)return a.indexOf(b,c);var d=a.length;for(c=~~c;d>c;c++)if(a[c]===b)return c;return-1}function d(a,b,d,e){var h,i;a.on(b+"Method."+d,e),h=a[d],h&&!h.__isAspect__&&-1===c(g,d)&&(i=a[d]=function(){var b,c=f.call(arguments);return c.unshift("beforeMethod."+d),a.trigger.apply(a,c)===!1?a:(c.shift(),b=h.apply(a,c),c.unshift(b),c.unshift("afterMethod."+d),a.trigger.apply(a,c),b)},i.__isAspect__=!0)}var e=a("common/events"),f=Array.prototype.slice,g=["trigger"],h=e.extend({before:function(a,b){var c=this;return d(c,"before",a,b),c},after:function(a,b){var c=this;return d(c,"after",a,b),c}});return h}),define("common/events",["common/class"],function(a,b){function c(a){return i.test(a)?{eventType:RegExp.$1,nameSpace:RegExp.$2}:void 0}function d(a,b){var c=e(a,b);-1!==c&&a.splice(c,1)}function e(a,b,c){if(a.indexOf){var d=a.length;for(c=~~c;d>c;c++)if(a[c]===b)return c;return-1}return a.indexOf(b,c)}function f(a,b){if(a.forEach)return a.forEach(b);for(var c=0,d=a.length;d>c;c++)b(a[c],c,a)}function g(a,b,c){var d=!0;return f(a.slice(0),function(a){a.apply(b,c)===!1&&(d=!1)}),d}var h=a("common/class"),i=/(\w+)\.?(.*)/,j=Array.prototype.slice,k=h.create({add:function(a,b){var d,e,f=this,g=f.__events__,h=c(a);return h&&(g||(g=f.__events__={}),(d=g[h.eventType])||(d=g[h.eventType]=[]),d.push(b),h.nameSpace&&((e=d[h.nameSpace])||(e=d[h.nameSpace]=[]),e.push(b))),f},remove:function(a){var b,e,g=this,h=g.__events__,i=c(a);i&&h&&(b=h[i.eventType])&&(i.nameSpace?((e=b[i.nameSpace])&&f(e,function(a){d(b,a)}),delete b[i.nameSpace]):delete h[i.eventType])},on:function(a,b){var c=this;return f(a.split(","),function(a){c.add(a,b)}),c},off:function(a){var b=this;return f(a.split(","),function(a){b.remove(a)}),b},once:function(a,b){var c=this;return f(a.split(","),function(a){c.on(a,function(){c.off(a),b.call(this)})}),c},trigger:function(a,b){var d,e,f=this,h=f.__events__,i=j.call(arguments),k=c(i.shift());return k&&h&&(d=h[k.eventType])?k.nameSpace?(e=d[k.nameSpace])&&g(e,f,i):g(d,f,i):!0},clearEvents:function(){var a=this;return delete a.__events__,a}});return k}),define("common/limit",[],function(a,b){function c(a,b,c){var d=w[c];return d(a)===d(b)}function d(a,b){return ya(a)===ya(b)&&Ka(o(a),function(c,d){return ja(a[c],b[c])})}function e(a,b){for(null==a&&(a=""),a+="",b=~~b;a.length<b;)a+=a;return a.slice(0,b)}function f(a){return a=~~a,0>a?0:a}function g(){var a=!0;return Aa(y.apply(s,arguments),function(b){return fa(b)?void 0:(T("warn",b,"the num is not a finite number"),a=!1)}),a}function h(){return g.apply(void 0,arguments)?Math.max.apply(Math,Ia(arguments,function(a){return((""+a).split(".")[1]||"").length})):void 0}function i(a,b){return b=f(b),(a+e("0",b)).slice(0,b)}function j(a,b){return b=f(b),(e("0",b)+a).slice(-b)}function k(a,b,c,d){return d<c.length?a+b+c.slice(0,d)+"."+c.slice(d):a+b+i(c,d)}function l(a,b,c,d){return b.length>d?a+b.slice(0,-d)+"."+b.slice(-d)+c:a+"0."+j(b,d)+c}function m(a,b){if(g(a)){if(a+="",b=~~b,0===b)return a;var c,d,e="";return a=a.split("."),c=a[0],d=a[1]||"","-"===c.charAt(0)&&(e="-",c=c.slice(1)),0>b?l(e,c,d,-b):k(e,c,d,b)}}function n(a,b){var c=a[0]+"",d=a[1]+"",e=(c.split(".")[1]||"").length,f=(d.split(".")[1]||"").length,g=b?+m(+c.replace(".","")*+d.replace(".",""),-(e+f)):+m(+c.replace(".","")/+d.replace(".",""),f-e);return a.splice(0,2,g),g}function o(a){return xa(da(a)?Ea(a):a)}function p(a,b,c,d,e){for(var f,g=o(a),h=~~e,i=g.length;i>h&&(f=g[h],b.call(c,a[f],f,a)!==!1||!d);h++);return a}function q(a,b){return La(a,function(a){return Ka(a,function(a,c){return a===b[c]})})}var r={},s=Array.prototype,t=Object.prototype,u=Function.prototype,v=String.prototype,w=window,x=(w.document,s.slice),y=(s.splice,s.concat),z=s.unshift,A=s.push,B=t.toString,C=t.hasOwnProperty,D=Object.keys,E=Object.create,F=s.forEach,G=s.indexOf,H=s.lastIndexOf,I=s.map,J=s.filter,K=s.every,L=s.some,M=s.reduce,N=s.reduceRight,O=u.bind,P=v.trim,Q=r.K=function(a){return a},R=r.cb=function(a){return W(a)?a:Q},S=r.O={},T=r.log=function(){if(!r.logClosed){var a,b=x.call(arguments),c=b.shift(),d=console||S;Oa(["error","log","warn"],c)||(b.unshift(c),c="error"),a=d[c]||Q;try{b.unshift("limitJS "+c+":"),a.apply(d,b)}catch(e){a("limitJS ",b)}}},U=r.isUndefined=function(a){return void 0===a},V=(r.isDefined=function(a){return!U(a)},r.isNull=function(a){return null===a}),W=r.isFunction=function(a){return"function"==typeof a};r.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"===B.call(a)};"String,Number,Array,Date,RegExp,Error,Math".replace(/\w+/g,function(a){r["is"+a]=function(b){return B.call(b)==="[object "+a+"]"}});var X=r.isNumber,Y=r.isArray,Z=r.isDate,$=r.isMath,_=r.isError,aa=r.isRegExp,ba=r.isString,ca=r.isObject=function(a){return W(a)||"object"==typeof a&&!!a},da=(r.isArguments=function(a){return ta(a,"callee")},r.isArrayLike=function(a){return!!a&&X(a.length)&&!W(a)&&!ha(a)}),ea=r.isNaN=function(a){return X(a)&&isNaN(a)},fa=r.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},ga=r.isEmpty=function(a){return null==a?!0:0===ya(a)};r.isElement=function(a){return!!a&&1===a.nodeType},r.isDocument=function(a){return!!a&&9===a.nodeType};var ha=r.isWin=function(a){return!!a&&a.window===a&&a.self===a},ia=["String","Number","Boolean"],ja=r.isEqual=function(a,b){if(T("log","limit.isEqual is called ",typeof a,":",a,typeof b,":",b),a===b)return!0;if(B.call(a)!==B.call(b))return!1;if(ea(a))return!0;var e;return(e=la(a,ia))?c(a,b,e):Z(a)?+a===+b:aa(a)?""+a==""+b:W(a)&&""+a!=""+b?!1:d(a,b)},ka=["String","Number","Boolean","Null","Undefined","RegExp","Date","Math","Error"],la=r.isBase=function(a,b){!Y(b)&&(b=ka);var c="";return La(b,function(b,d){var e=r["is"+b];return e&&e(a)&&(c=b)}),c},ma=/^\s+|\s+$/g,na=(r.trim=function(a){return a=arguments.length?a+"":"",P?P.call(a):a.replace(ma,"")},r.random=function(a,b){a=~~a,b=~~b;var c=Math.max(a,b),d=Math.min(a,b);return Math.floor((c-d+1)*Math.random()+d)},/(\d{1,3})(?=(\d{3})+$)/g),oa=/(\d{1,3})(?=(\d{3})+\.)/g,pa=/,/g;r.thousandSeparator=function(a,b){return fa(a)?(X(b)||(b=2),qa(a,b).replace(b?oa:na,"$1,")):(T("warn","limit.thousandSeparator is called ",typeof a,":",a),"")},r.unThousandSeparator=function(a){return ba(a)?+a.replace(pa,""):(T("warn","limit.unThousandSeparator is called ",typeof a,":",a),NaN)};var qa=r.toFixed=function(a,b){b=f(b);var a=m(a,b);return U(a)?a:m(Math.round(a),-b)};r.plus=function(){var a=h.apply(void 0,arguments);if(!U(a))return Na.call(void 0,arguments,function(b,c){return+m(+m(b,a)+ +m(c,a),-a)})},r.minus=function(){var a=h.apply(void 0,arguments);if(!U(a))return Na.call(void 0,arguments,function(b,c){return+m(+m(b,a)-+m(c,a),-a)})};var ra=r.multiply=function(){if(g.apply(void 0,arguments)){var a=Ea(arguments),b=n(a,!0);return a.length<=1?b:ra.apply(void 0,a)}},sa=r.except=function(){if(g.apply(void 0,arguments)){var a=Ea(arguments),b=n(a,!1);return ea(b)?a[0]/a[1]:a.length<=1?b:sa.apply(void 0,a)}},ta=r.has=function(a,b){return null!=a&&C.call(a,b)},ua=function(){},va=r.create=function(a){return null==a?{}:E?E(a):a.__proto__?{__proto__:a}:(ua.prototype=a,new ua)},wa=r.forIn=function(a,b,c){if(null==a)return a;for(var d in a)b.call(c,a[d],d,a);return a},xa=r.keys=function(a){if(null==a)return[];if(D)return D.call(Object,a);var b=[];return wa(a,function(c,d){ta(a,d)&&b.push(d)}),b},ya=r.size=function(a){return o(a).length},za=r.each=function(a,b,c){return b=R(b),da(a)&&F?F.call(a,function(a,c){b.call(this,a,""+c)},c):p(a,b,c)},Aa=r.breakEach=function(a,b,c){return p(a,b,c,!0)},Ba=r.extend=function(a,b){function c(b,c){a[c]=b}return ca(a)?(b!==!0?za(x.call(arguments,1),function(a){wa(a,c)}):za(x.call(arguments,2),function(a){za(a,c)}),a):a},Ca=(r.defaults=function(a,b){function c(b,c){U(a[c])&&(a[c]=b)}return ca(a)?(b!==!0?za(x.call(arguments,1),function(a){wa(a,c)}):za(x.call(arguments,2),function(a){za(a,c)}),a):a},r.clone=function(a){return la(a)?Da(a):W(a)?Ba(function(){return a.apply(this,arguments)},a):Y(a)?x.call(a):Ba({},a)},["String","Number","Boolean","Null","Undefined"]),Da=r.copy=function(a){var b;if(b=la(a,Ca))return ca(a)?new w[b](a.valueOf()):a;if($(a))return a;if(aa(a))return new RegExp(a.source,(a.global?"g":"")+(a.multiline?"m":"")+(a.ignoreCase?"i":""));if(Z(a))return new Date(a.getTime());if(_(a))return new Error(a.message);var c={};return Y(a)&&(c=[]),W(a)&&(c=function(){return a.apply(this,arguments)}),wa(a,function(a,b){c[b]=Da(a)}),c},Ea=r.toArray=function(a){return da(a)?x.call(a):(T("warn",a,"change into [], limit.toArray is called"),[])},Fa=r.getArray=function(a){switch(a=Ea(a),a.length){case 0:return null;case 1:return a[0];default:return a}},Ga=r.indexOf=function(a,b,c){if(a=Ea(a),G)return G.apply(a,x.call(arguments,1));var d=-1;return p(a,function(a,c){return a===b?(d=c,!1):void 0},void 0,!0,~~c),+d},Ha=(r.lastIndexOf=function(a,b,c){if(a=Ea(a),H)return H.apply(a,x.call(arguments,1));c=~~c;var d=a.length-1,e=Ga(a.reverse(),b,3===arguments.length?d-c:c);return-1===e?-1:d-e},r.forEach=function(a,b,c){return a=Ea(a),b=R(b),za(a,function(c,d){b.call(this,c,+d,a)},c)}),Ia=r.map=function(a,b,c){if(ga(a))return a;if(da(a)&&(a=Ea(a)),b=R(b),I===a.map)return I.call(a,b,c);var d=Y(a),e=d?[]:{};return za(a,function(c,d){e[d]=b.call(this,c,d,a)},c),e},Ja=r.filter=function(a,b,c){if(ga(a))return a;if(da(a)&&(a=Ea(a)),b=R(b),J===a.filter)return J.call(a,b,c);var d=Y(a),e=d?[]:{};return d?za(a,function(c,d){b.call(this,c,d,a)&&e.push(c)},c):za(a,function(c,d){b.call(this,c,d,a)&&(e[d]=c)}),e},Ka=r.every=function(a,b,c){if(ga(a))return!1;if(da(a)&&(a=Ea(a)),b=R(b),K===a.every)return K.call(a,b,c);var d=!0,e=Y(a);return Aa(a,function(c,f){return b.call(this,c,e?+f:f,a)?void 0:d=!1},c),d},La=r.some=function(a,b,c){if(ga(a))return!1;if(da(a)&&(a=Ea(a)),b=R(b),L===a.some)return L.call(a,b,c);var d=!1,e=Y(a);return Aa(a,function(c,f){return b.call(this,c,e?+f:f,a)?(d=!0,!1):void 0},c),d},Ma=new TypeError("Reduce of empty array with no initial value"),Na=r.reduce=function(a,b,c){a=Ea(a);var d=x.call(arguments,1);if(d[0]=b=R(b),M)return M.apply(a,d);var e=d.length,f=0,g=1===e,h=g?a[f++]:c;if(g&&0===a.length)throw Ma;return p(a,function(c,d){h=b.call(this,h,c,+d,a)},void 0,!1,f),h},Oa=(r.reduceRight=function(a,b,c){a=Ea(a);var d=x.call(arguments,1);if(d[0]=b=R(b),N)return N.apply(a,d);var e=a.length-1;return d.unshift(a.reverse()),d[1]=function(a,c,d,f){return b(a,c,e-d,f)},Na.apply(void 0,d)},r.contains=function(a,b){return-1!==Ga(a,b)}),Pa=(r.union=function(a,b){a=Ea(a);var c;return b?Ja(a.sort(),function(a,b){return!(b&&c===a||(c=a,0))}):(c=[],Ja(a,function(a,b){return!Oa(c,a)&&(c.push(a),!0)}))},r.flatten=function(){var a=[];return Ha(arguments,function(b,c){A.apply(a,Y(b)?Pa.apply(void 0,y.apply(s,b)):[b])}),a});r.whiteList=function(a){a=Ea(a);var b=Pa(x.call(arguments,1));return ga(b)?[]:Ja(a,function(a){return q(b,a)})},r.blacklist=function(a){a=Ea(a);var b=Pa(x.call(arguments,1));return ga(b)?a:Ja(a,function(a){return!q(b,a)})};var Qa=r.bind=function(a){function b(){if(this instanceof b){c.shift();var d=va(a.prototype),e=a.apply(d,y.apply(c,arguments));return ca(e)?e:d}return a.apply(c.shift(),y.apply(c,arguments))}if(!W(a))return T(a,"type is not function, limit.bind is called"),Q;if(O)return O.apply(a,x.call(arguments,1));var c=x.call(arguments,1);return b},Ra=r.delay=function(a,b){var c=x.call(arguments,2);return z.call(c,a,void 0),setTimeout(function(){Qa.apply(void 0,c)()},b)},Sa=r.defer=function(){var a=x.call(arguments);return a.splice(1,0,0),Ra.apply(void 0,a)},Ta=(r.once=function(a){var b=x.call(arguments,2);return z.call(b,a,arguments[1]),function c(){return c.used?void 0:(c.used=!0,Qa.apply(void 0,y.apply(b,arguments))())}},r.defered=function(){function a(){var e,f;(e=c.shift())?(b.status="pendding",Sa(function(){try{var b=~~V(d[0]);f=d.slice(b),d.length=0,d[1]=e[e.allback?"allback":b?"sucback":"errback"].apply(void 0,f),d[0]=null}catch(c){d[0]=c}a()})):b.status="end"}var b={},c=[],d=[null];return b.isDefered=!0,b.status="init",b.then=function(a,d){return c.push({sucback:a||Q,errback:d||Q}),b},b.always=function(a){return c.push({allback:a||Q}),b},b.pass=function(c){return arguments.length&&(d[0]=c,A.apply(d,x.call(arguments,1))),a(),b},b});r.when=function(){function a(){if(--c<=0){var a=V(Fa(e));a&&d.unshift(null),b.pass.apply(void 0,a?d:e)}}var b=Ta(),c=arguments.length,d=[],e=[];return Ha(arguments,function(b,c){b.isDefered?(b.then(function(){d[c]=Fa(arguments)},function(){e[c]=Fa(arguments)}).always(a),"end"===b.status&&b.pass()):W(b)?Sa(function(){try{d[c]=b()}catch(f){e[c]=f}a()}):(d[c]=b,a())}),b};var Ua=/^(yyyy)(?:(.+)(MM))?(?:(.+)(dd))?(?:(.+)(HH))?(?:(.+)(mm))?(?:(.+)(ss))?(.+)?$/,Va=["getFullYear","getMonth","getDate","getHours","getMinutes","getSeconds"];return r.formatDate=function(a,b){!X(a)&&(a=+new Date),!ba(b)&&(b="yyyy-MM-dd HH:mm:ss");var c=new Date(a);return ea(+c)?(T("warn","formatDate is called","timestamp:",a,"date:",c),""):b.replace(Ua,function(){var a=[];return Ha(x.call(arguments,1,-2),function(b,d){var f;b&&(d%2===0?(f=c[Va[d/2]](),"MM"===b&&f++,"yyyy"!==b&&(f=(e("0",2)+f).slice(-2)),a.push(f)):a.push(b))}),a.join("")})},r}),define("bus/testKiss/config",[],function(a,b,c){return{kiss:"hello testKiss"}});