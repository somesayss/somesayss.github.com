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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = limit;

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var $ = __webpack_require__(2);
	var limit = __webpack_require__(3);
	var Upload = __webpack_require__(6);
	
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(3);
	var ParseForm = __webpack_require__(7);
	
	var Upload = function (_ParseForm) {
		_inherits(Upload, _ParseForm);
	
		function Upload(config) {
			_classCallCheck(this, Upload);
	
			var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).apply(this, arguments));
	
			_this.props = {
				a: 'a1',
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
						var loaded = e.loaded;
						var total = e.total;
						state.onprogress(limit(loaded / total).toFixed(2).toNumber().val(), loaded, total);
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
					var element = me.element;
					if (!element) {
						return reject(me.state.errParseEle);
					};
					var iframe = document.createElement('iframe');
					element.target = iframe.name = 'upload' + limit.getUid();
					iframe.style.display = 'none';
					document.body.appendChild(iframe);
					iframe.onload = function () {
						iframe.onload = null;
						var iframeBody = iframe.contentWindow.document.body;
						var responseText = iframeBody.innerHTML.replace(/<.*?>/g, '');
						me.parseRespone(responseText, resolve, reject);
						me.removeHideArea(iframe);
						element.target = '';
					};
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
				var me = this;
				var div = document.createElement('div');
				div.appendChild(element);
				div.innerHTML = '';
				div = null;
			}
		}]);
	
		return Upload;
	}(ParseForm);
	
	module.exports = Upload;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(3);
	
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
			key: 'isFormElement',
			value: function isFormElement() {
				var me = this;
				var state = me.state;
				var element = state.element;
				return element && element.nodeName === 'FORM';
			}
		}, {
			key: 'useFormData',
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
	
	module.exports = ParseForm;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map