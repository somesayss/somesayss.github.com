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

	module.exports = __webpack_require__(216);


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),

/***/ 13:
/***/ (function(module, exports) {

	'use strict';
	
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
	
	exports.default = Component;

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	Object.defineProperty(exports, "__esModule", {
				value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _actions = __webpack_require__(16);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
										_actions2.default.set(me.state.actionId, __controller__.Actions);
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
													_actions2.default.remove(me.state.actionId, me.__controller__.Actions);
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
	
	exports.default = HOC;

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

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
	
	exports.default = Actions;

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

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
	
	exports.default = Control;

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(64);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(68);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(65);
	
	var _index = __webpack_require__(67);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 组件类
	var View = function (_Component) {
		_inherits(View, _Component);
	
		function View() {
			_classCallCheck(this, View);
	
			return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
		}
	
		_createClass(View, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: ['limit-scroller', props.className].filter(function (v) {
							return v;
						}).join(' '),
						style: { height: props.height } },
					React.createElement(
						'span',
						{ className: 'ch-container-bar', ref: 'containerBar' },
						React.createElement('span', { className: 'ch-bar', ref: 'bar', style: { height: props.barHeight }, onMouseDown: me.mousedown.bind(me) })
					),
					React.createElement(
						'div',
						{ className: 'ch-container', ref: 'container' },
						props.children
					)
				);
			}
		}, {
			key: 'toggleScrollBar',
			value: function toggleScrollBar() {
				var me = this;
				var refs = me.refs;
				var container = refs.container,
				    containerBar = refs.containerBar;
	
				if (container.offsetHeight < container.scrollHeight) {
					containerBar.style.display = '';
				} else {
					containerBar.style.display = 'none';
				};
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				me.toggleScrollBar();
				$(me.refs.container).on('scroll.scroller', function () {
					me.scroll();
				});
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var me = this;
				$(me.refs.container).off('scroll.scroller');
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				var me = this;
				me.toggleScrollBar();
			}
		}, {
			key: 'scroll',
			value: function scroll(e) {
				var me = this;
				var refs = me.refs;
				var container = refs.container,
				    bar = refs.bar;
	
				var containerHeight = container.offsetHeight;
				var barHeight = bar.offsetHeight;
				var perCent = container.scrollTop / (container.scrollHeight - containerHeight);
				bar.style.top = perCent * (containerHeight - barHeight) + 'px';
				me.scrollShow();
			}
		}, {
			key: 'scrollTo',
			value: function scrollTo(num) {
				var me = this;
				var refs = me.refs;
				var container = refs.container,
				    bar = refs.bar;
	
				container.scrollTop = num;
				me.scroll();
			}
		}, {
			key: 'scrollShow',
			value: function scrollShow() {
				var me = this;
				var refs = me.refs;
				var bar = refs.bar;
	
				$(bar).css({ opacity: 1 });
				clearTimeout(me.timeId);
				me.timeId = setTimeout(function () {
					$(bar).css({ opacity: 0 });
				}, 500);
			}
		}, {
			key: 'mousedown',
			value: function mousedown(e) {
				var me = this;
				var refs = me.refs;
				var container = refs.container,
				    bar = refs.bar;
	
				var top = bar.style.top;
				var containerHeight = container.offsetHeight;
				var barHeight = bar.offsetHeight;
				var max = containerHeight - barHeight;
				var maxBar = container.scrollHeight - containerHeight;
				// ''的时候
				if (!top) {
					top = 0;
				};
				top = parseInt(top);
				e.preventDefault();
				e.stopPropagation();
				new _index2.default(e).on('move', function (e, diff) {
					var toTop = top + diff.diffY;
					if (toTop < 0) {
						toTop = 0;
					} else if (toTop > max) {
						toTop = max;
					};
					var per = toTop / max;
					container.scrollTop = per * maxBar;
					bar.style.top = toTop + 'px';
					me.scrollShow();
				});
			}
		}]);
	
		return View;
	}(_component2.default);
	
	;
	
	exports.default = View;

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(66);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-scroller {\n  position: relative;\n  overflow: hidden;\n}\n.limit-scroller .ch-container-bar {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 17px;\n  height: 100%;\n  background: #FFF;\n}\n.limit-scroller .ch-container-bar:hover .ch-bar {\n  opacity: 1 !important;\n}\n.limit-scroller .ch-bar {\n  transition: opacity 0.5s ease-in-out 0s;\n  position: absolute;\n  width: 6px;\n  height: 50px;\n  border-top: 2px solid #FFF;\n  border-bottom: 2px solid #FFF;\n  top: 0;\n  right: 3px;\n  cursor: pointer;\n  opacity: 0;\n}\n.limit-scroller .ch-bar:before {\n  display: block;\n  content: '';\n  height: 100%;\n  width: 100%;\n  background: #666;\n  border-radius: 3px;\n}\n.limit-scroller .ch-container {\n  overflow: auto;\n  height: 100%;\n}\n.limit-scroller ::-webkit-scrollbar {\n  background: #FFF;\n}\n.limit-scroller ::-webkit-scrollbar-thumb {\n  background: #FFF;\n}\n.limit-scroller ::-webkit-scrollbar-track {\n  background: #FFF;\n}\n", ""]);
	
	// exports


/***/ }),

