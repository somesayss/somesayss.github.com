!function(e){function t(o){if(a[o])return a[o].exports;var r=a[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var a={};return t.m=e,t.c=a,t.p="/dist/",t(0)}([function(e,t,a){e.exports=a(14)},,,function(e,t){e.exports=jQuery},,,,,,,,,,,function(e,t,a){"use strict";var o=a(15);ReactDOM.render(React.createElement(o,{src:"./music.mp3"}),document.getElementById("container"))},function(e,t,a){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}();a(16);var s=a(3),l=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));e.state={playStatus:"stop",muteStatus:"nomute",totleTime:0,thisTime:0,volume:1,error:!0};var a=e,n=a.state,i=a.props;return n.muteStatus=i.muted?"mute":"nomute",e}return n(t,e),i(t,[{key:"render",value:function(){var e=this,t=e.props,a=e.state;return React.createElement("div",{className:"audio-player"},React.createElement("audio",{src:t.src,ref:"audio",loop:t.loop,autoPlay:t.autoPlay,muted:t.muted}),a.error?React.createElement("div",{className:"mark"}):void 0,React.createElement("table",{width:t.audioWidth,height:t.audioHeight},React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",{width:"40"},e.renderToggle()),React.createElement("td",{width:t.timeWidth},React.createElement("span",{className:"show-time",style:{width:t.timeWidth+"px"}},e.parseSecond(a.thisTime)," / ",e.parseSecond(a.totleTime))),React.createElement("td",null,React.createElement("span",{className:"ctr-progress",ref:"progress","data-target":"progress",onClick:e.changeBar.bind(e,"music")},React.createElement("span",{className:"ch-light",style:{width:e.computeBarLeft()+6+"px"}}),React.createElement("i",{className:"ctr-bar",onMouseDown:e.moveBar.bind(e,"music"),onClick:e.stopClick,style:{left:e.computeBarLeft()+"px"}}))),React.createElement("td",{width:"40"},e.renderMute()),React.createElement("td",{width:t.volumeWidth+10},React.createElement("span",{className:"ctr-volume-progress","data-target":"progress",onClick:e.changeBar.bind(e,"volume")},React.createElement("span",{className:"ch-light",style:{width:e.computeVolBarLeft()+6+"px"}}),React.createElement("i",{className:"ctr-bar",onMouseDown:e.moveBar.bind(e,"volume"),onClick:e.stopClick,style:{left:e.computeVolBarLeft()+"px"}}))),React.createElement("td",{width:"10"}," ")))))}},{key:"renderToggle",value:function(){var e=this,t=e.state;e.props;return React.createElement("div",null,"stop"===t.playStatus?React.createElement("i",{className:"btn-switch btn-stop",onClick:t.error?null:e.changePlayStatus.bind(e,"start")}):React.createElement("i",{className:"btn-switch btn-start",onClick:t.error?null:e.changePlayStatus.bind(e,"stop")}))}},{key:"renderMute",value:function(){var e=this,t=e.state;e.props;return React.createElement("span",{className:"ctr-speaker-box"},"mute"===t.muteStatus||0===t.volume?React.createElement("span",{className:"ctr-speaker ctr-mute",onClick:e.muteAudio.bind(e,"nomute")},React.createElement("i",{className:"ch-img1"}),React.createElement("i",{className:"ch-img2"})):React.createElement("span",{className:"ctr-speaker",onClick:e.muteAudio.bind(e,"mute")},React.createElement("i",{className:"ch-img1"}),React.createElement("i",{className:"ch-img2"})))}},{key:"computeBarLeft",value:function(){var e=this,t=e.state,a=(e.props,e.refs),o=a.progress;return o?o.offsetWidth*t.thisTime/t.totleTime-6:-6}},{key:"computeVolBarLeft",value:function(){var e=this,t=e.state,a=e.props;return"mute"===t.muteStatus?-6:a.volumeWidth*t.volume-6}},{key:"componentDidMount",value:function(){var e=this,t=e.refs,a=t.audio;e.audio=a,["canplay","playing","pause","volumechange"].forEach(function(t){a["on"+t]=e["audio"+t.replace(/\w/,function(e){return e.toUpperCase()})].bind(e)}),window.audioEx=a}},{key:"componentWillReceiveProps",value:function(){var e=this;e.shouldNotUpdate=!0}},{key:"shouldComponentUpdate",value:function(){var e=this,t=e.shouldNotUpdate;return t&&(e.shouldNotUpdate=!1),!t}},{key:"changeBar",value:function(e,t){var a=this,o=t.target,r=s(o).closest('[data-target="progress"]'),n=r.width(),i=t.clientX-r.offset().left,l=i/n;"volume"===e&&a.changeVolume(l),"music"===e&&a.changeMusic(l)}},{key:"stopClick",value:function(e){e.preventDefault(),e.stopPropagation()}},{key:"moveBar",value:function(e,t){var a=this,o=a.audio,r=a.props,n=t.target,i=(n.offsetWidth,n.parentNode),s=i.offsetWidth,l=t.clientX,u=parseInt(n.style.left||0),c=0,p=s,d=o.paused,f=null;"music"===e&&(d||(a.isMoveBar=!0,o.pause())),document.onmousemove=function(t){t.preventDefault(),t.stopPropagation();var o=t.clientX-l,r=u+o+6;r<c?r=c:r>p&&(r=p),f=r/p,"volume"===e&&a.changeVolume(f),"music"===e&&a.changeMusic(f)},document.onmouseup=function(t){t.preventDefault(),t.stopPropagation(),document.onmousemove=document.onmouseup=null,"music"===e&&(d||(delete a.isMoveBar,1!==f?o.play():r.loop?o.play():a.audioPause()))}}},{key:"changePlayStatus",value:function(e){var t=this,a=t.audio;"start"===e?a.play():a.pause()}},{key:"changeMusic",value:function(e){var t=this,a=t.audio,o=t.state;o.thisTime=a.currentTime=e*o.totleTime,t.setState(o)}},{key:"changeVolume",value:function(e){var t=this,a=t.audio;t.state;a.volume=+e.toFixed(2)}},{key:"muteAudio",value:function(e){var t=this,a=t.audio;t.state;"mute"===e?a.muted=!0:a.muted=!1}},{key:"audioPause",value:function(){var e=this,t=e.state;clearInterval(e.timeoutId),e.isMoveBar||(t.playStatus="stop"),e.setState(t)}},{key:"audioPlaying",value:function(){var e=this,t=e.state,a=e.audio;t.playStatus="start",delete e.musicEnd,clearInterval(e.timeoutId),e.timeoutId=setInterval(function(){var t=e.state;t.thisTime=a.currentTime,e.setState(t)},1e3),e.setState(t)}},{key:"audioCanplay",value:function(){var e=this,t=e.state,a=e.audio;e.props;t.error=!1,t.totleTime=a.duration,e.changeVolume(t.volume),e.setState(t)}},{key:"audioVolumechange",value:function(){var e=this,t=e.state,a=e.audio;t.volume=a.volume,t.muteStatus=a.muted?"mute":"nomute",e.setState(t)}},{key:"parseSecond",value:function(e){var t=Math.floor(e/60),a=Math.floor(e%60);return a=("00"+a).slice(-2),t+":"+a}}]),t}(React.Component);l.defaultProps={loop:!0,autoPlay:!0,muted:!1,audioWidth:"100%",audioHeight:"32",volumeWidth:90,progressWidth:90,timeWidth:90},e.exports=l},function(e,t,a){var o=a(17);"string"==typeof o&&(o=[[e.id,o,""]]);a(19)(o,{});o.locals&&(e.exports=o.locals)},function(e,t,a){t=e.exports=a(18)(),t.push([e.id,".audio-player{text-align:left;background:#fafafa;position:relative}.audio-player table td{vertical-align:middle;text-align:center;padding:5px;position:relative}.audio-player .mark{position:absolute;width:100%;height:100%;left:0;top:0;background:hsla(0,0%,100%,.5);z-index:1}.audio-player .btn-switch{display:inline-block;width:12px;height:14px;overflow:hidden}.audio-player .btn-switch.btn-start:after,.audio-player .btn-switch.btn-start:before{content:'';float:left;width:4px;height:100%;background:#5a5a5a}.audio-player .btn-switch.btn-start:after{float:right}.audio-player .btn-switch.btn-stop:before{content:'';float:left;width:0;height:0;border-top:7px solid #fafafa;border-bottom:7px solid #fafafa;border-left:12px solid #5a5a5a;border-right:0}.audio-player .show-time{display:inline-block;color:#5a5a5a}.audio-player .ctr-progress{display:inline-block;width:100%;height:100%;position:relative;text-align:left}.audio-player .ctr-progress:before{content:'';position:absolute;width:100%;height:2px;top:50%;margin-top:-1px;background:#dadada}.audio-player .ctr-progress .ch-light{position:absolute;height:2px;top:50%;margin-top:-1px;background:#4285f4}.audio-player .ctr-volume-progress{display:inline-block;width:100%;height:100%;position:relative;text-align:left}.audio-player .ctr-volume-progress:before{content:'';position:absolute;width:100%;height:2px;top:50%;margin-top:-1px;background:#dadada}.audio-player .ctr-volume-progress .ch-light{position:absolute;height:2px;top:50%;margin-top:-1px;background:#4285f4}.audio-player .ctr-bar{position:absolute;width:12px;height:12px;border-radius:12px;background:#4285f4;top:50%;margin-top:-6px}.audio-player .ctr-speaker-box{display:inline-block}.audio-player .ctr-speaker{width:18px;height:18px;display:inline-block;position:relative;overflow:hidden}.audio-player .ctr-speaker .ch-img1{float:left;width:9px;height:100%;position:relative;overflow:hidden}.audio-player .ctr-speaker .ch-img1:before{content:'';float:left;border-top:9px solid #fafafa;border-bottom:9px solid #fafafa;border-right:10px solid #5a5a5a;border-left:0}.audio-player .ctr-speaker .ch-img1:after{content:'';position:absolute;width:6px;height:6px;background:#5a5a5a;left:0;top:50%;margin-top:-3px}.audio-player .ctr-speaker .ch-img2{float:right;width:7px;height:100%;overflow:hidden;position:relative}.audio-player .ctr-speaker .ch-img2:before{content:'';position:absolute;right:0;width:18px;height:18px;border:2px solid #5a5a5a;border-radius:100px}.audio-player .ctr-speaker .ch-img2:after{content:'';position:absolute;right:4px;width:8px;height:8px;top:50%;margin-top:-4px;border-radius:100px;background:#5a5a5a}.audio-player .ctr-speaker.ctr-mute:after{content:'';position:absolute;width:24px;height:4px;background:#5a5a5a;border-top:2px solid #fafafa;top:6px;left:-2px;transform:rotate(45deg)}",""])},function(e,t){"use strict";e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var a=this[t];a[2]?e.push("@media "+a[2]+"{"+a[1]+"}"):e.push(a[1])}return e.join("")},e.i=function(t,a){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var n=this[r][0];"number"==typeof n&&(o[n]=!0)}for(r=0;r<t.length;r++){var i=t[r];"number"==typeof i[0]&&o[i[0]]||(a&&!i[2]?i[2]=a:a&&(i[2]="("+i[2]+") and ("+a+")"),e.push(i))}},e}},function(e,t,a){function o(e,t){for(var a=0;a<e.length;a++){var o=e[a],r=f[o.id];if(r){r.refs++;for(var n=0;n<r.parts.length;n++)r.parts[n](o.parts[n]);for(;n<o.parts.length;n++)r.parts.push(u(o.parts[n],t))}else{for(var i=[],n=0;n<o.parts.length;n++)i.push(u(o.parts[n],t));f[o.id]={id:o.id,refs:1,parts:i}}}}function r(e){for(var t=[],a={},o=0;o<e.length;o++){var r=e[o],n=r[0],i=r[1],s=r[2],l=r[3],u={css:i,media:s,sourceMap:l};a[n]?a[n].parts.push(u):t.push(a[n]={id:n,parts:[u]})}return t}function n(e,t){var a=v(),o=y[y.length-1];if("top"===e.insertAt)o?o.nextSibling?a.insertBefore(t,o.nextSibling):a.appendChild(t):a.insertBefore(t,a.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");a.appendChild(t)}}function i(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",n(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",n(e,t),t}function u(e,t){var a,o,r;if(t.singleton){var n=b++;a=g||(g=s(t)),o=c.bind(null,a,n,!1),r=c.bind(null,a,n,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(a=l(t),o=d.bind(null,a),r=function(){i(a),a.href&&URL.revokeObjectURL(a.href)}):(a=s(t),o=p.bind(null,a),r=function(){i(a)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}function c(e,t,a,o){var r=a?"":o.css;if(e.styleSheet)e.styleSheet.cssText=x(t,r);else{var n=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(n,i[t]):e.appendChild(n)}}function p(e,t){var a=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}function d(e,t){var a=t.css,o=t.sourceMap;o&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var r=new Blob([a],{type:"text/css"}),n=e.href;e.href=URL.createObjectURL(r),n&&URL.revokeObjectURL(n)}var f={},h=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),v=h(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,b=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var a=r(e);return o(a,t),function(e){for(var n=[],i=0;i<a.length;i++){var s=a[i],l=f[s.id];l.refs--,n.push(l)}if(e){var u=r(e);o(u,t)}for(var i=0;i<n.length;i++){var l=n[i];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete f[l.id]}}}};var x=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}()}]);
//# sourceMappingURL=main.js.map