!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}([function(e,t,n){e.exports=n(26)},,function(e,t){e.exports=jQuery},function(e,t){e.exports=limit},,,,,,,,,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(3),i=function(){function e(t){r(this,e),this.props={list:[[255,0,0],[255,122,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255]],totle:100},this.state={};var n=this;return a.assign(n.state,n.props,t),n.parseList()}return o(e,[{key:"parseList",value:function(){var e=this,t=e.state,n=t.list,r=[],o=n.length,a=Math.ceil((t.totle-o)/(o-1)+2);return n.forEach(function(t,o){var i=n[++o];i?(r.push(t),Array.prototype.push.apply(r,e.getColorRange(a,t,i))):r.push(t)}),r}},{key:"getColorRange",value:function(){var e=arguments.length<=0||void 0===arguments[0]?10:arguments[0],t=arguments.length<=1||void 0===arguments[1]?[255,0,0]:arguments[1],n=arguments.length<=2||void 0===arguments[2]?[0,255,0]:arguments[2];e--;var r=a.from(new Array(t.length),function(r,o){return Math.floor((t[o]-n[o])/e)});return a.from(new Array((--e)),function(e,n){return n++,[t[0]-r[0]*n,t[1]-r[1]*n,t[2]-r[2]*n]})}}]),e}();e.exports=i},,,,,,,,,,function(e,t){"use strict";e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<t.length;o++){var i=t[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=d[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(c(r.parts[a],t))}else{for(var i=[],a=0;a<r.parts.length;a++)i.push(c(r.parts[a],t));d[r.id]={id:r.id,refs:1,parts:i}}}}function o(e){for(var t=[],n={},r=0;r<e.length;r++){var o=e[r],a=o[0],i=o[1],u=o[2],s=o[3],c={css:i,media:u,sourceMap:s};n[a]?n[a].parts.push(c):t.push(n[a]={id:a,parts:[c]})}return t}function a(e,t){var n=y(),r=b[b.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function i(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function u(e){var t=document.createElement("style");return t.type="text/css",a(e,t),t}function s(e){var t=document.createElement("link");return t.rel="stylesheet",a(e,t),t}function c(e,t){var n,r,o;if(t.singleton){var a=m++;n=g||(g=u(t)),r=l.bind(null,n,a,!1),o=l.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=s(t),r=p.bind(null,n),o=function(){i(n),n.href&&URL.revokeObjectURL(n.href)}):(n=u(t),r=f.bind(null,n),o=function(){i(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}function l(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=w(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function f(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function p(e,t){var n=t.css,r=t.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([n],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(o),a&&URL.revokeObjectURL(a)}var d={},h=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},v=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),y=h(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,m=0,b=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=v()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=o(e);return r(n,t),function(e){for(var a=[],i=0;i<n.length;i++){var u=n[i],s=d[u.id];s.refs--,a.push(s)}if(e){var c=o(e);r(c,t)}for(var i=0;i<a.length;i++){var s=a[i];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete d[s.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},,,function(e,t,n){"use strict";n(27);var r=(n(2),n(3),n(12)),o=n(29),a=n(30),i=new o({rotate:-90}),u=new r({totle:360});new a({count:360,onAnalyser:function(e){i.clearRect(),e.forEach(function(e,t){var n=t/2,r=360-n;i.drawLine(n,e/10,"rgb("+u[t].join(",")+")"),i.drawLine(r,e/10)});var t=e.length-1;i.drawLine(180,e[t]/10,"rgb("+u[t].join(",")+")"),i.drawArc()}})},function(e,t,n){var r=n(28);"string"==typeof r&&(r=[[e.id,r,""]]);n(23)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(22)(),t.push([e.id,"body,html{width:100%;height:100%}",""])},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(3),i=function(){function e(t){r(this,e),this.props={element:null,radius:200,rotate:0,arcColor:"#000"},this.state={},this.canvas=null,this.element=null,this.context=null;var n=this;a.assign(n.state,n.props,t),n.initElement(),n.initCanvas(),n.drawArc()}return o(e,[{key:"initElement",value:function(){var e=this,t=e.state;t.element?e.element=t.element:e.element=document.body}},{key:"initCanvas",value:function(){var e=this,t=e.state,n=e.element,r=document.createElement("canvas"),o=r.getContext("2d");n.appendChild(r),r.width=n.clientWidth,r.height=n.clientHeight,e.canvas=r,e.context=o,t.centerX=r.width/2,t.centerY=r.height/2}},{key:"drawArc",value:function(){var e=this,t=e.state,n=(e.canvas,e.context);n.beginPath(),n.arc(t.centerX,t.centerY,t.radius,0,e.getRadianByAngle(360)),n.closePath(),n.strokeStyle=t.arcColor,n.stroke()}},{key:"drawLine",value:function(e,t,n){var r=this,o=r.state,a=r.context;a.beginPath(),a.moveTo.apply(a,r.compute(e+o.rotate,o.radius)),a.lineTo.apply(a,r.compute(e+o.rotate,o.radius+t)),a.closePath(),a.strokeStyle=n,a.stroke()}},{key:"clearRect",value:function(){var e=this,t=e.canvas;e.context.clearRect(0,0,t.width,t.height)}},{key:"drawRect",value:function(){}},{key:"compute",value:function(e,t){var n=this,r=n.state,o=Math.cos(n.getRadianByAngle(e))*t+r.centerX,a=Math.sin(n.getRadianByAngle(e))*t+r.centerY;return[o,a]}},{key:"getRadianByAngle",value:function(e){return e/180*Math.PI}}]),e}();e.exports=i},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(3),i=function(){function e(t){r(this,e),this.props={element:null,radius:200,url:"./music.mp3",onLoad:a.K,onError:a.K,onAnalyser:a.K,onProgress:a.K,count:720},this.state={},this.AC=null,this.audioBuffer=null;var n=this;a.assign(n.state,n.props,t),n.getAudioContext(),n.getAudio().then(function(e){return n.getRealBuffer(e)}).then(function(e){n.audioBuffer=e,n.bindAudioWithBuffer()})}return o(e,[{key:"getAudio",value:function(){var e=this,t=e.state;return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("GET",t.url),r.responseType="arraybuffer",r.onprogress=function(e){var n=e.total||r.getResponseHeader("Conent-Length");t.onProgress(a(e.loaded/n,e.timeStamp).toFixed(2).val())},r.onload=function(n){e(n.target.response),t.onLoad(n)},r.onerror=function(e){n(e),t.onError(e)},r.send(null)})}},{key:"getAudioContext",value:function(){var e=this,t=new window.AudioContext;e.AC=t}},{key:"creatAnalyser",value:function(){var e=this,t=e.AC,n=t.createAnalyser(),r=t.createBufferSource();return{analyser:n,audioBufferSouceNode:r}}},{key:"getRealBuffer",value:function(e){var t=this,n=t.AC;return new Promise(function(t,r){n.decodeAudioData(e,t,r)})}},{key:"bindAudioWithBuffer",value:function(){var e=this,t=e.creatAnalyser(),n=t.analyser,r=t.audioBufferSouceNode;r.connect(n),n.connect(e.AC.destination),r.buffer=e.audioBuffer,r.loop=!0,r.start(),e.analyser(n)}},{key:"analyser",value:function(e){var t=this,n=t.state,r=new Uint8Array(n.count||e.frequencyBinCount);e.getByteFrequencyData(r),n.onAnalyser(r),requestAnimationFrame(t.analyser.bind(t,e))}}]),e}();e.exports=i}]);
//# sourceMappingURL=main.js.map