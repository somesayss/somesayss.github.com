!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/dist/",e(0)}([function(t,e,n){t.exports=n(8)},,function(t,e){t.exports=jQuery},function(t,e){t.exports=limit},,,,,function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t){for(var e={},n=t.constructor.prototype;n&&n.constructor!==Object;)c(n).keysSuper().each(function(t){"__proto__"===t||e[t]||(e[t]=n[t])}),n=n.__proto__;return e}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=(n(2),n(3)),s=(n(9),n(10)),f=function(){function t(){i(this,t)}return a(t,[{key:"a",value:function(){}}]),t}(),p=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),a(e,[{key:"b",value:function(){}}]),e}(f),h=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),a(e,[{key:"c",value:function(){}}]),e}(p),l=(new h,s.create({d:function(){}})),y=l.extend({e:function(){console.log("e")}}),v=y.extend({f:function(){}}),d=new v;c.each(u(d),function(t,e){console.log(e,t+"")})},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(2),u=n(3),a=i(window),c=/^#([^?]*)(?:\?(.*))?/,s=function(){function t(e){r(this,t);var n=this;n.routerMap={};n.eventUid="hashchange.router"+u.getUid(),u.each(e,function(t,e){n.add(n.addPathForKey(e),t)}),n.bindHashChange()}return o(t,[{key:"add",value:function(t,e){var n=this,r=n.routerMap;return u.isDefined(r[t])&&u["!!!"](t+" is defined before;"),r[t]=u.cb(e),n}},{key:"remove",value:function(t){var e=this,n=e.routerMap;return delete n[t],e}},{key:"setSearch",value:function(t){var e=this,n=e.parseHash(),r=void 0;return u.isFunction(t)&&(r=u.cb(t)(u.parseString(n.search))),r=(r=u.unParseString(r))?n.hash+"?"+r:""+n.hash,location.hash=r,e}},{key:"setHash",value:function(t){var e=this,n=void 0;if(u.isFunction(t)){var r=e.parseHash();n=u.toString(u.cb(t)(r.hash,u.parseString(r.search)))}else n=u.toString(t);return location.hash=n,e}},{key:"bindHashChange",value:function(){var t=this;a.on(t.eventUid,function(e){var n=t.parseHash(),r=void 0;n&&(r=t.routerMap[t.addPathForKey(n.hash)])&&r(u.parseString(n.search))}),a.trigger(t.eventUid)}},{key:"addPathForKey",value:function(t){return"/"!==t.charAt(0)?"/"+t:t}},{key:"destroy",value:function(){var t=this;a.off(t.eventUid)}},{key:"parseHash",value:function(){var t=location.hash,e=t.match(c);if(e){var n=e[1],r=e[2];return{hash:n,search:r}}return{hash:""}}}],[{key:"creatRouter",value:function(e){return new t(e)}}]),t}();t.exports=s},function(t,e,n){var r;r=function(t,e){function n(t){return"extend"!==t&&"superClass"!==t}function r(t,e,n,r){r="function"==typeof r?r:f;for(var o in e)(e.hasOwnProperty(o)||n)&&r(o)&&(t[o]=e[o]);return t}function o(){}function i(t){o.prototype=t;var e=new o;return e.__proto__=t,e}function u(t,e){return t.prototype=i(e.prototype),t.prototype.constructor=t,t.superClass=e.prototype,t}function a(t,e){return"Implements,Statics".replace(p,function(n){e&&(!e[n]&&(e[n]=s),e.hasOwnProperty(n)&&c[n](t,e[n]),delete e[n])}),r(t.prototype,e),t}var c={},s=[],f=function(t){return t},p=/\w+/g;return c.create=function(t){function e(){var t=this.init;return t&&t.apply(this,arguments)}return a(e,t),e.prototype.constructor=e,e.extend=function(t){return c.extend(e,t)},e},c.extend=function(t,e){if("function"!=typeof t)throw"Class extend error!! parent class need a function";return a(u(c.create(),t),e)},c.instanceOf=function(t,e){return t instanceof e&&t.constructor===e},c.Statics=function(t,e){e=[].concat(e);var o;for(t.superClass&&r(t,t.superClass.constructor,!1,n);o=e.shift();)r(t,o,!1,n)},c.Implements=function(t,e){var n,o=t.prototype;for(e=[].concat(e);n=e.shift();)r(o,n.prototype||n,!0)},c}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))}]);
//# sourceMappingURL=main.js.map