!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n=window.webpackJsonp;window.webpackJsonp=function(t,o,i){for(var a,u,c=0,s=[];c<t.length;c++)u=t[c],r[u]&&s.push(r[u][0]),r[u]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);for(n&&n(t,o,i);s.length;)s.shift()()};var o={},r={22:0};t.e=function(e){function n(){u.onerror=u.onload=null,clearTimeout(c);var t=r[e];0!==t&&(t&&t[1](new Error("Loading chunk "+e+" failed.")),r[e]=void 0)}var o=r[e];if(0===o)return new Promise(function(e){e()});if(o)return o[2];var i=new Promise(function(t,n){o=r[e]=[t,n]});o[2]=i;var a=document.getElementsByTagName("head")[0],u=document.createElement("script");u.type="text/javascript",u.charset="utf-8",u.async=!0,u.timeout=12e4,t.nc&&u.setAttribute("nonce",t.nc),u.src=t.p+"js/"+({0:"bus/notFound",1:"bus/noPermission",2:"bus/mobile/page3",3:"bus/mobile/page2",4:"bus/mobile/page1",5:"bus/login"}[e]||e)+".js";var c=setTimeout(n,12e4);return u.onerror=u.onload=n,a.appendChild(u),i},t.m=e,t.c=o,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t.oe=function(e){throw console.error(e),e},t(t.s=88)}({0:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},1:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(5),s=function(e){return e&&e.__esModule?e:{"default":e}}(c),l=function(e,t){var n=function(n){function c(e){o(this,c);var n=r(this,(c.__proto__||Object.getPrototypeOf(c)).apply(this,arguments)),i=n,a=void 0,u=i.clearProps(e);return a=i.__controller__=new t(u),a.com=i,i.state=limit.assign({},a.getInitialState(),u),a.props=i.getPerProps(u),a.state=i.getPerState(i.state),i.state.actionId=i.getActionId(t),i.state.actionUUid=a.Actions.actionUUid="uuid"+limit.getUid(),e.actionCid&&(i.state.actionCid=a.Actions.actionCid=e.actionCid),s["default"].set(i.state.actionId,a.Actions),n}return i(c,n),u(c,[{key:"getActionId",value:function(e){return e.defaultProps&&e.defaultProps.actionId||"uaid"+limit.getUid()}},{key:"getPerProps",value:function(e){var n=this,o={};return limit.each(n.clearProps(t.defaultProps),function(t,n){o[n]=e[n]}),o}},{key:"getPerState",value:function(e){var t=this,n={};return limit.each(t.__controller__.state,function(t,o){n[o]=e[o]}),n}},{key:"componentWillReceiveProps",value:function(e){this.propsFromOther=!0}},{key:"shouldComponentUpdate",value:function(){var e=this,t=!!e.propsFromOther;return!e.state.shouldComponentNotUpdate||(!t||(e.propsFromOther=!1))}},{key:"clearProps",value:function(e){var t=limit.assign({},e);return delete t.actionId,delete t.actionUUid,delete t.actionCid,t}},{key:"componentWillUpdate",value:function(e){var t=this,n=t.__controller__;t.propsFromOther&&(limit.assign(t.state,t.clearProps(e)),n.state=t.getPerState(t.state),n.props=t.getPerProps(t.state),limit.isFunction(n.componentWillUpdate)&&(n.componentWillUpdate(t.state),limit.assign(t.state,n.state)))}},{key:"componentDidUpdate",value:function(){this.propsFromOther=!1}},{key:"render",value:function(){var t=this;return React.createElement(e,a({},t.state,{ref:"com"}))}},{key:"componentWillUnmount",value:function(){var e=this;s["default"].remove(e.state.actionId,e.__controller__.Actions),e.__controller__.destroy()}}]),c}(React.Component);return n.defaultProps=t.defaultProps,n.propTypes=t.propTypes,n};t["default"]=l},2:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=limit.promise(),a=/on([A-Z])(\w*)/,u=function(){function e(){o(this,e),this.bindEvent()}return r(e,[{key:"bindEvent",value:function(){var e=this,t=e.Actions={};limit(e.findAllPro()).filter(function(e,t){return a.test(t)}).each(function(n,o){var r=o.replace(a,function(e,t,n){return t.toLowerCase()+n});t[r]=function(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];return e.state.actionStatus=r,n.apply(e,o)}})}},{key:"findAllPro",value:function(){for(var e=this,t={},n=e.constructor.prototype;n&&n.constructor!==Object;)limit(n).keysSuper().each(function(e){"__proto__"===e||t[e]||(t[e]=n[e])}),n=n.__proto__;return t}},{key:"getInitialState",value:function(){return this.state||(this.state={})}},{key:"destroy",value:function(){var e=this;return limit.each(e,function(t,n){delete e[n]}),e}},{key:"trigger",value:function(e,t){this.com.setState(e,t)}},{key:"updateComponent",value:function(){var e=this,t=e.getInitialState();return new i(function(n){e.trigger(t,n.bind(null,"updateComponentSuccess"))})}}]),e}();t["default"]=u},3:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),a(t,[{key:"getClassName",value:function(){for(var e=this,t=e.props,n=t.className,o=arguments.length,r=Array(o),i=0;i<o;i++)r[i]=arguments[i];return r.push(n),r.filter(limit.K).join(" ")}}]),t}(React.Component);t["default"]=u},4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={};o.textSelect=function(e,t,n){if(e.setSelectionRange)e.setSelectionRange(t,n),e.focus();else if(e.createTextRange){var o=e.createTextRange();o.moveStart("character",t),o.moveEnd("character",n),t===n&&o.collapse(!0),o.select()}};var r=document,i=o.isIE8=function(){return 8===r.documentMode};o.isIEOld=function(e,t){return i()?t:e},o.clearDom=function(e){var t=document.createElement("div");t.appendChild(e),t.innerHTML="",t=null};var a=o.getStaticFun=function(e,t){if(e){var n=e[t];return n||a(e.__proto__,t)}};o.setStaticProps=function(e,t){var n=limit.assign({},t);["name","length","__proto__","prototype"].forEach(function(e){delete n[e]}),limit.assign(e,n)},t["default"]=o},5:function(e,t,n){"use strict";function o(e,t){if(limit.isObjectSuper(e))return e.props[t]||e.state[t]}function r(e){return c[o(e,"actionId")||e]||[]}function i(e,t){var n=r(e);if(t)return n.filter(function(e){return e.actionCid===t});var i=o(e,"actionUUid");return i?n.filter(function(e){return e.actionUUid===i}):n}function a(e,t){var n=i(e,t),o={};return n.length&&limit.each(n[0],function(e,t){limit.isFunction(e)?o[t]=function(){for(var e=arguments.length,o=Array(e),r=0;r<e;r++)o[r]=arguments[r];return Promise.all(n.map(function(e){return e[t].apply(e,o)}))}:o[t]=n.map(function(e){return e[t]}).join(",")}),o}Object.defineProperty(t,"__esModule",{value:!0});var u=window.Actions=function(e,t){return a(e,t)},c=u.pool={};u.set=function(e,t){var n=c[e];n?n.push(t):c[e]=[t]},u.get=function(e,t){return i(e,t)},u.remove=function(e,t){var n=c[e];n&&(limit.remove(n,t),n.length||delete c[e])},t["default"]=u},6:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(7),s=o(c),l=n(4),f=o(l),p=function(e){function t(e){var n,o;r(this,t);var a=(n=o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),o.props={linksList:[],defaultWhiteList:null,whiteList:null,notFound:"notFound",noPermission:"noPermission",login:"login"},n);return limit.assignSuper(a.state,a.props,e),a.bindHashChange(),o}return a(t,e),u(t,[{key:"checkHash",value:function(e){var n=this,o=n.state,r=o.linksList,i=o.notFound,a=o.noPermission,u=o.defaultWhiteList,c=o.whiteList,s=o.login;return limit.contains(r,e)?null===c?null===u||(!!limit(u).concat([i,a,s]).contains(e).val()||t.setHash(s)):!!limit(u).concat(c,[i,a,s]).contains(e).val()||t.setHash(a):t.setHash(i)}}]),t}(s["default"]);f["default"].setStaticProps(p,s["default"]),t["default"]=p},7:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=$(window),c=limit.Events,s=/^#([^?]*)(?:\?(.*))?/,l=function(e){function t(e){var n,i;o(this,t);var a=(n=i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),i.props={defaultHash:""},n);return limit.assignSuper(a.state,a.props,e),limit.each(a.state.rule,function(e,t){return a.on(t,e)}),a.state.eventUid="hashchange.router"+limit.getUid(),i}return i(t,e),a(t,[{key:"setDefaultHash",value:function(){var e=this,n=e.state;!t.parseHash()&&n.defaultHash&&t.setHash(n.defaultHash)}}]),a(t,[{key:"checkHash",value:function(e){return e}},{key:"bindHashChange",value:function(){var e=this,n=e.state;u.on(n.eventUid,function(n){var o=t.parseHash();o?e.checkHash(o.hash)&&e.emit(o.hash,o.search):e.setDefaultHash()}),u.trigger(n.eventUid)}},{key:"destroy",value:function(){var e=this,t=e.state;u.off(t.eventUid),delete e.state,delete e.props}}],[{key:"parseHash",value:function(){var e=decodeURIComponent(location.hash),t=e.match(s);if(t){return{hash:t[1],search:limit.parseString(t[2])}}}},{key:"setSearch",value:function(e,n){var o=t,r=o.parseHash(),i=void 0;n||(n=r.hash),i=limit.isFunction(e)?limit.unParseString(e(r.search)):limit.unParseString(e),i=i?n+"?"+i:""+n,location.hash=encodeURIComponent(i)}},{key:"setHash",value:function(e){var n=t,o=void 0;if(limit.isFunction(e)){var r=n.parseHash();o=limit.toString(e(r.hash,r.search))}else o=limit.toString(e);location.hash=encodeURIComponent(o)}}]),t}(c);t["default"]=l},88:function(e,t,n){"use strict";var o=n(89),r=function(e){return e&&e.__esModule?e:{"default":e}}(o);ReactDOM.render(React.createElement(r["default"],null),document.getElementById("container"))},89:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(90),i=o(r),a=n(1),u=o(a),c=n(92),s=o(c),l=(0,u["default"])(i["default"],s["default"]);t["default"]=l},90:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();n(91);var c=n(6),s=o(c),l=n(3),f=o(l),p=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this,t=e.props.comList;return React.createElement("div",{className:e.getClassName("page-index-h5")},t.map(function(e,t){var n=e.reactCom;return React.createElement("div",{key:t,style:{left:e.isShow?"0":"100%"},className:"index-h5-one"},React.createElement(n,null))}))}},{key:"componentDidMount",value:function(){var e=this;new s["default"]({defaultHash:"mobile/page1",linksList:["mobile/page1","mobile/page2","mobile/page3","login","notFound","noPermission"],rule:{"mobile/page1":function(){n.e(4).then(function(t){var o=n(23)["default"];Actions(e).changeCom(o)}.bind(null,n))["catch"](n.oe)},"mobile/page2":function(){n.e(3).then(function(t){var o=n(24)["default"];Actions(e).changeCom(o)}.bind(null,n))["catch"](n.oe)},"mobile/page3":function(){n.e(2).then(function(t){var o=n(25)["default"];Actions(e).changeCom(o)}.bind(null,n))["catch"](n.oe)},login:function(){n.e(5).then(function(t){var o=n(22)["default"];Actions(e).changeCom(o)}.bind(null,n))["catch"](n.oe)},notFound:function(){n.e(0).then(function(t){var o=n(27)["default"];Actions(e).changeCom(o)}.bind(null,n))["catch"](n.oe)},noPermission:function(){n.e(1).then(function(t){var o=n(26)["default"];Actions(e).changeCom(o)}.bind(null,n))["catch"](n.oe)}}})}},{key:"componentDidUpdate",value:function(){}},{key:"componentWillUnmount",value:function(){}}]),t}(f["default"]);t["default"]=p},91:function(e,t,n){t=e.exports=n(0)(),t.push([e.i,,""])},92:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(2),c=function(e){return e&&e.__esModule?e:{"default":e}}(u),s=function(e){function t(){var e,n,i,a;o(this,t);for(var u=arguments.length,c=Array(u),s=0;s<u;s++)c[s]=arguments[s];return n=i=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),i.state={comList:[]},a=n,r(i,a)}return i(t,e),a(t,[{key:"onChangeCom",value:function(e){var t=this,n=t.state.comList;return n.length&&n.some(function(t){return t.reactCom===e})?(limit(n).reverse().some(function(t){if(t.reactCom===e)return!0;t.isShow=!1}),t.updateComponent().then(function(){setTimeout(t.onDelCom.bind(t,e),300)})):t.onAddCom(e)}},{key:"onAddCom",value:function(e){var t=this,n=t.state.comList,o={isShow:!1,reactCom:e};return n.push(o),t.updateComponent().then(function(){setTimeout(function(){return o.isShow=!0,t.updateComponent()},100)})}},{key:"onDelCom",value:function(e){var t=this,n=t.state.comList,o=limit.last(n);if(o)return o.reactCom!==e?(n.pop(),t.onDelCom(e)):t.updateComponent()}}]),t}(c["default"]);t["default"]=s}});
//# sourceMappingURL=main.js.map