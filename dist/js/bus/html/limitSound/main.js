/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(155);


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),

/***/ 31:
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

	module.exports = limit;

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(32);
	
	var Rainbow = function () {
		function Rainbow(config) {
			_classCallCheck(this, Rainbow);
	
			this.props = {
				list: [[255, 0, 0] //红
				, [255, 122, 0] //橙
				, [255, 255, 0] //黄
				, [0, 255, 0] //绿
				, [0, 255, 255] //青
				, [0, 0, 255] //蓝
				, [255, 0, 255] //紫
				],
				totle: 50
			};
			this.state = {};
	
			var me = this;
			limit.assign(me.state, me.props, config);
			return me.parseList();
		}
	
		_createClass(Rainbow, [{
			key: "parseList",
			value: function parseList() {
				var me = this;
				var state = me.state;
				var list = state.list;
				var rev = [];
				var leg = list.length;
				var range = Math.ceil((state.totle - leg) / (leg - 1) + 2);
				list.forEach(function (val, key) {
					var next = list[++key];
					if (next) {
						rev.push(val);
						Array.prototype.push.apply(rev, me.getColorRange(range, val, next));
					} else {
						rev.push(val);
					};
				});return rev;
			}
		}, {
			key: "getColorRange",
			value: function getColorRange() {
				var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
				var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [255, 0, 0];
				var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 255, 0];
	
				range--;
				var leg = from.length;
				var dif = limit.from(new Array(leg), function (val, key) {
					return (from[key] - to[key]) / range;
				});
				return limit.from(new Array(--range), function (val, key) {
					key++;
					return limit.from(new Array(leg), function (val, k) {
						return Math.floor(from[k] - dif[k] * key);
					});
				});
			}
		}]);
	
		return Rainbow;
	}();
	
	module.exports = Rainbow;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 样式
	
	__webpack_require__(156);
	
	// 依赖
	var $ = __webpack_require__(31);
	var limit = __webpack_require__(32);
	
	// 颜色类
	var Rainbow = __webpack_require__(137);
	// 画图类
	var DrawCanvas = __webpack_require__(158);
	var AudioBuffer = __webpack_require__(159);
	
	var DC = new DrawCanvas({ rotate: -90 });
	var RB = new Rainbow({ totle: 360 });
	console.log(RB);
	// new AudioBuffer({
	// 	onAnalyser(arr){
	// 		DC.clearRect();
	// 		DC.drawArc();
	// 		arr.forEach((val, key) => {
	// 			key = key/2;
	// 			DC.drawLine(key, val/10)
	// 		});
	// 	}
	// });
	
	
	new AudioBuffer({
		count: 360,
		onAnalyser: function onAnalyser(arr) {
			DC.clearRect();
			arr.forEach(function (val, key) {
				var theKey = key / 2;
				var shodow = 360 - theKey;
				DC.drawLine(theKey, val / 10, 'rgb(' + RB[key].join(',') + ')');
				DC.drawLine(shodow, val / 10);
			});
			var last = arr.length - 1;
			DC.drawLine(180, arr[last] / 10, 'rgb(' + RB[last].join(',') + ')');
			DC.drawArc();
		}
	});

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(157);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, "html,\nbody {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
	
	// exports