/***/ 67:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Index = function (_limit$Events) {
		_inherits(Index, _limit$Events);
	
		function Index(config) {
			var _temp, _this;
	
			_classCallCheck(this, Index);
	
			var me = (_temp = (_this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this)), _this), _this.props = {
				keyWord: 'move',
				clientX: null,
				clientY: null
			}, _temp);
			limit.assign(me.state, me.props, config);
			me.bindMouseEvents();
			return _this;
		}
	
		_createClass(Index, [{
			key: 'bindMouseEvents',
			value: function bindMouseEvents() {
				var me = this;
				var state = me.state;
				var keyWord = state.keyWord;
	
				var jQdoc = $(document);
				jQdoc.on('mousemove.' + keyWord, function (e) {
					e.preventDefault();
					e.stopPropagation();
					me.emit('move', e, me.getDiff(e));
				});
				jQdoc.on('mouseup.' + keyWord, function (e) {
					e.preventDefault();
					e.stopPropagation();
					jQdoc.off('mousemove.' + keyWord).off('mouseup.' + keyWord);
					me.emit('move', e, me.getDiff(e));
					me.emit('mouseup', e, me.getDiff(e));
					me.destroy();
				});
			}
		}, {
			key: 'getDiff',
			value: function getDiff(e) {
				var me = this;
				var state = me.state;
	
				if (limit.isNumber(state.clientY) && limit.isNumber(state.clientX)) {
					return {
						diffX: e.clientX - state.clientX,
						diffY: e.clientY - state.clientY
					};
				};
			}
		}]);
	
		return Index;
	}(limit.Events);
	
	exports.Index = Index;

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _control = __webpack_require__(26);
	
	var _control2 = _interopRequireDefault(_control);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'limitScroller',
		height: 200,
		barHeight: 50
	};
	;
	
	exports.default = Controller;

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 组件类
	
	var Title = __webpack_require__(217);
	
	// 置入文档
	ReactDOM.render(React.createElement(Title, null), document.getElementById('container'));

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(218), __webpack_require__(221));

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(219);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Scroller = __webpack_require__(63);
	
	// 组件类
	
	var Title = function (_React$Component) {
		_inherits(Title, _React$Component);
	
		function Title() {
			_classCallCheck(this, Title);
	
			return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
		}
	
		_createClass(Title, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					null,
					React.createElement(
						Scroller,
						null,
						props.list.map(function (val, key) {
							return React.createElement(
								'p',
								{ key: key },
								val
							);
						})
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement('input', { type: 'button', value: '\u589E \u52A0', onClick: Actions(me).add }),
					React.createElement('input', { type: 'button', value: '\u5220 \u9664', onClick: Actions(me).del })
				);
			}
		}]);
	
		return Title;
	}(React.Component);
	
	;
	
	module.exports = Title;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(220);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Control = __webpack_require__(26);
	
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
				list: ['a1', 'a2', 'a3', 'a4', 'a5']
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onAdd',
			value: function onAdd() {
				var me = this;
				var state = me.state;
				var list = state.list;
	
				list.push('a6');
				me.updateComponent();
			}
		}, {
			key: 'onDel',
			value: function onDel() {
				var me = this;
				var state = me.state;
				var list = state.list;
	
				list.pop();
				me.updateComponent();
			}
		}]);
	
		return Controller;
	}(Control);
	
	;
	
	module.exports = Controller;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map