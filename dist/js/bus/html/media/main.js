!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}({0:function(e,t,n){e.exports=n(23)},2:function(e,t){e.exports=jQuery},3:function(e,t){e.exports=limit},23:function(e,t,n){"use strict";var r=(n(2),n(3),n(24));(new r).viewCanvas()},24:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(3),c=n(25),l=function(e){function t(e){a(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));f.call(n);var r=n;return s.assignSuper(r.state,r.props,e),r.initElement(),n}return o(t,e),u(t,[{key:"destroy",value:function(){var e=this;e.stop();var t=document.createElement("div");t.appendChild(e.canvas),t.innerHTML="",t=null}},{key:"viewCanvas",value:function(){var e=this;e.initCanvas(),e.getUserMediaArray().then(function(){e.start()})}},{key:"initElement",value:function(){var e=this,t=e.state;t.element?e.element=t.element:e.element=document.body}},{key:"initCanvas",value:function(){var e=this,t=e.state,n=document.createElement("canvas");e.canvas=n,e.element.appendChild(n),n.width=t.width,n.height=t.height,e.context=n.getContext("2d")}},{key:"drawCanvas",value:function(e){var t=this,n=t.state,a=t.context;t.parseData().forEach(function(i,o){a.fillStyle="#CCC",o<e&&(a.fillStyle=n.color),t.roundRect.apply(a,[].concat(r(i),[n.radius]))})}},{key:"roundRect",value:function(e,t,n,r,a){var i=this,o=Math.min(n,r);a>o/2&&(a=o/2),i.beginPath(),i.moveTo(e+a,t),i.arcTo(e+n,t,e+n,t+r,a),i.arcTo(e+n,t+r,e,t+r,a),i.arcTo(e,t+r,e,t,a),i.arcTo(e,t,e+n,t,a),i.closePath(),i.fill()}},{key:"parseData",value:function(){var e=this,t=e.state,n=t.width-t.space*t.part,r=Math.floor(n/t.part);return s.from(new Array(t.part)).map(function(e,n){var a=(r+t.space)*n;return[a,0,r,t.height]})}}]),t}(c),f=function(){this.props={element:null,width:200,height:40,part:10,space:5,radius:4,increase:30,color:"#4d90fe",changeArray:function(e){var t=this,n=t.state,r=e.length;r-=r*n.increase/100;var a=e.reduce(function(e,t){return e+t})/r;a=s(a).except(256).multiply(10).toFixed().val(),t.drawCanvas(a)}},this.context=null,this.canvas=null};e.exports=l},25:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(3),o=function(){function e(t){r(this,e),this.props={fftSize:128,changeArray:i.K},this.state={},this.stream=null,this.analyser=null,this.frameId=null;var n=this;i.assignSuper(n.state,n.props,t)}return a(e,[{key:"start",value:function(){var e=this;e.frameId=requestAnimationFrame(e.getArrayByAnalyser.bind(e))}},{key:"stop",value:function(){var e=this;cancelAnimationFrame(e.frameId)}},{key:"getArrayByAnalyser",value:function(){var e=this,t=e.state,n=e.analyser.frequencyBinCount,r=new Uint8Array(n);e.analyser.getByteFrequencyData(r),t.changeArray.call(e,r),e.frameId=requestAnimationFrame(e.getArrayByAnalyser.bind(e))}},{key:"getAnalyserByStream",value:function(){var e=this,t=e.state;return e.getAudioContext().then(function(n){var r=n.createMediaStreamSource(e.stream),a=n.createAnalyser();a.fftSize=t.fftSize,r.connect(a),e.analyser=a})}},{key:"getAudioContext",value:function(){return new Promise(function(e,t){var n=window.AudioContext;n?e(new n):t("can not found AudioContext")})}},{key:"getUserMediaStream",value:function(){return new Promise(function(e,t){var n=navigator,r=n.getUserMedia||n.webkitGetUserMedia||n.mozGetUserMedia||n.msGetUserMedia;r?r.call(n,{audio:!0},function(t){e(t)},function(e){t(e)}):t("can not found getMedia")})}},{key:"getUserMediaArray",value:function(){var e=this;return e.getUserMediaStream().then(function(t){return console.log(t),e.stream=t,e.getAnalyserByStream()})["catch"](function(e){i.err(e)})}}]),e}();e.exports=o}});
//# sourceMappingURL=main.js.map