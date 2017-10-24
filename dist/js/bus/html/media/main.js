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

	module.exports = __webpack_require__(161);


/***/ }),

/***/ 31:
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

	module.exports = limit;

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var $ = __webpack_require__(31);
	var limit = __webpack_require__(32);
	var ViewAudio = __webpack_require__(162);
	
	new ViewAudio().viewCanvas();

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(32);
	var Audio = __webpack_require__(163);
	
	var viewAudio = function (_Audio) {
		_inherits(viewAudio, _Audio);
	
		//画布节点
		function viewAudio(config) {
			_classCallCheck(this, viewAudio);
	
			var _this = _possibleConstructorReturn(this, (viewAudio.__proto__ || Object.getPrototypeOf(viewAudio)).apply(this, arguments));
	
			_initialiseProps.call(_this);
	
			var me = _this;
			limit.assignSuper(me.state, me.props, config);
			me.initElement();
			return _this;
		} //画布
	
	
		_createClass(viewAudio, [{
			key: 'destroy',
			value: function destroy() {
				var me = this;
				me.stop();
				var div = document.createElement('div');
				div.appendChild(me.canvas);
				div.innerHTML = '';
				div = null;
			}
		}, {
			key: 'viewCanvas',
			value: function viewCanvas() {
				var me = this;
				me.initCanvas();
				me.getUserMediaArray();
			}
		}, {
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
				var canvas = document.createElement('canvas');
				me.canvas = canvas;
				me.element.appendChild(canvas);
				canvas.width = state.width;
				canvas.height = state.height;
				me.context = canvas.getContext('2d');
			}
		}, {
			key: 'drawCanvas',
			value: function drawCanvas(min) {
				var me = this;
				var state = me.state;
				var context = me.context;
				me.parseData().forEach(function (val, key) {
					context.fillStyle = '#CCC';
					if (key < min) {
						context.fillStyle = state.color;
					};
					me.roundRect.apply(context, [].concat(_toConsumableArray(val), [state.radius]));
				});
			}
		}, {
			key: 'roundRect',
			value: function roundRect(x, y, w, h, r) {
				var context = this;
				var max = Math.min(w, h);
				if (r > max / 2) {
					r = max / 2;
				};
				context.beginPath();
				context.moveTo(x + r, y);
				context.arcTo(x + w, y, x + w, y + h, r);
				context.arcTo(x + w, y + h, x, y + h, r);
				context.arcTo(x, y + h, x, y, r);
				context.arcTo(x, y, x + w, y, r);
				context.closePath();
				context.fill();
			}
		}, {
			key: 'parseData',
			value: function parseData() {
				var me = this;
				var state = me.state;
				var maxWidth = state.width - state.space * state.part;
				var oneMaxWidth = Math.floor(maxWidth / state.part);
				return limit.from(new Array(state.part)).map(function (val, key) {
					var top = (oneMaxWidth + state.space) * key;
					return [top, 0, oneMaxWidth, state.height];
				});
			}
		}]);
	
		return viewAudio;
	}(Audio);
	// 0 20 
	
	
	var _initialiseProps = function _initialiseProps() {
		this.props = {
			element: null //置入的元素默认是body
			, width: 200 //宽
			, height: 40 //高
			, part: 10 //个数
			, space: 5 //间隔
			, radius: 4 //半角
			, increase: 0 //增强[0~50]
			, color: '#4d90fe' //颜色
			, changeArray: function changeArray(arr) {
				var me = this;
				var state = me.state;
				var length = arr.length;
				length = length - length * state.increase / 100;
				var res = arr.reduce(function (a, b) {
					return a + b;
				}) / length;
				res = limit(res).except(256).multiply(10).toFixed().val();
				me.drawCanvas(res);
			}
		};
		this.context = null;
		this.canvas = null;
	};
	
	module.exports = viewAudio;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 参考 http://www.cnblogs.com/Wayou/p/3543577.html
	// https://mdn.github.io/voice-change-o-matic/
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(32);
	
	var Audio = function () {
		//定时器ID
		//媒体流
		function Audio(config) {
			_classCallCheck(this, Audio);
	
			this.props = {
				fftSize: 128,
				changeArray: limit.K
			};
			this.state = {};
			this.stream = null;
			this.analyser = null;
			this.frameId = null;
	
			var me = this;
			limit.assignSuper(me.state, me.props, config);
		} //解析器
	
	
		_createClass(Audio, [{
			key: 'start',
			value: function start() {
				var me = this;
				if (me.analyser) {
					me.getArrayByAnalyser();
				};
			}
		}, {
			key: 'stop',
			value: function stop() {
				var me = this;
				cancelAnimationFrame(me.frameId);
			}
		}, {
			key: 'getArrayByAnalyser',
			value: function getArrayByAnalyser() {
				var me = this;
				var state = me.state;
				var count = me.analyser.frequencyBinCount;
				var array = new Uint8Array(count);
				me.analyser.getByteFrequencyData(array);
				state.changeArray.call(me, array);
				me.frameId = requestAnimationFrame(me.getArrayByAnalyser.bind(me));
			}
		}, {
			key: 'getAnalyserByStream',
			value: function getAnalyserByStream() {
				var me = this;
				var state = me.state;
				return me.getAudioContext().then(function (audioContext) {
					var media = audioContext.createMediaStreamSource(me.stream);
					var analyser = audioContext.createAnalyser();
					analyser.fftSize = state.fftSize;
					media.connect(analyser);
					me.analyser = analyser;
				});
			}
		}, {
			key: 'getAudioContext',
			value: function getAudioContext() {
				return new Promise(function (resolve, reject) {
					var AudioContext = window.AudioContext;
					if (AudioContext) {
						resolve(new AudioContext());
					} else {
						reject('can not found AudioContext');
					};
				});
			}
		}, {
			key: 'getUserMediaStream',
			value: function getUserMediaStream() {
				return new Promise(function (resolve, reject) {
					var NAV = navigator;
					var getMedia = NAV.getUserMedia || NAV.webkitGetUserMedia || NAV.mozGetUserMedia || NAV.msGetUserMedia;
					if (getMedia) {
						getMedia.call(NAV, { audio: true }, function (stream) {
							resolve(stream);
						}, function (e) {
							reject(e);
						});
					} else {
						reject('can not found getMedia');
					};
				});
			}
		}, {
			key: 'getUserMediaArray',
			value: function getUserMediaArray() {
				var me = this;
				return me.getUserMediaStream().then(function (stream) {
					me.stream = stream;
					return me.getAnalyserByStream();
				}).then(function () {
					me.getArrayByAnalyser();
				}).catch(function (e) {
					limit.err(e);
				});
			}
		}]);
	
		return Audio;
	}();
	
	module.exports = Audio;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map