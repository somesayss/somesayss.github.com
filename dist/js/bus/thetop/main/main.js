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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(283);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _view = __webpack_require__(17);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _controller = __webpack_require__(28);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _hoc2.default)(_view2.default, _controller2.default);

/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(18);
	
	var _domUtil = __webpack_require__(20);
	
	var _domUtil2 = _interopRequireDefault(_domUtil);
	
	var _index = __webpack_require__(21);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CalendarRange = function (_Component) {
		_inherits(CalendarRange, _Component);
	
		function CalendarRange() {
			_classCallCheck(this, CalendarRange);
	
			return _possibleConstructorReturn(this, (CalendarRange.__proto__ || Object.getPrototypeOf(CalendarRange)).apply(this, arguments));
		}
	
		_createClass(CalendarRange, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: me.getClassName('mod-calendar-range') },
					React.createElement('input', { type: 'text',
						ref: 'input',
						onFocus: me.focus.bind(me),
						onBlur: function onBlur() {
							me.timeoutId = setTimeout(function () {
								Actions(me).focus(false);
							}, _domUtil2.default.isIEOld(100, 200));
						},
						readOnly: 'readOnly',
						value: me.getValue() }),
					props.calendarFocus ? React.createElement(
						'div',
						{ className: 'calendar-input-content', style: { transform: 'scale(' + me.setWidth() / 200 + ')', width: 399 } },
						React.createElement(_index2.default, {
							target: props.value[0],
							range: [null, props.value[1]],
							width: '200',
							className: 'calendar-input-le',
							onChangeYM: me.changeYM.bind(me),
							onSelect: me.select.bind(me, 'le') }),
						React.createElement(_index2.default, {
							target: props.value[1],
							range: [props.value[0], null],
							width: '200',
							className: 'calendar-input-ri',
							onChangeYM: me.changeYM.bind(me),
							onSelect: me.select.bind(me, 'ri') })
					) : void 0
				);
			}
		}, {
			key: 'getValue',
			value: function getValue() {
				var me = this;
				var props = me.props;
	
				if (limit.isArray(props.value)) {
					if (props.value.every(function (v) {
						return limit.isNull(v);
					})) {
						return '';
					} else {
						return props.value.join(',');
					};
				} else {
					return props.value;
				};
			}
		}, {
			key: 'setWidth',
			value: function setWidth() {
				var me = this;
				var calendarRangeWidth = me.props.calendarRangeWidth;
	
				if (calendarRangeWidth >= 200) {
					calendarRangeWidth = 200;
				} else if (calendarRangeWidth <= 170) {
					calendarRangeWidth = 170;
				};
				return calendarRangeWidth;
			}
		}, {
			key: 'changeYM',
			value: function changeYM() {
				var me = this;
				var input = me.refs.input;
	
				clearTimeout(me.timeoutId);
				me.isChangeYM = true;
				input.focus();
				me.isChangeYM = false;
			}
		}, {
			key: 'select',
			value: function select(key, val) {
				var me = this;
				me.changeYM();
				if (key === 'le') {
					return val && Actions(me).selectLe(val);
				} else {
					return val && Actions(me).selectRi(val);
				};
			}
		}, {
			key: 'focus',
			value: function focus() {
				var me = this;
				!me.isChangeYM && Actions(me).focus(true);
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
	
		return CalendarRange;
	}(_component2.default);
	
	;
	
	module.exports = CalendarRange;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(19);
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-calendar-range {\n  position: relative;\n  border: 1px solid #CCC;\n}\n.mod-calendar-range input {\n  border: 0;\n  height: 28px;\n  padding: 6px;\n  width: 100%;\n  cursor: pointer;\n  font-size: 12px;\n  color: #666;\n  background: transparent;\n}\n.mod-calendar-range .calendar-input-content {\n  position: absolute;\n  top: 31px;\n  left: -1px;\n  transform-origin: 0 0;\n  box-shadow: 0 1px 3px rgba(66, 133, 244, 0.5);\n}\n.mod-calendar-range .calendar-input-content .mod-calendar {\n  box-shadow: none;\n}\n.mod-calendar-range .calendar-input-ri {\n  margin-left: -1px;\n}\n", ""]);
	
	// exports


/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _view = __webpack_require__(22);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _controller = __webpack_require__(25);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _hoc2.default)(_view2.default, _controller2.default);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(23);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Calendar = function (_Component) {
		_inherits(Calendar, _Component);
	
		function Calendar() {
			_classCallCheck(this, Calendar);
	
			return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
		}
	
		_createClass(Calendar, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				var fontSize = (props.width - 4) / 7;
				return React.createElement(
					'div',
					{ className: me.getClassName('mod-calendar'), style: { width: props.width } },
					React.createElement(
						'div',
						{ className: 'calendar-title', style: { fontSize: fontSize } },
						me.renderTitle(),
						me.renderContent(),
						me.renderContentMain()
					)
				);
			}
		}, {
			key: 'renderTitle',
			value: function renderTitle() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: 'calendar-title-table' },
					React.createElement(
						'div',
						{ className: 'calendar-title-cell calendar-title-click' },
						React.createElement('a', { href: 'javascript:;', tabIndex: '-1', className: 'limitIcon iconfont icon-back', onClick: Actions(me).changeYear.bind(null, 'prev') })
					),
					React.createElement(
						'div',
						{ className: 'calendar-title-cell calendar-title-click' },
						React.createElement('a', { href: 'javascript:;', tabIndex: '-1', className: 'limitIcon iconfont icon-back', onClick: Actions(me).changeMonth.bind(null, 'prev') })
					),
					React.createElement(
						'div',
						{ className: 'calendar-title-cell calendar-title-text' },
						props.yearMonthStr
					),
					React.createElement(
						'div',
						{ className: 'calendar-title-cell calendar-title-click' },
						React.createElement('a', { href: 'javascript:;', tabIndex: '-1', className: 'limitIcon iconfont icon-more', onClick: Actions(me).changeMonth.bind(null, 'next') })
					),
					React.createElement(
						'div',
						{ className: 'calendar-title-cell calendar-title-click' },
						React.createElement('a', { href: 'javascript:;', tabIndex: '-1', className: 'limitIcon iconfont icon-more', onClick: Actions(me).changeYear.bind(null, 'next') })
					)
				);
			}
		}, {
			key: 'renderContent',
			value: function renderContent() {
				return React.createElement(
					'div',
					{ className: 'calendar-content' },
					React.createElement(
						'ul',
						null,
						['日', '一', '二', '三', '四', '五', '六'].map(function (v, k) {
							return React.createElement(
								'li',
								{ key: k },
								React.createElement(
									'span',
									{ className: 'calendar-main-table' },
									React.createElement(
										'span',
										{ className: 'calendar-main-cell' },
										v
									)
								)
							);
						})
					)
				);
			}
		}, {
			key: 'renderContentMain',
			value: function renderContentMain() {
				var me = this;
				var _me$props = me.props,
				    calendarData = _me$props.calendarData,
				    year = _me$props.year,
				    month = _me$props.month,
				    yearMonthStr = _me$props.yearMonthStr,
				    target = _me$props.target,
				    today = _me$props.today;
	
				return React.createElement(
					'div',
					{ className: 'calendar-content calendar-main' },
					React.createElement(
						'ul',
						null,
						calendarData.map(function (v, k) {
							var arr = v.split('-');
							var flag = me.rangeTime(v);
							return React.createElement(
								'li',
								{ key: k,
									className: [target === v ? 'active' : '', today === v ? 'today' : '', !flag ? 'range' : ''].join(' '),
									onClick: flag ? Actions(me).select.bind(null, v) : Actions(me).select.bind(null, null),
									style: { color: v.indexOf(yearMonthStr) !== -1 ? '#666' : '#CCC' } },
								React.createElement(
									'span',
									{ className: 'calendar-main-table' },
									React.createElement(
										'span',
										{ className: 'calendar-main-cell' },
										arr[2]
									)
								)
							);
						})
					)
				);
			}
		}, {
			key: 'rangeTime',
			value: function rangeTime(val) {
				var me = this;
				var range = me.props.range;
	
				var min = limit.isNull(range[0]) ? -Infinity : +new Date(range[0]);
				var max = limit.isNull(range[1]) ? Infinity : +new Date(range[1]);
				var tar = +new Date(val);
				// 如果三者都是非NaN切
				if (limit.every([min, max, tar], function (val) {
					return !limit.isNaN(val);
				}) && tar >= min && tar <= max) {
					return true;
				};
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
	
		return Calendar;
	}(_component2.default);
	
	;
	
	module.exports = Calendar;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(24);
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-calendar {\n  display: inline-block;\n  background: #FFF;\n  color: #666;\n  border: 1px solid #4285f4;\n  padding: 1px;\n  box-shadow: 0 1px 3px rgba(66, 133, 244, 0.5);\n}\n.mod-calendar .calendar-title .calendar-title-table {\n  height: 1em;\n  display: table;\n  width: 100%;\n}\n.mod-calendar .calendar-title .calendar-title-cell {\n  font-size: 0.4em;\n  vertical-align: middle;\n  display: table-cell;\n}\n.mod-calendar .calendar-title .calendar-title-click {\n  width: 20px;\n}\n.mod-calendar .calendar-title .calendar-title-text {\n  text-align: center;\n}\n.mod-calendar .calendar-content li {\n  width: 1em;\n  height: .8em;\n  float: left;\n  text-align: center;\n}\n.mod-calendar .calendar-content .calendar-main-table {\n  display: table;\n  width: 100%;\n  height: 100%;\n}\n.mod-calendar .calendar-content .calendar-main-cell {\n  display: table-cell;\n  vertical-align: middle;\n  font-size: 0.4em;\n}\n.mod-calendar .calendar-main li {\n  border: 1px dashed #FFF;\n  cursor: pointer;\n}\n.mod-calendar .calendar-main li:hover,\n.mod-calendar .calendar-main li.active {\n  border: 1px dashed #4285f4;\n  color: #4285f4 !important;\n}\n.mod-calendar .calendar-main li.today {\n  color: #4285f4 !important;\n  text-decoration: underline;\n  text-underline-position: under;\n}\n.mod-calendar .calendar-main li.active {\n  background: #4285f4;\n  color: #FFF !important;\n}\n.mod-calendar .calendar-main li.range {\n  background: #CCC;\n  color: #999 !important;\n  border-color: #CCC;\n  cursor: not-allowed;\n}\n", ""]);
	
	// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _control = __webpack_require__(26);
	
	var _control2 = _interopRequireDefault(_control);
	
	var _index = __webpack_require__(27);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Controller = function (_Control) {
		_inherits(Controller, _Control);
	
		function Controller(props) {
			var _temp, _this;
	
			_classCallCheck(this, Controller);
	
			var me = (_temp = (_this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this)), _this), _this.state = {
				calendarData: [],
				year: null,
				month: null,
				yearMonthStr: '',
				target: '',
				range: [null, null]
			}, _temp);
			var state = me.state;
	
			var theDate = new _index2.default({ date: props.target });
			var year = state.year = theDate.getYear();
			var month = state.month = theDate.getMonth();
			me.setCalendarData();
			me.setYearMonthStr();
			state.target = theDate.parseTarget();
			state.today = new _index2.default().parseTarget();
			return _this;
		}
	
		_createClass(Controller, [{
			key: 'componentWillUpdate',
			value: function componentWillUpdate() {
				var me = this;
				var state = me.state;
	
				var theDate = new _index2.default({ date: state.target });
				var year = state.year = theDate.getYear();
				var month = state.month = theDate.getMonth();
				me.setCalendarData();
				me.setYearMonthStr();
				state.target = theDate.parseTarget();
			}
		}, {
			key: 'onSelect',
			value: function onSelect(val) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				if (val) {
					state.target = val;
					return me.updateComponent().then(function () {
						return props.onSelect(state.target);
					});
				} else {
					return props.onSelect(null);
				};
			}
		}, {
			key: 'onChangeMonth',
			value: function onChangeMonth(key) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				if (key === 'prev') {
					state.month--;
				} else {
					state.month++;
				};
				me.setCalendarData();
				me.setYearMonthStr();
				return me.updateComponent().then(function () {
					return props.onChangeYM();
				});
			}
		}, {
			key: 'onChangeYear',
			value: function onChangeYear(key) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				if (key === 'prev') {
					state.year--;
				} else {
					state.year++;
				};
				me.setCalendarData();
				me.setYearMonthStr();
				return me.updateComponent().then(function () {
					return props.onChangeYM();
				});
			}
		}, {
			key: 'setCalendarData',
			value: function setCalendarData() {
				var me = this;
				var state = me.state;
	
				var arr = _index2.default.getFullDayListInMonth(state.year, state.month);
				state.calendarData = arr;
			}
		}, {
			key: 'setYearMonthStr',
			value: function setYearMonthStr() {
				var me = this;
				var state = me.state;
	
				state.yearMonthStr = new _index2.default().setYear(state.year).setMonth(state.month).parseTarget('yyyy-MM');
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'Calendar',
		width: 180,
		onSelect: limit.K,
		onChangeYM: limit.K
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CalendarCompute = function () {
		function CalendarCompute(config) {
			_classCallCheck(this, CalendarCompute);
	
			this.props = {
				date: new Date(),
				target: null
			};
			this.state = {};
	
			var me = this;
			limit.assignSuper(me.state, me.props, config);
			var state = me.state;
	
			state.target = state.date ? new Date(state.date) : new Date();
			if (limit.isNaN(+state.target)) {
				throw state.target;
			};
		}
	
		_createClass(CalendarCompute, [{
			key: 'setYear',
			value: function setYear(year) {
				var me = this;
				me.state.target.setYear(year);
				return me;
			}
		}, {
			key: 'setMonth',
			value: function setMonth(month) {
				var me = this;
				me.state.target.setMonth(--month);
				return me;
			}
		}, {
			key: 'setDate',
			value: function setDate(date) {
				var me = this;
				me.state.target.setDate(date);
				return me;
			}
		}, {
			key: 'getTarget',
			value: function getTarget() {
				var me = this;
				return me.state.target;
			}
		}, {
			key: 'getYear',
			value: function getYear() {
				var me = this;
				var state = me.state;
	
				return state.target.getFullYear();
			}
		}, {
			key: 'getMonth',
			value: function getMonth() {
				var me = this;
				var state = me.state;
	
				return state.target.getMonth() + 1;
			}
		}, {
			key: 'getDate',
			value: function getDate() {
				var me = this;
				var state = me.state;
	
				return state.target.getDate();
			}
		}, {
			key: 'getDay',
			value: function getDay() {
				var me = this;
				var state = me.state;
	
				return state.target.getDay();
			}
			// 获取已知年月的那一天
	
		}, {
			key: 'getTheDayInMonth',
			value: function getTheDayInMonth(year, month) {
				var me = this;
				var state = me.state;
	
				var last = CalendarCompute.getLastDayInMonth(year, month);
				var lastDate = last.getDate();
				var thisDate = new Date();
				var targetDate = me.getDate();
				thisDate.setYear(year);
				thisDate.setMonth(month - 1);
				thisDate.setDate(targetDate);
				state.target = targetDate <= lastDate ? thisDate : last;
				return me;
			}
			// 获取前一个月
	
		}, {
			key: 'getPrevTheDayInMonth',
			value: function getPrevTheDayInMonth() {
				var me = this;
				var year = me.getYear();
				var month = me.getMonth();
				return me.getTheDayInMonth(year, --month);
			}
			// 获取后一个月
	
		}, {
			key: 'getNextTheDayInMonth',
			value: function getNextTheDayInMonth() {
				var me = this;
				var year = me.getYear();
				var month = me.getMonth();
				return me.getTheDayInMonth(year, ++month);
			}
			// 获取当前月的数据列表
	
		}, {
			key: 'getDayListInMonth',
			value: function getDayListInMonth() {
				var me = this;
				return CalendarCompute.getDayListInMonth(me.getYear(), me.getMonth());
			}
		}, {
			key: 'parseTarget',
			value: function parseTarget() {
				var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'yyyy-MM-dd';
	
				var me = this;
				var state = me.state;
	
				return limit.formatDate(state.target, str);
			}
			// 获取已知年月的最后一天
	
		}], [{
			key: 'getLastDayInMonth',
			value: function getLastDayInMonth(year, month) {
				var date = new Date();
				date.setYear(year);
				date.setMonth(month);
				date.setDate(0);
				return date;
			}
			// 获取已知年月的第一天
	
		}, {
			key: 'getFirstDayInMonth',
			value: function getFirstDayInMonth(year, month) {
				var date = new Date();
				date.setYear(year);
				date.setMonth(--month);
				date.setDate(1);
				return date;
			}
			// 获取已知年月的所有天
	
		}, {
			key: 'getDayListInMonth',
			value: function getDayListInMonth(year, month) {
				var lastDay = CalendarCompute.getLastDayInMonth(year, month);
				return limit.from(new Array(lastDay.getDate()), function (val, key) {
					return new CalendarCompute().setYear(year).setMonth(month).setDate(++key).parseTarget();
				});
			}
			// 获取42天的所有天
	
		}, {
			key: 'getFullDayListInMonth',
			value: function getFullDayListInMonth(year, month) {
				var day = new CalendarCompute().setYear(year).setMonth(month).setDate(1).getDay();
				var prevArr = day ? CalendarCompute.getDayListInMonth(year, month - 1) : [];
				var thisArr = CalendarCompute.getDayListInMonth(year, month);
				var nextArr = CalendarCompute.getDayListInMonth(year, month + 1);
				return [].concat(prevArr.slice(-day), thisArr, nextArr.slice(0, 42 - day - thisArr.length));
			}
		}]);
	
		return CalendarCompute;
	}();
	
	;
	
	exports.default = CalendarCompute;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
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
				calendarFocus: false,
				value: [null, null]
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onFocus',
			value: function onFocus(key) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.calendarFocus = key;
				return me.updateComponent().then(function () {
					if (key) {
						return props.onFocus();
					} else {
						return props.onBlur();
					};
				});
			}
		}, {
			key: 'onSelectLe',
			value: function onSelectLe(val) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.value[0] = val;
				return me.updateComponent().then(function () {
					return props.onChange(state.value);
				});
			}
		}, {
			key: 'onSelectRi',
			value: function onSelectRi(val) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.value[1] = val;
				return me.updateComponent().then(function () {
					return props.onChange(state.value);
				});
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'CalendarRange',
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = limit;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(32);
	
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

/***/ }),
/* 34 */,
/* 35 */
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
/* 36 */
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
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(43);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(83);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(44);
	
	var _checkbox = __webpack_require__(46);
	
	var _checkbox2 = _interopRequireDefault(_checkbox);
	
	var _domUtil = __webpack_require__(20);
	
	var _domUtil2 = _interopRequireDefault(_domUtil);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _index = __webpack_require__(255);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(47);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _index5 = __webpack_require__(58);
	
	var _index6 = _interopRequireDefault(_index5);
	
	var _index7 = __webpack_require__(63);
	
	var _index8 = _interopRequireDefault(_index7);
	
	var _index9 = __webpack_require__(73);
	
	var _index10 = _interopRequireDefault(_index9);
	
	var _index11 = __webpack_require__(78);
	
	var _index12 = _interopRequireDefault(_index11);
	
	var _index13 = __webpack_require__(14);
	
	var _index14 = _interopRequireDefault(_index13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var formMap = {
		number: 'text',
		submit: 'button',
		reset: 'button'
	};
	
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
	
				var fn = me[me.getType() + 'Render'];
				var classNameArr = [props.className, 'limit-form'].filter(function (v) {
					return v;
				});
				if (props.focus) {
					classNameArr.push('limit-form-focus');
				};
				if (props.validaorError) {
					classNameArr.push('limit-form-error');
				};
				if (props.disabled) {
					classNameArr.push('limit-form-disabled');
				};
				return React.createElement(
					'div',
					{
						className: classNameArr.join(' '),
						style: { width: me.getWidth() } },
					props.validaorError ? React.createElement(
						'div',
						{ className: 'ch-error-info' },
						props.validaorError
					) : void 0,
					fn ? fn.call(me) : null
				);
			}
		}, {
			key: 'getType',
			value: function getType() {
				var me = this;
				var props = me.props;
	
				var type = formMap[props.type];
				return type ? type : props.type;
			}
		}, {
			key: 'getWidth',
			value: function getWidth() {
				var me = this;
				var props = me.props;
	
				if (props.width) {
					return props.width;
				};
				return props[me.getType() + 'Width'];
			}
		}, {
			key: 'doOriginFun',
			value: function doOriginFun(val, e, args) {
				var me = this;
				var props = me.props;
	
				var originFun = props[val];
				if (originFun) {
					originFun.call.apply(originFun, [undefined, e.target ? e.target.value : e, e].concat(_toConsumableArray(args)));
				};
			}
		}, {
			key: 'parseProps',
			value: function parseProps() {
				var me = this;
				var props = me.props;
	
				var newProps = limit.filter(props, function (val, key) {
					return !limit.contains(['actionId', 'actionUUid', 'className', 'placeholder'], key);
				});
				['onFocus', 'onBlur', 'onChange'].forEach(function (val) {
					newProps[val] = function (e) {
						var fun = Actions(me)['' + props.type + val.slice(2)];
	
						for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							args[_key - 1] = arguments[_key];
						}
	
						if (fun) {
							fun.apply(undefined, [e].concat(args)).then(me.doOriginFun.bind(me, val, e, args));
						} else {
							var _Actions;
	
							(_Actions = Actions(me))['' + val.slice(2).toLowerCase()].apply(_Actions, [e].concat(args)).then(me.doOriginFun.bind(me, val, e, args));
						};
					};
				});
				return newProps;
			}
		}, {
			key: 'selectRender',
			value: function selectRender() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					_index4.default,
					_extends({}, me.parseProps(), { width: '100%', className: 'limit-form-' + props.type }),
					props.children
				);
			}
		}, {
			key: 'textRender',
			value: function textRender() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: 'limit-form-' + me.getType(), style: { paddingRight: props.readOnly ? '6' : null } },
					props.value && !props.readOnly ? React.createElement(
						'a',
						{ href: 'javascript:;', tabIndex: '-1', className: 'ch-clear', onClick: !props.disabled ? Actions(me).clear.bind(me) : null },
						'\xD7'
					) : void 0,
					React.createElement('input', _extends({ className: props.pswShow ? '' : 'fn-hide', autoComplete: 'off' }, me.parseProps(), { ref: 'input', type: me.getType() })),
					props.type === 'password' ? React.createElement('input', _extends({ className: props.pswShow ? 'fn-hide' : '', autoComplete: 'off' }, me.parseProps(), { ref: 'inputPwd', type: 'text', name: '' })) : void 0,
					!props.value ? React.createElement(
						'span',
						{ className: 'ch-placeholder' },
						props.placeholder
					) : void 0,
					props.value && props.type === 'password' ? React.createElement(
						'span',
						{ className: 'ch-container-eye', onClick: Actions(me).toggleEye },
						React.createElement('i', { className: 'ch-eye' })
					) : void 0
				);
			}
		}, {
			key: 'passwordRender',
			value: function passwordRender() {
				var me = this;
				return me.textRender();
			}
		}, {
			key: 'fileRender',
			value: function fileRender() {
				var me = this;
				return React.createElement(
					'div',
					{ className: 'limit-form-' + me.getType() },
					React.createElement(_index10.default, me.parseProps())
				);
			}
		}, {
			key: 'buttonRender',
			value: function buttonRender() {
				var me = this;
				var props = me.props;
	
				var type = props.type;
				return React.createElement(
					'div',
					{ className: 'limit-form-' + me.getType() },
					React.createElement(_index2.default, _extends({}, me.parseProps(), { ref: 'input' }))
				);
			}
		}, {
			key: 'textareaRender',
			value: function textareaRender() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: 'limit-form-' + props.type },
					!props.value ? React.createElement(
						'span',
						{ className: 'ch-placeholder' },
						props.placeholder
					) : void 0,
					React.createElement(_index6.default, me.parseProps())
				);
			}
		}, {
			key: 'multipleRender',
			value: function multipleRender() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: 'limit-form-' + props.type },
					!('' + props.value) ? React.createElement(
						'span',
						{ className: 'ch-placeholder' },
						props.placeholder
					) : void 0,
					React.createElement(
						_index8.default,
						_extends({}, me.parseProps(), { width: '100%', className: 'limit-form-' + props.type }),
						props.children
					)
				);
			}
		}, {
			key: 'checkboxRender',
			value: function checkboxRender() {
				var me = this;
				return React.createElement(_checkbox2.default, me.parseProps());
			}
		}, {
			key: 'calendarRender',
			value: function calendarRender() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: 'limit-form-calendar' },
					!props.value ? React.createElement(
						'span',
						{ className: 'ch-placeholder' },
						props.placeholder
					) : void 0,
					props.value ? React.createElement(
						'a',
						{ href: 'javascript:;', tabIndex: '-1', className: 'ch-clear', onClick: !props.disabled ? Actions(me).clear.bind(me) : null },
						'\xD7'
					) : void 0,
					React.createElement(_index12.default, me.parseProps())
				);
			}
		}, {
			key: 'calendarRangeRender',
			value: function calendarRangeRender() {
				var me = this;
				var props = me.props;
	
				var parseProps = me.parseProps();
				if (!limit.isArray(parseProps.value)) {
					parseProps.value = [null, null];
				};
				return React.createElement(
					'div',
					{ className: 'limit-form-calendar' },
					!props.value ? React.createElement(
						'span',
						{ className: 'ch-placeholder' },
						props.placeholder
					) : void 0,
					props.value ? React.createElement(
						'a',
						{ href: 'javascript:;', tabIndex: '-1', className: 'ch-clear', onClick: !props.disabled ? Actions(me).clear.bind(me) : null },
						'\xD7'
					) : void 0,
					React.createElement(_index14.default, parseProps)
				);
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				var me = this;
				var props = me.props;
	
				if (limit.contains(['text', 'password', 'number'], props.type) && props.clearSuccess) {
					if (props.pswShow) {
						me.selectInput(me.refs.input);
					} else {
						me.selectInput(me.refs.inputPwd);
					};
				};
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				var refs = me.refs,
				    props = me.props;
				var eye = refs.eye,
				    input = refs.input;
	
				Actions(me).comDidMount();
				if (input && props.focus) {
					me.selectInput(input);
				};
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var me = this;
				var props = me.props;
				var refs = me.refs;
				var eye = refs.eye,
				    input = refs.input;
	
				var validaor = props.validaor;
				if (validaor) {
					validaor.removeAllListeners(props.name + 'Validat');
					validaor.removeAllListeners(props.name + 'Reset');
				};
			}
		}, {
			key: 'selectInput',
			value: function selectInput(input) {
				var me = this;
				var props = me.props;
	
				if (limit.contains(['text', 'textarea', 'password'], props.type)) {
					var length = input.value.length;
					return _domUtil2.default.textSelect(input, length, length);
				} else if (limit.contains(['button', 'reset', 'submit'], props.type)) {
					input.refs.com.focus();
				};
			}
		}]);
	
		return View;
	}(_component2.default);
	
	;
	
	exports.default = View;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(45);
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-form {\n  display: inline-block;\n  position: relative;\n  background: #FFF;\n}\n.less-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.less-clear {\n  position: absolute;\n  z-index: 1;\n  width: 15px;\n  height: 16px;\n  line-height: 14px;\n  text-align: center;\n  right: 1px;\n  top: 50%;\n  margin-top: -8px;\n  color: #CCC;\n}\n.less-clear:hover {\n  color: #666;\n}\n.limit-form-text {\n  border: 1px solid #CCC;\n  padding: 6px;\n  padding-right: 15px;\n  background: #FFF;\n}\n.limit-form-text input {\n  border: 0;\n  height: 16px;\n  line-height: 16px;\n  color: #666;\n  font-size: 1em;\n  width: 100%;\n  position: relative;\n  z-index: 2;\n  background: none;\n}\n.limit-form-text .ch-clear {\n  position: absolute;\n  z-index: 1;\n  width: 15px;\n  height: 16px;\n  line-height: 14px;\n  text-align: center;\n  right: 1px;\n  top: 50%;\n  margin-top: -8px;\n  color: #CCC;\n}\n.limit-form-text .ch-clear:hover {\n  color: #666;\n}\n.limit-form-text .ch-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form-password {\n  border: 1px solid #CCC;\n  padding: 6px;\n  padding-right: 15px;\n  background: #FFF;\n  padding-right: 28px;\n}\n.limit-form-password input {\n  border: 0;\n  height: 16px;\n  line-height: 16px;\n  color: #666;\n  font-size: 1em;\n  width: 100%;\n  position: relative;\n  z-index: 2;\n  background: none;\n}\n.limit-form-password .ch-clear {\n  position: absolute;\n  z-index: 1;\n  width: 15px;\n  height: 16px;\n  line-height: 14px;\n  text-align: center;\n  right: 1px;\n  top: 50%;\n  margin-top: -8px;\n  color: #CCC;\n}\n.limit-form-password .ch-clear:hover {\n  color: #666;\n}\n.limit-form-password .ch-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form-password .ch-container-eye {\n  position: absolute;\n  z-index: 2;\n  width: 10px;\n  height: 10px;\n  top: 50%;\n  margin-top: -5px;\n  right: 15px;\n  background: #FFF;\n  text-align: center;\n  border: 1px solid #CCC;\n  border-radius: 100px;\n  cursor: pointer;\n}\n.limit-form-password .ch-container-eye:hover .ch-eye {\n  background: #666;\n}\n.limit-form-password .ch-eye {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 6px;\n  background: #CCC;\n  margin-top: 1px;\n}\n.limit-form-textarea {\n  border: 1px solid #CCC;\n  padding: 6px;\n  background: #FFF;\n}\n.limit-form-textarea .ch-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form-textarea textarea {\n  background: transparent;\n}\n.limit-form-button input {\n  border: 1px solid #CCC;\n  background: #F2F2F2;\n  font-size: 12px;\n  padding: 0 10px;\n  height: 30px;\n  line-height: 28px;\n  width: 100%;\n  color: #666;\n}\n.limit-form-button input:active {\n  background: #DDD;\n  border-color: #BBB;\n}\n.limit-form-file input {\n  border: 1px solid #CCC;\n  background: #F2F2F2;\n  font-size: 12px;\n  padding: 0 10px;\n  height: 30px;\n  line-height: 28px;\n  width: 100%;\n  color: #666;\n}\n.limit-form-file input:active {\n  background: #DDD;\n  border-color: #BBB;\n}\n.limit-form-calendar .ch-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form-calendar .ch-clear {\n  position: absolute;\n  z-index: 1;\n  width: 15px;\n  height: 16px;\n  line-height: 14px;\n  text-align: center;\n  right: 1px;\n  top: 50%;\n  margin-top: -8px;\n  color: #CCC;\n}\n.limit-form-calendar .ch-clear:hover {\n  color: #666;\n}\n.limit-form .ch-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form input[type=\"text\"] {\n  background: transparent;\n}\n/*禁止*/\n.limit-form-disabled .limit-form-text,\n.limit-form-disabled .limit-form-password,\n.limit-form-disabled .limit-form-textarea {\n  background: #F2F2F2;\n}\n.limit-form-disabled .limit-form-text *,\n.limit-form-disabled .limit-form-password *,\n.limit-form-disabled .limit-form-textarea * {\n  cursor: not-allowed;\n}\n.limit-form-disabled .limit-form-submit input,\n.limit-form-disabled .limit-form-reset input,\n.limit-form-disabled .limit-form-button input {\n  color: #999;\n  cursor: not-allowed;\n}\n.limit-form-disabled .limit-form-select {\n  background: #F2F2F2;\n  color: #999;\n  cursor: not-allowed;\n}\n/*焦点*/\n.limit-form-focus.limit-form {\n  z-index: 2;\n}\n.limit-form-focus .limit-form-text,\n.limit-form-focus .limit-form-password,\n.limit-form-focus .limit-form-textarea,\n.limit-form-focus .mod-calendar-input,\n.limit-form-focus .mod-calendar-range {\n  border-color: #4285f4;\n  box-shadow: 0 0 3px rgba(66, 133, 244, 0.5);\n}\n.limit-form-focus .limit-form-text .ch-clear,\n.limit-form-focus .limit-form-password .ch-clear,\n.limit-form-focus .limit-form-textarea .ch-clear,\n.limit-form-focus .mod-calendar-input .ch-clear,\n.limit-form-focus .mod-calendar-range .ch-clear {\n  color: #4285f4;\n}\n.limit-form-focus .limit-form-text .ch-placeholder,\n.limit-form-focus .limit-form-password .ch-placeholder,\n.limit-form-focus .limit-form-textarea .ch-placeholder,\n.limit-form-focus .mod-calendar-input .ch-placeholder,\n.limit-form-focus .mod-calendar-range .ch-placeholder {\n  display: none;\n}\n.limit-form-focus .limit-form-password .ch-container-eye {\n  border-color: #4285f4;\n}\n.limit-form-focus .limit-form-password .ch-container-eye:hover .ch-eye {\n  background: #4285f4;\n}\n.limit-form-focus .limit-form-password .ch-eye {\n  background: #4285f4;\n}\n.limit-form-focus .limit-form-button button:after,\n.limit-form-focus .limit-form-file button:after {\n  position: absolute;\n  content: '';\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border-radius: 2px;\n  border: 1px solid #FFF;\n}\n/*错误*/\n.limit-form-error .limit-form-text,\n.limit-form-error .limit-form-password,\n.limit-form-error .limit-form-textarea,\n.limit-form-error .mod-calendar-input,\n.limit-form-error .mod-calendar-range {\n  border-color: #F00;\n  box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);\n}\n.limit-form-error .limit-form-text .ch-clear,\n.limit-form-error .limit-form-password .ch-clear,\n.limit-form-error .limit-form-textarea .ch-clear,\n.limit-form-error .mod-calendar-input .ch-clear,\n.limit-form-error .mod-calendar-range .ch-clear {\n  color: #F00;\n}\n.limit-form-error .limit-form-text .ch-placeholder,\n.limit-form-error .limit-form-password .ch-placeholder,\n.limit-form-error .limit-form-textarea .ch-placeholder,\n.limit-form-error .mod-calendar-input .ch-placeholder,\n.limit-form-error .mod-calendar-range .ch-placeholder {\n  color: #F00;\n}\n.limit-form-error .limit-form-calendar .ch-placeholder {\n  color: #F00;\n}\n.limit-form-error .limit-form-calendar .mod-calendar {\n  border-color: #F00;\n}\n.limit-form-error .limit-form-calendar .mod-calendar .limitIcon {\n  color: #F00;\n}\n.limit-form-error .limit-form-calendar .mod-calendar .limitIcon:focus,\n.limit-form-error .limit-form-calendar .mod-calendar .limitIcon:hover {\n  text-shadow: 0 0 3px rgba(255, 0, 0, 0.5);\n}\n.limit-form-error .limit-form-calendar .mod-calendar .calendar-main li:hover,\n.limit-form-error .limit-form-calendar .mod-calendar .calendar-main li.active {\n  border-color: #F00;\n  color: #F00 !important;\n}\n.limit-form-error .limit-form-calendar .mod-calendar .calendar-main li.today {\n  color: #F00 !important;\n}\n.limit-form-error .limit-form-calendar .mod-calendar .calendar-main li.active {\n  background: #F00;\n  color: #FFF !important;\n}\n.limit-form-error .limit-form-password .ch-container-eye {\n  border-color: #F00;\n}\n.limit-form-error .limit-form-password .ch-container-eye:hover .ch-eye {\n  background: #F00;\n}\n.limit-form-error .limit-form-password .ch-eye {\n  background: #F00;\n}\n.limit-form-error .limit-form-select.mod-select .select-trigger,\n.limit-form-error .limit-form-select.mod-select .select-container {\n  border-color: #F00;\n  box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);\n}\n.limit-form-error .limit-form-select.mod-select:before {\n  border-color: #F00;\n}\n.limit-form-error .limit-form-select.mod-select li.active {\n  background: #F00;\n  border-color: #F00;\n}\n.limit-form-error .limit-form-select.mod-select li:hover {\n  border-color: #F00;\n}\n.limit-form-error .limit-form-select.mod-select .select-trigger .select-trigger-san {\n  border-top-color: #F00;\n}\n.limit-form-error .limit-form-multiple .ch-placeholder {\n  color: #F00;\n}\n.limit-form-error .limit-form-multiple .mod-multiple .multiple-trigger,\n.limit-form-error .limit-form-multiple .mod-multiple .multiple-content {\n  border-color: #F00;\n  box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);\n}\n.limit-form-error .limit-form-multiple .mod-multiple .multiple-trigger .multiple-trigger-san {\n  border-top-color: #F00;\n}\n.limit-form-error .limit-form-multiple .mod-multiple:before {\n  border-color: #F00;\n}\n.limit-form-error .limit-form-multiple .mod-multiple li.active {\n  background: #F00;\n  border-color: #F00;\n}\n.limit-form-error .limit-form-multiple .mod-multiple li.focus {\n  border-color: #F00;\n}\n.limit-form-error .ch-error-info {\n  position: absolute;\n  height: 20px;\n  line-height: 18px;\n  border: 1px solid #F00;\n  box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);\n  top: -10px;\n  right: 3px;\n  color: #F00;\n  background: #FFF;\n  padding: 0 5px;\n  z-index: 1;\n}\n", ""]);
	
	// exports


/***/ }),
/* 46 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 组件类
	var Checkbox = function (_React$Component) {
		_inherits(Checkbox, _React$Component);
	
		function Checkbox() {
			_classCallCheck(this, Checkbox);
	
			return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
		}
	
		_createClass(Checkbox, [{
			key: "render",
			value: function render() {
				var me = this;
				return React.createElement("input", _extends({ ref: "input" }, me.props, { type: "Checkbox" }));
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				var me = this;
				var input = me.refs.input,
				    indeterminate = me.props.indeterminate;
	
				input.indeterminate = !!indeterminate;
			}
		}, {
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				var me = this;
				me.componentDidMount();
			}
		}]);
	
		return Checkbox;
	}(React.Component);
	
	;
	
	exports.default = Checkbox;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _view = __webpack_require__(48);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _controller = __webpack_require__(57);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _hoc2.default)(_view2.default, _controller2.default);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(49);
	
	var _index = __webpack_require__(51);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Select = function (_Component) {
		_inherits(Select, _Component);
	
		function Select() {
			_classCallCheck(this, Select);
	
			return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
		}
	
		_createClass(Select, [{
			key: 'getFirstSelect',
			value: function getFirstSelect() {
				var me = this;
				var list = me.props.list;
	
				var key = null;
				list.some(function (val) {
					if (val.selected) {
						key = val.key;
						return true;
					};
				});
				if (key === null && list[0]) {
					key = list[0].key;
				};
				return key;
			}
		}, {
			key: 'render',
			value: function render() {
				var me = this;
				var _me$props = me.props,
				    width = _me$props.width,
				    height = _me$props.height,
				    focus = _me$props.focus,
				    scrollSize = _me$props.scrollSize,
				    list = _me$props.list,
				    focusNumber = _me$props.focusNumber;
	
				var lineHeight = (height - 18) / 2;
				return React.createElement(
					'div',
					{ className: me.getClassName('mod-select', focus ? 'mod-select-focus' : ''), style: { width: width, height: height } },
					React.createElement(
						'div',
						{ className: 'select-trigger' },
						React.createElement('input', { type: 'text',
							style: { paddingTop: lineHeight, paddingBottom: lineHeight },
							ref: 'input',
							value: me.getFirstSelect(),
							readOnly: 'readOnly',
							onKeyDown: me.keyDown.bind(me),
							onFocus: me.focus.bind(me),
							onBlur: function onBlur() {
								setTimeout(function () {
									Actions(me).focus(null, false);
								}, 100);
							} }),
						React.createElement('i', { className: 'select-trigger-san' })
					),
					focus ? React.createElement(
						'div',
						{ className: 'select-container', style: { top: height - 1 } },
						list.length <= scrollSize ? React.createElement(
							'ul',
							{ className: 'fn-clear' },
							list.map(function (val, key) {
								return React.createElement(
									'li',
									{ key: key,
										onClick: Actions(me).select.bind(null, val, key),
										className: '' + (key === focusNumber ? 'active' : '') },
									val.key
								);
							})
						) : React.createElement(
							_index2.default,
							{ height: scrollSize * 28, ref: 'scroller', barHeight: '50' },
							React.createElement(
								'ul',
								{ className: 'fn-clear' },
								list.map(function (val, key) {
									return React.createElement(
										'li',
										{ key: key,
											onClick: Actions(me).select.bind(null, val, key),
											className: '' + (key === focusNumber ? 'active' : '') },
										val.key
									);
								})
							)
						)
					) : void 0
				);
			}
		}, {
			key: 'focus',
			value: function focus() {
				var me = this;
				Actions(me).focus(true).then(me.scrollTo.bind(me));
			}
		}, {
			key: 'scrollTo',
			value: function scrollTo() {
				var me = this;
				var scroller = me.refs.scroller;
	
				if (scroller) {
					var num = me.props.focusNumber - me.props.scrollSize + 1;
					scroller.refs.com.scrollTo(num * 28);
				};
			}
		}, {
			key: 'keyDown',
			value: function keyDown(e) {
				var me = this;
				var _me$refs = me.refs,
				    input = _me$refs.input,
				    scroller = _me$refs.scroller,
				    _me$props2 = me.props,
				    focusNumber = _me$props2.focusNumber,
				    list = _me$props2.list;
	
				if (!e.shiftKey && !e.altKey && list.length) {
					// 
					var keyMap = {
						38: 'up',
						40: 'down'
					};
					if (keyMap[e.keyCode]) {
						e.preventDefault();
						Actions(me).keyDown(keyMap[e.keyCode]).then(me.scrollTo.bind(me));
					} else if (e.keyCode === 13) {
						e.preventDefault();
						Actions(me).enterDown().then(function () {
							input.blur();
						});
					};
				};
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {}
		}]);
	
		return Select;
	}(_component2.default);
	
	;
	
	module.exports = Select;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(50);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-select {\n  display: inline-block;\n  position: relative;\n}\n.mod-select .select-trigger {\n  border: 1px solid #CCC;\n  background: #FFF;\n  height: 100%;\n}\n.mod-select .select-trigger input {\n  padding: 0 6px;\n  border: none;\n  font-size: 12px;\n  color: #666;\n  height: 100%;\n  width: 100%;\n  background: transparent;\n  cursor: pointer;\n  position: relative;\n  line-height: 16px;\n}\n.mod-select .select-trigger .select-trigger-san {\n  transition: all 0.3s ease-in-out 0s;\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-top: 6px solid #999;\n  border-bottom: 0;\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  right: 5px;\n  top: 50%;\n  margin-top: -3px;\n}\n.mod-select .select-container {\n  position: absolute;\n  border: 1px solid #CCC;\n  border-top: none;\n  background: #FFF;\n  width: 100%;\n  left: 0;\n  padding: 1px;\n}\n.mod-select .select-container ul {\n  margin-right: 1px;\n}\n.mod-select .select-container li {\n  cursor: pointer;\n  height: 28px;\n  line-height: 28px;\n  overflow: hidden;\n  padding: 0 4px;\n  border: 1px dashed #FFF;\n  color: #666;\n}\n.mod-select .select-container li:hover {\n  border: 1px dashed #4285f4;\n}\n.mod-select .select-container li.active {\n  background: #4285f4;\n  border: 1px dashed #4285f4;\n  color: #FFF;\n}\n.mod-select.mod-select-focus .select-trigger {\n  border-color: #4285f4;\n  box-shadow: 0 1px 3px rgba(66, 133, 244, 0.5);\n}\n.mod-select.mod-select-focus .select-trigger .select-trigger-san {\n  transform: rotate(180deg);\n  border-top-color: #4285f4;\n}\n.mod-select.mod-select-focus .select-container {\n  border-color: #4285f4;\n  box-shadow: 0 1px 3px rgba(66, 133, 244, 0.5);\n}\n.mod-select.mod-select-focus:before {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  bottom: 0;\n  left: 0;\n  background: #FFF;\n  border-left: 1px solid #4285f4;\n  border-right: 1px solid #4285f4;\n  z-index: 1;\n}\n", ""]);
	
	// exports


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(52);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(56);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(53);
	
	var _index = __webpack_require__(55);
	
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(54);
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-scroller {\n  position: relative;\n  overflow: hidden;\n}\n.limit-scroller .ch-container-bar {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 17px;\n  height: 100%;\n  background: #FFF;\n}\n.limit-scroller .ch-container-bar:hover .ch-bar {\n  opacity: 1 !important;\n}\n.limit-scroller .ch-bar {\n  transition: opacity 0.5s ease-in-out 0s;\n  position: absolute;\n  width: 6px;\n  height: 50px;\n  border-top: 2px solid #FFF;\n  border-bottom: 2px solid #FFF;\n  top: 0;\n  right: 3px;\n  cursor: pointer;\n  opacity: 0;\n}\n.limit-scroller .ch-bar:before {\n  display: block;\n  content: '';\n  height: 100%;\n  width: 100%;\n  background: #666;\n  border-radius: 3px;\n}\n.limit-scroller .ch-container {\n  overflow: auto;\n  height: 100%;\n}\n.limit-scroller ::-webkit-scrollbar {\n  background: #FFF;\n}\n.limit-scroller ::-webkit-scrollbar-thumb {\n  background: #FFF;\n}\n.limit-scroller ::-webkit-scrollbar-track {\n  background: #FFF;\n}\n", ""]);
	
	// exports


/***/ }),
/* 55 */
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
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _control = __webpack_require__(26);
	
	var _control2 = _interopRequireDefault(_control);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Controller = function (_Control) {
		_inherits(Controller, _Control);
	
		function Controller(props) {
			var _temp, _this;
	
			_classCallCheck(this, Controller);
	
			var me = (_temp = (_this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this)), _this), _this.state = {
				focus: false,
				focusNumber: 0
			}, _temp);
			var state = me.state;
	
			state.list = me.parseListByChildren(props);
			me.setInitFocusNmuber();
			return _this;
		}
	
		_createClass(Controller, [{
			key: 'setInitFocusNmuber',
			value: function setInitFocusNmuber() {
				var me = this;
				var state = me.state;
	
				state.focusNumber = 0;
				state.list.some(function (val, key) {
					if (val.selected) {
						state.focusNumber = key;
						return true;
					};
				});
			}
		}, {
			key: 'parseListByChildren',
			value: function parseListByChildren(props) {
				return React.Children.map(props.children, function (child) {
					var val = child.props;
					var propsValue = props.value;
					var valValue = val.value;
					if (limit.isUndefined(propsValue)) {
						propsValue = '';
					};
					if (limit.isUndefined(valValue)) {
						valValue = '';
					};
					return { key: val.children, value: valValue, selected: valValue === propsValue };
				});
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(nextState) {
				var me = this;
				var state = me.state;
	
				state.list = me.parseListByChildren(nextState);
				me.setInitFocusNmuber();
			}
		}, {
			key: 'onFocus',
			value: function onFocus(flag) {
				var me = this;
				var state = me.state;
	
				state.focus = flag;
				return me.updateComponent().then(function () {
					if (flag) {
						me.props.onFocus();
					} else {
						me.props.onBlur();
					};
				});
			}
		}, {
			key: 'onKeyDown',
			value: function onKeyDown(key) {
				var me = this;
				var state = me.state;
				var list = state.list;
	
				var max = list.length - 1;
				switch (key) {
					case 'up':
						if (state.focusNumber > max || state.focusNumber <= 0) {
							state.focusNumber = max;
						} else {
							state.focusNumber--;
						};
						break;
					case 'down':
						if (state.focusNumber < 0 || state.focusNumber >= max) {
							state.focusNumber = 0;
						} else {
							state.focusNumber++;
						};
						break;
				};
				if (state.focusNumber <= 0) {
					state.focusNumber = 0;
				} else if (state.focusNumber >= max) {
					state.focusNumber = max;
				};
				return me.updateComponent();
			}
		}, {
			key: 'doSelect',
			value: function doSelect(val, key) {
				var me = this;
				var state = me.state,
				    props = me.props;
				var focusNumber = state.focusNumber,
				    list = state.list;
	
				var targetKey = 0;
				list.forEach(function (v, k) {
					if (v.selected) {
						targetKey = k;
					};
					v.selected = false;
				});
				val.selected = true;
				if (limit.isDefined(key)) {
					targetKey = state.focusNumber = key;
				};
				return me.updateComponent().then(function () {
					if (targetKey !== focusNumber) {
						props.onChange(val.value, val.key, focusNumber);
					};
				});
			}
		}, {
			key: 'onSelect',
			value: function onSelect(val, key) {
				var me = this;
				return me.doSelect(val, key);
			}
		}, {
			key: 'onEnterDown',
			value: function onEnterDown() {
				var me = this;
				var _me$state = me.state,
				    list = _me$state.list,
				    focusNumber = _me$state.focusNumber,
				    props = me.props;
	
				var val = list[focusNumber];
				if (val) {
					return me.doSelect(val);
				};
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'Select',
		width: 300,
		height: 30,
		scrollSize: 4,
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(59);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(62);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(60);
	
	var _index = __webpack_require__(55);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _view = __webpack_require__(52);
	
	var _view2 = _interopRequireDefault(_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 组件类
	var View = function (_ScrollerView) {
		_inherits(View, _ScrollerView);
	
		function View() {
			_classCallCheck(this, View);
	
			return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
		}
	
		_createClass(View, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				var rows = limit.toNumber(props.rows);
				var height = props.height || rows * 16;
				return React.createElement(
					'div',
					{ className: ['limit-scroller limit-textarea', props.className].filter(function (v) {
							return v;
						}).join(' '),
						style: { height: height, width: props.width } },
					React.createElement(
						'span',
						{ className: 'ch-container-bar', ref: 'containerBar' },
						React.createElement('span', { className: 'ch-bar', ref: 'bar', style: { height: props.barHeight }, onMouseDown: me.mousedown.bind(me) })
					),
					React.createElement('textarea', {
						value: props.value,
						className: 'ch-container',
						disabled: props.disabled,
						ref: 'container', onChange: Actions(me).change, onFocus: props.onFocus, onBlur: props.onBlur })
				);
			}
		}]);
	
		return View;
	}(_view2.default);
	
	;
	
	exports.default = View;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(61);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-textarea textarea {\n  border: none;\n  resize: none;\n  color: #666;\n  font-size: 12px;\n  width: 100%;\n  height: 100%;\n  line-height: 16px;\n}\n", ""]);
	
	// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
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
				isShowScroll: true,
				value: ''
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onChange',
			value: function onChange(e) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				var value = state.value = e.target.value;
				props.onChange(value);
				me.updateComponent();
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'limitTextarea',
		height: null,
		barHeight: 50,
		rows: 10,
		onChange: limit.K
	};
	;
	
	exports.default = Controller;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _view = __webpack_require__(64);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _controller = __webpack_require__(72);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _hoc2.default)(_view2.default, _controller2.default);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(65);
	
	var _index = __webpack_require__(67);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(51);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Multiple = function (_Component) {
		_inherits(Multiple, _Component);
	
		function Multiple() {
			_classCallCheck(this, Multiple);
	
			return _possibleConstructorReturn(this, (Multiple.__proto__ || Object.getPrototypeOf(Multiple)).apply(this, arguments));
		}
	
		_createClass(Multiple, [{
			key: 'render',
			value: function render() {
				var me = this;
				var _me$props = me.props,
				    multipleFocus = _me$props.multipleFocus,
				    width = _me$props.width,
				    height = _me$props.height,
				    list = _me$props.list,
				    readOnly = _me$props.readOnly,
				    focusNumber = _me$props.focusNumber,
				    scrollSize = _me$props.scrollSize;
	
				return React.createElement(
					'div',
					{ className: me.getClassName('mod-multiple', multipleFocus ? 'multiple-focus' : ''),
						style: { width: width, height: height } },
					React.createElement(
						'div',
						{ className: 'multiple-trigger' },
						React.createElement(_index2.default, { type: 'text',
							ref: 'input',
							onFocus: me.focus.bind(me),
							onChange: Actions(me).change,
							onKeyDown: me.keyDown.bind(me),
							onBlur: function onBlur() {
								me.timeoutId = setTimeout(function () {
									Actions(me).focus(false);
								}, 100);
							},
							readOnly: readOnly,
							value: me.getValue() }),
						React.createElement('i', { className: 'multiple-trigger-san' })
					),
					multipleFocus ? React.createElement(
						'div',
						{ className: 'multiple-content', style: { top: height - 1 } },
						list.length <= scrollSize ? React.createElement(
							'ul',
							{ className: 'fn-clear' },
							list.map(function (val, key) {
								return React.createElement(
									'li',
									{ key: key,
										onClick: me.select.bind(me, val),
										onMouseEnter: Actions(me).mouseEnter.bind(null, key),
										className: (val.selected ? 'active' : '') + ' ' + (focusNumber === key ? 'focus' : '') },
									val.key
								);
							})
						) : React.createElement(
							_index4.default,
							{ height: scrollSize * 28, ref: 'scroller', barHeight: '50' },
							React.createElement(
								'ul',
								{ className: 'fn-clear' },
								list.map(function (val, key) {
									return React.createElement(
										'li',
										{ key: key,
											onClick: me.select.bind(me, val),
											onMouseEnter: Actions(me).mouseEnter.bind(null, key),
											className: (val.selected ? 'active' : '') + ' ' + (focusNumber === key ? 'focus' : '') },
										val.key
									);
								})
							)
						)
					) : void 0
				);
			}
		}, {
			key: 'getValue',
			value: function getValue() {
				var me = this;
				var _me$props2 = me.props,
				    originList = _me$props2.originList,
				    multipleFocus = _me$props2.multipleFocus,
				    readOnly = _me$props2.readOnly,
				    value = _me$props2.value;
	
				if (!readOnly && multipleFocus) {
					return value;
				} else {
					return originList.filter(function (val) {
						return val.selected;
					}).map(function (val) {
						return limit.wordWrap(val.key, 5);
					}).join(',');
				};
			}
		}, {
			key: 'scrollTo',
			value: function scrollTo() {
				var me = this;
				var scroller = me.refs.scroller;
	
				if (scroller) {
					var num = me.props.focusNumber - me.props.scrollSize + 1;
					scroller.refs.com.scrollTo(num * 28);
				};
			}
		}, {
			key: 'focus',
			value: function focus() {
				var me = this;
				!me.isChangeList && Actions(me).focus(true).then(me.scrollTo.bind(me));
			}
		}, {
			key: 'select',
			value: function select(val) {
				var me = this;
				var input = me.refs.input.refs.com.refs.input;
	
				clearTimeout(me.timeoutId);
				me.isChangeList = true;
				input.focus();
				me.isChangeList = false;
				return Actions(me).select(val);
			}
		}, {
			key: 'keyDown',
			value: function keyDown(e) {
				var me = this;
				var list = me.props.list;
	
				if (!e.shiftKey && !e.altKey && list.length) {
					// 
					var keyMap = {
						38: 'up',
						40: 'down'
					};
					if (keyMap[e.keyCode]) {
						e.preventDefault();
						Actions(me).keyDown(keyMap[e.keyCode]).then(me.scrollTo.bind(me));
					} else if (e.keyCode === 13) {
						e.preventDefault();
						Actions(me).enterDown();
					};
				};
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
	
		return Multiple;
	}(_component2.default);
	
	;
	
	module.exports = Multiple;

/***/ }),
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-multiple {\n  display: inline-block;\n  position: relative;\n}\n.mod-multiple .multiple-trigger {\n  border: 1px solid #CCC;\n  height: 100%;\n}\n.mod-multiple .multiple-trigger input {\n  border: none;\n  line-height: 16px;\n  padding: 6px 15px 6px 6px;\n  font-size: 12px;\n  color: #666;\n  width: 100%;\n  height: 100%;\n}\n.mod-multiple .multiple-trigger input[readOnly] {\n  cursor: pointer;\n}\n.mod-multiple .multiple-trigger .multiple-trigger-san {\n  transition: all 0.3s ease-in-out 0s;\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-top: 6px solid #999;\n  border-bottom: 0;\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  right: 5px;\n  top: 50%;\n  margin-top: -3px;\n}\n.mod-multiple .multiple-content {\n  color: #666;\n  position: absolute;\n  width: 100%;\n  border: 1px solid #CCC;\n  padding: 1px;\n  border-top: none;\n  background: #FFF;\n}\n.mod-multiple .multiple-content li {\n  padding: 0 4px;\n  line-height: 28px;\n  height: 28px;\n  cursor: pointer;\n  border: 1px solid #FFF;\n  position: relative;\n}\n.mod-multiple .multiple-content li.focus {\n  border: 1px dashed #4285f4;\n}\n.mod-multiple .multiple-content li.active {\n  padding: 0 20px 0 4px;\n  background: #4285f4;\n  border-color: #4285f4;\n  color: #FFF;\n}\n.mod-multiple .multiple-content li.active:before {\n  font-family: \"iconfont\" !important;\n  content: \"\\E6AD\";\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  right: 2px;\n  top: 6px;\n  border-radius: 16px;\n  line-height: 18px;\n  text-align: center;\n  background: #FFF;\n  color: #4285f4;\n  overflow: hidden;\n}\n.mod-multiple .multiple-content li.active.focus {\n  background: #1f5dc3;\n  border-color: #1f5dc3;\n}\n.mod-multiple.multiple-focus .multiple-trigger {\n  border-color: #4285f4;\n  box-shadow: 0 1px 3px rgba(66, 133, 244, 0.5);\n}\n.mod-multiple.multiple-focus .multiple-trigger:before {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  bottom: 0;\n  left: 0;\n  background: #FFF;\n  border-left: 1px solid #4285f4;\n  border-right: 1px solid #4285f4;\n  z-index: 1;\n}\n.mod-multiple.multiple-focus .multiple-trigger .multiple-trigger-san {\n  transform: rotate(180deg);\n  border-top-color: #4285f4;\n}\n.mod-multiple.multiple-focus .multiple-content {\n  border-color: #4285f4;\n  box-shadow: 0 1px 3px rgba(66, 133, 244, 0.5);\n}\n", ""]);
	
	// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(68);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(71);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(69);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
				return React.createElement('input', _extends({}, props, { ref: 'input', onChange: me.change.bind(me) }));
			}
		}, {
			key: 'change',
			value: function change(e) {
				var me = this;
				return Actions(me).change(e.target.value, me.compositionstart);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				var input = me.refs.input;
	
				me.compositionstart = false;
				input = $(input);
				input.on('compositionstart', function () {
					me.compositionstart = true;
				});
				input.on('compositionend', function () {
					return Actions(me).change(input.val(), me.compositionstart = false);
				});
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {}
		}]);
	
		return View;
	}(_component2.default);
	
	;
	
	exports.default = View;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(70);
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-input-text {\n  background: #F00;\n}\n", ""]);
	
	// exports


/***/ }),
/* 71 */
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
				value: ''
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onChange',
			value: function onChange(val, compositionstart) {
				var me = this;
				me.state.value = val;
				return me.updateComponent().then(function () {
					if (!compositionstart) {
						me.props.onChange(val);
					};
				});
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'InputText',
		onChange: limit.K
	};
	;
	
	exports.default = Controller;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _control = __webpack_require__(26);
	
	var _control2 = _interopRequireDefault(_control);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Controller = function (_Control) {
		_inherits(Controller, _Control);
	
		function Controller(props) {
			var _temp, _this;
	
			_classCallCheck(this, Controller);
	
			var me = (_temp = (_this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this)), _this), _this.state = {
				multipleFocus: false,
				value: '',
				list: [],
				originList: [],
				focusNumber: -1
			}, _temp);
			var state = me.state;
	
			state.list = state.originList = me.parseListByChildren(props);
			me.setInitFocusNmuber();
			return _this;
		}
	
		_createClass(Controller, [{
			key: 'setInitFocusNmuber',
			value: function setInitFocusNmuber() {
				var me = this;
				var state = me.state;
	
				state.focusNumber = 0;
				state.originList.some(function (val, key) {
					if (val.selected) {
						state.focusNumber = key;
						return true;
					};
				});
			}
		}, {
			key: 'parseListByChildren',
			value: function parseListByChildren(props) {
				var me = this;
				var state = me.state;
	
				var propsValue = limit.isArray(props.value) ? props.value : props.value.split(',');
				return React.Children.map(props.children, function (child, key) {
					var val = child.props;
					var valValue = val.value;
					var selected = valValue && limit.contains(propsValue, valValue);
					return { key: val.children, value: valValue, selected: selected };
				});
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(nextState) {
				var me = this;
				var state = me.state;
	
				state.list = state.originList = me.parseListByChildren(nextState);
			}
		}, {
			key: 'onFocus',
			value: function onFocus(key) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				if (key) {
					state.value = '';
					state.list = state.originList;
				} else {
					state.focusNumber = -1;
				};
				state.multipleFocus = key;
				return me.updateComponent().then(function () {
					if (key) {
						return props.onFocus();
					} else {
						return props.onBlur();
					};
				});
			}
		}, {
			key: 'onSelect',
			value: function onSelect(val) {
				var me = this;
				val.selected = !val.selected;
				return me.updateComponent().then(me.doSelect.bind(me));
			}
		}, {
			key: 'onChange',
			value: function onChange(val) {
				var me = this;
				var state = me.state;
	
				state.list = state.originList.filter(function (v) {
					return limit.includes(v.key, val);
				});
				state.value = val;
				state.focusNumber = -1;
				return me.updateComponent();
			}
		}, {
			key: 'doSelect',
			value: function doSelect() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				var list = state.originList.filter(function (val) {
					return val.selected;
				}).map(function (val) {
					return { key: val.key, value: val.value };
				});
				return props.onChange(list.map(function (val) {
					return val.value;
				}).join(','), list);
			}
		}, {
			key: 'onKeyDown',
			value: function onKeyDown(key) {
				var me = this;
				var state = me.state;
				var list = state.list;
	
				var max = list.length - 1;
				switch (key) {
					case 'up':
						if (state.focusNumber > max || state.focusNumber <= 0) {
							state.focusNumber = max;
						} else {
							state.focusNumber--;
						};
						break;
					case 'down':
						if (state.focusNumber < 0 || state.focusNumber >= max) {
							state.focusNumber = 0;
						} else {
							state.focusNumber++;
						};
						break;
				};
				if (state.focusNumber <= 0) {
					state.focusNumber = 0;
				} else if (state.focusNumber >= max) {
					state.focusNumber = max;
				};
				return me.updateComponent();
			}
		}, {
			key: 'onMouseEnter',
			value: function onMouseEnter(key) {
				var me = this;
				var state = me.state;
	
				state.focusNumber = key;
				return me.updateComponent();
			}
		}, {
			key: 'onEnterDown',
			value: function onEnterDown() {
				var me = this;
				var _me$state = me.state,
				    list = _me$state.list,
				    focusNumber = _me$state.focusNumber,
				    props = me.props;
	
				var val = list[focusNumber];
				if (val) {
					val.selected = !val.selected;
					return me.updateComponent().then(me.doSelect.bind(me));
				};
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'Multiple',
		scrollSize: 4,
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K,
		width: 300,
		height: 30,
		readOnly: true
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(74);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(77);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(75);
	
	var _index = __webpack_require__(255);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _domUtil = __webpack_require__(20);
	
	var _domUtil2 = _interopRequireDefault(_domUtil);
	
	var _index3 = __webpack_require__(35);
	
	var _index4 = _interopRequireDefault(_index3);
	
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
	
				return React.createElement(_index2.default, { type: 'button',
					className: 'mod-input-upload',
					ref: 'file',
					onMouseEnter: me.isUseUploadHack() ? me.mouseEnter.bind(me) : null,
					onFocus: props.onFocus,
					onBlur: props.onBlur,
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
				file = file.refs.com.getButton();
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
				var props = me.props;
	
				Actions(me).change(me.getFileName(e)).then(function () {
					me.mouseLeave();
					if (props.action) {
						return me.upload();
					} else {
						throw 'action is empty';
					};
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
	
				return new _index4.default({
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
					return limit.from(e.target.files, function (file) {
						var name = file.name,
						    size = file.size;
	
						return { name: name, size: size, file: file };
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(76);
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-input-upload {\n  border: 1px solid #CCC;\n  background: #F2F2F2;\n  font-size: 12px;\n  padding: 0 10px;\n  height: 30px;\n  line-height: 28px;\n  color: #666;\n  cursor: pointer;\n}\n.mod-input-upload:active {\n  background: #DDD;\n  border-color: #BBB;\n}\n.mod-input-upload[disabled] {\n  cursor: not-allowed;\n  color: #CCC;\n}\n.mod-input-file {\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  background: #F00;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  top: -999px;\n  left: -999px;\n  font-size: 200px;\n}\n.mod-input-file input {\n  position: absolute;\n  right: 0px;\n  top: 0px;\n  cursor: pointer;\n}\n", ""]);
	
	// exports


/***/ }),
/* 77 */
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
		action: '',
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _view = __webpack_require__(79);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _controller = __webpack_require__(82);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _hoc2.default)(_view2.default, _controller2.default);

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(80);
	
	var _index = __webpack_require__(21);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CalendarInput = function (_Component) {
		_inherits(CalendarInput, _Component);
	
		function CalendarInput() {
			_classCallCheck(this, CalendarInput);
	
			return _possibleConstructorReturn(this, (CalendarInput.__proto__ || Object.getPrototypeOf(CalendarInput)).apply(this, arguments));
		}
	
		_createClass(CalendarInput, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: me.getClassName('mod-calendar-input') },
					React.createElement('input', { type: 'text',
						ref: 'input',
						onFocus: me.focus.bind(me),
						onBlur: function onBlur() {
							me.timeoutId = setTimeout(function () {
								Actions(me).focus(false);
							}, 100);
						},
						readOnly: 'readOnly',
						value: props.value }),
					props.calendarFocus ? React.createElement(
						'div',
						{ className: 'calendar-input-content', style: { transform: 'scale(' + me.setWidth() / 200 + ')' } },
						React.createElement(_index2.default, { target: props.value, width: '200',
							onChangeYM: me.changeYM.bind(me),
							onSelect: Actions(me).select })
					) : void 0
				);
			}
		}, {
			key: 'setWidth',
			value: function setWidth() {
				var me = this;
				var calendarWidth = me.props.calendarWidth;
	
				if (calendarWidth >= 200) {
					calendarWidth = 200;
				} else if (calendarWidth <= 170) {
					calendarWidth = 170;
				};
				return calendarWidth;
			}
		}, {
			key: 'changeYM',
			value: function changeYM() {
				var me = this;
				// let {refs: {input: {refs: {com: {refs: {input}}}}}} = me;
				var input = me.refs.input;
	
				clearTimeout(me.timeoutId);
				me.isChangeYM = true;
				input.focus();
				me.isChangeYM = false;
			}
		}, {
			key: 'focus',
			value: function focus() {
				var me = this;
				!me.isChangeYM && Actions(me).focus(true);
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
	
		return CalendarInput;
	}(_component2.default);
	
	;
	
	module.exports = CalendarInput;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(81);
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-calendar-input {\n  position: relative;\n  border: 1px solid #CCC;\n}\n.mod-calendar-input input {\n  border: 0;\n  height: 28px;\n  padding: 6px;\n  width: 100%;\n  cursor: pointer;\n  font-size: 12px;\n  color: #666;\n  background: transparent;\n}\n.mod-calendar-input .calendar-input-content {\n  position: absolute;\n  top: 31px;\n  left: -1px;\n  transform-origin: 0 0;\n}\n", ""]);
	
	// exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
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
				calendarFocus: false,
				value: undefined
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onFocus',
			value: function onFocus(key) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.calendarFocus = key;
				return me.updateComponent().then(function () {
					if (key) {
						return props.onFocus();
					} else {
						return props.onBlur();
					};
				});
			}
		}, {
			key: 'onSelect',
			value: function onSelect(val) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.value = val;
				return me.updateComponent().then(function () {
					return props.onChange(val);
				});
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'CalendarInput',
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
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
	
	var regNum = /^[\d\.-]*$/;
	
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
				textWidth: 300,
				passwordWidth: 300,
				selectWidth: 300,
				multipleWidth: 300,
				textareaWidth: 300,
				calendarWidth: 200,
				calendarRangeWidth: 200,
				value: '',
				focus: false,
				clearSuccess: false,
				validaorError: null,
				pswShow: true
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onChange',
			value: function onChange(e) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				var value = void 0;
				if (e.target) {
					value = e.target.value;
				} else {
					value = e;
				};
				// 对于类型是number的拦截
				if (props.type === 'number' && !regNum.test(value)) {
					return;
				};
				// 对类型是文件的拦截
				if (props.type === 'file') {
					return;
				};
				state.value = value;
				me.updateOriginData(value);
				return me.updateComponent().then(function () {
					return value && props.validaor && props.validaor.emit(props.name + 'Validat');
				});
			}
		}, {
			key: 'onFocus',
			value: function onFocus() {
				var me = this;
				var state = me.state;
	
				state.focus = true;
				return me.updateComponent();
			}
		}, {
			key: 'onBlur',
			value: function onBlur() {
				var me = this;
				var state = me.state;
	
				state.focus = false;
				return me.updateComponent();
			}
		}, {
			key: 'onToggleEye',
			value: function onToggleEye() {
				var me = this;
				var state = me.state;
	
				state.pswShow = !state.pswShow;
				state.clearSuccess = true;
				me.updateComponent().then(function () {
					state.clearSuccess = false;
				});
			}
		}, {
			key: 'onClear',
			value: function onClear() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.value = '';
				state.clearSuccess = true;
				state.validaorError = null;
				// 更新数据源数据
				me.updateOriginData('');
				me.updateComponent().then(function () {
					state.clearSuccess = false;
					return me.updateComponent().then(function () {
						return props.onChange('');
					});
				});
			}
		}, {
			key: 'updateOriginData',
			value: function updateOriginData(val) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				var validaor = props.validaor;
				if (validaor && limit.isDefined(validaor.getData(props.name))) {
					validaor.addData(props.name, val);
				};
			}
		}, {
			key: 'onComDidMount',
			value: function onComDidMount() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				var validaor = props.validaor;
				if (validaor && props.name) {
					validaor.addData(props.name, state.value);
					validaor.addMap(props.name, props.rule, props.errMessage);
					validaor.on(props.name + 'Validat', function () {
						var validaorState = validaor.state;
						var originData = validaorState.originData;
						if (limit.isDefined(originData[props.name])) {
							var valRtv = validaorState.validatMap[props.name](originData[props.name]);
							me.state.validaorError = valRtv;
						} else {
							me.state.validaorError = null;
						};
						me.updateComponent();
					});
					var originVal = state.value;
					validaor.on(props.name + 'Reset', function () {
						var validaorState = validaor.state;
						var originData = validaorState.originData;
						originData[props.name] = me.state.value = originVal;
						me.state.validaorError = null;
						me.updateComponent().then(function () {
							me.props.onChange(originVal);
						});
					});
				};
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		validaor: null,
		name: '',
		type: 'text',
		rule: '',
		errMessage: '',
		actionId: 'limitForm',
		onChange: limit.K
	};
	;
	
	exports.default = Controller;

/***/ }),
/* 84 */,
/* 85 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Widget = function () {
		//实例化后的组件
		function Widget(config, parentNode, childCom) {
			_classCallCheck(this, Widget);
	
			this.props = {};
			this.state = {};
			this.tempNode = null;
			this.parentNode = null;
			this.component = null;
			this.componentExp = null;
	
			var me = this;
			me.component = me.constructor.originClass;
			me.parentNode = parentNode;
			me.childCom = childCom;
			limit.assignSuper(me.state, me.props, config);
			return me.init();
		}
		// 初始化组件
		//组件
		//节点
	
	
		_createClass(Widget, [{
			key: 'init',
			value: function init() {
				var me = this;
				var state = me.state;
	
				var node = null;
				var Component = me.component;
				if (me.parentNode) {
					node = me.tempNode = me.parentNode;
				} else {
					node = me.tempNode = document.createElement('div');
					document.body.appendChild(node);
				};
				me.componentExp = ReactDOM.render(React.createElement(Component, _extends({}, me.state, { children: me.childCom })), node);
				node.id = me.componentExp.state.actionUUid;
				Actions.get(me.componentExp).forEach(function (val) {
					val.destroyWidget = me.destroy.bind(me);
				});
			}
			// 更新组件
	
		}, {
			key: 'updateComponent',
			value: function updateComponent(props) {
				var me = this;
				return new Promise(function (resolve) {
					me.componentExp.setState(props, resolve);
				});
			}
			// 销毁组件
	
		}, {
			key: 'destroy',
			value: function destroy() {
				var me = this;
				ReactDOM.unmountComponentAtNode(me.tempNode);
				if (!me.parentNode) {
					var clearDiv = document.createElement('div');
					clearDiv.appendChild(me.tempNode);
					clearDiv.innerHTML = '';
					clearDiv = null;
				};
				me.parentNode = null;
				me.tempNode = null;
				me.component = null;
				me.componentExp = null;
			}
		}]);
	
		return Widget;
	}();
	
	;
	
	exports.default = Widget;

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(90);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(99);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(91);
	
	var _index = __webpack_require__(93);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	
	
	// 组件类
	var Dialog = function (_React$Component) {
		_inherits(Dialog, _React$Component);
	
		function Dialog() {
			_classCallCheck(this, Dialog);
	
			return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
		}
	
		_createClass(Dialog, [{
			key: 'getClassName',
			value: function getClassName() {
				var me = this;
				var props = me.props;
	
				var arr = [];
				if (props.className) {
					arr.push(props.className);
				};
				if (props.hide) {
					arr.push('fn-hide');
				};
				return arr.join(' ');
			}
		}, {
			key: 'getStyle',
			value: function getStyle() {
				var me = this;
				var props = me.props;
	
				var styleKeys = ['top', 'marginLeft', 'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight'];
				return limit.filter(props, function (val, key) {
					return limit.contains(styleKeys, key);
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: me.getClassName() },
					React.createElement(
						'div',
						{ className: 'react-dialog', ref: 'dialog', style: me.getStyle() },
						React.createElement(
							'a',
							{ href: 'javascript:;', className: 'ch-close', onClick: me.closeDialog.bind(me) },
							'\xD7'
						),
						props.children
					),
					props.hasCover ? React.createElement(_index2.default, { opacity: props.opacity, onClick: props.onClickCover }) : void 0
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				var props = me.props;
	
				me.setCenter();
				if (props.timeout > 0) {
					setTimeout(function () {
						me.closeDialog();
					}, props.timeout);
				};
				if (props.useEsc) {
					var nameSpace = me.nameSpace = 'keyup.dialog' + limit.getUid();
					$(document).on(nameSpace, function (e) {
						if (e.keyCode === 27) {
							me.closeDialog();
						};
					});
				};
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var me = this;
				var props = me.props;
	
				if (props.useEsc) {
					$(document).off(me.nameSpace);
				};
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				var me = this;
				me.setCenter();
			}
		}, {
			key: 'closeDialog',
			value: function closeDialog() {
				var me = this;
				var props = me.props;
	
				var actionsExp = Actions(me);
				actionsExp && actionsExp.destroyWidget;
				if (actionsExp && actionsExp.destroyWidget) {
					actionsExp.destroyWidget();
					props.onClose();
				};
			}
		}, {
			key: 'setCenter',
			value: function setCenter() {
				var me = this;
				var props = me.props,
				    refs = me.refs;
				var dialog = refs.dialog;
	
				var WIN = window;
				var scrollY = WIN.scrollY || document.documentElement.scrollTop;
				var winHeight = WIN.innerHeight || document.documentElement.offsetHeight;
				var height = props.height;
				var width = props.width;
				dialog = $(dialog);
				if (!limit.isNumber(height)) {
					height = dialog.height();
				};
				if (!limit.isNumber(width)) {
					width = dialog.width();
				};
				var top = scrollY + winHeight / 2 - height / 2;
				var marginLeft = -width / 2;
				dialog.css({ top: top, marginLeft: marginLeft });
			}
		}]);
	
		return Dialog;
	}(React.Component);
	
	;
	
	exports.default = Dialog;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(92);
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".react-dialog {\n  position: absolute;\n  background: #FFF;\n  top: 0px;\n  left: 50%;\n  z-index: 101;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n}\n.react-dialog .ch-close {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  width: 12px;\n  height: 12px;\n  line-height: 10px;\n  text-align: center;\n  color: #999;\n}\n.react-dialog .ch-close:hover {\n  background: #999;\n  color: #FFF;\n}\n@keyframes loading {\n  0% {\n    left: -20px;\n  }\n  100% {\n    left: 100%;\n  }\n}\n.widget-loading .react-cover,\n.widget-loading .react-dialog {\n  cursor: progress;\n}\n.widget-loading .react-dialog {\n  overflow: hidden;\n  box-shadow: none;\n  background: none;\n}\n.widget-loading .react-dialog .ch-close {\n  display: none;\n}\n.widget-loading .ch-load {\n  position: absolute;\n  width: 20px;\n  height: 2px;\n  background: #4285f4;\n  opacity: .8;\n  left: -20px;\n  animation: loading 1.5s ease infinite;\n}\n.widget-success {\n  color: #666;\n}\n.widget-success .ch-logo {\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  line-height: 25px;\n  color: #4285f4;\n  text-align: right;\n  text-indent: -4px;\n  top: 50%;\n  margin-top: -12px;\n  left: 10px;\n  overflow: hidden;\n  font-size: 25px;\n}\n.widget-success .ch-text {\n  line-height: 16px;\n  padding: 20px 20px 20px 40px;\n}\n.widget-error {\n  color: #666;\n}\n.widget-error .ch-logo {\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  line-height: 25px;\n  color: #4285f4;\n  text-align: right;\n  text-indent: -4px;\n  top: 50%;\n  margin-top: -12px;\n  left: 10px;\n  overflow: hidden;\n  font-size: 25px;\n}\n.widget-error .ch-text {\n  line-height: 16px;\n  padding: 20px 20px 20px 40px;\n}\n.widget-error .ch-logo {\n  text-indent: 0;\n  color: #ea4335;\n}\n.widget-confirm .ch-layout {\n  color: #666;\n  padding: 0 15px 15px;\n}\n.widget-confirm .ch-head {\n  height: 30px;\n  line-height: 30px;\n  border-bottom: 1px solid #CCC;\n}\n.widget-confirm .ch-body {\n  padding: 10px;\n}\n.widget-confirm .ch-foot {\n  text-align: center;\n}\n", ""]);
	
	// exports


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(94);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(98);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(95);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	
	// 组件类
	
	var Cover = function (_React$Component) {
		_inherits(Cover, _React$Component);
	
		function Cover() {
			_classCallCheck(this, Cover);
	
			return _possibleConstructorReturn(this, (Cover.__proto__ || Object.getPrototypeOf(Cover)).apply(this, arguments));
		}
	
		_createClass(Cover, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				return React.createElement(
					'div',
					{
						onClick: props.onClick,
						className: 'react-cover',
						style: { opacity: props.opacity, background: props.background } },
					props.children
				);
			}
		}]);
	
		return Cover;
	}(React.Component);
	
	;
	
	module.exports = Cover;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(96);
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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, "html {\n  height: 100%;\n}\nbody {\n  min-height: 100%;\n  position: relative;\n}\n.react-cover {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: #F00;\n  top: 0;\n  left: 0;\n  z-index: 100;\n}\n", ""]);
	
	// exports


/***/ }),
/* 97 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 98 */
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
		actionId: 'Cover',
		opacity: .3,
		background: '#FFF'
	};
	;
	
	exports.default = Controller;

