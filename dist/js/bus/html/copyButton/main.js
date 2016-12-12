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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var $ = __webpack_require__(2);
	var limit = __webpack_require__(3);
	var PaseBoard = __webpack_require__(4);
	
	$('#copy').on('click', function () {
		new PaseBoard($('#list').html());
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = limit;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(3);
	
	var PaseBoard = function () {
		function PaseBoard(text) {
			_classCallCheck(this, PaseBoard);
	
			return this.init(limit.toString(text));
		}
	
		_createClass(PaseBoard, [{
			key: 'init',
			value: function init(text) {
				var me = this;
				return new Promise(function (resolve, reject) {
					me.creatHideArea();
					try {
						me.area.value = text;
						me.area.select();
						document.execCommand('copy');
						resolve();
					} catch (e) {
						reject(e);
					};
					me.removeHideArea();
				});
			}
		}, {
			key: 'creatHideArea',
			value: function creatHideArea() {
				var me = this;
				var area = me.area = document.createElement('textarea');
				area.style['position'] = 'absolute';
				area.style['left'] = '-99999px';
				document.body.appendChild(area);
			}
		}, {
			key: 'removeHideArea',
			value: function removeHideArea() {
				var me = this;
				var div = document.createElement('div');
				div.appendChild(me.area);
				div.innerHTML = '';
				div = null;
			}
		}]);
	
		return PaseBoard;
	}();
	
	module.exports = PaseBoard;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map