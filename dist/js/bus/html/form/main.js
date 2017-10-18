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

	module.exports = __webpack_require__(34);


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var domUtil = {};
	
	// 选择input或者textarea
	domUtil.textSelect = function (input, start, end) {
		if (input.setSelectionRange) {
			input.setSelectionRange(start, end);
			input.focus();
		} else if (input.createTextRange) {
			var range = input.createTextRange();
			range.moveStart("character", start);
			range.moveEnd("character", end);
			if (start === end) {
				range.collapse(true);
			};
			range.select();
		};
	};
	
	var DOC = document;
	
	var isIE8 = domUtil.isIE8 = function () {
		return DOC.documentMode === 8;
	};
	
	// 是否是IE老的版本，现在定义的是IE8
	domUtil.isIEOld = function (defaultVal, iEOldVal) {
		if (isIE8()) {
			return iEOldVal;
		} else {
			return defaultVal;
		};
	};
	
	domUtil.clearDom = function (node) {
		var clearDiv = document.createElement('div');
		clearDiv.appendChild(node);
		clearDiv.innerHTML = '';
		clearDiv = null;
	};
	
	exports.default = domUtil;

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

	module.exports = limit;

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var $ = __webpack_require__(31);
	var limit = __webpack_require__(32);
	var Upload = __webpack_require__(35);
	
	$('#fileUpload').on('click', function () {
		new Upload({
			element: document.getElementById('form'),
			onprogress: function onprogress(e) {
				limit.log(limit['*'](e, 100) + '%');
			}
		}).submit().then(function (e) {
			limit.log(e);
		}, function (e) {
			limit.err(e);
		});
	});

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _domUtil = __webpack_require__(20);
	
	var _domUtil2 = _interopRequireDefault(_domUtil);
	
	var _index = __webpack_require__(36);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Upload = function (_ParseForm) {
		_inherits(Upload, _ParseForm);
	
		function Upload(config) {
			_classCallCheck(this, Upload);
	
			var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).apply(this, arguments));
	
			_this.props = {
				url: '/common/upload.json',
				onprogress: limit.K,
				errParseEle: '上传失败，未解析到element。',
				errSys: '上传失败，系统错误。'
			};
	
			var me = _this;
			limit.assign(me.state, me.props, config);
			return _this;
		}
	
		_createClass(Upload, [{
			key: 'submit',
			value: function submit() {
				var me = this;
				if (window.FormData && window.XMLHttpRequest) {
					return me.ajaxSubmit();
				} else {
					return me.iframeSubmit();
				};
			}
		}, {
			key: 'ajaxSubmit',
			value: function ajaxSubmit() {
				var me = this;
				return new Promise(function (resolve, reject) {
					if (!me.element) {
						return reject(me.state.errParseEle);
					};
					var state = me.state;
					var AJAX = new XMLHttpRequest();
					AJAX.open('POST', state.url);
					// 上传进度
					AJAX.upload.onprogress = function (e) {
						var loaded = e.loaded,
						    total = e.total;
	
						if (total) {
							state.onprogress(limit(loaded / total).toFixed(2).toNumber().val(), loaded, total);
						};
					};
					// 结束
					AJAX.onload = function (e) {
						me.parseRespone(e.target.responseText, resolve, reject);
					};
					// 错误
					AJAX.onerror = reject;
					AJAX.send(me.useFormData());
				});
			}
		}, {
			key: 'iframeSubmit',
			value: function iframeSubmit() {
				var me = this;
				return new Promise(function (resolve, reject) {
					var state = me.state;
	
					var element = me.element;
					if (!element) {
						return reject(me.state.errParseEle);
					};
					var iframe = document.createElement('iframe');
					element.target = iframe.name = 'upload' + limit.getUid();
					element.action = state.url;
					iframe.style.display = 'none';
					document.body.appendChild(iframe);
					$(iframe).on('load', function () {
						$(iframe).off('load');
						var iframeBody = iframe.contentWindow.document.body;
						var responseText = iframeBody.innerHTML.replace(/<.*?>/g, '');
						me.parseRespone(responseText, resolve, reject);
						me.removeHideArea(iframe);
						element.target = '';
					});
					element.submit();
				});
			}
		}, {
			key: 'parseRespone',
			value: function parseRespone(responseText, resolve, reject) {
				var me = this;
				var errMeg = me.state.errSys;
				if (responseText) {
					try {
						var response = JSON.parse(responseText);
						if (limit.getValueInObject(response, 'hasError') === false) {
							if (limit.getValueInObject(response, 'content', 'isSuccess')) {
								resolve(response.content);
							} else {
								reject(limit.getValueInObject(response, 'content', 'msg') || errMeg);
							};
						} else {
							reject(limit.getValueInObject(response, 'msg') || errMeg);
						};
					} catch (e) {
						reject(e);
					};
				} else {
					reject(errMeg);
				};
			}
		}, {
			key: 'removeHideArea',
			value: function removeHideArea(element) {
				_domUtil2.default.clearDom(element);
			}
		}]);
	
		return Upload;
	}(_index2.default);
	
	module.exports = Upload;

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

	"use strict";
	
	// 依赖
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ParseForm = function () {
		function ParseForm(config) {
			_classCallCheck(this, ParseForm);
	
			this.props = {
				element: null // 主要表单
			};
			this.state = {};
			this.element = null;
	
			var me = this;
			var state = me.state;
			limit.assign(state, me.props, config);
			if (me.isFormElement()) {
				me.element = state.element;
			};
		}
	
		_createClass(ParseForm, [{
			key: "isFormElement",
			value: function isFormElement() {
				var me = this;
				var state = me.state;
				var element = state.element;
				return element && element.nodeName === 'FORM';
			}
		}, {
			key: "useFormData",
			value: function useFormData() {
				var me = this;
				var element = me.element;
				if (element && window.FormData) {
					return new FormData(element);
				};
			}
		}]);
	
		return ParseForm;
	}();
	
	exports.default = ParseForm;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map