/***/ }),
/* 99 */
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
		width: 400,
		height: 200,
		actionId: 'dialog',
		onClose: limit.K,
		hasCover: true,
		hide: false,
		timeout: 0,
		useEsc: false
	};
	;
	
	exports.default = Controller;

/***/ }),
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _widget = __webpack_require__(102);
	
	var _widget2 = _interopRequireDefault(_widget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Index = function () {
		function Index(config) {
			_classCallCheck(this, Index);
	
			this.props = {
				url: '',
				cache: false,
				dataName: 'param',
				data: {},
				dataType: 'json',
				timeout: 5000,
				type: 'POST',
				theMethod: 1 // one two three
			};
			this.state = {};
	
			var me = this;
			limit.assign(me.state, me.props, config);
			if (me.state.url) {
				return me['theMethod' + me.state.theMethod]();
			} else {
				return me.mock();
			};
		}
	
		_createClass(Index, [{
			key: 'theMethod0',
			value: function theMethod0() {
				var me = this;
				return me.jQuertAjax();
			}
		}, {
			key: 'theMethod1',
			value: function theMethod1() {
				var me = this;
				var dialogExp = _widget2.default.loading();
				return me.jQuertAjax().then(function (val) {
					if (val.hasError) {
						throw val.message;
					} else {
						var content = val.content;
						if (content.isSuccess) {
							return content;
						} else {
							throw content.msg;
						};
					};
				}).then(function (val) {
					dialogExp.destroy();
					return val;
				}, function (e) {
					if (!limit.isString(e)) {
						e = '请求数据错误，请稍后再试';
					};
					dialogExp.destroy();
					_widget2.default.error(e);
					throw e;
				});
			}
		}, {
			key: 'jQuertAjax',
			value: function jQuertAjax() {
				var me = this;
				return new Promise(function (s, j) {
					$.ajax(me.parseData()).then(s, j);
				});
			}
		}, {
			key: 'parseData',
			value: function parseData() {
				var me = this;
				var state = me.state;
	
				if (state.dataName) {
					var data = {};
					data[state.dataName] = JSON.stringify(state.data);
					state.data = data;
				};
				return state;
			}
		}, {
			key: 'mock',
			value: function mock() {
				return new Promise(function (s) {
					setTimeout(s, limit.random(0, 1000));
				});
			}
		}]);
	
		return Index;
	}();
	
	exports.default = Index;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _index = __webpack_require__(89);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(42);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _widget = __webpack_require__(85);
	
	var _widget2 = _interopRequireDefault(_widget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var originWidget = function (_Widget) {
		_inherits(originWidget, _Widget);
	
		function originWidget() {
			_classCallCheck(this, originWidget);
	
			return _possibleConstructorReturn(this, (originWidget.__proto__ || Object.getPrototypeOf(originWidget)).apply(this, arguments));
		}
	
		_createClass(originWidget, [{
			key: 'setCenter',
			value: function setCenter() {
				var me = this;
				Actions(me.componentExp).setCenter();
			}
		}], [{
			key: 'loading',
			value: function loading() {
				return new originWidget({
					className: 'widget-loading',
					width: 200,
					height: 2,
					opacity: 0
				}, null, React.createElement('i', { className: 'ch-load' }));
			}
		}, {
			key: 'success',
			value: function success(info, config) {
				return new originWidget(limit.assignSuper({
					className: 'widget-success',
					width: 'auto',
					height: 'auto',
					maxWidth: 300,
					opacity: 0,
					timeout: 3000
				}, config), null, React.createElement(
					'div',
					{ className: 'ch-text fn-wrap' },
					React.createElement('i', { className: 'ch-logo iconfont icon-success' }),
					info || '操作成功'
				));
			}
		}, {
			key: 'error',
			value: function error(info, config) {
				return new originWidget(limit.assignSuper({
					className: 'widget-error',
					width: 'auto',
					height: 'auto',
					maxWidth: 300,
					opacity: 0,
					timeout: 3000
				}, config), null, React.createElement(
					'div',
					{ className: 'ch-text fn-wrap' },
					React.createElement('span', { className: 'ch-logo iconfont icon-wrong' }),
					info || '操作失败'
				));
			}
		}, {
			key: 'confirm',
			value: function confirm(info, config) {
				return new Promise(function (resolve, reject) {
					var dialog = new originWidget(limit.assignSuper({
						className: 'widget-confirm',
						width: 'auto',
						height: 'auto',
						maxWidth: 300,
						opacity: .3,
						onClose: function onClose() {
							reject('取消');
						},
	
						useEsc: true
					}, config), null, React.createElement(
						'div',
						{ className: 'ch-layout' },
						React.createElement(
							'div',
							{ className: 'ch-head' },
							'\u63D0\u793A'
						),
						React.createElement(
							'div',
							{ className: 'ch-body' },
							info
						),
						React.createElement(
							'div',
							{ className: 'ch-foot' },
							React.createElement(_index4.default, { type: 'button',
								value: '\u786E \u5B9A',
								focus: 'focus',
								onClick: function onClick() {
									resolve('sure');dialog.destroy();
								} }),
							React.createElement(_index4.default, { type: 'button', value: '\u53D6 \u6D88', onClick: function onClick() {
									reject('cancel');dialog.destroy();
								}, className: 'fn-ML10' })
						)
					));
				});
			}
		}, {
			key: 'alert',
			value: function alert(info, config) {
				return new Promise(function (resolve, reject) {
					var dialog = new originWidget(limit.assignSuper({
						className: 'widget-confirm',
						width: 'auto',
						height: 'auto',
						maxWidth: 300,
						opacity: .3,
						onClose: function onClose() {
							reject('取消');
						},
	
						useEsc: true
					}, config), null, React.createElement(
						'div',
						{ className: 'ch-layout' },
						React.createElement(
							'div',
							{ className: 'ch-head' },
							'\u63D0\u793A'
						),
						React.createElement(
							'div',
							{ className: 'ch-body fn-wrap' },
							info
						),
						React.createElement(
							'div',
							{ className: 'ch-foot' },
							React.createElement(_index4.default, { type: 'button',
								focus: 'focus',
								value: '\u786E \u5B9A',
								onClick: function onClick() {
									resolve('sure');dialog.destroy();
								} })
						)
					));
				});
			}
		}]);
	
		return originWidget;
	}(_widget2.default);
	
	originWidget.originClass = _index2.default;
	;
	
	exports.default = originWidget;

/***/ }),
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */
/***/ (function(module, exports) {

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

/***/ }),
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(181);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(184);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(182);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 组件类
	var Page = function (_React$Component) {
		_inherits(Page, _React$Component);
	
		function Page() {
			_classCallCheck(this, Page);
	
			var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
	
			var me = _this;
			me.diffList = me.getDiffList();
			return _this;
		}
	
		_createClass(Page, [{
			key: 'getClassName',
			value: function getClassName() {
				var me = this;
				var props = me.props;
	
				var arr = ['react-page'];
				if (props.className) {
					arr.push(props.className);
				};
				return arr.join(' ');
			}
		}, {
			key: 'render',
			value: function render() {
				var me = this,
				    props = me.props,
				    length = ~~props.totle,
				    page = ~~props.page;
				// 如果length是0
				if (length <= 0) {
					return React.createElement('div', null);
				};
				if (page <= 0) {
					page = 1;
				};
				return React.createElement(
					'div',
					{ className: me.getClassName() },
					me.getAllList().map(function (val, key) {
						return val === '...' ? React.createElement(
							'span',
							{ key: key },
							val
						) : React.createElement(
							'a',
							{ key: key,
								href: 'javascript:;',
								className: page === val ? 'active' : null,
								onClick: Actions(me).change.bind(me, val) },
							val
						);
					})
				);
			}
		}, {
			key: 'getDiffList',
			value: function getDiffList() {
				var me = this,
				    props = me.props,
				    diff = ~~props.diff,
				    temp = void 0,
				    arr = [];
				if (diff <= 0) {
					diff = 1;
				};
				temp = -diff;
				do {
					arr.push(temp);
				} while (temp++ < diff);
				return arr;
			}
		}, {
			key: 'getAllList',
			value: function getAllList() {
				var me = this,
				    props = me.props,
				    page = ~~props.page,
				    length = ~~props.totle,
				    arr = [];
				if (page <= 0) {
					page = 1;
				};
				// 对page做的
				// 拿到中间值
				arr = limit.map(me.diffList, function (val) {
					return page + val;
				});
				// 开头和结尾
				arr.unshift(1);
				arr.push(length);
				// 去重
				arr = limit(arr).filter(function (val) {
					return val > 0 && val < length + 1;
				}).union().val();
				if (arr.length > 1) {
					// 如果补值
					if (arr[1] - arr[0] !== 1) {
						arr.splice(1, 0, '...');
					};
					if (arr[arr.length - 1] - arr[arr.length - 2] !== 1) {
						arr.splice(-1, 0, '...');
					};
				};
				return arr;
			}
		}]);
	
		return Page;
	}(React.Component);
	
	;
	
	exports.default = Page;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(183);
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
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".react-page a {\n  padding: 2px 5px;\n  background: #CCC;\n  margin: 2px;\n}\n.react-page a:hover {\n  background: #F30;\n}\n.react-page .active {\n  background: #F00;\n}\n", ""]);
	
	// exports


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
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
				// 当前在第几页
				page: 1
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onChange',
			value: function onChange(page) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.page = page;
				me.updateComponent().then(props.onChange.bind(me, page));
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		// 总页数
		totle: 100,
		// 偏差值
		diff: 2,
		// 抛出接口
		onChange: limit.K,
		actionId: 'page'
	};
	Controller.propTypes = {
		onChangePage: React.PropTypes.func
	};
	;
	
	exports.default = Controller;

