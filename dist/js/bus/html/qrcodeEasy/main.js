!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/dist/",e(0)}({0:function(t,e,n){t.exports=n(164)},8:function(t,e){t.exports=limit},15:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(16),s=n(8),f=n(17);t.exports=function(t,e){var n=function(n){function l(t){r(this,l);var n=o(this,(l.__proto__||Object.getPrototypeOf(l)).apply(this,arguments)),i=n,a=void 0,u=i.clearProps(t);return a=i.__controller__=new e(u),a.com=i,i.state=s.assignSuper({},a.getInitialState(),u),a.props=i.getPerProps(u),a.state=i.getPerState(i.state),i.state.actionId=i.state.actionId||"uaid"+s.getUid(),i.state.actionUUid=a.Actions.actionUUid="uuid"+s.getUid(),t.actionCid&&(i.state.actionCid=a.Actions.actionCid=t.actionCid),f.set(i.state.actionId,a.Actions),n}return i(l,n),u(l,[{key:"getPerProps",value:function(t){var n={};return s.each(e.defaultProps,function(e,r){n[r]=t[r]}),n}},{key:"getPerState",value:function(t){var e=this,n={};return s.each(e.__controller__.state,function(e,r){n[r]=t[r]}),n}},{key:"componentWillReceiveProps",value:function(t){var e=this;e.propsFromOther=!0}},{key:"shouldComponentUpdate",value:function(){var t=this,e=!!t.propsFromOther;return!t.state.shouldComponentNotUpdate||(!e||(t.propsFromOther=!1))}},{key:"clearProps",value:function(t){var n=s.assign({},t);return delete n.actionId,delete n.actionUUid,delete n.actionCid,n.actionId=e.defaultProps&&e.defaultProps.actionId,n}},{key:"componentWillUpdate",value:function(t){var e=this,n=e.__controller__;e.propsFromOther&&(s.assignSuper(e.state,e.clearProps(t)),s.cb(n.componentWillUpdate).call(n,e.state),n.state=e.getPerState(e.state),n.props=e.getPerProps(e.state))}},{key:"componentDidUpdate",value:function(){var t=this;t.propsFromOther=!1}},{key:"render",value:function(){var e=this;return c.createElement(t,a({},e.state,{ref:"com"}))}},{key:"componentWillUnmount",value:function(){var t=this;f.remove(t.state.actionId,t.__controller__.Actions),t.__controller__.destroy()}}]),l}(c.Component);return n.defaultProps=e.defaultProps,n.propTypes=e.propTypes,n}},16:function(t,e){t.exports=React},17:function(t,e,n){"use strict";function r(t,e){if(c.isObjectSuper(t))return t.props[e]||t.state[e]}function o(t){return f[r(t,"actionId")||t]||[]}function i(t,e){var n=o(t);if(e)return n.filter(function(t){return t.actionCid===e});var i=function(){var e=r(t,"actionUUid");return e?{v:n.filter(function(t){return t.actionUUid===e})}:{v:n}}();return"object"===("undefined"==typeof i?"undefined":u(i))?i.v:void 0}function a(t,e){var n=i(t,e),r={};return n.length&&c.each(n[0],function(t,e){c.isFunction(t)?r[e]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return Promise.all(n.map(function(t){return t[e].apply(t,r)}))}:r[e]=n.map(function(t){return t[e]}).join(",")}),r}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},c=n(8),s=window.Actions=function(t,e){return a(t,e)},f=s.pool={};s.set=function(t,e){var n=f[t];n?n.push(e):f[t]=[e]},s.get=function(t,e){return i(t,e)},s.remove=function(t,e){var n=f[t];n&&(c.remove(n,e),n.length||delete f[t])},t.exports=s},21:function(t,e){"use strict";t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},22:function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=h[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(s(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(s(r.parts[i],e));h[r.id]={id:r.id,refs:1,parts:a}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],a=o[1],u=o[2],c=o[3],s={css:a,media:u,sourceMap:c};n[i]?n[i].parts.push(s):e.push(n[i]={id:i,parts:[s]})}return e}function i(t,e){var n=y(),r=g[g.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),g.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=g.indexOf(t);e>=0&&g.splice(e,1)}function u(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function c(t){var e=document.createElement("link");return e.rel="stylesheet",i(t,e),e}function s(t,e){var n,r,o;if(e.singleton){var i=b++;n=m||(m=u(e)),r=f.bind(null,n,i,!1),o=f.bind(null,n,i,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),r=p.bind(null,n),o=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=u(e),r=l.bind(null,n),o=function(){a(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}function f(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=_(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function l(t,e){var n=e.css,r=e.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e){var n=e.css,r=e.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([n],{type:"text/css"}),i=t.href;t.href=URL.createObjectURL(o),i&&URL.revokeObjectURL(i)}var h={},d=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},v=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),y=d(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,b=0,g=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=v()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var u=n[a],c=h[u.id];c.refs--,i.push(c)}if(t){var s=o(t);r(s,e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var f=0;f<c.parts.length;f++)c.parts[f]();delete h[c.id]}}}};var _=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},38:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(8),a=i.promise(),u=/on([A-Z])(\w*)/,c=function(){function t(){r(this,t),this.bindEvent()}return o(t,[{key:"bindEvent",value:function(){var t=this,e=t.Actions={};i(t.findAllPro()).filter(function(t,e){return u.test(e)}).each(function(n,r){var o=r.replace(u,function(t,e,n){return e.toLowerCase()+n});e[o]=function(){for(var e=arguments.length,r=Array(e),i=0;i<e;i++)r[i]=arguments[i];return t.state.actionStatus=o,n.apply(t,r)}})}},{key:"findAllPro",value:function(){for(var t=this,e={},n=t.constructor.prototype;n&&n.constructor!==Object;)i(n).keysSuper().each(function(t){"__proto__"===t||e[t]||(e[t]=n[t])}),n=n.__proto__;return e}},{key:"getInitialState",value:function(){return this.state||(this.state={})}},{key:"destroy",value:function(){var t=this;return i.each(t,function(e,n){delete t[n]}),t}},{key:"trigger",value:function(t,e){var n=this;n.com.setState(t,e)}},{key:"updateComponent",value:function(){var t=this,e=t.getInitialState();return new a(function(n){t.trigger(e,n.bind(null,"updateComponentSuccess"))})}}]),t}();t.exports=c},122:function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=$(window),u=limit.Events,c=/^#([^?]*)(?:\?(.*))?/,s=function(t){function e(t){var o,i;n(this,e);var a=(o=i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this)),i.props={},o);return limit.assignSuper(a.state,a.props,t),limit.each(t,function(t,e){return a.on(e,t)}),a.state.eventUid="hashchange.router"+limit.getUid(),a.bindHashChange(),i}return o(e,t),i(e,[{key:"bindHashChange",value:function(){var t=this,n=t.state;a.on(n.eventUid,function(n){var r=e.parseHash();r&&t.emit(r.hash,r.search)}),a.trigger(n.eventUid)}},{key:"destroy",value:function(){var t=this,e=t.state;a.off(e.eventUid),delete t.state,delete t.props}}],[{key:"parseHash",value:function(){var t=decodeURIComponent(location.hash),e=t.match(c);if(e){var n=e[1],r=limit.parseString(e[2]);return{hash:n,search:r}}}},{key:"setSearch",value:function(t,n){var r=e,o=r.parseHash(),i=void 0;return n||(n=o.hash),i=limit.isFunction(t)?limit.unParseString(t(o.search)):limit.unParseString(t),i=i?n+"?"+i:""+n,location.hash=encodeURIComponent(i),r}},{key:"setHash",value:function(t){var n=e,r=void 0;if(limit.isFunction(t)){var o=n.parseHash();r=limit.toString(t(o.hash,o.search))}else r=limit.toString(t);return location.hash=encodeURIComponent(r),n}}]),e}(u);t.exports=s},164:function(t,e,n){"use strict";var r=n(165);ReactDOM.render(React.createElement(r,null),document.getElementById("container"))},165:function(t,e,n){"use strict";t.exports=n(15)(n(166),n(169))},166:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();n(167);var u=n(122),c=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),a(e,[{key:"render",value:function(){var t=this,e=t.props;return React.createElement("div",{className:"qrcode-easy"},React.createElement("div",{ref:"qrcode",className:"qrcode-easy-main"}),e.info?React.createElement("div",{className:"qrcode-easy-info"},e.info):void 0)}},{key:"componentDidMount",value:function(){var t=this;new u({show:function(e){Actions(t).changeUrl(e)}})}},{key:"componentDidUpdate",value:function(){var t=this,e=t.props,n=t.refs,r=n.qrcode;$(r).html("").qrcode({width:200,height:200,text:e.url})}}]),e}(React.Component);t.exports=c},167:function(t,e,n){var r=n(168);"string"==typeof r&&(r=[[t.id,r,""]]);n(22)(r,{});r.locals&&(t.exports=r.locals)},168:function(t,e,n){e=t.exports=n(21)(),e.push([t.id,".qrcode-easy{position:absolute;width:200px;top:50%;left:50%;transform:translate(-50%,-50%)}.qrcode-easy-info{font-size:16px;margin-top:10px}",""])},169:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(38),c=function(t){function e(){var t,n,i,a;r(this,e);for(var u=arguments.length,c=Array(u),s=0;s<u;s++)c[s]=arguments[s];return n=i=o(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(c))),i.state={url:"",info:""},a=n,o(i,a)}return i(e,t),a(e,[{key:"onChangeUrl",value:function(t){var e=this,n=e.state;n.url=t.url,n.info=t.info,e.updateComponent()}}]),e}(u);t.exports=c}});
//# sourceMappingURL=main.js.map