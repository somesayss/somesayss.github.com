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

	module.exports = __webpack_require__(75);


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
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
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
/* 18 */
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
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	var Actions = __webpack_require__(27);
	
	module.exports = function (Wrapper, Class) {
		var WrapperComponent = function (_React$Component) {
			_inherits(WrapperComponent, _React$Component);
	
			function WrapperComponent() {
				_classCallCheck(this, WrapperComponent);
	
				var _this = _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).apply(this, arguments));
	
				var me = _this;
				var __controller__ = void 0;
				__controller__ = me.__controller__ = new Class(me.props);
				__controller__.com = me;
				__controller__.props = me.getPerProps(me.props);
				me.state = limit.assignSuper({}, __controller__.getInitialState(), me.props);
				me.state.actionId = me.state.actionId || 'uaid' + limit.getUid();
				me.state.actionUUid = __controller__.Actions.uuid = 'uuid' + limit.getUid();
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
					// 如果是外部传入的属性全量更新
					if (me.propsFromOther) {
						limit.assignSuper(me.state, props);
					};
					me.__controller__.props = me.getPerProps(props);
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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
	
	Actions.getAll = function (id) {
		if (limit.isObjectSuper(id)) {
			id = id.props.actionId || id.state.actionId;
		} else {
			id = limit.toString(id);
		};
		var pool = ActionsPool[id];
		return pool;
	};
	
	Actions.get = function (id) {
		var pool = Actions.getAll(id);
		if (pool) {
			if (limit.isObjectSuper(id) && (id.props.actionUUid || id.state.actionUUid)) {
				var _ret = function () {
					var actionUUid = id.props.actionUUid || id.state.actionUUid;
					var action = null;
					pool.some(function (val) {
						action = val;
						return val.uuid === actionUUid;
					});
					return {
						v: action
					};
				}();
	
				if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
			} else {
				if (pool.length === 1) {
					return pool[0];
				} else {
					return pool;
				};
			};
		};
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
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
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
				var me = this;
				var Actions = me.Actions = {};
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
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(26)(__webpack_require__(49), __webpack_require__(52));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(50);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
				var refs = me.refs;
				var props = me.props;
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
				var refs = me.refs;
				var props = me.props;
				var node = refs.node;
	
				var bodyHeight = Math.max(document.body.offsetHeight, window.innerHeight);
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
				var refs = me.refs;
				var props = me.props;
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

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(51);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit_title {\n  position: fixed;\n  top: -9999px;\n  left: -9999px;\n  z-index: 999;\n  background: #F2F2F2;\n  padding: 5px;\n  color: #666;\n}\n", ""]);
	
	// exports


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Control = __webpack_require__(32);
	
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
		diffY: 10,
		width: 300
	};
	;
	
	module.exports = Controller;

/***/ },
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 组件类
	
	var Layout = __webpack_require__(76);
	var Body = __webpack_require__(83);
	
	// 置入文档
	ReactDOM.render(React.createElement(
		Layout,
		null,
		React.createElement(Body, null)
	), document.getElementById('container'));

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(26)(__webpack_require__(77), __webpack_require__(82));

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(78);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	var Header = __webpack_require__(80);
	var Footer = __webpack_require__(81);
	var titleWidget = __webpack_require__(125);
	
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
			}
		}]);
	
		return Layout;
	}(React.Component);
	
	;
	
	module.exports = Layout;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(79);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(78);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	
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
							'我们不产生数据，我们只是互联网的搬运工',
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

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(78);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	
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

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var $ = __webpack_require__(3);
	var React = __webpack_require__(23);
	var Control = __webpack_require__(32);
	var limit = __webpack_require__(4);
	
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
						localStorage.scrollTop = WIN.scrollY;
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

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(26)(__webpack_require__(84), __webpack_require__(105));

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(85);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	
	var Info = __webpack_require__(87);
	var List = __webpack_require__(93);
	var Page = __webpack_require__(95);
	var Filter = __webpack_require__(100);
	
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
									'找不到，我也很绝望啊'
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

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(86);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(85);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	var KeySearch = __webpack_require__(88);
	
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
						'我已经看过',
						React.createElement(
							'span',
							{ className: 'ch-num' },
							num
						),
						'部电影'
					),
					React.createElement(
						'div',
						{ className: 'thetop-info fn-MT10 thetop-search' },
						'我想找：',
						React.createElement(KeySearch, { width: '320', placeholder: '请输入电影名字' })
					)
				);
			}
		}]);
	
		return Info;
	}(React.Component);
	
	;
	
	module.exports = Info;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(26)(__webpack_require__(89), __webpack_require__(92));

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(90);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	
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
						onInput: Actions(me).input,
						onKeyDown: Actions(me).keydown,
						value: props.value }),
					React.createElement(
						'span',
						{ className: 'ch-enter', style: { lineHeight: props.height - 10 + 'px' }, onClick: Actions(me).search },
						'↵'
					)
				);
			}
		}]);
	
		return KeySearch;
	}(React.Component);
	
	;
	
	module.exports = KeySearch;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(91);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, ".key-search {\n  display: inline-block;\n  position: relative;\n  border: 1px solid #CCC;\n  padding: 5px 20px 5px 5px;\n}\n.key-search input {\n  float: left;\n  border: none;\n  color: #666;\n  font-size: 12px;\n  width: 100%;\n  height: 100%;\n}\n.key-search .ch-enter {\n  float: right;\n  margin-right: -15px;\n}\n", ""]);
	
	// exports


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(4);
	var Control = __webpack_require__(32);
	
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

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(85);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	var Image = __webpack_require__(94);
	
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
										{ href: 'javascript:;', className: 'ch-btn', onClick: Actions(me).copy.bind(me, val.name) },
										'复制名称'
									),
									React.createElement(
										'a',
										{ href: 'javascript:;', className: 'ch-btn', onClick: Actions(me).hideIt.bind(me, val) },
										'看过'
									)
								) : React.createElement(
									'span',
									null,
									React.createElement(
										'a',
										{ href: 'javascript:;', className: 'ch-btn ch-btn-gray', onClick: Actions(me).copy.bind(me, val.name) },
										'复制名称'
									),
									React.createElement(
										'a',
										{ href: 'javascript:;', className: 'ch-btn ch-btn-gray', onClick: Actions(me).showIt.bind(me, val) },
										'想看'
									)
								),
								React.createElement('br', null),
								'导演：',
								val.actor,
								React.createElement('br', null),
								val.director ? React.createElement(
									'span',
									null,
									'演员：',
									val.director,
									React.createElement('br', null)
								) : void 0,
								'时间：',
								val.year,
								' 类型：',
								val.type,
								' 国家：',
								val.area
							),
							val.thunder ? React.createElement(
								'div',
								{ className: 'ch-download' },
								val.thunder.split(',').map(function (val, key) {
									var title = '点击复制资源地址[' + val + ']';
									return React.createElement(
										'a',
										{ key: key,
											href: 'javascript:;',
											title: title,
											onClick: Actions(me).copy.bind(me, val) },
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

/***/ },
/* 94 */
/***/ function(module, exports) {

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
				opacity: 0
			};
	
			var me = _this;
			return _this;
		}
	
		_createClass(Image, [{
			key: "render",
			value: function render() {
				var me = this;
				var props = me.props;
				var state = me.state;
	
				return React.createElement("img", _extends({}, props, { onLoad: me.onload.bind(me), style: { opacity: state.opacity } }));
			}
		}, {
			key: "onload",
			value: function onload() {
				var me = this;
				var state = me.state;
	
				state.opacity = 1;
				me.setState(state);
			}
		}]);
	
		return Image;
	}(React.Component);
	
	;
	
	module.exports = Image;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(26)(__webpack_require__(96), __webpack_require__(99));

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(97);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	
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
					{ className: 'react-page' },
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
	
	module.exports = Page;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(98);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, ".react-page a {\n  padding: 2px 5px;\n  background: #CCC;\n  margin: 2px;\n}\n.react-page a:hover {\n  background: #F30;\n}\n.react-page .active {\n  background: #F00;\n}\n", ""]);
	
	// exports


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var $ = __webpack_require__(3);
	var React = __webpack_require__(23);
	var Control = __webpack_require__(32);
	var limit = __webpack_require__(4);
	
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
				var state = me.state;
				var props = me.props;
	
				state.page = page;
				me.updateComponent().then(props.onChangePage.bind(me, page));
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		// 总页数
		totle: 0,
		// 偏差值
		diff: 2,
		// 抛出接口
		onChangePage: limit.K,
		actionId: 'page'
	};
	Controller.propTypes = {
		onChangePage: React.PropTypes.func
	};
	;
	
	module.exports = Controller;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(26)(__webpack_require__(101), __webpack_require__(104));

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(102);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	
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
					parseWord = '：' + selectWord;
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
							'×'
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

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(103);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, ".thetop-filter {\n  z-index: 3;\n  position: relative;\n  float: left;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);\n}\n.thetop-filter:hover {\n  z-index: 4;\n}\n.thetop-filter:hover ul {\n  display: block;\n}\n.thetop-filter h2 {\n  padding: 8px;\n  position: relative;\n  z-index: 6;\n  background: #FFF;\n  color: #999;\n}\n.thetop-filter h2 .ch-remove {\n  padding: 0 2px;\n  margin-left: 5px;\n}\n.thetop-filter ul {\n  z-index: 1;\n  position: absolute;\n  background: #FFF;\n  padding: 10px;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n  top: 30px;\n  left: 0;\n  width: 350px;\n  display: none;\n}\n.thetop-filter ul a {\n  display: inline-block;\n  position: relative;\n  margin: 0 5px;\n  border-bottom-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.thetop-filter ul .ch-chose {\n  background: #999;\n  color: #FFF;\n}\n.thetop-filter ul li {\n  display: inline-block;\n  padding: 2px 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(4);
	var React = __webpack_require__(23);
	var Control = __webpack_require__(32);
	
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
				var state = me.state;
				var props = me.props;
	
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
				var state = me.state;
				var props = me.props;
	
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
		defaultWord: ['2016']
	};
	;
	
	module.exports = Controller;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var $ = __webpack_require__(3);
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	var Control = __webpack_require__(32);
	var Ajax = __webpack_require__(106);
	var Copy = __webpack_require__(119);
	var Dialog = __webpack_require__(107);
	
	var guid = 0;
	
	var Controller = function (_Control) {
		_inherits(Controller, _Control);
	
		function Controller() {
			_classCallCheck(this, Controller);
	
			var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));
	
			_this.state = {
				totle: 100,
				number: 10,
				page: 1,
				list: [],
				filterMap: {
					// '电影': {
					// '年份': ['2012', '2013', '2014', '2015', '2016'],
					// '类型': ['喜剧', '剧情', '战争'],
					// '国家': ['中国大陆', '美国']
					// }
				},
				filter: {},
				filterName: '',
				focus: '电影'
			};
	
			var me = _this;
			var state = me.state;
	
			if (localStorage.page) {
				state.page = localStorage.page;
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
					state.filter = limit.keys(filter).length ? filter : limit.map(state.filterMap, function (val, key) {
						return limit.map(val, function () {
							return [];
						});
					});
				});
			}
		}, {
			key: 'onInputFilterName',
			value: function onInputFilterName(val) {
				var me = this;
				var state = me.state;
	
				state.page = 1;
				state.filterName = val;
				me.onSearchList();
			}
		}, {
			key: 'onSearchList',
			value: function onSearchList() {
				var me = this;
				var state = me.state;
				var props = me.props;
	
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
				var filterName = state.filterName;
				return { start: start, number: number, filterMap: filterMap, filterName: filterName };
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
			value: function onCopy(val) {
				try {
					new Copy({ text: val });
					Dialog.success('成功复制:' + val, { hasCover: false, timeout: 1000 });
				} catch (e) {
					Dialog.error('复制失败');
				};
			}
		}, {
			key: 'onZoomIn',
			value: function onZoomIn(val) {
				var dia = new Dialog({
					width: 'auto',
					height: 'auto',
					className: 'imgview'
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

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(4);
	var DialogWidget = __webpack_require__(107);
	
	var Ajax = function () {
		function Ajax(config) {
			_classCallCheck(this, Ajax);
	
			this.props = {
				url: '',
				cache: false,
				data: {},
				dataType: 'json',
				timeout: 5000,
				type: 'GET',
				theMethod: 1 // one two three
			};
			this.state = {};
	
			var me = this;
			limit.assign(me.state, me.props, config);
			return me['theMethod' + me.state.theMethod]();
		}
	
		_createClass(Ajax, [{
			key: 'theMethod0',
			value: function theMethod0() {
				var me = this;
				return me.jQuertAjax();
			}
		}, {
			key: 'theMethod1',
			value: function theMethod1() {
				var me = this;
				var dialogExp = DialogWidget.loading();
				return me.jQuertAjax().then(function (val) {
					if (val.hasError) {
						throw val.message;
					} else {
						return val.content;
					};
				}).then(function (val) {
					dialogExp.destroy();
					return val;
				}, function (e) {
					dialogExp.destroy();
					DialogWidget.error('请求数据错误，请稍后再试');
					throw e;
				});
			}
		}, {
			key: 'jQuertAjax',
			value: function jQuertAjax() {
				var me = this;
				return new Promise(function (s, j) {
					$.ajax(me.state).then(s, j);
				});
			}
		}]);
	
		return Ajax;
	}();
	
	module.exports = Ajax;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(4);
	var originClass = __webpack_require__(108);
	var Widget = __webpack_require__(113);
	
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
					React.createElement(
						'i',
						{ className: 'ch-logo' },
						'√'
					),
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
					React.createElement(
						'span',
						{ className: 'ch-logo' },
						'×'
					),
					info || '操作失败'
				));
			}
		}]);
	
		return originWidget;
	}(Widget);
	
	originWidget.originClass = originClass;
	;
	
	module.exports = originWidget;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(26)(__webpack_require__(109), __webpack_require__(118));

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(110);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	var Cover = __webpack_require__(112);
	
	// 组件类
	
	var Dialog = function (_React$Component) {
		_inherits(Dialog, _React$Component);
	
		function Dialog() {
			_classCallCheck(this, Dialog);
	
			return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
		}
	
		_createClass(Dialog, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				var styleKeys = ['top', 'marginLeft', 'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight'];
				var style = limit.filter(props, function (val, key) {
					return limit.contains(styleKeys, key);
				});
				return React.createElement(
					'div',
					{ className: props.className },
					React.createElement(
						'div',
						{ className: 'react-dialog', ref: 'dialog', style: style },
						React.createElement(
							'a',
							{ href: 'javascript:;', className: 'ch-close', onClick: me.closeDialog.bind(me) },
							'×'
						),
						props.children
					),
					props.hasCover ? React.createElement(Cover, { opacity: props.opacity }) : void 0
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				var props = me.props;
	
				Actions(me).setCenter();
				if (props.timeout) {
					setTimeout(function () {
						Actions(me) && Actions(me).destroyWidget && Actions(me).destroyWidget();
					}, props.timeout);
				};
			}
		}, {
			key: 'closeDialog',
			value: function closeDialog() {
				var me = this;
				var props = me.props;
	
				Actions(me).destroyWidget && Actions(me).destroyWidget();
				props.onClose();
			}
		}]);
	
		return Dialog;
	}(React.Component);
	
	;
	
	module.exports = Dialog;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(111);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, ".react-dialog {\n  position: absolute;\n  background: #FFF;\n  top: 0px;\n  left: 50%;\n  z-index: 101;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n}\n.react-dialog .ch-close {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  padding: 0 2px;\n  color: #999;\n}\n.react-dialog .ch-close:hover {\n  background: #999;\n  color: #FFF;\n}\n@keyframes loading {\n  0% {\n    left: -20px;\n  }\n  100% {\n    left: 100%;\n  }\n}\n.widget-loading .react-cover,\n.widget-loading .react-dialog {\n  cursor: progress;\n}\n.widget-loading .react-dialog {\n  overflow: hidden;\n  box-shadow: none;\n  background: none;\n}\n.widget-loading .react-dialog .ch-close {\n  display: none;\n}\n.widget-loading .ch-load {\n  position: absolute;\n  width: 20px;\n  height: 2px;\n  background: #4285f4;\n  opacity: .8;\n  left: -20px;\n  animation: loading 1.5s ease infinite;\n}\n.widget-success {\n  color: #666;\n}\n.widget-success .ch-logo {\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  line-height: 25px;\n  border-radius: 25px;\n  background: #4285f4;\n  color: #FFF;\n  text-align: center;\n  text-indent: -4px;\n  top: 50%;\n  margin-top: -12px;\n  left: 10px;\n}\n.widget-success .ch-text {\n  line-height: 16px;\n  padding: 20px 20px 20px 40px;\n}\n.widget-error {\n  color: #666;\n}\n.widget-error .ch-logo {\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  line-height: 25px;\n  border-radius: 25px;\n  background: #4285f4;\n  color: #FFF;\n  text-align: center;\n  text-indent: -4px;\n  top: 50%;\n  margin-top: -12px;\n  left: 10px;\n}\n.widget-error .ch-text {\n  line-height: 16px;\n  padding: 20px 20px 20px 40px;\n}\n.widget-error .ch-logo {\n  text-indent: 0;\n  font-size: 16px;\n  line-height: 23px;\n  background: #ea4335;\n}\n", ""]);
	
	// exports


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Widget = __webpack_require__(113);
	var originClass = __webpack_require__(26)(__webpack_require__(114), __webpack_require__(117));
	
	var originWidget = function (_Widget) {
		_inherits(originWidget, _Widget);
	
		function originWidget(config) {
			var _this;
	
			_classCallCheck(this, originWidget);
	
			var me = (_this = _possibleConstructorReturn(this, (originWidget.__proto__ || Object.getPrototypeOf(originWidget)).call(this, config, originClass)), _this);
			return _this;
		}
	
		return originWidget;
	}(Widget);
	
	;
	
	originClass.widget = originWidget;
	module.exports = originClass;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(4);
	
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
				Actions(me.componentExp).destroyWidget = me.destroy.bind(me);
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
	
	module.exports = Widget;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(115);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(23);
	var limit = __webpack_require__(4);
	
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
					{ className: 'react-cover', style: { opacity: props.opacity, background: props.background } },
					props.children
				);
			}
		}]);
	
		return Cover;
	}(React.Component);
	
	;
	
	module.exports = Cover;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(116);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, "html {\n  height: 100%;\n}\nbody {\n  min-height: 100%;\n  position: relative;\n}\n.react-cover {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: #F00;\n  top: 0;\n  left: 0;\n  z-index: 100;\n}\n", ""]);
	
	// exports


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(4);
	var Control = __webpack_require__(32);
	
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
		actionId: 'Cover',
		opacity: .3,
		background: '#FFF'
	};
	;
	
	module.exports = Controller;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(4);
	var Control = __webpack_require__(32);
	
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
				top: 0,
				marginLeft: 0
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onSetCenter',
			value: function onSetCenter() {
				var me = this;
				var props = me.props;
				var state = me.state;
	
				var WIN = window;
				var scrollY = WIN.scrollY;
				var winHeight = WIN.innerHeight;
				var height = props.height;
				var width = props.width;
				if (!limit.isNumber(height)) {
					height = $(ReactDOM.findDOMNode(me.com)).find('.react-dialog').height();
				};
				if (!limit.isNumber(width)) {
					width = $(ReactDOM.findDOMNode(me.com)).find('.react-dialog').width();
				};
				state.top = scrollY + winHeight / 2 - height / 2;
				state.marginLeft = -width / 2;
				me.updateComponent();
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		width: 400,
		height: 200,
		actionId: 'dialog',
		onClose: limit.K,
		hasCover: true
	};
	;
	
	module.exports = Controller;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(4);
	
	var Copy = function () {
		function Copy(config) {
			_classCallCheck(this, Copy);
	
			this.props = {
				text: ''
			};
			this.state = {};
	
			var me = this;
			limit.assign(me.state, me.props, config);
			me.emoveHideArea(me.creatHideArea());
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
				me.H5copy();
				return area;
			}
		}, {
			key: 'H5copy',
			value: function H5copy() {
				document.execCommand('copy');
			}
		}, {
			key: 'IEcopy',
			value: function IEcopy(val) {
				window.clipboardData.setData('text', val);
			}
		}, {
			key: 'emoveHideArea',
			value: function emoveHideArea(area) {
				var div = document.createElement('div');
				div.appendChild(area);
				div.innerHTML = '';
				div = null;
			}
		}]);
	
		return Copy;
	}();
	
	module.exports = Copy;

/***/ },
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(4);
	var originClass = __webpack_require__(48);
	var Widget = __webpack_require__(113);
	
	var originWidget = function (_Widget) {
		_inherits(originWidget, _Widget);
	
		function originWidget() {
			_classCallCheck(this, originWidget);
	
			return _possibleConstructorReturn(this, (originWidget.__proto__ || Object.getPrototypeOf(originWidget)).apply(this, arguments));
		}
	
		return originWidget;
	}(Widget);
	
	originWidget.originClass = originClass;
	;
	
	module.exports = originWidget;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map