/*! hello-grunt 2015-09-23 */
"use strict";define("bus/testKiss/main",["common/base","./config"],function(a,b,c){var d=a("common/base"),e=a("./config"),f=new d(e);console.log(f.get("kiss"))}),define("common/base",["common/class","common/attrs","common/aspect","common/limit"],function(a,b){function c(a){var b=(a.getAttrs("attrs"),a.getAttrs("attrsName"));a.limit.breakEach(b,function(b){if(h.test(b)){var c=a.get(b);"function"==typeof c&&a.on(RegExp.$1.toLowerCase()+RegExp.$2,c)}})}var d=a("common/class"),e=a("common/attrs"),f=a("common/aspect"),g=a("common/limit"),h=/^on([A-Z])(.*)/,i=d.create({Implements:[e,f,{limit:g}],Statics:{limit:g},className:"Base",init:function(a){var b=this,d=b.getAttrs("attrs");return d.me=b,d.get=function(a){return b.get(a)},d.set=function(a,c){return b.get(a,c)},b.initAttrs(a),c(b),b.initBase(),b},initBase:g.K,destroy:function(){var a=this;a.clearEvents(),a.clearAttrs();for(var b in a)a.hasOwnProperty(b)&&delete a[b];return a}});return i}),define("common/class",[],function(a,b){function c(a){return"extend"!==a&&"superClass"!==a}function d(a,b,c,d){d="function"==typeof d?d:k;for(var e in b)(b.hasOwnProperty(e)||c)&&d(e)&&(a[e]=b[e]);return a}function e(){}function f(a){var b=Object.create;return b?b(a):a.__proto__?{__proto__:a}:(e.prototype=a,new e)}function g(a,b){return a.prototype=f(b.prototype),a.prototype.constructor=a,a.superClass=b.prototype,a}function h(a,b){return"Implements,Statics".replace(l,function(c){b&&(!b[c]&&(b[c]=j),b.hasOwnProperty(c)&&i[c](a,b[c]),delete b[c])}),d(a.prototype,b),a}var i={},j=[],k=function(a){return a},l=/\w+/g;return i.create=function(a){function b(){var a=this.init;return a&&a.apply(this,arguments)}return h(b,a),b.prototype.constructor=b,b.extend=function(a){return i.extend(b,a)},b},i.extend=function(a,b){if("function"!=typeof a)throw"Class extend error!! parent class need a function";return h(g(i.create(),a),b)},i.instanceOf=function(a,b){return a instanceof b&&a.constructor===b},i.Statics=function(a,b){b=[].concat(b);var e;for(a.superClass&&d(a,a.superClass.constructor,!1,c);e=b.shift();)d(a,e,!1,c)},i.Implements=function(a,b){var c,e=a.prototype;for(b=[].concat(b);c=b.shift();)d(e,c.prototype||c,!0)},i}),define("common/attrs",["common/class"],function(a,b){function c(a){return a}function d(a){return a===Object(a)&&!a.nodeType&&!a.jquery}function e(a,b,c){if(a.indexOf)return a.indexOf(b,c);var d=a.length;for(c=~~c;d>c;c++)if(a[c]===b)return c;return-1}function f(a,b,c){if(!a.forEach)return a.forEach(b,c);for(var d=0,e=a.length;e>d;d++)b.call(c,a[d],d,a)}function g(a,b){for(var c in a)a.hasOwnProperty(c)&&b(a[c],c)}function h(a,b,c){return c?g(b,function(b,c){void 0===a[c]&&(a[c]=b)}):g(b,function(b,c){a[c]=b}),a}function i(a){return!a||!a.hasOwnProperty("set")&&!a.hasOwnProperty("get")}function j(a){return void 0===a?!0:!!a}function k(a,b){return b=b||{},i(b)?{value:b.value||a,writable:j(b.writable),enumerable:!0,configurable:!0,__isAttr__:!0}:{get:b.get||c,set:b.set||c,enumerable:!0,configurable:!0,__isAttr__:!0}}function l(a,b,c,d,e){if(i(a)){if(!j(d&&d.writable))throw"TypeError: Cannot redefine property: "+c;a.value=b}else d&&a.set.call(e,b)}function m(a,b){var c;return i(a)?a&&a.value:(c=a.get.call(b),c&&c.__isAttr__?m(c,b):c)}var n=a("common/class"),o=Object.defineProperty,p=(Object.getOwnPropertyDescriptor,!!Object.create),q=/\w+/g,r=Array.prototype.unshift,s=n.create({initBseAttr:function(){var a=this;a.__attrs__=a.__attrs__||{},a.__attrsName__=a.__attrsName__||[]},initAttrs:function(a){var b=this;g(h(b.recursiveAttrs("attrs").origin,a),function(a,c){b.set(c,a)})},resetAttrs:function(a){var b=this;g(a,function(a,c){b.set(c,a)})},set:function(a,b,c){var e,f=this,g=f.getAttrs("attrs"),h=f.getAttrs("attrsName"),j=g[a],m=g.hasOwnProperty(a);return!m&&h.push(a),!d(b)||!b.hasOwnProperty("value")&&i(b)||(c=b,b=c.value),e=k(b,c),p?m&&!c?g[a]=b:o(g,a,e):l(m&&!c?j:g[a]=e,e.value,a,j,g),f},get:function(a){var b=this,c=b.getAttrs("attrs");return p?c[a]:m(c[a],c)},getAttrs:function(a){var b=this,c=b["__"+a+"__"];return c?c:(b.initBseAttr(),b["__"+a+"__"])},eachAttrs:function(a){var b=this,c=(b.getAttrs("attrs"),b.getAttrs("attrsName"));return a=a||b.K,f(c,function(c,d){a(b.get(c),c)}),b},removeAttrs:function(a){var b=this,c=b.getAttrs("attrs"),d=b.getAttrs("attrsName");return a.replace(q,function(a){var b;-1!==(b=e(d,a))&&(d.splice(b,1),delete c[a])}),b},clearAttrs:function(){var a=this;return a.__attrs__={},a.__attrsName__=[],a},recursiveAttrs:function(a){for(var b,c,d=this,e=d.constructor.prototype,f={},i=[],j=[];(b=e.constructor.superClass)&&e;)e.hasOwnProperty(a)&&(c=e[a])&&(j.length=0,g(c,function(a,b){void 0===f[b]&&j.push(b)}),r.apply(i,j),h(f,c,!0)),e=b;return{origin:f,arr:i}}});return s}),define("common/class",[],function(a,b){function c(a){return"extend"!==a&&"superClass"!==a}function d(a,b,c,d){d="function"==typeof d?d:k;for(var e in b)(b.hasOwnProperty(e)||c)&&d(e)&&(a[e]=b[e]);return a}function e(){}function f(a){var b=Object.create;return b?b(a):a.__proto__?{__proto__:a}:(e.prototype=a,new e)}function g(a,b){return a.prototype=f(b.prototype),a.prototype.constructor=a,a.superClass=b.prototype,a}function h(a,b){return"Implements,Statics".replace(l,function(c){b&&(!b[c]&&(b[c]=j),b.hasOwnProperty(c)&&i[c](a,b[c]),delete b[c])}),d(a.prototype,b),a}var i={},j=[],k=function(a){return a},l=/\w+/g;return i.create=function(a){function b(){var a=this.init;return a&&a.apply(this,arguments)}return h(b,a),b.prototype.constructor=b,b.extend=function(a){return i.extend(b,a)},b},i.extend=function(a,b){if("function"!=typeof a)throw"Class extend error!! parent class need a function";return h(g(i.create(),a),b)},i.instanceOf=function(a,b){return a instanceof b&&a.constructor===b},i.Statics=function(a,b){b=[].concat(b);var e;for(a.superClass&&d(a,a.superClass.constructor,!1,c);e=b.shift();)d(a,e,!1,c)},i.Implements=function(a,b){var c,e=a.prototype;for(b=[].concat(b);c=b.shift();)d(e,c.prototype||c,!0)},i}),define("common/aspect",["common/events"],function(a,b){function c(a,b,c){if(a.indexOf)return a.indexOf(b,c);var d=a.length;for(c=~~c;d>c;c++)if(a[c]===b)return c;return-1}function d(a,b,d,e){var h,i;a.on(b+"Method."+d,e),h=a[d],h&&!h.__isAspect__&&-1===c(g,d)&&(i=a[d]=function(){var b,c=f.call(arguments);return c.unshift("beforeMethod."+d),a.trigger.apply(a,c)===!1?a:(c.shift(),b=h.apply(a,c),c.unshift(b),c.unshift("afterMethod."+d),a.trigger.apply(a,c),b)},i.__isAspect__=!0)}var e=a("common/events"),f=Array.prototype.slice,g=["trigger"],h=e.extend({before:function(a,b){var c=this;return d(c,"before",a,b),c},after:function(a,b){var c=this;return d(c,"after",a,b),c}});return h}),define("common/events",["common/class"],function(a,b){function c(a){return i.test(a)?{eventType:RegExp.$1,nameSpace:RegExp.$2}:void 0}function d(a,b){var c=e(a,b);-1!==c&&a.splice(c,1)}function e(a,b,c){if(a.indexOf){var d=a.length;for(c=~~c;d>c;c++)if(a[c]===b)return c;return-1}return a.indexOf(b,c)}function f(a,b){if(a.forEach)return a.forEach(b);for(var c=0,d=a.length;d>c;c++)b(a[c],c,a)}function g(a,b,c){var d=!0;return f(a.slice(0),function(a){a.apply(b,c)===!1&&(d=!1)}),d}var h=a("common/class"),i=/(\w+)\.?(.*)/,j=Array.prototype.slice,k=h.create({add:function(a,b){var d,e,f=this,g=f.__events__,h=c(a);return h&&(g||(g=f.__events__={}),(d=g[h.eventType])||(d=g[h.eventType]=[]),d.push(b),h.nameSpace&&((e=d[h.nameSpace])||(e=d[h.nameSpace]=[]),e.push(b))),f},remove:function(a){var b,e,g=this,h=g.__events__,i=c(a);i&&h&&(b=h[i.eventType])&&(i.nameSpace?((e=b[i.nameSpace])&&f(e,function(a){d(b,a)}),delete b[i.nameSpace]):delete h[i.eventType])},on:function(a,b){var c=this;return f(a.split(","),function(a){c.add(a,b)}),c},off:function(a){var b=this;return f(a.split(","),function(a){b.remove(a)}),b},once:function(a,b){var c=this;return f(a.split(","),function(a){c.on(a,function(){c.off(a),b.call(this)})}),c},trigger:function(a,b){var d,e,f=this,h=f.__events__,i=j.call(arguments),k=c(i.shift());return k&&h&&(d=h[k.eventType])?k.nameSpace?(e=d[k.nameSpace])&&g(e,f,i):g(d,f,i):!0},clearEvents:function(){var a=this;return delete a.__events__,a}});return k}),define("common/limit",[],function(a,b){function c(a){var b="";return wa(ea,function(c,d){var e=r["is"+c];return e(a)&&(b=c)}),b}function d(a,b,c){var d=w[c];return d(a)===d(b)}function e(a,b){return ma(a)===ma(b)&&va(p(a),function(c,d){return fa(a[c],b[c])})}function f(a,b){for(null==a&&(a=""),a+="",b=~~b;a.length<b;)a+=a;return a.slice(0,b)}function g(a){return a=~~a,0>a?0:a}function h(){var a=!0;return oa(y.apply(s,arguments),function(b){return ca(b)?void 0:(T("warn",b,"the num is not a finite number"),a=!1)}),a}function i(){return h.apply(void 0,arguments)?Math.max.apply(Math,ta(arguments,function(a){return((""+a).split(".")[1]||"").length})):void 0}function j(a,b){return b=g(b),(a+f("0",b)).slice(0,b)}function k(a,b){return b=g(b),(f("0",b)+a).slice(-b)}function l(a,b,c,d){return d<c.length?a+b+c.slice(0,d)+"."+c.slice(d):a+b+j(c,d)}function m(a,b,c,d){return b.length>d?a+b.slice(0,-d)+"."+b.slice(-d)+c:a+"0."+k(b,d)+c}function n(a,b){if(h(a)){if(a+="",b=~~b,0===b)return+a;var c,d,e="";return a=a.split("."),c=a[0],d=a[1]||"","-"===c.charAt(0)&&(e="-",c=c.slice(1)),0>b?m(e,c,d,-b):l(e,c,d,b)}}function o(a,b){var c=a[0]+"",d=a[1]+"",e=(c.split(".")[1]||"").length,f=(d.split(".")[1]||"").length,g=b?+n(+c.replace(".","")*+d.replace(".",""),-(e+f)):+n(+c.replace(".","")/+d.replace(".",""),f-e);return a.splice(0,2,g),g}function p(a){return la(aa(a)?qa(a):a)}function q(a,b,c,d,e){for(var f,g=p(a),h=~~e,i=g.length;i>h&&(f=g[h],b.call(c,a[f],f,a)!==!1||!d);h++);return a}var r={},s=Array.prototype,t=Object.prototype,u=Function.prototype,v=String.prototype,w=window,x=(w.document,s.slice),y=(s.splice,s.concat),z=s.unshift,A=s.push,B=t.toString,C=t.hasOwnProperty,D=Object.keys,E=Object.create,F=s.forEach,G=s.indexOf,H=s.lastIndexOf,I=s.map,J=s.filter,K=s.every,L=s.some,M=s.reduce,N=s.reduceRight,O=u.bind,P=v.trim,Q=r.K=function(a){return a},R=r.cb=function(a){return W(a)?a:Q},S=r.O={},T=r.log=function(){if(!r.logClosed){var a,b=x.call(arguments),c=b.shift(),d=console||S;za(["error","log","warn"],c)||(b.unshift(c),c="error"),a=d[c]||Q;try{b.unshift("limitJS "+c+":"),a.apply(d,b)}catch(e){a("limitJS ",b)}}},U=r.has=function(a,b){return null!=a&&C.call(a,b)},V=r.isUndefined=function(a){return void 0===a},W=(r.isNull=function(a){return null===a},r.isFunction=function(a){return"function"==typeof a});r.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"===B.call(a)};"String,Number,Array,Date,RegExp,Error,Math".replace(/\w+/g,function(a){r["is"+a]=function(b){return B.call(b)==="[object "+a+"]"}});var X=r.isNumber,Y=r.isArray,Z=r.isDate,$=r.isRegExp,_=r.isObject=function(a){return W(a)||"object"==typeof a&&!!a},aa=(r.isArguments=function(a){return U(a,"callee")},r.isArrayLike=function(a){return!!a&&X(a.length)&&!W(a)&&!da(a)}),ba=r.isNaN=function(a){return X(a)&&isNaN(a)},ca=r.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))};r.isEmpty=function(a){return null==a?!0:0===ma(a)};r.isElement=function(a){return!!a&&1===a.nodeType},r.isDocument=function(a){return!!a&&9===a.nodeType};var da=r.isWin=function(a){return!!a&&a.window===a&&a.self===a},ea=["String","Number","Boolean"],fa=r.isEqual=function(a,b){if(T("log","limit.isEqual is called ",typeof a,":",a,typeof b,":",b),a===b)return!0;if(B.call(a)!==B.call(b))return!1;if(ba(a))return!0;var f;return(f=c(a))?d(a,b,f):Z(a)?+a===+b:$(a)?""+a==""+b:W(a)&&""+a!=""+b?!1:e(a,b)},ga=/^\s+|\s+$/g;r.trim=function(a){return a=arguments.length?a+"":"",P?P.call(a):a.replace(ga,"")},r.random=function(a,b){a=~~a,b=~~b;var c=Math.max(a,b),d=Math.min(a,b);return Math.floor((c-d+1)*Math.random()+d)};r.toFixed=function(a,b){b=g(b);var a=n(a,b);return V(a)?a:n(Math.round(a),-b)},r.plus=function(){var a=i.apply(void 0,arguments);if(!V(a))return ya.call(void 0,arguments,function(b,c){return+n(+n(b,a)+ +n(c,a),-a)})},r.minus=function(){var a=i.apply(void 0,arguments);if(!V(a))return ya.call(void 0,arguments,function(b,c){return+n(+n(b,a)-+n(c,a),-a)})};var ha=r.multiply=function(){if(h.apply(void 0,arguments)){var a=qa(arguments),b=o(a,!0);return a.length<=1?b:ha.apply(void 0,a)}},ia=r.except=function(){if(h.apply(void 0,arguments)){var a=qa(arguments),b=o(a,!1);return ba(b)?a[0]/a[1]:a.length<=1?b:ia.apply(void 0,a)}},ja=function(){},ka=r.create=function(a){return null==a?{}:E?E(a):a.__proto__?{__proto__:a}:(ja.prototype=a,new ja)},la=r.keys=function(a){if(null==a)return[];if(D)return D.call(Object,a);var b,c=[];for(b in a)U(a,b)&&c.push(b);return c},ma=r.size=function(a){return p(a).length},na=r.each=function(a,b,c){return b=R(b),aa(a)&&F?F.call(a,function(a,c){b.call(this,a,""+c)},c):q(a,b,c)},oa=r.breakEach=function(a,b,c){return q(a,b,c,!0)},pa=r.extend=function(a,b){return _(a)?(b!==!0?na(x.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}):na(x.call(arguments,2),function(b){na(b,function(b,c){a[c]=b})}),a):a},qa=(r.defaults=function(a,b){return _(a)?(b!==!0?na(x.call(arguments,1),function(b){if(b)for(var c in b)V(a[c])&&(a[c]=b[c])}):na(x.call(arguments,2),function(b){na(b,function(b,c){V(a[c])&&(a[c]=b)})}),a):a},r.clone=function(a,b){return _(a)?Y(a)?x.call(a):pa({},b,a):a},r.toArray=function(a){return aa(a)?x.call(a):(T("warn",a,"change into [], limit.toArray is called"),[])}),ra=r.indexOf=function(a,b,c){if(a=qa(a),G)return G.apply(a,x.call(arguments,1));var d=-1;return q(a,function(a,c){return a===b?(d=c,!1):void 0},void 0,!0,~~c),+d},sa=(r.lastIndexOf=function(a,b,c){if(a=qa(a),H)return H.apply(a,x.call(arguments,1));c=~~c;var d=a.length-1,e=ra(a.reverse(),b,3===arguments.length?d-c:c);return-1===e?-1:d-e},r.forEach=function(a,b,c){return a=qa(a),b=R(b),na(a,function(c,d){b.call(this,c,+d,a)},c)}),ta=r.map=function(a,b,c){if(a=qa(a),b=R(b),I)return I.call(a,b,c);var d=[];return sa(a,function(c,e){d[e]=b.call(this,c,e,a)},c),d},ua=r.filter=function(a,b,c){if(a=qa(a),b=R(b),J)return J.call(a,b,c);var d=[];return sa(a,function(c,e){b.call(this,c,e,a)&&d.push(c)},c),d},va=r.every=function(a,b,c){if(a=qa(a),b=R(b),K)return K.call(a,b,c);var d=!0;return oa(a,function(c,e){return b.call(this,c,+e,a)?void 0:d=!1},c),d},wa=r.some=function(a,b,c){if(a=qa(a),b=R(b),L)return L.call(a,b,c);var d=!1;return oa(a,function(c,e){return b.call(this,c,+e,a)?(d=!0,!1):void 0},c),d},xa=new TypeError("Reduce of empty array with no initial value"),ya=r.reduce=function(a,b,c){a=qa(a);var d=x.call(arguments,1);if(d[0]=b=R(b),M)return M.apply(a,d);var e=d.length,f=0,g=1===e,h=g?a[f++]:c;if(g&&0===a.length)throw xa;return q(a,function(c,d){h=b.call(this,h,c,+d,a)},void 0,!1,f),h},za=(r.reduceRight=function(a,b,c){a=qa(a);var d=x.call(arguments,1);if(d[0]=b=R(b),N)return N.apply(a,d);var e=a.length-1;return d.unshift(a.reverse()),d[1]=function(a,c,d,f){return b(a,c,e-d,f)},ya.apply(void 0,d)},r.contains=function(a,b){return-1!==ra(a,b)}),Aa=(r.union=function(a,b){a=qa(a);var c;return b?ua(a.sort(),function(a,b){return!(b&&c===a||(c=a,0))}):(c=[],ua(a,function(a,b){return!za(c,a)&&(c.push(a),!0)}))},r.flatten=function(){var a=[];return sa(arguments,function(b,c){A.apply(a,Y(b)?Aa.apply(void 0,y.apply(s,b)):[b])}),a}),Ba=r.bind=function(a){function b(){if(this instanceof b){c.shift();var d=ka(a.prototype),e=a.apply(d,y.apply(c,arguments));return _(e)?e:d}return a.apply(c.shift(),y.apply(c,arguments))}if(!W(a))return T(a,"type is not function, limit.bind is called"),Q;if(O)return O.apply(a,x.call(arguments,1));var c=x.call(arguments,1);return b},Ca=r.delay=function(a,b){var c=x.call(arguments,2);return z.call(c,a,void 0),setTimeout(function(){Ba.apply(void 0,c)()},b)};r.defer=function(){var a=x.call(arguments);return a.splice(1,0,0),Ca.apply(void 0,a)},r.once=function(a){var b=x.call(arguments,2);return z.call(b,a,void 0),function c(){return c.used?void 0:(c.used=!0,Ba.apply(void 0,y.apply(b,arguments))())}};return r}),define("bus/testKiss/config",[],function(a,b,c){return{kiss:"hello testKiss"}});