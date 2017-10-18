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

	module.exports = __webpack_require__(133);


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

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(134);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	ReactDOM.render(React.createElement(_index2.default, null), document.getElementById('container'));

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(135);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(143);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(136);
	
	var _index = __webpack_require__(138);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InputUpload = function (_Component) {
		_inherits(InputUpload, _Component);
	
		function InputUpload() {
			_classCallCheck(this, InputUpload);
	
			return _possibleConstructorReturn(this, (InputUpload.__proto__ || Object.getPrototypeOf(InputUpload)).apply(this, arguments));
		}
	
		_createClass(InputUpload, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: me.getClassName('page-input-upload') },
					React.createElement(_index2.default, null)
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {}
		}]);
	
		return InputUpload;
	}(_component2.default);
	
	;
	
	exports.default = InputUpload;

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(137);
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

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".page-input-upload {\n  padding: 10px;\n}\n", ""]);
	
	// exports


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(139);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(142);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(140);
	
	var _domUtil = __webpack_require__(20);
	
	var _domUtil2 = _interopRequireDefault(_domUtil);
	
	var _index = __webpack_require__(35);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InputUpload = function (_Component) {
		_inherits(InputUpload, _Component);
	
		function InputUpload() {
			_classCallCheck(this, InputUpload);
	
			return _possibleConstructorReturn(this, (InputUpload.__proto__ || Object.getPrototypeOf(InputUpload)).apply(this, arguments));
		}
	
		_createClass(InputUpload, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement('input', { type: 'button',
					className: 'mod-input-upload',
					ref: 'file',
					onMouseEnter: me.isUseUploadHack() ? me.mouseEnter.bind(me) : null,
					disabled: props.isUpload ? true : false,
					value: props.value,
					onClick: me.isUseUploadHack() ? null : me.click.bind(me) });
			}
		}, {
			key: 'isUseUploadHack',
			value: function isUseUploadHack() {
				return _domUtil2.default.isIE8();
			}
		}, {
			key: 'mouseEnter',
			value: function mouseEnter() {
				var me = this;
				var refs = me.refs,
				    props = me.props;
				var file = refs.file;
	
				if (props.isUpload) {
					return;
				};
				var offset = $(file).offset();
				var node = me.tempNode;
				node.style.top = offset.top + 'px';
				node.style.left = offset.left + 'px';
				node.style.width = file.offsetWidth + 'px';
				node.style.height = file.offsetHeight + 'px';
			}
		}, {
			key: 'mouseLeave',
			value: function mouseLeave() {
				var me = this;
				me.tempNode.style.top = '-999px';
				me.tempNode.style.left = '-999px';
			}
		}, {
			key: 'click',
			value: function click() {
				var me = this;
				me.form.file.click();
			}
		}, {
			key: 'change',
			value: function change(e) {
				var me = this;
				Actions(me).change(me.getFileName(e)).then(function () {
					me.mouseLeave();
					return me.upload();
				}).then(Actions(me).uploadSuccess, Actions(me).uploadError).then(function () {
					me.removeForm();
					me.createForm();
				});
			}
		}, {
			key: 'upload',
			value: function upload() {
				var me = this;
				var props = me.props;
	
				return new _index2.default({
					element: me.form,
					url: props.action,
					onprogress: function onprogress(scale) {
						Actions(me).progress(scale * 100);
					}
				}).submit();
			}
		}, {
			key: 'getFileName',
			value: function getFileName(e) {
				var me = this;
				var files = void 0;
				var value = void 0;
				if (e) {
					var target = e.target;
					files = target.files;
					value = target.value;
				} else {
					value = me.form.file.value;
				};
				if (files) {
					return limit.from(e.target.files, function (val) {
						var name = val.name,
						    size = val.size;
	
						return { name: name, size: size };
					});
				} else {
					return [{ name: value.split('\\').pop(), size: 0 }];
				};
			}
		}, {
			key: 'formatFileName',
			value: function formatFileName(name) {
				var arr = name.split('.');
				return limit.wordWrap(arr[0], 10, '···') + '.' + arr[1];
			}
		}, {
			key: 'createForm',
			value: function createForm() {
				var me = this;
				var props = me.props;
	
				var node = me.tempNode = document.createElement('div');
				var arr = [];
				limit.each(props.param, function (val, key) {
					arr.push('<input type="hidden" name="' + key + '" value="' + val + '" />');
				});
				node.className = 'mod-input-file';
				node.innerHTML = '<form method="POST" encType="multipart/form-data">\n\t\t\t\t<input name="file" ' + (props.multiple ? 'multiple="multiple"' : '') + ' accept="' + props.accept + '" type="file" style="filter:alpha(opacity=0);" />\n\t\t\t\t' + arr.join('') + '\n\t\t\t</form>';
				var form = me.form = node.firstChild;
				var file = form.file;
				file.onchange = me.change.bind(me);
				$(node).on('mouseleave', me.mouseLeave.bind(me));
				document.body.appendChild(node);
			}
		}, {
			key: 'removeForm',
			value: function removeForm() {
				var me = this;
				me.form.file.onchange = null;
				$(me.tempNode).off('mouseleave');
				_domUtil2.default.clearDom(me.tempNode);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				// 创建点击文件上传
				me.createForm();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var me = this;
				me.removeForm();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {}
		}]);
	
		return InputUpload;
	}(_component2.default);
	
	;
	
	exports.default = InputUpload;

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(141);
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

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-input-upload {\n  border: 1px solid #CCC;\n  background: #F2F2F2;\n  font-size: 12px;\n  padding: 0 10px;\n  height: 30px;\n  line-height: 28px;\n  color: #666;\n  cursor: pointer;\n}\n.mod-input-upload:active {\n  background: #DDD;\n  border-color: #BBB;\n}\n.mod-input-upload[disabled] {\n  cursor: not-allowed;\n  color: #CCC;\n}\n.mod-input-file {\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  background: #F00;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  top: -999px;\n  left: -999px;\n  font-size: 200px;\n}\n.mod-input-file input {\n  position: absolute;\n  right: 0px;\n  top: 0px;\n  cursor: pointer;\n}\n", ""]);
	
	// exports


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				isUpload: false
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onChange',
			value: function onChange(nameList) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.isUpload = true;
				console.log(nameList);
				return me.updateComponent().then(function () {
					return props.onChange(nameList);
				});
			}
		}, {
			key: 'onProgress',
			value: function onProgress(scale) {
				var me = this;
				var props = me.props;
	
				return props.onProgress(scale);
			}
		}, {
			key: 'onUploadSuccess',
			value: function onUploadSuccess() {
				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}
	
				console.log('onUploadSuccess');
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.isUpload = false;
				return me.updateComponent().then(function () {
					return props.onUploadSuccess.apply(props, args);
				});
			}
		}, {
			key: 'onUploadError',
			value: function onUploadError(e) {
				console.log('onUploadError', e);
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.isUpload = false;
				return me.updateComponent().then(function () {
					return props.onUploadError(e);
				});
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'InputUpload',
		value: '上 传',
		width: 300,
		param: {},
		action: '/common/upload.json',
		multiple: false, // IE8不支持
		accept: '', // IE8不支持
		onChange: limit.K,
		onProgress: limit.K, // IE8不支持
		onUploadSuccess: limit.K,
		onUploadError: limit.K
	};
	;
	
	exports.default = Controller;

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	;
	
	exports.default = Controller;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map