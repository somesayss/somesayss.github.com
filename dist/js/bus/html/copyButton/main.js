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

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var $ = __webpack_require__(7);
	var limit = __webpack_require__(8);
	var Copy = __webpack_require__(9);
	
	$('#copy').on('click', function () {
		new Copy({ text: $('#list').html() });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = limit;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(8);
	
	var Copy = function () {
		function Copy(config) {
			_classCallCheck(this, Copy);
	
			this.props = {
				text: ''
			};
			this.state = {};
	
			var me = this;
			limit.assign(me.state, me.props, config);
			return me.emoveHideArea(me.creatHideArea());
		}
	
		_createClass(Copy, [{
			key: 'creatHideArea',
			value: function creatHideArea() {
				var me = this;
				var state = me.state;
	
				var area = document.createElement('textarea');
				area.style['position'] = 'absolute';
				area.style['left'] = '-99999px';
				document.body.appendChild(area);
				area.value = state.text;
				area.select();
				try {
					me.H5copy();
				} catch (e) {
					state.copySuccess = false;
				};
				return area;
			}
		}, {
			key: 'H5copy',
			value: function H5copy() {
				var me = this;
				var state = me.state;
	
				state.copySuccess = document.execCommand('copy', false, null);
			}
		}, {
			key: 'IEcopy',
			value: function IEcopy(val) {
				window.clipboardData.setData('text', val);
			}
		}, {
			key: 'emoveHideArea',
			value: function emoveHideArea(area) {
				var me = this;
				var state = me.state;
	
				var div = document.createElement('div');
				div.appendChild(area);
				div.innerHTML = '';
				div = null;
			}
		}, {
			key: 'isCopySuccess',
			value: function isCopySuccess() {
				return this.state.copySuccess;
			}
		}]);
	
		return Copy;
	}();
	
	module.exports = Copy;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map