webpackJsonp([13],{109:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(222),i=r(o),a=n(1),u=r(a),c=n(225),s=r(c),f=(0,u["default"])(i["default"],s["default"]);t["default"]=f},222:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(223);var c=n(224),s=(r(c),n(8)),f=r(s),l=n(14),p=r(l),d=n(3),h=r(d),v=n(16),b=r(v),y=function(e,t){void 0!==e.srcObject?e.srcObject=t:void 0!==e.mozSrcObject?e.mozSrcObject=t:void 0!==e.src?e.src=URL.createObjectURL(t):console.log("Error attaching stream to element.")},m=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this,t=e.props;return React.createElement("div",{className:e.getClassName("page-video-camera")},React.createElement("video",{autoPlay:"autoplay",ref:"video",width:t.width,height:t.height}),React.createElement("div",{className:"fn-MT10"},React.createElement(f["default"],{value:"截 图",onClick:e.doScreenshots.bind(e)})),t.isShots?React.createElement("canvas",{ref:"canvas",className:"fn-hide"}):void 0)}},{key:"componentDidMount",value:function(){var e=this,t=e.refs.video;$(t).attr("playsinline","true"),$(t).prop("muted","muted"),navigator.getUserMedia({audio:!0,video:!0},function(e){y(t,e),alert(123)},function(e){console.log(e)})}},{key:"doScreenshots",value:function(){var e=this;return Actions(e).screenshots(!0).then(function(){return e.drawImg()}).then(function(e){return new p["default"]({url:"/common/database64.json",type:"post",data:{database:e}})}).then(function(e){b["default"].success("保存成功")})["catch"](function(e){return limit.err(e)})}},{key:"drawImg",value:function(){var e=this,t=e.refs,n=t.canvas,r=t.video,o=e.props,i=o.width,a=o.height,u=n.getContext("2d");return n.width=i,n.height=a,u.scale(i/r.videoWidth,a/r.videoHeight),u.drawImage(r,0,0),n.toDataURL()}},{key:"componentDidUpdate",value:function(){}},{key:"componentWillUnmount",value:function(){}}]),t}(h["default"]);t["default"]=m},223:function(e,t,n){t=e.exports=n(0)(),t.push([e.i,,""])},224:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(e){function t(){var e,n,i;r(this,t);var a=(e=n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),n.props={videoConfig:{audio:!0,video:!0}},e),u=limit.assign(a.state,a.props);return i=new Promise(function(e,t){a.getUserMedia().then(function(n){return n.call(navigator,u.videoConfig,e,t)})}),o(n,i)}return i(t,e),a(t,[{key:"getUserMedia",value:function(){return new Promise(function(e,t){var n=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;n?e(n):t("getUserMedia is undefined")})}}]),t}(limit.Events);t["default"]=u},225:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(2),c=function(e){return e&&e.__esModule?e:{"default":e}}(u),s=function(e){function t(){var e,n,i,a;r(this,t);for(var u=arguments.length,c=Array(u),s=0;s<u;s++)c[s]=arguments[s];return n=i=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),i.state={isShots:!1,width:400,height:300},a=n,o(i,a)}return i(t,e),a(t,[{key:"onScreenshots",value:function(e){var t=this;return t.state.isShots=e,t.updateComponent()}}]),t}(c["default"]);t["default"]=s}});
//# sourceMappingURL=index.js.map