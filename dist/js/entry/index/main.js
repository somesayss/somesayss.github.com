/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		6: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "js/" + ({"0":"bus/tally/main","1":"bus/validator/main","2":"bus/calendar/main","3":"bus/test3/main","4":"bus/test2/main","5":"bus/test1/main"}[chunkId]||chunkId) + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
			value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = __webpack_require__(10);

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HOC = function HOC(Wrapper, Class) {
			var WrapperComponent = function (_React$Component) {
						_inherits(WrapperComponent, _React$Component);

						function WrapperComponent(props) {
									_classCallCheck(this, WrapperComponent);

									var _this = _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).apply(this, arguments));

									var me = _this;
									var __controller__ = void 0;
									var clearProps = me.clearProps(props);
									__controller__ = me.__controller__ = new Class(clearProps);
									__controller__.com = me;
									me.state = limit.assignSuper({}, __controller__.getInitialState(), clearProps);
									__controller__.props = me.getPerProps(clearProps);
									__controller__.state = me.getPerState(me.state);
									me.state.actionId = me.state.actionId || "uaid" + limit.getUid();
									me.state.actionUUid = __controller__.Actions.actionUUid = "uuid" + limit.getUid();
									if (props.actionCid) {
												me.state.actionCid = __controller__.Actions.actionCid = props.actionCid;
									};
									_actions2["default"].set(me.state.actionId, __controller__.Actions);
									return _this;
						}

						_createClass(WrapperComponent, [{
									key: "getPerProps",
									value: function getPerProps(props) {
												var outProps = {};
												limit.each(Class.defaultProps, function (val, key) {
															outProps[key] = props[key];
												});
												return outProps;
									}
						}, {
									key: "getPerState",
									value: function getPerState(state) {
												var me = this;
												var outState = {};
												limit.each(me.__controller__.state, function (val, key) {
															outState[key] = state[key];
												});
												return outState;
									}
						}, {
									key: "componentWillReceiveProps",
									value: function componentWillReceiveProps(props) {
												var me = this;
												me.propsFromOther = true;
									}
						}, {
									key: "shouldComponentUpdate",
									value: function shouldComponentUpdate() {
												var me = this;
												var propsFromOther = !!me.propsFromOther;
												if (me.state.shouldComponentNotUpdate) {
															if (propsFromOther) {
																		return me.propsFromOther = false;
															} else {
																		return true;
															};
												} else {
															return true;
												};
									}
						}, {
									key: "clearProps",
									value: function clearProps(props) {
												var newProps = limit.assign({}, props);
												delete newProps.actionId;
												delete newProps.actionUUid;
												delete newProps.actionCid;
												newProps.actionId = Class.defaultProps && Class.defaultProps.actionId;
												return newProps;
									}
						}, {
									key: "componentWillUpdate",
									value: function componentWillUpdate(props) {
												var me = this;
												var __controller__ = me.__controller__;
												// 如果是外部传入的属性全量更新
												// if( me.propsFromOther ){
												// 	me.nextState = limit.assignSuper({}, me.state, me.clearProps(props));
												// 	limit.cb(__controller__.componentWillUpdate).call(__controller__, me.nextState);
												// 	__controller__.state = me.getPerState(me.nextState);
												// 	__controller__.props = me.getPerProps(me.nextState);
												// }else{
												// 	delete me.nextState;
												// };

												if (me.propsFromOther) {
															limit.assignSuper(me.state, me.clearProps(props));
															__controller__.state = me.getPerState(me.state);
															__controller__.props = me.getPerProps(me.state);
															if (limit.isFunction(__controller__.componentWillUpdate)) {
																		__controller__.componentWillUpdate(me.state);
																		limit.assignSuper(me.state, __controller__.state);
															};
												};
									}
						}, {
									key: "componentDidUpdate",
									value: function componentDidUpdate() {
												var me = this;
												me.propsFromOther = false;
									}
						}, {
									key: "render",
									value: function render() {
												var me = this;
												return React.createElement(Wrapper, _extends({}, me.state, { ref: "com" }));
									}
						}, {
									key: "componentWillUnmount",
									value: function componentWillUnmount() {
												var me = this;
												_actions2["default"].remove(me.state.actionId, me.__controller__.Actions);
												me.__controller__.destroy();
									}
						}]);

						return WrapperComponent;
			}(React.Component);

			WrapperComponent.defaultProps = Class.defaultProps;
			WrapperComponent.propTypes = Class.propTypes;
			;
			return WrapperComponent;
};