/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(32);
	
	var DrawCanvas = function () {
		function DrawCanvas(config) {
			_classCallCheck(this, DrawCanvas);
	
			this.props = {
				element: null,
				radius: 200,
				rotate: 0,
				arcColor: '#000'
			};
			this.state = {};
			this.canvas = null;
			this.element = null;
			this.context = null;
	
			var me = this;
			limit.assign(me.state, me.props, config);
			me.initElement();
			me.initCanvas();
			me.drawArc();
		}
	
		_createClass(DrawCanvas, [{
			key: 'initElement',
			value: function initElement() {
				var me = this;
				var state = me.state;
				if (state.element) {
					me.element = state.element;
				} else {
					me.element = document.body;
				};
			}
		}, {
			key: 'initCanvas',
			value: function initCanvas() {
				var me = this;
				var state = me.state;
				var element = me.element;
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				element.appendChild(canvas);
				canvas.width = element.clientWidth;
				canvas.height = element.clientHeight;
				me.canvas = canvas;
				me.context = context;
				state.centerX = canvas.width / 2;
				state.centerY = canvas.height / 2;
			}
		}, {
			key: 'drawArc',
			value: function drawArc() {
				var me = this;
				var state = me.state;
				var canvas = me.canvas;
				var context = me.context;
				context.beginPath();
				context.arc(state.centerX, state.centerY, state.radius, 0, me.getRadianByAngle(360));
				context.closePath();
				context.strokeStyle = state.arcColor;
				context.stroke();
			}
		}, {
			key: 'drawLine',
			value: function drawLine(angle, range, color) {
				var me = this;
				var state = me.state;
				var context = me.context;
				context.beginPath();
				context.moveTo.apply(context, me.compute(angle + state.rotate, state.radius));
				context.lineTo.apply(context, me.compute(angle + state.rotate, state.radius + range));
				context.closePath();
				context.strokeStyle = color;
				context.stroke();
			}
		}, {
			key: 'clearRect',
			value: function clearRect() {
				var me = this;
				var canvas = me.canvas;
				me.context.clearRect(0, 0, canvas.width, canvas.height);
			}
		}, {
			key: 'drawRect',
			value: function drawRect() {
				// ...
			}
		}, {
			key: 'compute',
			value: function compute(angle, radius) {
				// 通过角度，半径计算点
				var me = this;
				var state = me.state;
				var x = Math.cos(me.getRadianByAngle(angle)) * radius + state.centerX;
				var y = Math.sin(me.getRadianByAngle(angle)) * radius + state.centerY;
				return [x, y];
			}
		}, {
			key: 'getRadianByAngle',
			value: function getRadianByAngle(angle) {
				return angle / 180 * Math.PI;
			}
		}]);
	
		return DrawCanvas;
	}();
	
	;
	
	module.exports = DrawCanvas;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(32);
	
	var AudioBuffer = function () {
		function AudioBuffer(config) {
			_classCallCheck(this, AudioBuffer);
	
			this.props = {
				element: null,
				radius: 200,
				url: './music.mp3',
				onLoad: limit.K,
				onError: limit.K,
				onAnalyser: limit.K,
				onProgress: limit.K,
				count: 720
			};
			this.state = {};
			this.AC = null;
			this.audioBuffer = null;
	
			var me = this;
			limit.assign(me.state, me.props, config);
			me.getAudioContext();
			me.getAudio().then(function (buffer) {
				return me.getRealBuffer(buffer);
			}).then(function (buffer) {
				me.audioBuffer = buffer;
				me.bindAudioWithBuffer();
			});
		}
	
		_createClass(AudioBuffer, [{
			key: 'getAudio',
			value: function getAudio() {
				var me = this;
				var state = me.state;
				return new Promise(function (resolve, reject) {
					var AJAX = new XMLHttpRequest();
					AJAX.open('GET', state.url);
					AJAX.responseType = 'arraybuffer';
					AJAX.onprogress = function (e) {
						var total = e.total || AJAX.getResponseHeader('Conent-Length');
						state.onProgress(limit(e.loaded / total, e.timeStamp).toFixed(2).val());
					};
					AJAX.onload = function (e) {
						resolve(e.target.response);
						state.onLoad(e);
					};
					AJAX.onerror = function (e) {
						reject(e);
						state.onError(e);
					};
					AJAX.send(null);
				});
			}
		}, {
			key: 'getAudioContext',
			value: function getAudioContext() {
				var me = this;
				var AC = new window.AudioContext();
				me.AC = AC;
			}
		}, {
			key: 'creatAnalyser',
			value: function creatAnalyser() {
				var me = this;
				var AC = me.AC;
				var analyser = AC.createAnalyser();
				var audioBufferSouceNode = AC.createBufferSource();
				return { analyser: analyser, audioBufferSouceNode: audioBufferSouceNode };
			}
		}, {
			key: 'getRealBuffer',
			value: function getRealBuffer(buffer) {
				var me = this;
				var AC = me.AC;
				return new Promise(function (resolve, reject) {
					AC.decodeAudioData(buffer, resolve, reject);
				});
			}
		}, {
			key: 'bindAudioWithBuffer',
			value: function bindAudioWithBuffer() {
				var me = this;
				var CA = me.creatAnalyser();
				var analyser = CA.analyser;
				var audioBufferSouceNode = CA.audioBufferSouceNode;
				audioBufferSouceNode.connect(analyser);
				analyser.connect(me.AC.destination);
				audioBufferSouceNode.buffer = me.audioBuffer;
				audioBufferSouceNode.loop = true;
				audioBufferSouceNode.start();
				me.analyser(analyser);
			}
		}, {
			key: 'analyser',
			value: function analyser(_analyser) {
				var me = this;
				var state = me.state;
				var array = new Uint8Array(state.count || _analyser.frequencyBinCount);
				_analyser.getByteFrequencyData(array);
				state.onAnalyser(array);
				requestAnimationFrame(me.analyser.bind(me, _analyser));
			}
		}]);
	
		return AudioBuffer;
	}();
	
	;
	
	module.exports = AudioBuffer;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map