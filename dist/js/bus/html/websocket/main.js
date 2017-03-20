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

	module.exports = __webpack_require__(42);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
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
/* 12 */,
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

/***/ },
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
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
/* 19 */
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
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(22);
	var limit = __webpack_require__(4);
	var Actions = __webpack_require__(26);
	
	module.exports = function (Wrapper, Class) {
		var WrapperComponent = function (_React$Component) {
			_inherits(WrapperComponent, _React$Component);
	
			function WrapperComponent() {
				_classCallCheck(this, WrapperComponent);
	
				var _this = _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).apply(this, arguments));
	
				var me = _this;
				var __controller__ = void 0;
				me.__controller__ = __controller__ = new Class(me.props);
				me.state = limit.assignSuper({}, __controller__.getInitialState(), me.props);
				__controller__.props = me.getPerProps(me.props);
				me.state.actionId = me.state.actionId || limit.getUid();
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
				key: 'componentWillUpdate',
				value: function componentWillUpdate(props) {
					var me = this;
					me.__controller__.props = me.getPerProps(props);
					limit.each(Class.defaultProps, function (val, key) {
						me.state[key] = props[key];
					});
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
					return React.createElement(Wrapper, me.state);
				}
			}, {
				key: 'componentDidMount',
				value: function componentDidMount() {
					this.__controller__.componentDidMount(this);
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var limit = __webpack_require__(4);
	
	// 变量
	var Actions = window.Actions = function (id) {
		return Actions.get(id);
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
	
	Actions.get = function (id) {
		if (limit.isObjectSuper(id)) {
			id = id.props.actionId;
		} else {
			id = limit.toString(id);
		};
		var pool = ActionsPool[id];
		if (pool) {
			if (pool.length === 1) {
				return pool[0];
			} else {
				return pool;
			};
		};
	};
	
	Actions.remove = function (id, action) {
		var pool = ActionsPool[id];
		if (pool) {
			limit.remove(pool, action);
		};
	};
	
	module.exports = Actions;

/***/ },
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(4);
	
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
				var me = this,
				    Actions = me.Actions = {};
				// 对第一层的对象的原型属性进行处理
				limit(me.findAllPro()).filter(function (val) {
					return REX.test(val);
				}).each(function (val, key) {
					Actions[key.replace(REX, function (a, b, c) {
						return b.toLowerCase() + c;
					})] = val.bind(me);
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
			key: 'componentDidMount',
			value: function componentDidMount(com) {
				this.com = com;
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
				var me = this,
				    state = me.getInitialState();
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
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var React = __webpack_require__(22);
	var ReactDOM = __webpack_require__(23);
	
	// 组件类
	var LimitRate = __webpack_require__(43);
	
	// 置入文档
	ReactDOM.render(React.createElement(LimitRate, null), document.getElementById('container'));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(25)(__webpack_require__(44), __webpack_require__(47));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(45);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(22);
	var limit = __webpack_require__(4);
	var Rainbow = __webpack_require__(13);
	
	var colorList = ['#000', '#060', '#0C0', '#300', '#360', '#3C0', '#600', '#660', '#6C0', '#900'];
	// 组件类
	
	var Rate = function (_React$Component) {
		_inherits(Rate, _React$Component);
	
		function Rate() {
			_classCallCheck(this, Rate);
	
			return _possibleConstructorReturn(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).apply(this, arguments));
		}
	
		_createClass(Rate, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				var color = '#666';
				if (props.myId) {
					color = colorList[props.myId - 1];
				};
				return React.createElement(
					'div',
					{ className: 'websocket' },
					React.createElement(
						'ul',
						null,
						props.strList.map(function (val, key) {
							return React.createElement(
								'li',
								{ key: key,
									style: { color: colorList[val.id - 1] }
								},
								val.displayName || '游客' + val.id,
								'$ ',
								val.value
							);
						})
					),
					React.createElement(
						'div',
						{ className: 'ch-edit', style: { color: color } },
						props.myName || '游客' + props.myId,
						'$ ',
						props.message,
						React.createElement('input', { ref: 'input', onKeyDown: Actions(me).keydown })
					)
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				var refs = me.refs;
				var props = me.props;
				var input = refs.input;
	
				var isMark = false;
				var WIN = $(window);
				input = $(input);
				input.on('compositionstart', function () {
					isMark = true;
				});
				input.on('compositionend', function () {
					isMark = false;
				});
				input.on('input', function (e) {
					if (!isMark) {
						Actions(me).input(e);
						input.val('');
					};
				});
				WIN.on('click', function () {
					input.focus();
				});
				Actions(me).initWS();
			}
		}]);
	
		return Rate;
	}(React.Component);
	
	;
	
	module.exports = Rate;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(46);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports
	
	
	// module
	exports.push([module.id, "html,\nbody {\n  height: 100%;\n  cursor: text;\n}\n.websocket {\n  color: #666;\n  line-height: 20px;\n  padding: 15px 20px;\n}\n.websocket .ch-edit {\n  line-height: 20px;\n}\n.websocket .ch-edit input {\n  height: 20px;\n  color: #666;\n  font-size: 12px;\n  border: none;\n}\n", ""]);
	
	// exports


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(4);
	var Control = __webpack_require__(31);
	var Websocket = __webpack_require__(48);
	
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
				strList: [],
				message: [],
				myId: '',
				myDisplayName: '',
				sysName: 'Websocket聊天测试'
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onInitWS',
			value: function onInitWS() {
				var me = this;
				var WS = me.WS = new Websocket();
				limit(['Others', 'Thesys']).each(function (val) {
					WS.on('messageFrom' + val, me['onMessageFrom' + val].bind(me));
				});
			}
		}, {
			key: 'onMessageFromThesys',
			value: function onMessageFromThesys(data) {
				var me = this;
				var state = me.state;
	
				if (data.type === 'tellId') {
					state.myId = data.value;
				};
				me.updateComponent();
			}
		}, {
			key: 'onMessageFromOthers',
			value: function onMessageFromOthers(data) {
				var me = this;
				var state = me.state;
	
				state.strList.push(data);
				me.updateComponent().then(function () {
					me.scrollBottom();
				});
			}
		}, {
			key: 'onInput',
			value: function onInput(e) {
				var me = this;
	
				var _me$getAttr = me.getAttr();
	
				var props = _me$getAttr.props;
				var state = _me$getAttr.state;
				var message = state.message;
	
				var value = e.target.value;
				message.push.apply(message, value.split(''));
				me.updateComponent();
			}
		}, {
			key: 'onKeydown',
			value: function onKeydown(e) {
				var me = this;
	
				var _me$getAttr2 = me.getAttr();
	
				var props = _me$getAttr2.props;
				var state = _me$getAttr2.state;
				// 删除
	
				if (e.which === 8) {
					state.message.pop();
					me.updateComponent();
				} else if (e.which === 13) {
					// 发送信息
					me.sendMessage();
					me.updateComponent().then(function () {
						me.scrollBottom();
					});
				};
			}
		}, {
			key: 'sendMessage',
			value: function sendMessage() {
				var me = this;
				var WS = me.WS;
	
				var _me$getAttr3 = me.getAttr();
	
				var props = _me$getAttr3.props;
				var state = _me$getAttr3.state;
	
				var message = state.message.join('');
				if (message) {
					state.strList.push({ id: state.myId, displayName: state.myDisplayName, value: message });
					state.message.length = 0;
					WS.tellOthers(message);
				};
			}
		}, {
			key: 'scrollBottom',
			value: function scrollBottom() {
				var WH = window.innerHeight;
				var SH = document.body.scrollHeight;
				window.scrollTo(0, SH - WH);
			}
		}]);
	
		return Controller;
	}(Control);
	
	;
	
	module.exports = Controller;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(4);
	var Events = __webpack_require__(49);
	
	// 类
	
	var Websocket = function (_Events) {
		_inherits(Websocket, _Events);
	
		function Websocket(props) {
			_classCallCheck(this, Websocket);
	
			var _this = _possibleConstructorReturn(this, (Websocket.__proto__ || Object.getPrototypeOf(Websocket)).call(this));
	
			_this.state = {
				host: location.hostname,
				port: '8181',
				ready: false
			};
	
			var me = _this;
			limit.assign(me.state, props);
			me.creatWebSocket();
			return _this;
		}
	
		_createClass(Websocket, [{
			key: 'creatWebSocket',
			value: function creatWebSocket() {
				var me = this;
				var state = me.state;
				var WS = me.WS = new WebSocket('ws://' + state.host + ':' + state.port);
				limit.each(['open', 'message', 'error', 'close'], function (val) {
					me.on(val, limit.cb(me['onWS' + val]));
					WS['on' + val] = function () {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}
	
						return me.emit.apply(me, [val].concat(args));
					};
				});
			}
		}, {
			key: 'onWSopen',
			value: function onWSopen() {
				var me = this;
				var state = me.state;
	
				state.ready = true;
			}
		}, {
			key: 'onWSclose',
			value: function onWSclose() {
				var me = this;
				var state = me.state;
	
				state.ready = false;
			}
		}, {
			key: 'onWSmessage',
			value: function onWSmessage(data) {
				var me = this;
				try {
					var message = JSON.parse(data.data);
					me.emit('messageFrom' + me.upperName(message.from), message);
				} catch (e) {
					limit.err(e);
				};
			}
		}, {
			key: 'upperName',
			value: function upperName(name) {
				return name.replace(/^\w/, function (a) {
					return a.toUpperCase();
				});
			}
		}, {
			key: 'tellOthers',
			value: function tellOthers(message) {
				var me = this;
				var state = me.state;
				var WS = me.WS;
	
				if (state.ready) {
					WS.send(JSON.stringify({ to: 'others', val: message }));
				} else {};
			}
		}, {
			key: 'tellThesys',
			value: function tellThesys(message) {
				var me = this;
				var state = me.state;
				var WS = me.WS;
	
				if (state.ready) {
					WS.send(JSON.stringify({ to: 'thesys', val: message }));
				} else {};
			}
		}]);
	
		return Websocket;
	}(Events);
	
	;
	
	// 接口
	module.exports = Websocket;

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events) this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler)) return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;
	
	  if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	  if (!this._events) this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type]) return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0) return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;
	
	  if (!this._events) return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map