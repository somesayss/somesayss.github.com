!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n=window.webpackJsonp;window.webpackJsonp=function(e,r,i){for(var a,u,c=0,l=[];c<e.length;c++)u=e[c],o[u]&&l.push(o[u][0]),o[u]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);for(n&&n(e,r,i);l.length;)l.shift()()};var r={},o={6:0};e.e=function(t){function n(){u.onerror=u.onload=null,clearTimeout(c);var e=o[t];0!==e&&(e&&e[1](new Error("Loading chunk "+t+" failed.")),o[t]=void 0)}var r=o[t];if(0===r)return new Promise(function(t){t()});if(r)return r[2];var i=new Promise(function(e,n){r=o[t]=[e,n]});r[2]=i;var a=document.getElementsByTagName("head")[0],u=document.createElement("script");u.type="text/javascript",u.charset="utf-8",u.async=!0,u.timeout=12e4,e.nc&&u.setAttribute("nonce",e.nc),u.src=e.p+"js/"+({0:"bus/tally/main",1:"bus/validator/main",2:"bus/calendar/main",3:"bus/test3/main",4:"bus/test2/main",5:"bus/test1/main"}[t]||t)+".js";var c=setTimeout(n,12e4);return u.onerror=u.onload=n,a.appendChild(u),i},e.m=t,e.c=r,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e.oe=function(t){throw console.error(t),t},e(e.s=4)}([function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(10),l=function(t){return t&&t.__esModule?t:{"default":t}}(c),s=function(t,e){var n=function(n){function c(t){r(this,c);var n=o(this,(c.__proto__||Object.getPrototypeOf(c)).apply(this,arguments)),i=n,a=void 0,u=i.clearProps(t);return a=i.__controller__=new e(u),a.com=i,i.state=limit.assignSuper({},a.getInitialState(),u),a.props=i.getPerProps(u),a.state=i.getPerState(i.state),i.state.actionId=i.state.actionId||"uaid"+limit.getUid(),i.state.actionUUid=a.Actions.actionUUid="uuid"+limit.getUid(),t.actionCid&&(i.state.actionCid=a.Actions.actionCid=t.actionCid),l["default"].set(i.state.actionId,a.Actions),n}return i(c,n),u(c,[{key:"getPerProps",value:function(t){var n={};return limit.each(e.defaultProps,function(e,r){n[r]=t[r]}),n}},{key:"getPerState",value:function(t){var e=this,n={};return limit.each(e.__controller__.state,function(e,r){n[r]=t[r]}),n}},{key:"componentWillReceiveProps",value:function(t){this.propsFromOther=!0}},{key:"shouldComponentUpdate",value:function(){var t=this,e=!!t.propsFromOther;return!t.state.shouldComponentNotUpdate||(!e||(t.propsFromOther=!1))}},{key:"clearProps",value:function(t){var n=limit.assign({},t);return delete n.actionId,delete n.actionUUid,delete n.actionCid,n.actionId=e.defaultProps&&e.defaultProps.actionId,n}},{key:"componentWillUpdate",value:function(t){var e=this,n=e.__controller__;e.propsFromOther&&(limit.assignSuper(e.state,e.clearProps(t)),n.state=e.getPerState(e.state),n.props=e.getPerProps(e.state),limit.isFunction(n.componentWillUpdate)&&(n.componentWillUpdate(e.state),limit.assignSuper(e.state,n.state)))}},{key:"componentDidUpdate",value:function(){this.propsFromOther=!1}},{key:"render",value:function(){var e=this;return React.createElement(t,a({},e.state,{ref:"com"}))}},{key:"componentWillUnmount",value:function(){var t=this;l["default"].remove(t.state.actionId,t.__controller__.Actions),t.__controller__.destroy()}}]),c}(React.Component);return n.defaultProps=e.defaultProps,n.propTypes=e.propTypes,n};e["default"]=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=limit.promise(),a=/on([A-Z])(\w*)/,u=function(){function t(){r(this,t),this.bindEvent()}return o(t,[{key:"bindEvent",value:function(){var t=this,e=t.Actions={};limit(t.findAllPro()).filter(function(t,e){return a.test(e)}).each(function(n,r){var o=r.replace(a,function(t,e,n){return e.toLowerCase()+n});e[o]=function(){for(var e=arguments.length,r=Array(e),i=0;i<e;i++)r[i]=arguments[i];return t.state.actionStatus=o,n.apply(t,r)}})}},{key:"findAllPro",value:function(){for(var t=this,e={},n=t.constructor.prototype;n&&n.constructor!==Object;)limit(n).keysSuper().each(function(t){"__proto__"===t||e[t]||(e[t]=n[t])}),n=n.__proto__;return e}},{key:"getInitialState",value:function(){return this.state||(this.state={})}},{key:"destroy",value:function(){var t=this;return limit.each(t,function(e,n){delete t[n]}),t}},{key:"trigger",value:function(t,e){this.com.setState(t,e)}},{key:"updateComponent",value:function(){var t=this,e=t.getInitialState();return new i(function(n){t.trigger(e,n.bind(null,"updateComponentSuccess"))})}}]),t}();e["default"]=u},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),a(e,[{key:"getClassName",value:function(){for(var t=this,e=t.props,n=e.className,r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.push(n),o.filter(limit.K).join(" ")}}]),e}(React.Component);e["default"]=u},function(t,e,n){"use strict";var r=n(5),o=function(t){return t&&t.__esModule?t:{"default":t}}(r);ReactDOM.render(React.createElement(o["default"],null),document.getElementById("container"))},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),i=r(o),a=n(1),u=r(a),c=n(11),l=r(c),s=(0,u["default"])(i["default"],l["default"]);e["default"]=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();n(7);var c=n(8),l=r(c),s=n(3),f=r(s),p=function(t){function e(){return o(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return a(e,t),u(e,[{key:"render",value:function(){var t=this,e=t.props,n=e.com;return React.createElement("div",{className:t.getClassName("page-index")},n?React.createElement(n,null):null)}},{key:"componentDidMount",value:function(){var t=this;new l["default"]({defaultHash:"test3",rule:{test1:function(){n.e(5).then(function(e){var r=n(12)["default"];console.log("abc",r),Actions(t).changeCom(null)}.bind(null,n))["catch"](n.oe)},test2:function(){n.e(4).then(function(e){var r=n(13)["default"];console.log("def",r),Actions(t).changeCom(null)}.bind(null,n))["catch"](n.oe)},test3:function(){n.e(3).then(function(e){var r=n(14)["default"];Actions(t).changeCom(r)}.bind(null,n))["catch"](n.oe)},tally:function(){n.e(0).then(function(e){var r=n(15)["default"];Actions(t).changeCom(r)}.bind(null,n))["catch"](n.oe)},validator:function(){n.e(1).then(function(e){var r=n(18)["default"];Actions(t).changeCom(r)}.bind(null,n))["catch"](n.oe)},calendar:function(){n.e(2).then(function(e){var r=n(19)["default"];Actions(t).changeCom(r)}.bind(null,n))["catch"](n.oe)}}})}},{key:"componentDidUpdate",value:function(){}},{key:"componentWillUnmount",value:function(){}}]),e}(f["default"]);e["default"]=p},function(t,e,n){e=t.exports=n(0)(),e.push([t.i,,""])},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(9),c=function(t){return t&&t.__esModule?t:{"default":t}}(u),l=function(t){function e(t){var n,i;r(this,e);var a=(n=i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t)),i.props={defaultHash:"",linksList:[],defaultWhiteList:[],whiteList:null,notFound:"notFound",noPermission:"noPermission"},n);return limit.assignSuper(a.state,a.props,t),a.setDefaultHash(),i}return i(e,t),a(e,[{key:"setDefaultHash",value:function(){var t=this,n=t.state;!e.parseHash()&&n.defaultHash&&e.setHash(n.defaultHash)}}]),e}(c["default"]);e["default"]=l},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=$(window),c=limit.Events,l=/^#([^?]*)(?:\?(.*))?/,s=function(t){function e(t){var n,i;r(this,e);var a=(n=i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this)),i.props={},n);return limit.assignSuper(a.state,a.props,t),limit.each(a.state.rule,function(t,e){return a.on(e,t)}),a.state.eventUid="hashchange.router"+limit.getUid(),a.bindHashChange(),i}return i(e,t),a(e,[{key:"bindHashChange",value:function(){var t=this,n=t.state;u.on(n.eventUid,function(n){var r=e.parseHash();r&&t.emit(r.hash,r.search)}),u.trigger(n.eventUid)}},{key:"destroy",value:function(){var t=this,e=t.state;u.off(e.eventUid),delete t.state,delete t.props}}],[{key:"parseHash",value:function(){var t=decodeURIComponent(location.hash),e=t.match(l);if(e){return{hash:e[1],search:limit.parseString(e[2])}}}},{key:"setSearch",value:function(t,n){var r=e,o=r.parseHash(),i=void 0;return n||(n=o.hash),i=limit.isFunction(t)?limit.unParseString(t(o.search)):limit.unParseString(t),i=i?n+"?"+i:""+n,location.hash=encodeURIComponent(i),r}},{key:"setHash",value:function(t){var n=e,r=void 0;if(limit.isFunction(t)){var o=n.parseHash();r=limit.toString(t(o.hash,o.search))}else r=limit.toString(t);return location.hash=encodeURIComponent(r),n}}]),e}(c);e["default"]=s},function(t,e,n){"use strict";function r(t,e){if(limit.isObjectSuper(t))return t.props[e]||t.state[e]}function o(t){return c[r(t,"actionId")||t]||[]}function i(t,e){var n=o(t);if(e)return n.filter(function(t){return t.actionCid===e});var i=r(t,"actionUUid");return i?n.filter(function(t){return t.actionUUid===i}):n}function a(t,e){var n=i(t,e),r={};return n.length&&limit.each(n[0],function(t,e){limit.isFunction(t)?r[e]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return Promise.all(n.map(function(t){return t[e].apply(t,r)}))}:r[e]=n.map(function(t){return t[e]}).join(",")}),r}Object.defineProperty(e,"__esModule",{value:!0});var u=window.Actions=function(t,e){return a(t,e)},c=u.pool={};u.set=function(t,e){var n=c[t];n?n.push(e):c[t]=[e]},u.get=function(t,e){return i(t,e)},u.remove=function(t,e){var n=c[t];n&&(limit.remove(n,e),n.length||delete c[t])},e["default"]=u},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(2),c=function(t){return t&&t.__esModule?t:{"default":t}}(u),l=function(t){function e(){var t,n,i,a;r(this,e);for(var u=arguments.length,c=Array(u),l=0;l<u;l++)c[l]=arguments[l];return n=i=o(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(c))),i.state={com:null},a=n,o(i,a)}return i(e,t),a(e,[{key:"onChangeCom",value:function(t){var e=this;return e.state.com=t,e.updateComponent()}}]),e}(c["default"]);e["default"]=l},,,,,function(t,e){t.exports=React},function(t,e){t.exports=limit}]);
//# sourceMappingURL=main.js.map