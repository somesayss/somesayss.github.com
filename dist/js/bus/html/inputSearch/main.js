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

	module.exports = __webpack_require__(89);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	module.exports = limit;

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(16);
	var limit = __webpack_require__(8);
	var Actions = __webpack_require__(17);
	
	module.exports = function (Wrapper, Class) {
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
										me.state.actionId = me.state.actionId || 'uaid' + limit.getUid();
										me.state.actionUUid = __controller__.Actions.actionUUid = 'uuid' + limit.getUid();
										if (props.actionCid) {
													me.state.actionCid = __controller__.Actions.actionCid = props.actionCid;
										};
										Actions.set(me.state.actionId, __controller__.Actions);
										return _this;
							}
	
							_createClass(WrapperComponent, [{
										key: 'getPerProps',
										value: function getPerProps(props) {
													var outProps = {};
													limit.each(Class.defaultProps, function (val, key) {
																outProps[key] = props[key];
													});
													return outProps;
										}
							}, {
										key: 'getPerState',
										value: function getPerState(state) {
													var me = this;
													var outState = {};
													limit.each(me.__controller__.state, function (val, key) {
																outState[key] = state[key];
													});
													return outState;
										}
							}, {
										key: 'componentWillReceiveProps',
										value: function componentWillReceiveProps(props) {
													var me = this;
													me.propsFromOther = true;
										}
							}, {
										key: 'shouldComponentUpdate',
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
										key: 'clearProps',
										value: function clearProps(props) {
													var newProps = limit.assign({}, props);
													delete newProps.actionId;
													delete newProps.actionUUid;
													delete newProps.actionCid;
													newProps.actionId = Class.defaultProps && Class.defaultProps.actionId;
													return newProps;
										}
							}, {
										key: 'componentWillUpdate',
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
																limit.cb(__controller__.componentWillUpdate).call(__controller__, me.state);
																__controller__.state = me.getPerState(me.state);
																__controller__.props = me.getPerProps(me.state);
													};
										}
							}, {
										key: 'componentDidUpdate',
										value: function componentDidUpdate() {
													var me = this;
													me.propsFromOther = false;
										}
							}, {
										key: 'render',
										value: function render() {
													var me = this;
													return React.createElement(Wrapper, _extends({}, me.state, { ref: 'com' }));
										}
							}, {
										key: 'componentWillUnmount',
										value: function componentWillUnmount() {
													var me = this;
													Actions.remove(me.state.actionId, me.__controller__.Actions);
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

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var limit = __webpack_require__(8);
	
	// 变量
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
			var _ret = function () {
				var uid = getPropTrueId(id, 'actionUUid');
				if (uid) {
					return {
						v: pool.filter(function (val) {
							return val.actionUUid === uid;
						})
					};
				} else {
					return {
						v: pool
					};
				};
			}();
	
			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
	
	module.exports = Actions;

/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports) {

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

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(33), __webpack_require__(37));

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(34);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Mousemove = __webpack_require__(36);
	
	// 组件类
	
	var Scroller = function (_React$Component) {
		_inherits(Scroller, _React$Component);
	
		function Scroller() {
			_classCallCheck(this, Scroller);
	
			return _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).apply(this, arguments));
		}
	
		_createClass(Scroller, [{
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
				var container = refs.container;
				var containerBar = refs.containerBar;
	
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
				var container = refs.container;
				var bar = refs.bar;
	
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
				var container = refs.container;
				var bar = refs.bar;
	
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
				var container = refs.container;
				var bar = refs.bar;
	
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
				new Mousemove(e).on('move', function (e, diff) {
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
	
		return Scroller;
	}(React.Component);
	
	;
	
	module.exports = Scroller;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content, {});
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

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-scroller {\n  position: relative;\n  overflow: hidden;\n}\n.limit-scroller .ch-container-bar {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 17px;\n  height: 100%;\n  background: #FFF;\n}\n.limit-scroller .ch-container-bar:hover .ch-bar {\n  opacity: 1 !important;\n}\n.limit-scroller .ch-bar {\n  transition: opacity 0.5s ease-in-out 0s;\n  position: absolute;\n  width: 6px;\n  height: 50px;\n  border-top: 2px solid #FFF;\n  border-bottom: 2px solid #FFF;\n  top: 0;\n  right: 3px;\n  cursor: pointer;\n  opacity: 0;\n}\n.limit-scroller .ch-bar:before {\n  display: block;\n  content: '';\n  height: 100%;\n  width: 100%;\n  background: #666;\n  border-radius: 3px;\n}\n.limit-scroller .ch-container {\n  overflow: auto;\n  height: 100%;\n}\n.limit-scroller ::-webkit-scrollbar {\n  background: #FFF;\n}\n.limit-scroller ::-webkit-scrollbar-thumb {\n  background: #FFF;\n}\n.limit-scroller ::-webkit-scrollbar-track {\n  background: #FFF;\n}\n", ""]);
	
	// exports


/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Mousemove = function (_limit$Events) {
		_inherits(Mousemove, _limit$Events);
	
		function Mousemove(config) {
			var _temp, _this;
	
			_classCallCheck(this, Mousemove);
	
			var me = (_temp = (_this = _possibleConstructorReturn(this, (Mousemove.__proto__ || Object.getPrototypeOf(Mousemove)).call(this)), _this), _this.props = {
				keyWord: 'move',
				clientX: null,
				clientY: null
			}, _temp);
			limit.assign(me.state, me.props, config);
			me.bindMouseEvents();
			return _this;
		}
	
		_createClass(Mousemove, [{
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
	
		return Mousemove;
	}(limit.Events);
	
	module.exports = Mousemove;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Control = __webpack_require__(38);
	
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
		actionId: 'limitScroller',
		height: 200,
		barHeight: 50
	};
	;
	
	module.exports = Controller;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(8);
	
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
					me.trigger(state, resolve);
				});
			}
		}]);
	
		return Control;
	}();
	
	;
	
	module.exports = Control;