/***/ }),
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(245), __webpack_require__(248));

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(246);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var guid = 0;
	
	// 组件类
	
	var Title = function (_React$Component) {
		_inherits(Title, _React$Component);
	
		function Title() {
			_classCallCheck(this, Title);
	
			return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
		}
	
		_createClass(Title, [{
			key: "shouldComponentUpdate",
			value: function shouldComponentUpdate() {
				return false;
			}
		}, {
			key: "render",
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					"div",
					{ className: limit.toString(props.className) + " limit_title fn-wrap", ref: "node" },
					props.children
				);
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				var me = this;
				var refs = me.refs,
				    props = me.props;
				var node = refs.node;
	
				$(document).on('mousemove.limitTitle', function (e) {
					node.style.top = me.getTop(e);
					node.style.left = me.getLeft(e);
				});
			}
		}, {
			key: "getTop",
			value: function getTop(e) {
				var me = this;
				var refs = me.refs,
				    props = me.props;
				var node = refs.node;
	
				var bodyHeight = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight, limit.toNumber(window.innerHeight));
				var nodeHeight = node.offsetHeight;
				var tempTop = e.clientY + props.diffY;
				var height = e.pageY + props.diffY + nodeHeight;
				if (height < bodyHeight) {
					return tempTop + "px";
				} else {
					return e.clientY - nodeHeight - props.diffY + "px";
				};
			}
		}, {
			key: "getLeft",
			value: function getLeft(e) {
				var me = this;
				var refs = me.refs,
				    props = me.props;
				var node = refs.node;
	
				var bodyWidth = document.body.offsetWidth;
				var nodeWidth = node.offsetWidth;
				var tempLeft = e.clientX + props.diffX;
				var width = e.pageX + props.diffX + nodeWidth;
				if (width < bodyWidth) {
					return tempLeft + "px";
				} else {
					return e.clientX - nodeWidth - props.diffX + "px";
				};
			}
		}, {
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				$(document).off('mousemove.limitTitle');
			}
		}]);
	
		return Title;
	}(React.Component);
	
	;
	
	module.exports = Title;

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(247);
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
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit_title {\n  position: fixed;\n  top: -9999px;\n  left: -9999px;\n  z-index: 999;\n  background: #F2F2F2;\n  padding: 5px;\n  color: #666;\n}\n", ""]);
	
	// exports


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
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
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		actionId: 'limit_title',
		shouldComponentNotUpdate: true,
		diffX: 10,
		diffY: 10
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(256);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _controller = __webpack_require__(259);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = (0, _hoc2.default)(_view2.default, _controller2.default);
	
	exports.default = Index;

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(257);
	
	var _component = __webpack_require__(13);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Button = function (_Component) {
		_inherits(Button, _Component);
	
		function Button() {
			_classCallCheck(this, Button);
	
			return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
		}
	
		_createClass(Button, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'button',
					{
						ref: 'button',
						disabled: props.disabled,
						onClick: Actions(me).click,
						onFocus: props.onFocus,
						onBlur: props.onBlur,
						onMouseEnter: props.onMouseEnter,
						className: me.getClassName('mod-button', props.isClick ? 'button-clicked' : null, me.getButtonColor()),
						type: props.type },
					React.createElement(
						'span',
						null,
						props.value
					)
				);
			}
		}, {
			key: 'getButtonColor',
			value: function getButtonColor() {
				var me = this;
				var props = me.props;
	
				if (props.disabled) {
					return 'button-color-disabled';
				} else {
					return 'button-color-' + props.colorType;
				};
			}
		}, {
			key: 'focus',
			value: function focus() {
				var me = this;
				var button = me.refs.button;
	
				button.focus();
			}
		}, {
			key: 'getButton',
			value: function getButton() {
				var me = this;
				var button = me.refs.button;
	
				return button;
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
	
		return Button;
	}(_component2.default);
	
	;
	
	exports.default = Button;

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(258);
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
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, "/*默认*/\n.mod-button {\n  border: 1px solid #bfbfbf;\n  background: #F2F2F2;\n  height: 30px;\n  line-height: 30px;\n  font-size: 12px;\n  color: #666;\n  padding: 0 10px;\n  position: relative;\n  border-radius: 3px;\n}\n.mod-button:focus {\n  outline: none;\n}\n.mod-button:active,\n.mod-button:active:before {\n  background: #d9d9d9;\n}\n.mod-button:before {\n  position: absolute;\n  content: '';\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  opacity: 1;\n  background: #F2F2F2;\n  border-radius: 5px;\n}\n.mod-button.button-clicked:before {\n  transition: all 0.3s ease-out 0s;\n  width: 130%;\n  height: 130%;\n  top: -15%;\n  left: -15%;\n  opacity: 0;\n}\n.mod-button span {\n  position: relative;\n}\n.mod-button.button-color-primary {\n  border: 1px solid #1266f1;\n  background: #4285f4;\n  color: #FFF;\n}\n.mod-button.button-color-primary:active,\n.mod-button.button-color-primary:active:before {\n  background: #2a75f3;\n}\n.mod-button.button-color-primary:before {\n  background: #4285f4;\n}\n.mod-button.button-color-warning {\n  border: 1px solid #cc7a00;\n  background: #F90;\n  color: #FFF;\n}\n.mod-button.button-color-warning:active,\n.mod-button.button-color-warning:active:before {\n  background: #e68a00;\n}\n.mod-button.button-color-warning:before {\n  background: #F90;\n}\n.mod-button.button-color-error {\n  border: 1px solid #cc0000;\n  background: #F00;\n  color: #FFF;\n}\n.mod-button.button-color-error:active,\n.mod-button.button-color-error:active:before {\n  background: #e60000;\n}\n.mod-button.button-color-error:before {\n  background: #F00;\n}\n.mod-button.button-color-disabled {\n  cursor: not-allowed;\n  color: #999;\n}\n.mod-button.button-color-disabled:active,\n.mod-button.button-color-disabled:active:before {\n  background: #F2F2F2;\n}\n", ""]);
	
	// exports


