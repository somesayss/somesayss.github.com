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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(111);


/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Router = __webpack_require__(112);
	
	var router = new Router({
		a: function a(param) {
			console.log('aaa', param);
		}
	});
	
	window.router = router;

/***/ },

/***/ 112:
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WIN = $(window);
	var Events = limit.Events;
	var REX_HASH = /^#([^?]*)(?:\?(.*))?/;
	
	var Router = function (_Events) {
		_inherits(Router, _Events);
	
		function Router(config) {
			var _temp, _this;
	
			_classCallCheck(this, Router);
	
			var me = (_temp = (_this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this)), _this), _this.props = {}, _temp);
			limit.assignSuper(me.state, me.props, config);
			limit.each(config, function (val, key) {
				return me.on(key, val);
			});
			me.state.eventUid = "hashchange.router" + limit.getUid();
			me.bindHashChange();
			return _this;
		}
	
		_createClass(Router, [{
			key: "bindHashChange",
			value: function bindHashChange() {
				var me = this;
				var state = me.state;
	
				WIN.on(state.eventUid, function (e) {
					var hashParse = Router.parseHash();
					if (hashParse) {
						me.emit(hashParse.hash, hashParse.search);
					};
				});
				WIN.trigger(state.eventUid);
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var me = this;
				var state = me.state;
	
				WIN.off(state.eventUid);
				delete me.state;
				delete me.props;
			}
		}], [{
			key: "parseHash",
			value: function parseHash() {
				var me = Router;
				var hash = decodeURIComponent(location.hash);
				var hashMatch = hash.match(REX_HASH);
				if (hashMatch) {
					var _hash = hashMatch[1];
					var search = limit.parseString(hashMatch[2]);
					return { hash: _hash, search: search };
				};
			}
			// function obj
	
		}, {
			key: "setSearch",
			value: function setSearch(arg, hash) {
				var me = Router;
				var hashParse = me.parseHash();
				var needHash = void 0;
				if (!hash) {
					hash = hashParse.hash;
				};
				if (limit.isFunction(arg)) {
					needHash = limit.unParseString(arg(hashParse.search));
				} else {
					needHash = limit.unParseString(arg);
				};
				if (needHash) {
					needHash = hash + "?" + needHash;
				} else {
					needHash = "" + hash;
				};
				location.hash = encodeURIComponent(needHash);
				return me;
			}
			// function str
	
		}, {
			key: "setHash",
			value: function setHash(arg) {
				var me = Router;
				var needHash = void 0;
				if (limit.isFunction(arg)) {
					var hashParse = me.parseHash();
					needHash = limit.toString(arg(hashParse.hash, hashParse.search));
				} else {
					needHash = limit.toString(arg);
				};
				location.hash = encodeURIComponent(needHash);
				return me;
			}
		}]);
	
		return Router;
	}(Events);
	
	;
	
	module.exports = Router;

/***/ }

/******/ });
//# sourceMappingURL=main.js.map