/***/ },
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ function(module, exports) {

	'use strict';
	
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
	
	module.exports = Component;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hoc = __webpack_require__(15);
	
	var _hoc2 = _interopRequireDefault(_hoc);
	
	var _view = __webpack_require__(84);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _controller = __webpack_require__(87);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _hoc2.default)(_view2.default, _controller2.default);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(85);
	
	var _component = __webpack_require__(82);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InputText = function (_Component) {
		_inherits(InputText, _Component);
	
		function InputText() {
			_classCallCheck(this, InputText);
	
			return _possibleConstructorReturn(this, (InputText.__proto__ || Object.getPrototypeOf(InputText)).apply(this, arguments));
		}
	
		_createClass(InputText, [{
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
	
		return InputText;
	}(_component2.default);
	
	;
	
	module.exports = InputText;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(86);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content, {});
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

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-input-text {\n  background: #F00;\n}\n", ""]);
	
	// exports


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _control = __webpack_require__(38);
	
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
	
	module.exports = Controller;

/***/ },
/* 88 */,
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 组件类
	
	var _index = __webpack_require__(90);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 置入文档
	ReactDOM.render(React.createElement(_index2.default, null), document.getElementById('container'));

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(91), __webpack_require__(99));

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(92);
	
	var _component = __webpack_require__(82);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _index = __webpack_require__(94);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 组件类
	var Tally = function (_Component) {
		_inherits(Tally, _Component);
	
		function Tally() {
			_classCallCheck(this, Tally);
	
			return _possibleConstructorReturn(this, (Tally.__proto__ || Object.getPrototypeOf(Tally)).apply(this, arguments));
		}
	
		_createClass(Tally, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ className: me.getClassName('inputSearch') },
					React.createElement(_index2.default, { value: 'a1' })
				);
			}
		}]);
	
		return Tally;
	}(_component2.default);
	
	;
	
	module.exports = Tally;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(93);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content, {});
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

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(95), __webpack_require__(98));

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(96);
	
	var _component = __webpack_require__(82);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _index = __webpack_require__(32);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(83);
	
	var _index4 = _interopRequireDefault(_index3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 组件类
	var InputSearch = function (_Component) {
		_inherits(InputSearch, _Component);
	
		function InputSearch() {
			_classCallCheck(this, InputSearch);
	
			return _possibleConstructorReturn(this, (InputSearch.__proto__ || Object.getPrototypeOf(InputSearch)).apply(this, arguments));
		}
	
		_createClass(InputSearch, [{
			key: 'render',
			value: function render() {
				var me = this;
				var _me$props = me.props;
				var filterData = _me$props.filterData;
				var value = _me$props.value;
				var focusNumber = _me$props.focusNumber;
				var isFocus = _me$props.isFocus;
				var contentStyle = _me$props.contentStyle;
	
				var data = filterData;
				var leg = data.length;
				if (leg >= 3) {
					leg = 3;
				};
				return React.createElement(
					'div',
					{ className: me.getClassName('limit-input-search', isFocus ? 'limit-input-search-focus' : '') },
					React.createElement(_index4.default, { type: 'text', ref: 'input',
						onFocus: Actions(me).focus.bind(null, true),
						onBlur: function onBlur() {
							setTimeout(function () {
								Actions(me).focus && Actions(me).focus(false);
							}, 100);
						},
						onKeyDown: me.keyDown.bind(me),
						onChange: Actions(me).change,
						value: value }),
					isFocus && data.length ? React.createElement(
						'div',
						{ className: 'limit-input-search-content', style: _extends({}, contentStyle, { width: leg * 100 + 4 + 'px' }) },
						data.length <= 9 ? React.createElement(
							'ul',
							{ className: 'fn-clear' },
							data.map(function (val, key) {
								return React.createElement(
									'li',
									{ key: key, style: { width: 100 },
										onClick: Actions(me).selectItem.bind(null, val, key),
										className: '' + (key === focusNumber ? 'active' : '') },
									val
								);
							})
						) : React.createElement(
							_index2.default,
							{ height: '75', ref: 'scroller', barHeight: '50' },
							React.createElement(
								'ul',
								{ className: 'fn-clear' },
								data.map(function (val, key) {
									return React.createElement(
										'li',
										{ key: key,
											onClick: Actions(me).selectItem.bind(null, val, key),
											className: '' + (key === focusNumber ? 'active' : '') },
										val
									);
								})
							)
						)
					) : void 0
				);
			}
		}, {
			key: 'keyDown',
			value: function keyDown(e) {
				var me = this;
				var _me$refs = me.refs;
				var input = _me$refs.input;
				var scroller = _me$refs.scroller;
				var _me$props2 = me.props;
				var focusNumber = _me$props2.focusNumber;
				var filterData = _me$props2.filterData;
	
				if (!e.shiftKey && !e.altKey && filterData.length) {
					// 
					var keyMap = {
						37: 'left',
						38: 'up',
						39: 'right',
						40: 'down'
					};
					if (keyMap[e.keyCode]) {
						e.preventDefault();
						Actions(me).keyDown(keyMap[e.keyCode]).then(function () {
							if (scroller) {
								var num = Math.floor(me.props.focusNumber / 3) - 2;
								scroller.refs.com.scrollTo(num * 25);
							};
						});
					} else if (e.keyCode === 13) {
						e.preventDefault();
						Actions(me).enterDown().then(function () {
							input.refs.com.refs.input.blur();
						});
					};
				};
			}
		}, {
			key: 'getInput',
			value: function getInput() {
				var me = this;
				return me.refs.input.refs.com.refs.input;
			}
		}]);
	
		return InputSearch;
	}(_component2.default);
	
	;
	
	module.exports = InputSearch;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(97);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content, {});
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

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-input-search {\n  position: relative;\n  display: inline-block;\n}\n.limit-input-search.limit-input-search-focus {\n  z-index: 10;\n}\n.limit-input-search input {\n  border: 1px solid #CCC;\n  padding: 5px;\n  font-size: 12px;\n  color: #666;\n}\n.limit-input-search .limit-input-search-content {\n  position: absolute;\n  width: 304px;\n  padding: 1px;\n  border: 1px solid #4285f4;\n  box-shadow: 0 0 3px rgba(66, 133, 244, 0.5);\n  top: 30px;\n  cursor: pointer;\n  overflow: auto;\n  background: #FFF;\n}\n.limit-input-search .limit-input-search-content li {\n  float: left;\n  width: 33%;\n  height: 25px;\n  color: #666;\n  padding: 0 6px;\n  line-height: 23px;\n  border: 1px solid #FFF;\n}\n.limit-input-search .limit-input-search-content li:hover {\n  border: 1px dashed #4285f4;\n}\n.limit-input-search .limit-input-search-content li.active {\n  background: #4285f4;\n  color: #FFF;\n}\n", ""]);
	
	// exports


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Control = __webpack_require__(38);
	
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
				filterData: [],
				value: '',
				focusNumber: -1,
				isFocus: false
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'doFilter',
			value: function doFilter(value) {
				var me = this;
				var originData = me.props.originData;
				var state = me.state;
	
				state.filterData = originData.filter(function (val) {
					return val.indexOf(value) !== -1;
				});
				if (state.filterData.length <= 1) {
					state.filterData = [];
				};
				state.value = value;
				state.focusNumber = -1;
				return me.updateComponent();
			}
		}, {
			key: 'doSelect',
			value: function doSelect(val) {
				var me = this;
				return me.props.onChange(val);
			}
		}, {
			key: 'onChange',
			value: function onChange(value) {
				var me = this;
				return me.doFilter(value).then(me.doSelect.bind(me, value));
			}
		}, {
			key: 'onKeyDown',
			value: function onKeyDown(key) {
				var me = this;
				var state = me.state;
				var originData = me.props.originData;
	
				var max = state.filterData.length || originData.length;
				switch (key) {
					case 'right':
						if (state.focusNumber >= max - 1) {
							state.focusNumber = 0;
						} else {
							state.focusNumber++;
						};
						break;
					case 'left':
						if (state.focusNumber <= 0) {
							state.focusNumber = max - 1;
						} else {
							state.focusNumber--;
						};
						break;
					case 'up':
						if (state.focusNumber === max || state.focusNumber === -1) {
							state.focusNumber = max - 1;
						} else {
							state.focusNumber -= 3;
						};
						break;
					case 'down':
						if (state.focusNumber === -1 || state.focusNumber === max) {
							state.focusNumber = 0;
						} else {
							state.focusNumber += 3;
						};
						break;
				};
				if (state.focusNumber <= -1) {
					state.focusNumber = -1;
				} else if (state.focusNumber >= max) {
					state.focusNumber = max;
				};
				return me.updateComponent();
			}
		}, {
			key: 'onEnterDown',
			value: function onEnterDown() {
				var me = this;
				var state = me.state;
				var filterData = state.filterData;
				var focusNumber = state.focusNumber;
	
				var val = state.value = filterData[focusNumber];
				return me.updateComponent().then(me.doSelect.bind(me, val));
			}
		}, {
			key: 'onSelectItem',
			value: function onSelectItem(val, key) {
				var me = this;
				var state = me.state;
	
				state.value = val;
				state.focusNumber = key;
				return me.updateComponent().then(me.doSelect.bind(me, val));
			}
		}, {
			key: 'onFocus',
			value: function onFocus(val) {
				var me = this;
				var state = me.state;
				var props = me.props;
	
				state.isFocus = val;
				if (val) {
					me.doFilter(state.value);
				};
				return me.updateComponent();
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		actionId: 'inputSelect',
		originData: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a41', 'a5', 'a6', 'a42', 'a5', 'a6', 'a43', 'a5', 'a6'],
		onChange: limit.K
	};
	;
	
	module.exports = Controller;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _control = __webpack_require__(38);
	
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
	
	module.exports = Controller;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map