/***/ }),
/* 259 */
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
				isClick: false
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onClick',
			value: function onClick() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				if (!state.isClick) {
					state.isClick = true;
				};
				return me.updateComponent().then(function () {
					setTimeout(function () {
						me.state.isClick = false;
						me.updateComponent();
					}, 300);
				}).then(function () {
					return props.onClick();
				});
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	Controller.defaultProps = {
		actionId: 'Button',
		type: 'button',
		disabled: false,
		colorType: 'default', // 颜色类型 default[灰色#F2F2F2] primary[蓝色#4285f4] warning[橘黄#F90] error[红色#F00]
		value: '按 钮',
		onClick: limit.K
	};
	;
	
	exports.default = Controller;

/***/ }),
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 组件类
	
	var Layout = __webpack_require__(284);
	var Body = __webpack_require__(292);
	
	// 置入文档
	ReactDOM.render(React.createElement(
		Layout,
		null,
		React.createElement(Body, null)
	), document.getElementById('container'));

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(285), __webpack_require__(291));

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(286);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	var Header = __webpack_require__(288);
	var Footer = __webpack_require__(289);
	var titleWidget = __webpack_require__(290);
	var Router = __webpack_require__(154);
	
	// 组件类
	
	var Layout = function (_React$Component) {
		_inherits(Layout, _React$Component);
	
		function Layout() {
			_classCallCheck(this, Layout);
	
			var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
	
			var me = _this;
			return _this;
		}
	
		_createClass(Layout, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				return React.createElement(
					'div',
					{ className: 'thetop-layout ' + (props.showLayout ? '' : 'fn-hide') },
					React.createElement(Header, null),
					props.children,
					React.createElement(Footer, null)
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
	
				var DOC = $(document);
				var tit = null;
				var txt = null;
				DOC.on('mouseenter', '[title]', function (e) {
					var node = $(e.target);
					txt = node.prop('title');
					node.prop('title', '');
					tit = new titleWidget({ className: 'thetop-layout-title', diffX: 15, diffY: 15 }, null, txt);
				});
				DOC.on('mouseleave', '[title]', function (e) {
					var node = $(e.target);
					tit && tit.destroy();
					txt && node.prop('title', txt);
				});
				new Router({
					search: function search(param) {
						Actions('body').changeFilterName(param.filterName, me.props.showLayout);
					}
				});
			}
		}]);
	
		return Layout;
	}(React.Component);
	
	;
	
	module.exports = Layout;

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(287);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(286);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	
	// 组件类
	
	var Header = function (_React$Component) {
		_inherits(Header, _React$Component);
	
		function Header() {
			_classCallCheck(this, Header);
	
			var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	
			var me = _this;
			return _this;
		}
	
		_createClass(Header, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				return React.createElement(
					'div',
					{ className: 'thetop-Header' },
					React.createElement(
						'div',
						{ className: 'ch-main' },
						React.createElement(
							'span',
							{ className: 'thetop-logo' },
							'T'
						),
						React.createElement(
							'span',
							{ className: 'thetop-title' },
							'\u6211\u4EEC\u4E0D\u4EA7\u751F\u6570\u636E\uFF0C\u6211\u4EEC\u53EA\u662F\u4E92\u8054\u7F51\u7684\u642C\u8FD0\u5DE5',
							React.createElement('span', { className: 'ch-line' })
						)
					)
				);
			}
		}]);
	
		return Header;
	}(React.Component);
	
	;
	
	module.exports = Header;

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(286);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	
	// 组件类
	
	var Footer = function (_React$Component) {
		_inherits(Footer, _React$Component);
	
		function Footer() {
			_classCallCheck(this, Footer);
	
			var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
	
			var me = _this;
			return _this;
		}
	
		_createClass(Footer, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				return React.createElement(
					'div',
					{ className: 'thetop-footer' },
					React.createElement(
						'div',
						{ className: 'ch-main' },
						React.createElement(
							'span',
							{ className: 'thetop-logo-min' },
							'T'
						),
						'Author: ',
						React.createElement(
							'a',
							{ href: 'https:github.com/somesayss', target: '_blank' },
							'github.com/somesayss'
						)
					)
				);
			}
		}]);
	
		return Footer;
	}(React.Component);
	
	;
	
	module.exports = Footer;

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(32);
	var originClass = __webpack_require__(244);
	var Widget = __webpack_require__(85);
	
	var originWidget = function (_Widget) {
		_inherits(originWidget, _Widget);
	
		function originWidget() {
			_classCallCheck(this, originWidget);
	
			return _possibleConstructorReturn(this, (originWidget.__proto__ || Object.getPrototypeOf(originWidget)).apply(this, arguments));
		}
	
		return originWidget;
	}(Widget);
	
	originWidget.originClass = originClass;
	
	originWidget.use = function (element, config, limitLength) {
		return new UseTitle(element, config, limitLength);
	};
	
	;
	
	var UseTitle = function () {
		function UseTitle(element, config) {
			var limitLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
	
			_classCallCheck(this, UseTitle);
	
			var me = this;
			me.element = $(element);
			me.config = config;
			me.limitLength = limitLength;
			me.bindEvent();
		}
	
		_createClass(UseTitle, [{
			key: 'destroy',
			value: function destroy() {
				var me = this;
				var element = me.element;
	
				element.off('mouseenter.title').off('mouseleave.title');
			}
		}, {
			key: 'bindEvent',
			value: function bindEvent() {
				var me = this;
				var element = me.element,
				    config = me.config,
				    limitLength = me.limitLength;
	
				var txt = void 0;
				var tit = void 0;
				element.on('mouseenter.title', '[title]', function (e) {
					var node = $(e.target);
					txt = node.prop('title');
					node.prop('title', '');
					tit = null;
					if (txt && txt.length >= limitLength) {
						tit = new originWidget(config, null, txt);
					};
				});
				element.on('mouseleave.title', '[title]', function (e) {
					var node = $(e.target);
					txt && node.prop('title', txt);
					tit && tit.destroy();
				});
			}
		}]);
	
		return UseTitle;
	}();
	
	;
	
	module.exports = originWidget;

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var $ = __webpack_require__(31);
	var React = __webpack_require__(97);
	var Control = __webpack_require__(26);
	var limit = __webpack_require__(32);
	
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
				showLayout: false
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onShowLayout',
			value: function onShowLayout() {
				var me = this;
				var state = me.state;
	
				state.showLayout = true;
				me.updateComponent();
			}
		}, {
			key: 'onSetScrollTop',
			value: function onSetScrollTop() {
				var WIN = window;
				var timeoutID = null;
				WIN.onscroll = function () {
					clearTimeout(timeoutID);
					timeoutID = setTimeout(function () {
						localStorage.scrollTop = WIN.scrollY || document.documentElement.scrollTop;
					}, 100);
				};
				WIN.scrollTo(0, localStorage.scrollTop || 0);
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		actionId: 'layout'
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(293), __webpack_require__(309));

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(294);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	
	var Info = __webpack_require__(296);
	var List = __webpack_require__(302);
	var Page = __webpack_require__(180);
	var Filter = __webpack_require__(304);
	
	// 组件类
	
	var Body = function (_React$Component) {
		_inherits(Body, _React$Component);
	
		function Body() {
			_classCallCheck(this, Body);
	
			var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).apply(this, arguments));
	
			var me = _this;
			return _this;
		}
	
		_createClass(Body, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				return React.createElement(
					'div',
					{ className: 'thetop-body' },
					React.createElement(
						'div',
						{ className: 'thetop-main fn-clear' },
						React.createElement(
							'div',
							{ className: 'ch-left' },
							React.createElement(
								'div',
								{ className: 'thetop-nav' },
								limit.keys(props.filterMap).map(function (val, key) {
									return React.createElement(
										'a',
										{ href: 'javascript:;', key: key, className: 'ch-focus' },
										val
									);
								})
							),
							React.createElement(
								'div',
								{ className: 'thetop-sub fn-clear' },
								me.renderFilter()
							),
							React.createElement(
								'div',
								{ className: 'thetop-list' },
								props.list.length ? React.createElement(List, props) : React.createElement(
									'div',
									{ className: 'ch-404' },
									'\u627E\u4E0D\u5230\uFF0C\u6211\u4E5F\u5F88\u7EDD\u671B\u554A'
								)
							),
							React.createElement(
								'div',
								{ className: 'thetop-page' },
								React.createElement(Page, { totle: props.totle, onChangePage: Actions(me).changePage, page: props.page })
							)
						),
						React.createElement(
							'div',
							{ className: 'ch-right' },
							React.createElement(Info, props)
						)
					)
				);
			}
		}, {
			key: 'renderFilter',
			value: function renderFilter() {
				var me = this;
				var props = me.props;
				var arr = [];
				var filter = props.filter[props.focus];
				limit.each(props.filterMap[props.focus], function (val, key) {
					var filterTemp = filter[key];
					arr.push(React.createElement(Filter, { key: key, filterName: key, word: val, defaultWord: filterTemp, onChange: Actions(me).changeFilter.bind(me, filterTemp) }));
				});
				return arr;
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				Actions(me).getFilterMap().then(function () {
					return Actions(me).searchList();
				}).then(function () {
					Actions('layout').showLayout();
				}).then(function () {
					Actions('layout').setScrollTop();
				});
			}
		}]);
	
		return Body;
	}(React.Component);
	
	;
	
	module.exports = Body;

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(295);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(294);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	var KeySearch = __webpack_require__(297);
	
	// 组件类
	
	var Info = function (_React$Component) {
		_inherits(Info, _React$Component);
	
		function Info() {
			_classCallCheck(this, Info);
	
			var _this = _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).apply(this, arguments));
	
			var me = _this;
			return _this;
		}
	
		_createClass(Info, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				var num = Actions(me).getMovieNumber();
				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'thetop-info' },
						'\u6211\u5DF2\u7ECF\u770B\u8FC7',
						React.createElement(
							'span',
							{ className: 'ch-num' },
							num
						),
						'\u90E8\u7535\u5F71'
					),
					React.createElement(
						'div',
						{ className: 'thetop-info fn-MT10 thetop-search' },
						'\u6211\u60F3\u627E\uFF1A',
						React.createElement(KeySearch, { width: '320', placeholder: '\u8BF7\u8F93\u5165\u7535\u5F71\u540D\u5B57', value: props.filterName })
					)
				);
			}
		}]);
	
		return Info;
	}(React.Component);
	
	;
	
	module.exports = Info;

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(298), __webpack_require__(301));

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(299);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	
	// 组件类
	
	var KeySearch = function (_React$Component) {
		_inherits(KeySearch, _React$Component);
	
		function KeySearch() {
			_classCallCheck(this, KeySearch);
	
			return _possibleConstructorReturn(this, (KeySearch.__proto__ || Object.getPrototypeOf(KeySearch)).apply(this, arguments));
		}
	
		_createClass(KeySearch, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				return React.createElement(
					'div',
					{ className: 'key-search', style: { width: props.width, height: props.height } },
					React.createElement('input', { placeholder: props.placeholder,
						onChange: Actions(me).input,
						onKeyDown: Actions(me).keydown,
						value: props.value }),
					React.createElement(
						'span',
						{ className: 'ch-enter', style: { lineHeight: props.height - 10 + 'px' }, onClick: Actions(me).search },
						'\u21B5'
					)
				);
			}
		}]);
	
		return KeySearch;
	}(React.Component);
	
	;
	
	module.exports = KeySearch;

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(300);
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
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".key-search {\n  display: inline-block;\n  position: relative;\n  border: 1px solid #CCC;\n  padding: 5px 20px 5px 5px;\n}\n.key-search input {\n  float: left;\n  border: none;\n  color: #666;\n  font-size: 12px;\n  width: 100%;\n  height: 100%;\n}\n.key-search .ch-enter {\n  float: right;\n  margin-right: -15px;\n  cursor: pointer;\n}\n.key-search .ch-enter:hover {\n  color: #4285f4;\n}\n", ""]);
	
	// exports


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(32);
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
				value: ''
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onInput',
			value: function onInput(e) {
				var me = this;
				var state = me.state;
	
				var node = e.target;
				var value = node.value;
				state.value = value;
				me.updateComponent();
			}
		}, {
			key: 'onKeydown',
			value: function onKeydown(e) {
				var me = this;
				if (e.which === 13) {
					me.onSearch();
				};
			}
		}, {
			key: 'onSearch',
			value: function onSearch() {
				var me = this;
				var state = me.state;
	
				Actions('body').inputFilterName(state.value);
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		width: 200,
		height: 30,
		placeholder: '默认字符'
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(294);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	var Image = __webpack_require__(303);
	
	// 组件类
	
	var Info = function (_React$Component) {
		_inherits(Info, _React$Component);
	
		function Info() {
			_classCallCheck(this, Info);
	
			var _this = _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).apply(this, arguments));
	
			var me = _this;
			return _this;
		}
	
		_createClass(Info, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				var num = Actions(me).getMovieNumber();
				return React.createElement(
					'ul',
					null,
					props.list.map(function (val, key) {
						return React.createElement(
							'li',
							{ key: val.id },
							React.createElement(
								'div',
								{ className: 'ch-img' },
								React.createElement(
									'div',
									{ className: 'ch-imgbox' },
									React.createElement(Image, { width: '80', src: val.src, onClick: Actions(me).zoomIn.bind(me, val.src) }),
									React.createElement(Image, { width: '80', src: val.src, onClick: Actions(me).zoomIn.bind(me, val.src) })
								)
							),
							React.createElement(
								'div',
								{ className: 'ch-score' },
								limit.toFixed(val.score, 1)
							),
							val.isHide ? React.createElement('div', { className: 'ch-mark' }) : void 0,
							React.createElement(
								'div',
								{ className: 'ch-text' },
								React.createElement(
									'span',
									{ className: 'ch-name' },
									val.name
								),
								!val.isHide ? React.createElement(
									'span',
									null,
									React.createElement(
										'a',
										{ href: 'javascript:;', className: 'ch-btn', onClick: Actions(me).copy.bind(me, val.id, false) },
										'\u590D\u5236\u5730\u5740'
									),
									React.createElement(
										'a',
										{ href: 'javascript:;', className: 'ch-btn', onClick: Actions(me).hideIt.bind(me, val) },
										'\u770B\u8FC7'
									)
								) : React.createElement(
									'span',
									null,
									React.createElement(
										'a',
										{ href: 'javascript:;', className: 'ch-btn ch-btn-gray', onClick: Actions(me).copy.bind(me, val.id, false) },
										'\u590D\u5236\u5730\u5740'
									),
									React.createElement(
										'a',
										{ href: 'javascript:;', className: 'ch-btn ch-btn-gray', onClick: Actions(me).showIt.bind(me, val) },
										'\u60F3\u770B'
									)
								),
								React.createElement('br', null),
								'\u5BFC\u6F14\uFF1A',
								val.actor,
								React.createElement('br', null),
								val.director ? React.createElement(
									'span',
									null,
									'\u6F14\u5458\uFF1A',
									val.director,
									React.createElement('br', null)
								) : void 0,
								'\u65F6\u95F4\uFF1A',
								val.year,
								' \u7C7B\u578B\uFF1A',
								val.type,
								' \u56FD\u5BB6\uFF1A',
								val.area
							),
							val.thunder ? React.createElement(
								'div',
								{ className: 'ch-download' },
								val.thunder.split(',').map(function (val, key) {
									var title = '\u70B9\u51FB\u590D\u5236\u8FC5\u96F7\u8D44\u6E90\u5730\u5740[' + val + ']';
									return React.createElement(
										'a',
										{ key: key,
											href: 'javascript:;',
											title: title,
											onClick: Actions(me).copy.bind(me, val, true) },
										'B'
									);
								})
							) : void 0
						);
					})
				);
			}
		}]);
	
		return Info;
	}(React.Component);
	
	;
	
	module.exports = Info;

