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
	var Router = __webpack_require__(4);
	
	limit().isUndefined().toLog();

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
	
	var $ = __webpack_require__(2);
	var limit = __webpack_require__(3);
	
	// 变量
	var WIN = $(window);
	var REX_HASH = /^#([^?]*)(?:\?(.*))?/;
	
	// 类
	
	var Router = function () {
		function Router(config) {
			_classCallCheck(this, Router);
	
			var me = this;
			var routerMap = me.routerMap = {};
			me.eventUid = 'hashchange.router' + limit.getUid();
			limit.each(config, function (val, key) {
				me.add(me.addPathForKey(key), val);
			});
			me.bindHashChange();
		}
	
		_createClass(Router, [{
			key: 'add',
			value: function add(key, cb) {
				var me = this;
				var routerMap = me.routerMap;
				if (limit.isDefined(routerMap[key])) {
					limit['!!!'](key + ' is defined before;');
				};
				routerMap[key] = limit.cb(cb);
				return me;
			}
		}, {
			key: 'remove',
			value: function remove(key) {
				var me = this;
				var routerMap = me.routerMap;
				delete routerMap[key];
				return me;
			}
		}, {
			key: 'setSearch',
			value: function setSearch(arg) {
				var me = this;
				var hashParse = me.parseHash();
				var needHash = void 0;
				if (limit.isFunction(arg)) {
					needHash = limit.cb(arg)(limit.parseString(hashParse.search));
				};
				if (needHash = limit.unParseString(needHash)) {
					needHash = hashParse.hash + '?' + needHash;
				} else {
					needHash = '' + hashParse.hash;
				};
				location.hash = needHash;
				return me;
			}
		}, {
			key: 'setHash',
			value: function setHash(arg) {
				var me = this;
				var needHash = void 0;
				if (limit.isFunction(arg)) {
					var hashParse = me.parseHash();
					needHash = limit.toString(limit.cb(arg)(hashParse.hash, limit.parseString(hashParse.search)));
				} else {
					needHash = limit.toString(arg);
				};
				location.hash = needHash;
				return me;
			}
		}, {
			key: 'bindHashChange',
			value: function bindHashChange() {
				var me = this;
				WIN.on(me.eventUid, function (e) {
					var hashParse = me.parseHash();
					var hashBack = void 0;
					if (hashParse && (hashBack = me.routerMap[me.addPathForKey(hashParse.hash)])) {
						hashBack(limit.parseString(hashParse.search));
					};
				});
				WIN.trigger(me.eventUid);
			}
		}, {
			key: 'addPathForKey',
			value: function addPathForKey(key) {
				if (key.charAt(0) !== '/') {
					return '/' + key;
				} else {
					return key;
				};
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				var me = this;
				WIN.off(me.eventUid);
			}
		}, {
			key: 'parseHash',
			value: function parseHash() {
				var me = this;
				var hash = location.hash;
				var hashMatch = hash.match(REX_HASH);
				if (hashMatch) {
					var _hash = hashMatch[1];
					var search = hashMatch[2];
					return { hash: _hash, search: search };
				} else {
					return { hash: '' };
				};
			}
		}], [{
			key: 'creatRouter',
			value: function creatRouter(config) {
				return new Router(config);
			}
		}]);
	
		return Router;
	}();
	
	// 接口
	
	
	module.exports = Router;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map