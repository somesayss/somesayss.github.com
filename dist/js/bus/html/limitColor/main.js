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

	module.exports = __webpack_require__(12);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = limit;

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var $ = __webpack_require__(3);
	var Rainbow = __webpack_require__(13);
	
	var html = '';
	var arr = new Rainbow();
	arr.forEach(function (val) {
		html += '<p style="background:rgb(' + val.join(',') + ');height:10px;"></p>';
	});
	// C.getColorRange(10, [255, 122, 0], [255, 255, 0]).forEach((val) => {
	// 	html += `<p style="background:rgb(${val.join(',')});height:10px;"></p>`;
	// });
	
	// $('body').html(html);
	
	
	// window.onfocus = function(){
	// 	alert(123)
	// }

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(4);
	
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
				var range = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
				var from = arguments.length <= 1 || arguments[1] === undefined ? [255, 0, 0] : arguments[1];
				var to = arguments.length <= 2 || arguments[2] === undefined ? [0, 255, 0] : arguments[2];
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map