/***/ }),
/* 303 */
/***/ (function(module, exports) {

	"use strict";
	
	// 组件类
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Image = function (_React$Component) {
		_inherits(Image, _React$Component);
	
		function Image() {
			_classCallCheck(this, Image);
	
			var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
	
			_this.state = {
				opacity: 0,
				WebkitFilter: 'blur(2px)'
			};
	
			var me = _this;
			return _this;
		}
	
		_createClass(Image, [{
			key: "render",
			value: function render() {
				var me = this;
				var props = me.props,
				    state = me.state;
	
				return React.createElement("img", _extends({}, props, { onError: me.onError.bind(me), onLoad: me.onload.bind(me), style: state, ref: "node" }));
			}
		}, {
			key: "shouldComponentUpdate",
			value: function shouldComponentUpdate() {
				return false;
			}
		}, {
			key: "onload",
			value: function onload() {
				var me = this;
				var refs = me.refs,
				    state = me.state;
				var node = refs.node;
	
				node.style.opacity = 1;
				node.style.WebkitFilter = 'blur(0px)';
			}
		}, {
			key: "onError",
			value: function onError() {
				var me = this;
				var refs = me.refs,
				    state = me.state;
				var node = refs.node;
	
				node.style.display = 'none';
			}
		}]);
	
		return Image;
	}(React.Component);
	
	;
	
	module.exports = Image;

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(305), __webpack_require__(308));

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(306);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	
	// const
	
	// 组件类
	
	var Filter = function (_React$Component) {
		_inherits(Filter, _React$Component);
	
		function Filter() {
			_classCallCheck(this, Filter);
	
			return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).apply(this, arguments));
		}
	
		_createClass(Filter, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				var filterWord = props.filterWord;
	
				var selectWord = filterWord.filter(function (val) {
					return val.selected;
				}).map(function (val) {
					return val.key;
				}).join(' ');
				var parseWord = '';
				if (selectWord) {
					parseWord = '\uFF1A' + selectWord;
				};
				return React.createElement(
					'div',
					{ className: 'thetop-filter fn-MR10 fn-MB10' },
					React.createElement(
						'h2',
						null,
						props.filterName,
						parseWord,
						selectWord ? React.createElement(
							'a',
							{ href: 'javascript:;', className: 'ch-remove', onClick: Actions(me).clearFilter },
							'\xD7'
						) : void 0
					),
					React.createElement(
						'ul',
						null,
						filterWord.map(function (val, key) {
							return React.createElement(
								'li',
								{ key: key },
								React.createElement(
									'a',
									{ href: 'javascript:;', onClick: Actions(me).select.bind(me, val), className: val.selected ? 'ch-chose' : '' },
									val.key
								)
							);
						})
					)
				);
			}
		}]);
	
		return Filter;
	}(React.Component);
	
	;
	
	module.exports = Filter;

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(307);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".thetop-filter {\n  z-index: 3;\n  position: relative;\n  float: left;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);\n}\n.thetop-filter:hover {\n  z-index: 4;\n}\n.thetop-filter:hover ul {\n  display: block;\n}\n.thetop-filter h2 {\n  padding: 8px;\n  position: relative;\n  z-index: 6;\n  background: #FFF;\n  color: #999;\n}\n.thetop-filter h2 .ch-remove {\n  padding: 0 2px;\n  margin-left: 5px;\n}\n.thetop-filter ul {\n  z-index: 1;\n  position: absolute;\n  background: #FFF;\n  padding: 10px;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n  top: 30px;\n  left: 0;\n  width: 350px;\n  display: none;\n}\n.thetop-filter ul a {\n  display: inline-block;\n  position: relative;\n  margin: 0 5px;\n  padding-top: 0;\n  padding-bottom: 0;\n  height: 20px;\n  line-height: 20px;\n}\n.thetop-filter ul .ch-chose {\n  background: #999;\n  color: #FFF;\n}\n.thetop-filter ul li {\n  display: inline-block;\n  padding: 2px 0;\n}\n", ""]);
	
	// exports


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(32);
	var React = __webpack_require__(97);
	var Control = __webpack_require__(26);
	
	var Controller = function (_Control) {
		_inherits(Controller, _Control);
	
		function Controller(props) {
			_classCallCheck(this, Controller);
	
			var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));
	
			_this.state = {};
	
			var me = _this;
			var state = me.state;
	
			var defaultWord = props.defaultWord;
			state.filterWord = props.word.map(function (val) {
				return {
					key: val,
					selected: limit.contains(defaultWord, val)
				};
			});
			return _this;
		}
	
		_createClass(Controller, [{
			key: 'onSelect',
			value: function onSelect(val) {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				val.selected = !val.selected;
				me.updateComponent().then(function () {
					props.onChange(state.filterWord.filter(function (val) {
						return val.selected;
					}).map(function (val) {
						return val.key;
					}));
				});
			}
		}, {
			key: 'onClearFilter',
			value: function onClearFilter() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				state.filterWord.forEach(function (val) {
					val.selected = false;
				});
				me.updateComponent().then(function () {
					props.onChange([]);
				});
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		filterName: '年份',
		word: ['2016', '2017', '2018'],
		onChange: limit.K,
		defaultWord: ['2016'],
		actionId: 'filter',
		shouldComponentNotUpdate: true
	};
	;
	
	module.exports = Controller;

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var $ = __webpack_require__(31);
	var React = __webpack_require__(97);
	var limit = __webpack_require__(32);
	var Control = __webpack_require__(26);
	var Ajax = __webpack_require__(101);
	var Copy = __webpack_require__(33);
	var Dialog = __webpack_require__(102);
	var Router = __webpack_require__(154);
	
	var Controller = function (_Control) {
		_inherits(Controller, _Control);
	
		function Controller() {
			var _temp, _this;
	
			_classCallCheck(this, Controller);
	
			var me = (_temp = (_this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this)), _this), _this.state = {
				totle: 100,
				number: 10,
				page: 1,
				list: [],
				filterMap: {},
				filter: {},
				filterName: '',
				focus: '电影'
			}, _temp);
			var state = me.state;
	
			if (localStorage.page) {
				// state.page = localStorage.page;
			};
			return _this;
		}
	
		_createClass(Controller, [{
			key: 'onGetFilterMap',
			value: function onGetFilterMap() {
				var me = this;
				var state = me.state;
	
				return new Ajax({
					url: '/thetop/filterMap.json'
				}).then(function (val) {
					state.filterMap = val.filterMap;
				}).then(function () {
					var filter = me.getLocalStorage('filter');
					if (me.hasClearFilter()) {
						filter = {};
					};
					state.filter = limit.keys(filter).length ? filter : limit.map(state.filterMap, function (val, key) {
						return limit.map(val, function () {
							return [];
						});
					});
				});
			}
		}, {
			key: 'onChangeFilterName',
			value: function onChangeFilterName(val, showLayout) {
				var me = this;
				var state = me.state;
	
				state.filterName = val;
				me.updateComponent();
				if (showLayout) {
					me.onChangePage(1);
				};
			}
		}, {
			key: 'onInputFilterName',
			value: function onInputFilterName(val) {
				var me = this;
				var state = me.state;
	
				Router.setSearch({ filterName: val }, 'search');
			}
		}, {
			key: 'onSearchList',
			value: function onSearchList() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				return new Ajax({
					url: '/thetop/list.json',
					data: me.getData(),
					type: 'POST'
				}).then(function (val) {
					state.totle = Math.ceil(val.count / state.number);
					var hideMovieData = me.getLocalStorage('hideMovie');
					val.list.forEach(function (val) {
						if (hideMovieData[val.id]) {
							val.isHide = true;
						} else {
							delete val.isHide;
						};
					});
					state.list = val.list;
					return me.updateComponent();
				});
			}
		}, {
			key: 'onChangePage',
			value: function onChangePage(val) {
				var me = this;
				var state = me.state;
	
				localStorage.page = state.page = val;
				me.onSearchList();
			}
		}, {
			key: 'onHideIt',
			value: function onHideIt(val) {
				var me = this;
				val.isHide = true;
				me.setLocalStorage(val.id, true);
				me.updateComponent();
			}
		}, {
			key: 'onShowIt',
			value: function onShowIt(val) {
				var me = this;
				delete val.isHide;
				me.setLocalStorage(val.id, false);
				me.updateComponent();
			}
		}, {
			key: 'onChangeFilter',
			value: function onChangeFilter(filter, keys) {
				var me = this;
				var state = me.state;
	
				filter.length = 0;
				filter.push.apply(filter, keys);
				localStorage['filter'] = JSON.stringify(state.filter);
				// 如果ID查询的时候
				if (me.hasFilterId()) {
					Router.setHash('');
				};
				me.onChangePage(1);
			}
		}, {
			key: 'getData',
			value: function getData() {
				var me = this;
				var state = me.state;
				var number = state.number;
	
				var start = number * (state.page - 1);
				var filter = state.filter[state.focus];
				var filterMap = JSON.stringify(filter);
				if (me.hasClearFilter()) {
					filterMap = '{}';
					start = 0;
					state.page = 1;
				};
				return limit.assign({ start: start, number: number, filterMap: filterMap }, me.mixSearch());
			}
		}, {
			key: 'hasFilterId',
			value: function hasFilterId() {
				var hashParse = Router.parseHash();
				if (hashParse && hashParse.hash === 'search') {
					var search = hashParse.search;
					return search.filterId;
				};
				return false;
			}
		}, {
			key: 'hasClearFilter',
			value: function hasClearFilter() {
				var hashParse = Router.parseHash();
				if (hashParse && hashParse.hash === 'search') {
					var search = hashParse.search;
					return search.clearFilter;
				};
				return false;
			}
		}, {
			key: 'mixSearch',
			value: function mixSearch() {
				var me = this;
				var hashParse = Router.parseHash();
				if (hashParse) {
					return hashParse.search;
				};
			}
		}, {
			key: 'setLocalStorage',
			value: function setLocalStorage(id, flag) {
				var me = this;
				var data = me.getLocalStorage('hideMovie');
				if (flag) {
					data[id] = true;
				} else {
					delete data[id];
				};
				localStorage['hideMovie'] = JSON.stringify(data);
			}
		}, {
			key: 'getLocalStorage',
			value: function getLocalStorage(key) {
				var data = localStorage[key] || '{}';
				return JSON.parse(data);
			}
		}, {
			key: 'onGetMovieNumber',
			value: function onGetMovieNumber() {
				var me = this;
				return limit.keys(me.getLocalStorage('hideMovie')).length;
			}
		}, {
			key: 'onCopy',
			value: function onCopy(val, isOrigin) {
				var href = null;
				if (isOrigin) {
					href = val;
				} else {
					var hash = encodeURIComponent('search?filterId=' + val + '&clearFilter=true');
					href = 'http://' + location.host + '/thetop/main.htm#' + hash;
				};
				if (new Copy({ text: href }).isCopySuccess()) {
					Dialog.success('\u6210\u529F\u590D\u5236\uFF0C\u8BF7\u76F4\u63A5\u7C98\u8D34', { hasCover: false, timeout: 1000 });
				} else {
					window.open(href);
				};
			}
		}, {
			key: 'onZoomIn',
			value: function onZoomIn(val) {
				var dia = new Dialog({
					width: 'auto',
					height: 'auto',
					className: 'imgview',
					onClickCover: function onClickCover() {
						dia.destroy();
					}
				}, null, React.createElement('img', { src: val, onClick: function onClick() {
						dia.destroy();
					} }));
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		actionId: 'body'
	};
	;
	
	module.exports = Controller;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map