exports["default"] = HOC;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = limit.promise();
var REX = /on([A-Z])(\w*)/;

var Control = function () {
	function Control() {
		_classCallCheck(this, Control);

		this.bindEvent();
	}

	_createClass(Control, [{
		key: 'bindEvent',
		value: function bindEvent() {
			var me = this;
			var Actions = me.Actions = {};
			// 对第一层的对象的原型属性进行处理
			limit(me.findAllPro()).filter(function (val, key) {
				return REX.test(key);
			}).each(function (val, key) {
				var actionName = key.replace(REX, function (a, b, c) {
					return b.toLowerCase() + c;
				});
				Actions[actionName] = function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					me.state.actionStatus = actionName;
					return val.apply(me, args);
				};
			});
		}
	}, {
		key: 'findAllPro',
		value: function findAllPro() {
			var me = this;
			var rtv = {};
			var pro = me.constructor.prototype;
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
		}
	}, {
		key: 'getInitialState',
		value: function getInitialState() {
			return this.state || (this.state = {});
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			var me = this;
			limit.each(me, function (val, key) {
				delete me[key];
			});
			return me;
		}
	}, {
		key: 'trigger',
		value: function trigger(data, callback) {
			var me = this;
			me.com.setState(data, callback);
		}
	}, {
		key: 'updateComponent',
		value: function updateComponent() {
			var me = this;
			var state = me.getInitialState();
			return new Promise(function (resolve) {
				me.trigger(state, resolve.bind(null, 'updateComponentSuccess'));
			});
		}
	}]);

	return Control;
}();

;

exports["default"] = Control;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_React$Component) {
	_inherits(Component, _React$Component);

	function Component() {
		_classCallCheck(this, Component);

		return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
	}

	_createClass(Component, [{
		key: 'getClassName',
		value: function getClassName() {
			var me = this;
			var props = me.props;
			var className = props.className;

			for (var _len = arguments.length, classNameArr = Array(_len), _key = 0; _key < _len; _key++) {
				classNameArr[_key] = arguments[_key];
			}

			classNameArr.push(className);
			return classNameArr.filter(limit.K).join(' ');
		}
	}]);

	return Component;
}(React.Component);

;

exports["default"] = Component;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

ReactDOM.render(React.createElement(_index2["default"], null), document.getElementById('container'));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(6);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(11);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(7);

