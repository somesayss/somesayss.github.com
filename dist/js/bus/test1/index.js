webpackJsonp([2],{137:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(138);var l=n(3),c=r(l),f=n(94),s=r(f),p=n(10),y=r(p),d=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),i(t,[{key:"render",value:function(){var e=this;e.props;return React.createElement("div",{className:e.getClassName("page-test1")},"pageTest1",React.createElement(s["default"],null,React.createElement(y["default"],{type:"text",placeholder:"请填写姓名",rule:"required",errMessage:"姓名必填",name:"name"}),React.createElement("br",null),React.createElement("br",null)))}},{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"componentWillUnmount",value:function(){}}]),t}(c["default"]);t["default"]=d},138:function(e,t,n){t=e.exports=n(0)(),t.push([e.i,,""])},139:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2),l=function(e){return e&&e.__esModule?e:{"default":e}}(i),c=function(e){function t(){var e,n,a,u;r(this,t);for(var i=arguments.length,l=Array(i),c=0;c<i;c++)l[c]=arguments[c];return n=a=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),a.state={},u=n,o(a,u)}return a(t,e),u(t,[{key:"onClick",value:function(){console.log(123)}}]),t}(l["default"]);t["default"]=c},89:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(137),a=r(o),u=n(1),i=r(u),l=n(139),c=r(l),f=(0,i["default"])(a["default"],c["default"]);t["default"]=f},94:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(95),a=r(o),u=n(1),i=r(u),l=n(97),c=r(l),f=(0,i["default"])(a["default"],c["default"]);t["default"]=f},95:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(96);var i=n(3),l=function(e){return e&&e.__esModule?e:{"default":e}}(i),c=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"cloneAllChild",value:function(e){var t=this,n=t.props,r=e.props;if(r){if("limitForm"===r.actionId)return React.cloneElement(e,{validaor:n.validaor});if(r.children)return React.cloneElement(e,{},React.Children.map(r.children,function(e){return t.cloneAllChild(e)}))}return e}},{key:"render",value:function(){var e=this,t=e.props;return React.createElement("form",{ref:"form",action:t.action,onSubmit:Actions(e).submit,onReset:Actions(e).reset},React.Children.map(t.children,function(t){return e.cloneAllChild(t)}))}},{key:"componentWillUnmount",value:function(){this.props.validaor.destroy()}}]),t}(l["default"]);t["default"]=c},96:function(e,t,n){t=e.exports=n(0)(),t.push([e.i,,""])},97:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(98),c=r(l),f=n(2),s=r(f),p=function(e){function t(){var e,n,r,u;o(this,t);for(var i=arguments.length,l=Array(i),f=0;f<i;f++)l[f]=arguments[f];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.state={validaor:new c["default"]},u=n,a(r,u)}return u(t,e),i(t,[{key:"onSubmit",value:function(e){var t=this,n=t.state,r=t.props;n.validaor.execute()?(e.preventDefault(),r.executeError()):r.executeSuccess()}},{key:"onReset",value:function(){var e=this,t=e.state;e.props;t.validaor.reset()}}]),t}(s["default"]);p.defaultProps={action:"javascript:;",executeSuccess:limit.K,executeError:limit.K},t["default"]=p},98:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(99),c=function(e){return e&&e.__esModule?e:{"default":e}}(l),f=function(){return!0},s=/(\w+)(?:\((.*)?\))?/,p=function(e){function t(e){var n,r;o(this,t);var u=(n=r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),r.props={originData:{},validatMap:{}},n);return limit.assign(u.state,u.props,e),r}return u(t,e),i(t,[{key:"removeData",value:function(e){delete this.state.originData[e]}},{key:"addData",value:function(e,t){this.state.originData[e]=t}},{key:"getData",value:function(e){return this.state.originData[e]}},{key:"addMap",value:function(e,t,n){var o=this,a=o.state;if(limit.isFunction(t))a.validatMap[e]=t;else{var u=t.split(","),i=n.split(",");a.validatMap[e]=function(e){var t=void 0;return u.filter(limit.K).every(function(n,a){var u=n.match(s),l=o.getRuleFunByRule(u[1]),c=o.getRuleArgByRuleAndVal(u[2],e),f=l.apply(void 0,r(c));return f||(t=i[a]),f}),t}}}},{key:"getMap",value:function(e){return this.state.validatMap[e]}},{key:"getRuleFunByRule",value:function(e){var t=c["default"][e];return t||f}},{key:"getRuleArgByRuleAndVal",value:function(e,t){return e?(e=e.split(",").map(function(e){return JSON.parse(e)}),[t].concat(r(e))):[t]}},{key:"executeData",value:function(){var e=this,t=e.state,n=t.originData,r=t.validatMap,o=[];limit.each(r,function(e,t){var r=n[t];if(limit.isDefined(r)){var a=e(r);a&&(e=r,o.push({key:t,val:e,err:a}))}});var a=o.length;return o.length?(limit.war(o),e.emit("error",o)):e.emit("success"),!!a}},{key:"execute",value:function(){var e=this,t=e.state,n=(t.originData,t.validatMap);return limit.each(n,function(t,n){e.emit(n+"Validat")}),e.executeData()}},{key:"reset",value:function(e){var t=this,n=t.state,r=(n.originData,n.validatMap);limit.each(r,function(e,n){t.emit(n+"Reset")})}}]),t}(limit.Events);t["default"]=p},99:function(e,t,n){"use strict";function r(e){return e.replace(a,"")}Object.defineProperty(t,"__esModule",{value:!0});var o={};o.required=function(e){return""!==e},o.number=function(e){return/^\d*$/.test(e)},o.min=function(e,t){return""===e||r(e).length>=t},o.max=function(e,t){return""===e||r(e).length<=t};var a=/\r/g;t["default"]=o}});
//# sourceMappingURL=index.js.map