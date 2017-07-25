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

	module.exports = __webpack_require__(101);


/***/ },

/***/ 7:
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = limit;

/***/ },

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $ = __webpack_require__(7);
	var limit = __webpack_require__(8);
	var Router = __webpack_require__(102);
	var Class = __webpack_require__(103);
	
	var A = function () {
		function A() {
			_classCallCheck(this, A);
		}
	
		_createClass(A, [{
			key: 'a',
			value: function a() {}
		}]);
	
		return A;
	}();
	
	var B = function (_A) {
		_inherits(B, _A);
	
		function B() {
			_classCallCheck(this, B);
	
			return _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments));
		}
	
		_createClass(B, [{
			key: 'b',
			value: function b() {}
		}]);
	
		return B;
	}(A);
	
	var C = function (_B) {
		_inherits(C, _B);
	
		function C() {
			_classCallCheck(this, C);
	
			return _possibleConstructorReturn(this, (C.__proto__ || Object.getPrototypeOf(C)).apply(this, arguments));
		}
	
		_createClass(C, [{
			key: 'c',
			value: function c() {}
		}]);
	
		return C;
	}(B);
	
	var c = new C();
	
	var D = Class.create({
		d: function d() {}
	});
	
	var E = D.extend({
		e: function e() {
			console.log('e');
		}
	});
	
	var F = E.extend({
		f: function f() {}
	});
	
	var f = new F();
	
	// console.log(f.constructor === F);
	// console.log(E === f.__proto__.constructor);
	// console.log(f.constructor.prototype.__proto__.constructor === E);
	// console.log(f.constructor.prototype.constructor === F);
	// console.log( f, f.__proto__);
	// console.log( Object.getPrototypeOf+'' );
	// console.log(f.constructor.prototype.__proto__ === E.prototype);
	
	
	function findAllPro(obj) {
		var rtv = {};
		var pro = obj.constructor.prototype;
		while (pro) {
			// 如果到最底层的Object跳出
			if (pro.constructor === Object) {
				break;
			};
			limit(pro).keysSuper().each(function (val) {
				// 隔离__proto__
				if (val !== '__proto__' && !rtv[val]) {
					rtv[val] = pro[val];
				};
			});
			pro = pro.__proto__;
		};
		return rtv;
	};
	
	limit.each(findAllPro(f), function (val, key) {
		console.log(key, val + '');
	});

/***/ },

/***/ 102:
/***/ function(module, exports) {

	"use strict";
	
	// 变量
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
					limit.war(key + ' is defined before;');
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

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	/**
	 * 2014.09.15
	 * 类的初始创建和继承。
	 * version: 1.0.1
	 * 2015.02.27
	 * 增加属性的方法: Implements, Statics
	 * 2015.04.30
	 * 修改了mix方法，在接口继承的时候如果要继承的类也是有继承关系的就需要把所有的属性和方法都继承过来
	 * 2015.06.09
	 * 修改了Statics方法可以传入多个
	 * 2015.06.15
	 * 对Statics也拥有继承特性，对于静态的属性，extend superClass 是不可修改的
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	
		//初始化变量
		var Class = {},
		    emptyArr = [],
		    K = function K(k) {
			return k;
		},
		    Rex = /\w+/g;
	
		/**
	  * [默认是过滤 extend superClass的]
	  * @param  {[string]} key [名称]
	  * @return {[boolean]}     [是否为extend或者superClass]
	  */
		function noName(key) {
			return key !== 'extend' && key !== 'superClass';
		}
	
		/**
	  * [mix 混合方法]
	  * @param  {Object} CUR [被混合的对象]
	  * @param  {Object} TAR [混合源]
	  * @return {Object} CUR	[被混合的对象]
	  */
		function mix(CUR, TAR, NEEDPROP, CALLBACK) {
			CALLBACK = typeof CALLBACK === 'function' ? CALLBACK : K;
			for (var i in TAR) {
				if ((TAR.hasOwnProperty(i) || NEEDPROP) && CALLBACK(i)) {
					CUR[i] = TAR[i];
				}
			}
			return CUR;
		}
	
		//空类
		function E() {}
	
		/**
	  * [createPro 原型链对象的创建]
	  * @return {Class}	[源类]
	  * @return {Object} [对象]
	  */
		function createPro(PRO) {
			// var create = Object.create;
			// //新的API
			// if (create) {
			// 	return create(PRO);
			// } else if (PRO.__proto__) {
			// 	return {
			// 		__proto__: PRO
			// 	}
			// } else {
			E.prototype = PRO;
			var pro = new E();
			pro.__proto__ = PRO;
			return pro;
			// }
		}
	
		/**
	  * [extend 继承方法]
	  * @param  {Class} PAR 	[子类]
	  * @param  {Class} SUB 	[父类]
	  * @return {Class} SUB	[子类]
	  */
		function extend(SUB, PAR) {
			//继承
			SUB.prototype = createPro(PAR.prototype);
			//构造器
			SUB.prototype.constructor = SUB;
			//超类
			SUB.superClass = PAR.prototype;
			return SUB;
		}
	
		/**
	  * [implement 接口继承？]
	  * @param  {Class}	CLS  [源类]
	  * @param  {Object}	PROP [属性]
	  * @return {Class}	CLS  [源类]
	  */
		function implement(CLS, PROP) {
			//对于Implements, Statics的特殊处理
			'Implements,Statics'.replace(Rex, function (a) {
				//如果对象存在，不存在的情况是 extend 的时候会直接create();
				if (PROP) {
					//如果没有属性的话就初始话一个空的数组，这个是为了做统一，保证全部运行
					!PROP[a] && (PROP[a] = emptyArr);
					//确保是静态属性
					if (PROP.hasOwnProperty(a)) {
						Class[a](CLS, PROP[a]);
					}
					delete PROP[a];
				}
			});
			//混合
			mix(CLS.prototype, PROP);
			return CLS;
		}
	
		//类的创建
		Class.create = function (PROP) {
			//源类
			function subClass() {
				var init = this.init;
				return init && init.apply(this, arguments);
			}
			//接口继承
			implement(subClass, PROP);
			//创建的时候把构造器指向源类
			subClass.prototype.constructor = subClass;
			//继承方法
			subClass.extend = function (PROP) {
				return Class.extend(subClass, PROP);
			};
			return subClass;
		};
		//类的继承
		Class.extend = function (PAR, PROP) {
			//参数控制
			if (typeof PAR !== 'function') {
				throw 'Class extend error!! parent class need a function';
			} else {
				return implement(extend(Class.create(), PAR), PROP);
			}
		};
		//类的实例化判断，修复的instanceof
		Class.instanceOf = function (OBJ, CLS) {
			return OBJ instanceof CLS && OBJ.constructor === CLS;
		};
		//静态属性
		Class.Statics = function (CLS, ARR) {
			ARR = [].concat(ARR);
			var item;
			//如果存在父级，对于父级方法属性的继承
			CLS.superClass && mix(CLS, CLS.superClass.constructor, false, noName);
			//属性的继承
			while (item = ARR.shift()) {
				mix(CLS, item, false, noName);
			}
		};
		//接口
		Class.Implements = function (CLS, ARR) {
			var item,
			    prop = CLS.prototype;
			ARR = [].concat(ARR);
			while (item = ARR.shift()) {
				//接口继承，如果是类的话就用原型属性，否者就用本身，但是会继承所有方法
				mix(prop, item.prototype || item, true);
			}
		};
	
		return Class;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }

/******/ });
//# sourceMappingURL=main.js.map