var _index = __webpack_require__(8);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_Component) {
	_inherits(Index, _Component);

	function Index() {
		_classCallCheck(this, Index);

		return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));
	}

	_createClass(Index, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			var Com = props.com;
			return React.createElement(
				'div',
				{ className: me.getClassName('page-index') },
				Com ? React.createElement(Com, null) : null
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var me = this;
			new _index2["default"]({
				defaultHash: 'test3',
				rule: {
					test1: function test1() {
						__webpack_require__.e/* require.ensure */(5).then((function (a) {
							var test1 = __webpack_require__(12)['default'];
							console.log('abc', test1);
							Actions(me).changeCom(null);
						}).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
					},
					test2: function test2() {
						__webpack_require__.e/* require.ensure */(4).then((function (a) {
							var test2 = __webpack_require__(13)['default'];
							console.log('def', test2);
							Actions(me).changeCom(null);
						}).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
					},
					test3: function test3() {
						__webpack_require__.e/* require.ensure */(3).then((function (a) {
							var reactCom = __webpack_require__(14)['default'];
							Actions(me).changeCom(reactCom);
						}).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
					},
					tally: function tally() {
						__webpack_require__.e/* require.ensure */(0).then((function (a) {
							var reactCom = __webpack_require__(15)['default'];
							Actions(me).changeCom(reactCom);
						}).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
					},
					validator: function validator() {
						__webpack_require__.e/* require.ensure */(1).then((function (a) {
							var reactCom = __webpack_require__(18)['default'];
							Actions(me).changeCom(reactCom);
						}).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
					},
					calendar: function calendar() {
						__webpack_require__.e/* require.ensure */(2).then((function (a) {
							var reactCom = __webpack_require__(19)['default'];
							Actions(me).changeCom(reactCom);
						}).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
					}
				}
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}]);

	return Index;
}(_component2["default"]);

;

exports["default"] = Index;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routerBase = __webpack_require__(9);

var _routerBase2 = _interopRequireDefault(_routerBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_RouterBase) {
	_inherits(Router, _RouterBase);

	function Router(config) {
		var _temp, _this;

		_classCallCheck(this, Router);

		var me = (_temp = (_this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, config)), _this), _this.props = {
			// 默认跳转的地址
			defaultHash: '',
			// 全部地址
			linksList: [],
			// 默认地址
			defaultWhiteList: [],
			// 白名单[登陆后的]
			whiteList: null,
			// 404
			notFound: 'notFound',
			// 无权限
			noPermission: 'noPermission'
		}, _temp);
		limit.assignSuper(me.state, me.props, config);
		me.setDefaultHash();
		return _this;
	}

	_createClass(Router, [{
		key: 'setDefaultHash',
		value: function setDefaultHash() {
			var me = this;
			var state = me.state;

			var parseHash = Router.parseHash();
			if (!parseHash && state.defaultHash) {
				Router.setHash(state.defaultHash);
			};
		}
	}]);

	return Router;
}(_routerBase2["default"]);

;

exports["default"] = Router;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

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
		limit.each(me.state.rule, function (val, key) {
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

exports["default"] = Router;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 变量

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Actions = window.Actions = function (id, cid) {
	return getReturnObj(id, cid);
};

var ActionsPool = Actions.pool = {};

Actions.set = function (id, action) {
	var pool = ActionsPool[id];
	if (pool) {
		pool.push(action);
	} else {
		ActionsPool[id] = [action];
	};
};

// 获取正确的ID
function getPropTrueId(obj, key) {
	if (limit.isObjectSuper(obj)) {
		return obj.props[key] || obj.state[key];
	};
};

// 通过ID获取
function getAllPoolById(id) {
	return ActionsPool[getPropTrueId(id, 'actionId') || id] || [];
};

// 获取目标
function getTargetPool(id, cid) {
	var pool = getAllPoolById(id);
	if (cid) {
		return pool.filter(function (val) {
			return val.actionCid === cid;
		});
	} else {
		var uid = getPropTrueId(id, 'actionUUid');
		if (uid) {
			return pool.filter(function (val) {
				return val.actionUUid === uid;
			});
		} else {
			return pool;
		};
	};
};

// 获取对应的对象
function getReturnObj(id, cid) {
	var pool = getTargetPool(id, cid);
	var obj = {};
	if (pool.length) {
		limit.each(pool[0], function (val, key) {
			if (limit.isFunction(val)) {
				obj[key] = function () {
					for (var _len = arguments.length, agrs = Array(_len), _key = 0; _key < _len; _key++) {
						agrs[_key] = arguments[_key];
					}

					return Promise.all(pool.map(function (fn) {
						return fn[key].apply(fn, agrs);
					}));
				};
			} else {
				obj[key] = pool.map(function (val) {
					return val[key];
				}).join(',');
			};
		});
	};
	return obj;
};

Actions.get = function (id, cid) {
	return getTargetPool(id, cid);
};

Actions.remove = function (id, action) {
	var pool = ActionsPool[id];
	if (pool) {
		limit.remove(pool, action);
		if (!pool.length) {
			delete ActionsPool[id];
		};
	};
};

exports["default"] = Actions;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(2);

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = function (_Control) {
	_inherits(Controller, _Control);

	function Controller() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Controller);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			com: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onChangeCom',
		value: function onChangeCom(reactCom) {
			var me = this;
			var state = me.state;

			state.com = reactCom;
			return me.updateComponent();
		}
	}]);

	return Controller;
}(_control2["default"]);

;

exports["default"] = Controller;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = limit;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map