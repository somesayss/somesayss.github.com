define("class",["require","exports","module"],function(e,t){function o(e){return e!=="extend"&&e!=="superClass"}function u(e,t,n,r){r=typeof r=="function"?r:i;for(var s in t)(t.hasOwnProperty(s)||n)&&r(s)&&(e[s]=t[s]);return e}function a(){}function f(e){var t=Object.create;return t?t(e):e.__proto__?{__proto__:e}:(a.prototype=e,new a)}function l(e,t){return e.prototype=f(t.prototype),e.prototype.constructor=e,e.superClass=t.prototype,e}function c(e,t){return"Implements,Statics".replace(s,function(i){t&&(!t[i]&&(t[i]=r),t.hasOwnProperty(i)&&n[i](e,t[i]),delete t[i])}),u(e.prototype,t),e}var n={},r=[],i=function(e){return e},s=/\w+/g;return n.create=function(e){function t(){var e=this.init;return e&&e.apply(this,arguments)}return c(t,e),t.prototype.constructor=t,t.extend=function(e){return n.extend(t,e)},t},n.extend=function(e,t){if(typeof e!="function")throw"Class extend error!! parent class need a function";return c(l(n.create(),e),t)},n.instanceOf=function(e,t){return e instanceof t&&e.constructor===t},n.Statics=function(e,t){t=[].concat(t);var n;e.superClass&&u(e,e.superClass.constructor,!1,o);while(n=t.shift())u(e,n,!1,o)},n.Implements=function(e,t){var n,r=e.prototype;t=[].concat(t);while(n=t.shift())u(r,n.prototype||n,!0)},n}),define("attrs",["require","exports","module","class"],function(e,t){function f(e){return e}function l(e){return e===Object(e)&&!e.nodeType&&!e.jquery}function c(e,t,n){if(e.indexOf)return e.indexOf(t,n);var r=e.length;n=~~n;for(;n<r;n++)if(e[n]===t)return n;return-1}function h(e,t,n){if(!e.forEach)return e.forEach(t,n);var r=0,i=e.length;for(;r<i;r++)t.call(n,e[r],r,e)}function p(e,t){for(var n in e)e.hasOwnProperty(n)&&t(e[n],n)}function d(e,t,n){return n?p(t,function(t,n){e[n]===void 0&&(e[n]=t)}):p(t,function(t,n){e[n]=t}),e}function v(e){return!e||!e.hasOwnProperty("set")&&!e.hasOwnProperty("get")}function m(e){return e===void 0?!0:!!e}function g(e,t){return t=t||{},v(t)?{value:t.value||e,writable:m(t.writable),enumerable:!0,configurable:!0,__isAttr__:!0}:{get:t.get||f,set:t.set||f,enumerable:!0,configurable:!0,__isAttr__:!0}}function y(e,t,n,r,i){if(v(e)){if(!m(r&&r.writable))throw"TypeError: Cannot redefine property: "+n;e.value=t}else r&&e.set.call(i,t)}function b(e,t){var n;return v(e)?e&&e.value:(n=e.get.call(t),n&&n.__isAttr__?b(n,t):n)}var n=e("class"),r=Object.defineProperty,i=Object.getOwnPropertyDescriptor,s=!!Object.create,o=/\w+/g,u=Array.prototype.unshift,a=n.create({initBseAttr:function(){var e=this;e.__attrs__=e.__attrs__||{},e.__attrsName__=e.__attrsName__||[]},initAttrs:function(e){var t=this;p(d(t.recursiveAttrs("attrs").origin,e),function(e,n){t.set(n,e)})},set:function(e,t,n){var i=this,o=i.getAttrs("attrs"),u=i.getAttrs("attrsName"),a=o[e],f=o.hasOwnProperty(e),c;return!f&&u.push(e),l(t)&&(t.hasOwnProperty("value")||!v(t))&&(n=t,t=n.value),c=g(t,n),s?f&&!n?o[e]=t:r(o,e,c):y(f&&!n?a:o[e]=c,c.value,e,a,o),i},get:function(e){var t=this,n=t.getAttrs("attrs");return s?n[e]:b(n[e],n)},getAttrs:function(e){var t=this,n=t["__"+e+"__"];return n?n:(t.initBseAttr(),t["__"+e+"__"])},eachAttrs:function(e){var t=this,n=t.getAttrs("attrs"),r=t.getAttrs("attrsName");return e=e||t.K,h(r,function(n,r){e(t.get(n),n)}),t},removeAttrs:function(e){var t=this,n=t.getAttrs("attrs"),r=t.getAttrs("attrsName");return e.replace(o,function(e){var t;(t=c(r,e))!==-1&&(r.splice(t,1),delete n[e])}),t},clearAttrs:function(){var e=this;return e.__attrs__={},e.__attrsName__=[],e},recursiveAttrs:function(e){var t=this,n=t.constructor.prototype,r,i={},s=[],o=[],a;while((r=n.constructor.superClass)&&n)n.hasOwnProperty(e)&&(a=n[e])&&(o.length=0,p(a,function(e,t){i[t]===void 0&&o.push(t)}),u.apply(s,o),d(i,a,!0)),n=r;return{origin:i,arr:s}}});return a}),define("events",["require","exports","module","class"],function(e,t){function o(e){if(r.test(e))return{eventType:RegExp.$1,nameSpace:RegExp.$2}}function u(e,t){var n=a(e,t);n!==-1&&e.splice(n,1)}function a(e,t,n){if(!e.indexOf)return e.indexOf(t,n);var r=e.length;n=~~n;for(;n<r;n++)if(e[n]===t)return n;return-1}function f(e,t){if(e.forEach)return e.forEach(t);var n=0,r=e.length;for(;n<r;n++)t(e[n],n,e)}function l(e,t,n){var r=!0;return f(e.slice(0),function(e){e.apply(t,n)===!1&&(r=!1)}),r}var n=e("class"),r=/(\w+)\.?(.*)/,i=Array.prototype.slice,s=n.create({add:function(e,t){var n=this,r=n.__events__,i,s,u=o(e);return u&&(r||(r=n.__events__={}),(i=r[u.eventType])||(i=r[u.eventType]=[]),i.push(t),u.nameSpace&&((s=i[u.nameSpace])||(s=i[u.nameSpace]=[]),s.push(t))),n},remove:function(e){var t=this,n=t.__events__,r,i,s=o(e);s&&n&&(r=n[s.eventType])&&(s.nameSpace?((i=r[s.nameSpace])&&f(i,function(e){u(r,e)}),delete r[s.nameSpace]):delete n[s.eventType])},on:function(e,t){var n=this;return f(e.split(","),function(e){n.add(e,t)}),n},off:function(e){var t=this;return f(e.split(","),function(e){t.remove(e)}),t},once:function(e,t){var n=this;return f(e.split(","),function(e){n.on(e,function(){n.off(e),t.call(this)})}),n},trigger:function(e,t){var n=this,r=n.__events__,s,u,a=i.call(arguments),f=o(a.shift());return f&&r&&(s=r[f.eventType])?f.nameSpace?(u=s[f.nameSpace])&&l(u,n,a):l(s,n,a):!0},clearEvents:function(){var e=this;return delete e.__events__,e}});return s}),define("aspect",["require","exports","module","events"],function(e,t){function o(e,t,n){if(e.indexOf)return e.indexOf(t,n);var r=e.length;n=~~n;for(;n<r;n++)if(e[n]===t)return n;return-1}function u(e,t,n,s){var u,a;e.on(t+"Method."+n,s),u=e[n],u&&!u.__isAspect__&&o(i,n)===-1&&(a=e[n]=function(){var t,i=r.call(arguments);return i.unshift("beforeMethod."+n),e.trigger.apply(e,i)===!1?e:(i.shift(),t=u.apply(e,i),i.unshift(t),i.unshift("afterMethod."+n),e.trigger.apply(e,i),t)},a.__isAspect__=!0)}var n=e("events"),r=Array.prototype.slice,i=["trigger"],s=n.extend({before:function(e,t){var n=this;return u(n,"before",e,t),n},after:function(e,t){var n=this;return u(n,"after",e,t),n}});return s}),define("limit",["require","exports","module"],function(e,t){var n={},r=Array.prototype,i=r.slice,s=n.K=function(e){return e},o=n.O={},u=n.log=function(){var e=i.call(arguments),t=e.shift(),n=window.console||o,r;return t!=="error"&&t!=="log"&&t!=="warn"&&(e.unshift(t),t="error"),r=n[t]||s,e.unshift("我的信息:"),r.apply(n,e)},a=n.breakEachObj=function(e,t,n){for(var r in e)if(e.hasOwnProperty(r)&&t.call(n,e[r],r,e))break},f=n.breakEachArr=function(e,t,n){var r=0,i=e.length;for(;r<i;r++)if(t.call(n,e[r],r,e))break},l=n.indexOfArr=function(e,t,n){if(r.indexOf)return r.indexOf.call(e,t,n);var i=e.length;n=~~n;for(;n<i;n++)if(e[n]===t)return n;return-1},c=n.extend=function(e){return f(i.call(arguments,1),function(t){a(t,function(t,n){e[n]=t})}),e};return n}),define("base",["require","exports","module","class","attrs","aspect","limit"],function(e,t){function a(e){var t=e.getAttrs("attrs"),n=e.getAttrs("attrsName");e.limit.breakEachArr(n,function(t){if(o.test(t)){var n=e.get(t);typeof n=="function"&&e.on(RegExp.$1.toLowerCase()+RegExp.$2,n)}})}var n=e("class"),r=e("attrs"),i=e("aspect"),s=e("limit"),o=/^on([A-Z])(.*)/,u=n.create({Implements:[r,i,{limit:s}],Statics:{limit:s},className:"Base",init:function(e){var t=this,n=t.getAttrs("attrs");return n.me=t,n.get=function(e){return t.get(e)},n.set=function(e,n){return t.get(e,n)},t.initAttrs(e),a(t),t},destroy:function(){var e=this;e.clearEvents(),e.clearAttrs();for(var t in e)e.hasOwnProperty(t)&&delete e[t];return e}});return u}),define("$",["require","exports","module"],function(e,t){return jQuery}),define("common/domUtil",["require","exports","module"],function(e,t){var n={};return n}),define("widget",["require","exports","module","base","$","common/domUtil"],function(e,t){function p(e,t,n){if(t!=="element"&&t!=="template"){var r=n.data(t);r&&e.set(t,r)}}function d(e,t){var r;return(r=t[0].dataset)?n.limit.breakEachObj(t[0].dataset,function(n,r){p(e,r,t)}):(console.log(t),v(t[0].attributes,function(n,r){p(e,r,t)})),e}function v(e,t){n.limit.breakEachArr(e,function(e,n){var r=e.nodeName;l.test(r)&&(r=RegExp.$1.slice(1).replace(c,function(e,t){return t.toUpperCase()}),t(e.nodeValue,r))})}function m(e){var t=[];return n.limit.breakEachObj(e,function(e,n){t.push(n)}),t}function g(e){var t=e.widgetCid,n=e.element,r=n.attr("widget-cid").split(",");delete f["widgetCid"+t],r.splice(e.limit.indexOfArr(r,t),1),n.attr("widget-cid",r.join(",")),n.attr("widget-cid")===""&&n.removeAttr("widget-cid")}var n=e("base"),r=e("$"),i=e("common/domUtil"),s=0,o=".widgetEvents",u=document,a=u.body,f={},l=/^data((?:-.+)+)$/,c=/-([a-z])/g,h=n.extend({attrs:{trigger:null,element:null,events:null,id:null,className:null,style:null,template:"<div></div>",parentNode:a},className:"Widget",init:function(e){var t=this;return h.superClass.init.call(t,e),t.parseElement(),t.parseElementAttr(),t.parseTrigger(),t.parseTriggerAttr(),t.widgetCid=""+s++,f["widgetCid"+t.widgetCid]=t,t.initProps(),t.renderAttr(),t.setup(),t.initEvents(),t.delegateEvents(),t},destroy:function(){var e=this;return e.undelegateEvents(),e.widgetIsTemplate&&e.element.remove(),g(e),h.superClass.destroy.call(e),e},parseElement:function(){var e=this,t=e.get("element");return t===null?(t=r(e.get("template")),e.widgetIsTemplate=!0):t=r(t),t.length===0&&e.limit.log("element构建失败。"),e.element=t,e},parseElementAttr:function(){return d(this,this.element)},parseTrigger:function(){var e=this,t=r(e.get("trigger"));return t.length&&(e.triggerNode=t),e},parseTriggerAttr:function(){var e=this,t=e.triggerNode;return t&&e.widgetIsTemplate?d(this,t):e},initProps:n.limit.K,setup:n.limit.K,renderAttr:function(){var e=this,t=e.element,n=e.get("id"),r=e.get("className"),i=t.attr("widget-cid"),s=e.get("style");return n&&t.prop("id",n),r&&t.addClass(r),s&&t.css(s),t.attr("widget-cid",i?i+","+e.widgetCid:e.widgetCid),e},render:function(){var e=this,t=e.element,n=t[0],i=r(e.get("parentNode"));return e.set("parentNode",i),n&&!r.contains(a,n)&&i.append(t),e},initEvents:function(){var e=this,t=e.get("events"),n=e.recursiveAttrs("events"),r=n.origin,i=n.arr;return e.limit.breakEachObj(t,function(e,t){!r[t]&&i.push(t)}),e.set("events",e.limit.extend(n.origin,t)),e.set("eventsArr",i),e},delegateEvents:function(e,t){var n=this,r,i=arguments.length;return i===0?(e=n.element,t=n.get("events"),r=n.get("eventsArr")):i===1?(t=e,e=n.element,r=m(t)):i===2&&(r=m(t)),!n.delegateElements&&(n.delegateElements=[]),n.limit.indexOfArr(n.delegateElements,e)===-1&&n.delegateElements.push(e),n.limit.breakEachArr(r,function(r,i){var s=r.split(" "),u=t[r],u=typeof u=="function"?u:n[u]||n.K;e.on(s[0]+o+"widgetCid"+n.widgetCid,s[1],function(e){u.call(n,this,e)})}),n},undelegateEvents:function(e){var t=this,n=arguments.length,r;return n===0?r=t.delegateElements:n===1&&(r=[].concat(e)),t.limit.breakEachArr(r,function(e){e.off(o+"widgetCid"+t.widgetCid)}),t},$:function(e){return this.element.find(e)},jQuery:r,Implements:{domUtil:i},Statics:[{query:function(e){var t=this,n=[],i=r(e).attr("widget-cid");return i?(t.limit.breakEachArr(i.split(","),function(e){var t=f["widgetCid"+e];t&&n.push(t)}),n.length===1?n[0]:n):null}},i]});return h}),define("modules/pie/main",["require","exports","module","widget"],function(e,t,n){function s(e,t,n){var r=t.jQuery(a("path"));return r.attr("fill",n),e.append(r),r}function o(e,t,n){var r=t.jQuery(a("text")),i=t.get("fontSize"),s=t.get("radius");return r.attr({fill:n,x:s,y:s,dy:u(i),"text-anchor":"middle","font-size":i+"px",opacity:.7}),e.append(r),r}function u(e){return(e-e*2/10)/2}function a(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function f(e,t){var n=[],r=e.get("radius"),i=e.get("diffRadius"),s=r-i,o=l(90-t),u=Math.cos(o)*r+r,a=r-Math.sin(o)*r,f=Math.cos(o)*s+r,c=r-Math.sin(o)*s,h=t<=180?0:1;return n.push("M "+r+" 0"),n.push("A "+r+" "+r+" 0 "+h+" 1 "+u+" "+a),n.push("L "+f+" "+c),n.push("A "+s+" "+s+" 0 "+h+" 0 "+r+" "+i),n.push("Z"),n.join(" ")}function l(e){return e*Math.PI/180}var r=e("widget"),i=r.extend({attrs:{radius:20,diffRadius:1,backgroundColor:"#F2F2F2",color:"green",fontSize:12},className:"Pie",setup:function(){var e=this;return e.initSvg()},destroy:function(){var e=this;return e.get("svg").remove(),i.superClass.destroy.call(e),e},initSvg:function(){var e=this,t=e.get("radius"),n=t*2,r=e.jQuery(a("svg"));return r.attr({width:n,height:n}),e.element.append(r),e.setPath(100,s(r,e,e.get("backgroundColor"))),e.set("svg",r),e.set("path",s(r,e,e.get("color"))),e.set("text",o(r,e,e.get("color"))),e},setPath:function(e,t){var n=this,r=t||n.get("path");return 0<=e&&e<=100?(r.attr("d",f(n,e/100*359.99)),!t&&n.get("text").text(e)):n.log("百分比大于100，或者小于0。"),n}});return i}),define("bus/pie/main",["require","exports","module","modules/pie/main"],function(e,t,n){var r=e("modules/pie/main"),i=new r({element:"#pie"});console.log(i)});