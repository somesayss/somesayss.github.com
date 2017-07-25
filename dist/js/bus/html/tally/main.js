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

	module.exports = __webpack_require__(168);


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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(24), __webpack_require__(53));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(25);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var domUtil = __webpack_require__(27);
	var Select = __webpack_require__(28);
	var Textarea = __webpack_require__(47);
	var File = __webpack_require__(52);
	
	var formMap = {
		number: 'text',
		submit: 'button',
		reset: 'button'
	};
	
	// 组件类
	
	var Form = function (_React$Component) {
		_inherits(Form, _React$Component);
	
		function Form() {
			_classCallCheck(this, Form);
	
			return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
		}
	
		_createClass(Form, [{
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
			key: 'parseProps',
			value: function parseProps() {
				var me = this;
				var props = me.props;
	
				var newProps = limit.filter(props, function (val, key) {
					return !limit.contains(['actionId', 'actionUUid', 'className', 'placeholder'], key);
				});
				['onFocus', 'onBlur', 'onChange'].forEach(function (val) {
					newProps[val] = function () {
						var _props$val;
	
						props[val] && (_props$val = props[val]).call.apply(_props$val, [undefined].concat(Array.prototype.slice.call(arguments)));
						var fun = Actions(me)['' + props.type + val.slice(2)];
						if (fun) {
							fun.apply(undefined, arguments);
						} else {
							var _Actions;
	
							(_Actions = Actions(me))['' + val.slice(2).toLowerCase()].apply(_Actions, arguments);
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
					Select,
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
					{ className: 'limit-form-' + me.getType() },
					props.value ? React.createElement(
						'a',
						{ href: 'javascript:;', tabIndex: '-1', className: 'ch-clear', onClick: !props.disabled ? Actions(me).clear.bind(me) : null },
						'×'
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
					React.createElement(File, me.parseProps())
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
					React.createElement('input', _extends({}, me.parseProps(), { ref: 'input' }))
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
					React.createElement(Textarea, me.parseProps())
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
				var refs = me.refs;
				var props = me.props;
				var eye = refs.eye;
				var input = refs.input;
	
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
				var eye = refs.eye;
				var input = refs.input;
	
				var validaor = props.validaor;
				if (validaor) {
					validaor.removeAllListeners(props.name + 'Validat');
					validaor.removeAllListeners(props.name + 'Reset');
				};
			}
		}, {
			key: 'selectInput',
			value: function selectInput(input) {
				if (limit.contains(['text', 'textarea', 'password'], input.type)) {
					var length = input.value.length;
					return domUtil.textSelect(input, length, length);
				} else if (limit.contains(['button', 'reset', 'submit'], input.type)) {
					input.focus();
				};
			}
		}]);
	
		return Form;
	}(React.Component);
	
	;
	
	module.exports = Form;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-form {\n  display: inline-block;\n  position: relative;\n}\n.less-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form-text {\n  border: 1px solid #CCC;\n  padding: 6px;\n  padding-right: 15px;\n  background: #FFF;\n}\n.limit-form-text input {\n  border: 0;\n  height: 16px;\n  line-height: 16px;\n  color: #666;\n  font-size: 1em;\n  width: 100%;\n  position: relative;\n  z-index: 2;\n  background: none;\n}\n.limit-form-text .ch-clear {\n  position: absolute;\n  z-index: 2;\n  width: 15px;\n  height: 16px;\n  line-height: 14px;\n  text-align: center;\n  right: 1px;\n  top: 50%;\n  margin-top: -8px;\n  color: #CCC;\n}\n.limit-form-text .ch-clear:hover {\n  color: #666;\n}\n.limit-form-text .ch-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form-password {\n  border: 1px solid #CCC;\n  padding: 6px;\n  padding-right: 15px;\n  background: #FFF;\n  padding-right: 28px;\n}\n.limit-form-password input {\n  border: 0;\n  height: 16px;\n  line-height: 16px;\n  color: #666;\n  font-size: 1em;\n  width: 100%;\n  position: relative;\n  z-index: 2;\n  background: none;\n}\n.limit-form-password .ch-clear {\n  position: absolute;\n  z-index: 2;\n  width: 15px;\n  height: 16px;\n  line-height: 14px;\n  text-align: center;\n  right: 1px;\n  top: 50%;\n  margin-top: -8px;\n  color: #CCC;\n}\n.limit-form-password .ch-clear:hover {\n  color: #666;\n}\n.limit-form-password .ch-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form-password .ch-container-eye {\n  position: absolute;\n  z-index: 2;\n  width: 10px;\n  height: 10px;\n  top: 50%;\n  margin-top: -5px;\n  right: 15px;\n  background: #FFF;\n  text-align: center;\n  border: 1px solid #CCC;\n  border-radius: 100px;\n  cursor: pointer;\n}\n.limit-form-password .ch-container-eye:hover .ch-eye {\n  background: #666;\n}\n.limit-form-password .ch-eye {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 6px;\n  background: #CCC;\n  margin-top: 1px;\n}\n.limit-form-textarea {\n  border: 1px solid #CCC;\n  padding: 6px;\n  background: #FFF;\n}\n.limit-form-textarea .ch-placeholder {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n  color: #999;\n  line-height: 16px;\n  padding: 7px;\n  padding-right: 16px;\n}\n.limit-form-textarea textarea {\n  background: transparent;\n}\n.limit-form-button input {\n  border: 1px solid #CCC;\n  background: #F2F2F2;\n  font-size: 12px;\n  padding: 0 10px;\n  height: 30px;\n  line-height: 28px;\n  width: 100%;\n  color: #666;\n}\n.limit-form-button input:active {\n  background: #DDD;\n  border-color: #BBB;\n}\n.limit-form-file input {\n  border: 1px solid #CCC;\n  background: #F2F2F2;\n  font-size: 12px;\n  padding: 0 10px;\n  height: 30px;\n  line-height: 28px;\n  width: 100%;\n  color: #666;\n}\n.limit-form-file input:active {\n  background: #DDD;\n  border-color: #BBB;\n}\n.limit-file {\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  background: #F00;\n  opacity: 0;\n  top: -999px;\n  left: -999px;\n  z-index: 99;\n}\n.limit-file input {\n  font-size: 100px;\n  opacity: 0;\n  cursor: pointer;\n}\n/*禁止*/\n.limit-form-disabled .limit-form-text,\n.limit-form-disabled .limit-form-password,\n.limit-form-disabled .limit-form-textarea {\n  background: #F2F2F2;\n}\n.limit-form-disabled .limit-form-text *,\n.limit-form-disabled .limit-form-password *,\n.limit-form-disabled .limit-form-textarea * {\n  cursor: not-allowed;\n}\n.limit-form-disabled .limit-form-submit input,\n.limit-form-disabled .limit-form-reset input,\n.limit-form-disabled .limit-form-button input {\n  color: #999;\n  cursor: not-allowed;\n}\n.limit-form-disabled .limit-form-select {\n  background: #F2F2F2;\n  color: #999;\n  cursor: not-allowed;\n}\n/*焦点*/\n.limit-form-focus.limit-form {\n  z-index: 2;\n}\n.limit-form-focus .limit-form-text,\n.limit-form-focus .limit-form-password,\n.limit-form-focus .limit-form-textarea {\n  border-color: #4285f4;\n  box-shadow: 0 0 3px rgba(66, 133, 244, 0.5);\n}\n.limit-form-focus .limit-form-text .ch-clear,\n.limit-form-focus .limit-form-password .ch-clear,\n.limit-form-focus .limit-form-textarea .ch-clear {\n  color: #4285f4;\n}\n.limit-form-focus .limit-form-text .ch-placeholder,\n.limit-form-focus .limit-form-password .ch-placeholder,\n.limit-form-focus .limit-form-textarea .ch-placeholder {\n  display: none;\n}\n.limit-form-focus .limit-form-password .ch-container-eye {\n  border-color: #4285f4;\n}\n.limit-form-focus .limit-form-password .ch-container-eye:hover .ch-eye {\n  background: #4285f4;\n}\n.limit-form-focus .limit-form-password .ch-eye {\n  background: #4285f4;\n}\n.limit-form-focus .limit-form-button input {\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);\n}\n/*错误*/\n.limit-form-error .limit-form-text,\n.limit-form-error .limit-form-password,\n.limit-form-error .limit-form-textarea {\n  border-color: #F00;\n  box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);\n}\n.limit-form-error .limit-form-text .ch-clear,\n.limit-form-error .limit-form-password .ch-clear,\n.limit-form-error .limit-form-textarea .ch-clear {\n  color: #F00;\n}\n.limit-form-error .limit-form-text .ch-placeholder,\n.limit-form-error .limit-form-password .ch-placeholder,\n.limit-form-error .limit-form-textarea .ch-placeholder {\n  color: #F00;\n}\n.limit-form-error .limit-form-password .ch-container-eye {\n  border-color: #F00;\n}\n.limit-form-error .limit-form-password .ch-container-eye:hover .ch-eye {\n  background: #F00;\n}\n.limit-form-error .limit-form-password .ch-eye {\n  background: #F00;\n}\n.limit-form-error .limit-form-select.limit-select .ch-show,\n.limit-form-error .limit-form-select.limit-select .ch-list {\n  border-color: #F00;\n  box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);\n}\n.limit-form-error .limit-form-select.limit-select:before {\n  border-color: #F00;\n}\n.limit-form-error .limit-form-select.limit-select li:hover {\n  background: #F00;\n}\n.limit-form-error .limit-form-select.limit-select .ch-san {\n  border-top-color: #F00;\n}\n.limit-form-error .ch-error-info {\n  position: absolute;\n  height: 20px;\n  line-height: 18px;\n  border: 1px solid #F00;\n  box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);\n  top: -10px;\n  right: 3px;\n  color: #F00;\n  background: #FFF;\n  padding: 0 5px;\n  z-index: 1;\n}\n", ""]);
	
	// exports


/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
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
	
	module.exports = domUtil;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(29), __webpack_require__(46));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(30);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Scroller = __webpack_require__(32);
	var Title = __webpack_require__(39);
	
	// 组件类
	
	var Select = function (_React$Component) {
		_inherits(Select, _React$Component);
	
		function Select() {
			_classCallCheck(this, Select);
	
			return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
		}
	
		_createClass(Select, [{
			key: 'getClassName',
			value: function getClassName() {
				var me = this;
				var props = me.props;
	
				var arr = ['limit-select'];
				if (props.className) {
					arr.push(props.className);
				};
				if (props.showList) {
					arr.push('limit-select-focus');
				};
				return arr.join(' ');
			}
		}, {
			key: 'getFirstSelect',
			value: function getFirstSelect() {
				var me = this;
				var props = me.props;
				var list = props.list;
	
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
			key: 'getRightHeight',
			value: function getRightHeight() {
				var me = this;
				var props = me.props;
	
				var leg = props.list.length;
				if (leg < props.size) {
					return 28 * leg;
				} else {
					return props.size * 28;
				};
			}
		}, {
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				return React.createElement(
					'div',
					{ ref: 'selectMock', className: me.getClassName(),
						style: { width: props.width } },
					React.createElement(
						'div',
						{ ref: 'selectTrigger', className: 'ch-show fn-ellipsis' },
						React.createElement('i', { className: 'ch-san' }),
						me.getFirstSelect()
					),
					React.createElement(
						'div',
						{ className: 'ch-list', ref: 'selectList' },
						React.createElement(
							Scroller,
							{ ref: 'scroller', height: me.getRightHeight(), barHeight: props.barHeight },
							React.createElement(
								'ul',
								null,
								props.list.map(function (val, key) {
									return React.createElement(
										'li',
										{ title: val.key, className: 'fn-ellipsis', key: key,
											'data-value': val.value, onClick: Actions(me).select.bind(null, val, key) },
										val.key
									);
								})
							)
						)
					)
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				var refs = me.refs;
				var props = me.props;
				var selectTrigger = refs.selectTrigger;
				var selectList = refs.selectList;
				var scroller = refs.scroller;
	
				$(selectTrigger).on('click.select', function (e) {
					e.stopPropagation();
					if (props.disabled) {
						return;
					};
					if (!me.props.showList) {
						$(document).on('click.select', function () {
							$(document).off('click.select');
							Actions(me).showList();
						});
					} else {
						$(document).off('click.select');
					};
					Actions(me).showList();
				});
				me.TitleWidget = Title.use(selectList, { className: 'limit-select-title', diffX: 15, diffY: 15 }, props.titleSize);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var me = this;
				var refs = me.refs;
				var selectTrigger = refs.selectTrigger;
	
				$(selectTrigger).off('click.select');
				me.TitleWidget.destroy();
			}
		}]);
	
		return Select;
	}(React.Component);
	
	;
	
	module.exports = Select;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-select {\n  position: relative;\n  display: inline-block;\n  color: #666;\n  cursor: pointer;\n}\n.limit-select .ch-show {\n  border: 1px solid #CCC;\n  padding: 6px;\n  height: 30px;\n  line-height: 16px;\n  padding-right: 15px;\n}\n.limit-select .ch-san {\n  transition: all 0.3s ease-in-out 0s;\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-top: 6px solid #999;\n  border-bottom: 0;\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  right: 5px;\n  top: 12px;\n}\n.limit-select .ch-list {\n  display: none;\n  position: absolute;\n  border: 1px solid #CCC;\n  border-top: none;\n  background: #FFF;\n  top: 29px;\n  width: 100%;\n  left: 0;\n}\n.limit-select .ch-list li {\n  height: 28px;\n  line-height: 28px;\n  padding: 0 6px;\n}\n.limit-select .ch-list li:hover {\n  background: #4285f4;\n  color: #FFF;\n}\n.limit-select-focus .ch-list {\n  display: block;\n  border-color: #4285f4;\n  box-shadow: 0 1px 3px rgba(66, 133, 244, 0.5);\n}\n.limit-select-focus .ch-show {\n  border-color: #4285f4;\n  box-shadow: 0 0 3px rgba(66, 133, 244, 0.5);\n}\n.limit-select-focus .ch-san {\n  transform: rotate(180deg);\n  border-top-color: #4285f4;\n}\n.limit-select-focus:before {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  bottom: 0;\n  left: 0;\n  background: #FFF;\n  border-left: 1px solid #4285f4;\n  border-right: 1px solid #4285f4;\n  z-index: 1;\n}\n.limit_title.limit-select-title {\n  max-width: 300px;\n  border: 1px solid #CCC;\n  color: #666;\n}\n", ""]);
	
	// exports


/***/ },
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(8);
	var originClass = __webpack_require__(40);
	var Widget = __webpack_require__(45);
	
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
			var limitLength = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];
	
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
				var element = me.element;
				var config = me.config;
				var limitLength = me.limitLength;
	
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

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(41), __webpack_require__(44));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(42);
	
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(43);
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit_title {\n  position: fixed;\n  top: -9999px;\n  left: -9999px;\n  z-index: 999;\n  background: #F2F2F2;\n  padding: 5px;\n  color: #666;\n}\n", ""]);
	
	// exports


/***/ },
/* 44 */
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
		actionId: 'limit_title',
		shouldComponentNotUpdate: true,
		diffX: 10,
		diffY: 10
	};
	;
	
	module.exports = Controller;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(8);
	
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
	
	module.exports = Widget;

/***/ },
/* 46 */
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
	
		function Controller(props) {
			var _temp, _this;
	
			_classCallCheck(this, Controller);
	
			var me = (_temp = (_this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this)), _this), _this.state = {
				showList: false
			}, _temp);
			me.state.list = me.parseListByChildren(props);
			return _this;
		}
	
		_createClass(Controller, [{
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
				nextState.list = me.parseListByChildren(nextState);
			}
		}, {
			key: 'onShowList',
			value: function onShowList(e) {
				var me = this;
				var state = me.state;
				var props = me.props;
	
				state.showList = !state.showList;
				me.updateComponent().then(function () {
					if (state.showList) {
						props.onFocus();
					} else {
						props.onBlur();
					};
				});
			}
		}, {
			key: 'onSelect',
			value: function onSelect(val, key) {
				var me = this;
				var props = me.props;
				var state = me.state;
	
				var targetKey = null;
				state.list.forEach(function (val, key) {
					if (targetKey == null && val.selected) {
						targetKey = key;
					};
					val.selected = false;
				});
				val.selected = true;
				if (targetKey !== null && targetKey !== key) {
					props.onChange(val.value, val.key, key);
				};
				me.updateComponent();
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		actionId: 'limitSelect',
		width: 300,
		barHeight: 50,
		titleSize: 23,
		size: 4,
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K
	};
	;
	
	module.exports = Controller;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(48), __webpack_require__(51));

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(49);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Mousemove = __webpack_require__(36);
	var ScrollerView = __webpack_require__(33);
	
	// 组件类
	
	var Scroller = function (_ScrollerView) {
		_inherits(Scroller, _ScrollerView);
	
		function Scroller() {
			_classCallCheck(this, Scroller);
	
			return _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).apply(this, arguments));
		}
	
		_createClass(Scroller, [{
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
	
		return Scroller;
	}(ScrollerView);
	
	;
	
	module.exports = Scroller;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(50);
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, ".limit-textarea textarea {\n  border: none;\n  resize: none;\n  color: #666;\n  font-size: 12px;\n  width: 100%;\n  height: 100%;\n  line-height: 16px;\n}\n", ""]);
	
	// exports


/***/ },
/* 51 */
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
				isShowScroll: true,
				value: ''
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onChange',
			value: function onChange(e) {
				var me = this;
				var state = me.state;
				var props = me.props;
	
				var value = state.value = e.target.value;
				props.onChange(value);
				me.updateComponent();
			}
		}]);
	
		return Controller;
	}(Control);
	
	Controller.defaultProps = {
		actionId: 'limitTextarea',
		height: null,
		barHeight: 50,
		rows: 10,
		onChange: limit.K
	};
	;
	
	module.exports = Controller;

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";
	
	// const FilesDrop = require('modules/filesdrop/index');
	
	// 组件类
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var File = function (_React$Component) {
		_inherits(File, _React$Component);
	
		function File() {
			_classCallCheck(this, File);
	
			return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).apply(this, arguments));
		}
	
		_createClass(File, [{
			key: "render",
			value: function render() {
				var me = this;
				return React.createElement("input", _extends({
					ref: "file",
					onMouseEnter: me.mouseEnter.bind(me)
				}, me.props, { type: "button" }));
			}
		}, {
			key: "mouseEnter",
			value: function mouseEnter() {
				var me = this;
				var refs = me.refs;
				var file = refs.file;
	
				var offset = $(file).offset();
				var node = me.tempNode;
				node.style.top = offset.top + "px";
				node.style.left = offset.left + "px";
				node.style.width = file.offsetWidth + "px";
				node.style.height = file.offsetHeight + "px";
			}
		}, {
			key: "mouseLeave",
			value: function mouseLeave() {
				var me = this;
				me.tempNode.style.top = '-999px';
				me.tempNode.style.left = '-999px';
			}
		}, {
			key: "change",
			value: function change(e) {
				var me = this;
				limit.cb(me.props.onChange)(e);
			}
		}, {
			key: "createForm",
			value: function createForm() {
				var me = this;
				return React.createElement(
					"form",
					{ onMouseLeave: me.mouseLeave.bind(me) },
					React.createElement("input", { type: "file", onChange: me.change.bind(me) })
				);
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				var me = this;
				var refs = me.refs;
				var props = me.props;
				var file = refs.file;
				// 创建点击文件上传
	
				var node = me.tempNode = document.createElement('div');
				node.className = 'limit-file';
				document.body.appendChild(node);
				ReactDOM.render(me.createForm(), node);
				// 创建拖拽文件上传
				// let nodeDrop = me.tempNodeDrop = document.createElement('div');
				// document.body.appendChild(nodeDrop);
				// nodeDrop.className = 'limit-file-drop';
				// ReactDOM.render(
				// 	<FilesDrop onDrop={props.onDrop} />,
				// 	nodeDrop
				// );
			}
		}, {
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				var me = this;
				ReactDOM.unmountComponentAtNode(me.tempNode);
				// ReactDOM.unmountComponentAtNode(me.tempNodeDrop);
				var clearDiv = document.createElement('div');
				clearDiv.appendChild(me.tempNode);
				// clearDiv.appendChild(me.tempNodeDrop);
				clearDiv.innerHTML = '';
				clearDiv = null;
			}
		}]);
	
		return File;
	}(React.Component);
	
	;
	
	module.exports = File;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Control = __webpack_require__(38);
	
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
				textareaWidth: 300,
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
				var state = me.state;
				var props = me.props;
	
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
				state.value = value;
				if (value) {
					me.updateOriginData(value);
					me.updateComponent().then(function () {
						props.validaor && props.validaor.emit(props.name + 'Validat');
					});
				} else {
					me.onClear();
				};
			}
		}, {
			key: 'onFocus',
			value: function onFocus() {
				var me = this;
				var state = me.state;
	
				state.focus = true;
				me.updateComponent();
			}
		}, {
			key: 'onBlur',
			value: function onBlur() {
				var me = this;
				var state = me.state;
	
				state.focus = false;
				me.updateComponent();
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
				var state = me.state;
				var props = me.props;
	
				state.value = '';
				state.clearSuccess = true;
				state.validaorError = null;
				// 更新数据源数据
				me.updateOriginData('');
				me.updateComponent().then(function () {
					state.clearSuccess = false;
				});
			}
		}, {
			key: 'updateOriginData',
			value: function updateOriginData(val) {
				var me = this;
				var state = me.state;
				var props = me.props;
	
				var validaor = props.validaor;
				if (validaor && limit.isDefined(validaor.getData(props.name))) {
					validaor.addData(props.name, val);
				};
			}
		}, {
			key: 'onComDidMount',
			value: function onComDidMount() {
				var me = this;
				var state = me.state;
				var props = me.props;
	
				var validaor = props.validaor;
				if (validaor && props.name) {
					(function () {
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
					})();
				};
			}
		}]);
	
		return Controller;
	}(Control);
	
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
	
	module.exports = Controller;

/***/ },
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(59), __webpack_require__(67));

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(60);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(16);
	var limit = __webpack_require__(8);
	var Cover = __webpack_require__(62);
	
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
							'×'
						),
						props.children
					),
					props.hasCover ? React.createElement(Cover, { opacity: props.opacity, onClick: props.onClickCover }) : void 0
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
				var props = me.props;
				var refs = me.refs;
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
	
	module.exports = Dialog;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(61);
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, ".react-dialog {\n  position: absolute;\n  background: #FFF;\n  top: 0px;\n  left: 50%;\n  z-index: 101;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n}\n.react-dialog .ch-close {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  padding: 0 2px;\n  color: #999;\n}\n.react-dialog .ch-close:hover {\n  background: #999;\n  color: #FFF;\n}\n@keyframes loading {\n  0% {\n    left: -20px;\n  }\n  100% {\n    left: 100%;\n  }\n}\n.widget-loading .react-cover,\n.widget-loading .react-dialog {\n  cursor: progress;\n}\n.widget-loading .react-dialog {\n  overflow: hidden;\n  box-shadow: none;\n  background: none;\n}\n.widget-loading .react-dialog .ch-close {\n  display: none;\n}\n.widget-loading .ch-load {\n  position: absolute;\n  width: 20px;\n  height: 2px;\n  background: #4285f4;\n  opacity: .8;\n  left: -20px;\n  animation: loading 1.5s ease infinite;\n}\n.widget-success {\n  color: #666;\n}\n.widget-success .ch-logo {\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  line-height: 25px;\n  color: #4285f4;\n  text-align: right;\n  text-indent: -4px;\n  top: 50%;\n  margin-top: -12px;\n  left: 10px;\n  overflow: hidden;\n  font-size: 25px;\n}\n.widget-success .ch-text {\n  line-height: 16px;\n  padding: 20px 20px 20px 40px;\n}\n.widget-error {\n  color: #666;\n}\n.widget-error .ch-logo {\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  line-height: 25px;\n  color: #4285f4;\n  text-align: right;\n  text-indent: -4px;\n  top: 50%;\n  margin-top: -12px;\n  left: 10px;\n  overflow: hidden;\n  font-size: 25px;\n}\n.widget-error .ch-text {\n  line-height: 16px;\n  padding: 20px 20px 20px 40px;\n}\n.widget-error .ch-logo {\n  text-indent: 0;\n  color: #ea4335;\n}\n.widget-confirm .ch-layout {\n  color: #666;\n  padding: 0 15px 15px;\n}\n.widget-confirm .ch-head {\n  height: 30px;\n  line-height: 30px;\n  border-bottom: 1px solid #CCC;\n}\n.widget-confirm .ch-body {\n  padding: 10px;\n}\n.widget-confirm .ch-foot {\n  text-align: center;\n}\n", ""]);
	
	// exports


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Widget = __webpack_require__(45);
	var originClass = __webpack_require__(15)(__webpack_require__(63), __webpack_require__(66));
	
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(64);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 依赖
	var React = __webpack_require__(16);
	var limit = __webpack_require__(8);
	
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

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(65);
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, "html {\n  height: 100%;\n}\nbody {\n  min-height: 100%;\n  position: relative;\n}\n.react-cover {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: #F00;\n  top: 0;\n  left: 0;\n  z-index: 100;\n}\n", ""]);
	
	// exports


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(8);
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
		actionId: 'Cover',
		opacity: .3,
		background: '#FFF'
	};
	;
	
	module.exports = Controller;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(8);
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
	
	module.exports = Controller;

/***/ },
/* 68 */,
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var limit = __webpack_require__(8);
	var DialogWidget = __webpack_require__(70);
	
	var Ajax = function () {
		function Ajax(config) {
			_classCallCheck(this, Ajax);
	
			this.props = {
				url: '',
				cache: false,
				dataName: '',
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
					DialogWidget.error(e);
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
	
		return Ajax;
	}();
	
	module.exports = Ajax;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var limit = __webpack_require__(8);
	var originClass = __webpack_require__(58);
	var Input = __webpack_require__(23);
	var Widget = __webpack_require__(45);
	
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
							'提示'
						),
						React.createElement(
							'div',
							{ className: 'ch-body' },
							info
						),
						React.createElement(
							'div',
							{ className: 'ch-foot' },
							React.createElement(Input, { type: 'button',
								value: '确 定',
								focus: 'focus',
								onClick: function onClick() {
									resolve('sure');dialog.destroy();
								} }),
							React.createElement(Input, { type: 'button', value: '取 消', onClick: function onClick() {
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
							'提示'
						),
						React.createElement(
							'div',
							{ className: 'ch-body fn-wrap' },
							info
						),
						React.createElement(
							'div',
							{ className: 'ch-foot' },
							React.createElement(Input, { type: 'button',
								focus: 'focus',
								value: '确 定',
								onClick: function onClick() {
									resolve('sure');dialog.destroy();
								} })
						)
					));
				});
			}
		}]);
	
		return originWidget;
	}(Widget);
	
	originWidget.originClass = originClass;
	;
	
	module.exports = originWidget;

/***/ },
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
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
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
/* 132 */
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
				var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
				var me = this;
				var props = me.props;
				var className = props.className;
	
				var classNameArr = [name];
				if (className) {
					classNameArr.push(className);
				};
				return classNameArr.join(' ');
			}
		}]);
	
		return Component;
	}(React.Component);
	
	;
	
	module.exports = Component;

/***/ },
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
/* 154 */,
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 组件类
	
	var _index = __webpack_require__(169);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 置入文档
	ReactDOM.render(React.createElement(_index2.default, null), document.getElementById('container'));

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	module.exports = __webpack_require__(15)(__webpack_require__(170), __webpack_require__(173));

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(171);
	
	var _component = __webpack_require__(132);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _index = __webpack_require__(23);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _widget = __webpack_require__(70);
	
	var _widget2 = _interopRequireDefault(_widget);
	
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
					{ className: me.getClassName('tally') },
					React.createElement(
						'div',
						{ className: 'tally-filter' },
						'筛选：'
					),
					React.createElement(
						'div',
						{ className: 'tally-table fn-MT5' },
						React.createElement(
							'table',
							{ width: '800' },
							React.createElement(
								'thead',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ width: '30', className: 'tally-table-edit fn-TAC' },
										React.createElement('button', { className: 'limitIcon iconfont icon-add',
											onClick: Actions(me).add })
									),
									React.createElement(
										'td',
										{ width: '100' },
										'类别'
									),
									React.createElement(
										'td',
										{ width: '100' },
										'金额'
									),
									React.createElement(
										'td',
										{ width: '100' },
										'日期'
									),
									React.createElement(
										'td',
										null,
										'说明'
									),
									React.createElement(
										'td',
										{ width: '70' },
										'操作'
									)
								)
							),
							React.createElement(
								'tbody',
								null,
								props.list.map(function (val, key) {
									return React.createElement(
										'tr',
										{ key: key, onDoubleClick: Actions(me).edit.bind(null, val) },
										React.createElement(
											'td',
											{ className: 'fn-TAC' },
											key + 1
										),
										me.renderName(val),
										me.renderMuch(val),
										me.renderTime(val),
										me.renderInfo(val),
										me.renderEdit(val)
									);
								}),
								!props.list.length ? React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										' '
									),
									React.createElement(
										'td',
										{ colSpan: '5' },
										'没有数据'
									)
								) : void 0
							)
						)
					)
				);
			}
		}, {
			key: 'renderName',
			value: function renderName(val) {
				return val.isEdit ? React.createElement(
					'td',
					{ className: 'tally-table-edit' },
					React.createElement('input', { type: 'text',
						ref: 'input',
						onChange: Actions(this).change.bind(null, val, 'name'),
						value: val.name })
				) : React.createElement(
					'td',
					null,
					val.name
				);
			}
		}, {
			key: 'renderMuch',
			value: function renderMuch(val) {
				return val.isEdit ? React.createElement(
					'td',
					{ className: 'tally-table-edit' },
					React.createElement(
						'div',
						{ className: 'tally-table-shuozhi' },
						React.createElement(
							'i',
							{ className: 'tally-table-shuozhi-in ' + (val.much >= 0 ? 'active' : '') },
							'收'
						),
						React.createElement(
							'i',
							{ className: 'tally-table-shuozhi-out ' + (val.much < 0 ? 'active' : '') },
							'支'
						),
						React.createElement('input', { type: 'text',
							style: { textAlign: 'right' },
							onChange: Actions(this).change.bind(null, val, 'much'),
							value: val.much })
					)
				) : React.createElement(
					'td',
					{ className: 'tally-table-much ' + (val.much < 0 ? 'tally-table-deficit' : 'tally-table-surplus') },
					val.much > 0 ? '+' : null,
					limit.thousandSeparator(val.much)
				);
			}
		}, {
			key: 'renderTime',
			value: function renderTime(val) {
				return val.isEdit ? React.createElement(
					'td',
					{ className: 'tally-table-edit' },
					React.createElement('input', { type: 'text',
						onChange: Actions(this).change.bind(null, val, 'time'),
						value: val.time })
				) : React.createElement(
					'td',
					null,
					val.time
				);
			}
		}, {
			key: 'renderInfo',
			value: function renderInfo(val) {
				return val.isEdit ? React.createElement(
					'td',
					{ className: 'tally-table-edit' },
					React.createElement('input', { type: 'text',
						onChange: Actions(this).change.bind(null, val, 'info'),
						value: val.info })
				) : React.createElement(
					'td',
					null,
					val.info
				);
			}
		}, {
			key: 'renderEdit',
			value: function renderEdit(val) {
				var me = this;
				return React.createElement(
					'td',
					null,
					val.isEdit ? React.createElement(
						'span',
						null,
						val.isLoading ? React.createElement('button', { className: 'limitIcon iconfont icon-refresh loading fn-MR5', disabled: 'disabled' }) : React.createElement('button', { className: 'limitIcon iconfont icon-save fn-MR5',
							onClick: Actions(me).save.bind(null, val) })
					) : React.createElement(
						'span',
						null,
						React.createElement('button', { className: 'limitIcon iconfont icon-edit fn-MR5',
							onClick: Actions(me).edit.bind(null, val) }),
						val.isLoading ? React.createElement('button', { className: 'limitIcon iconfont icon-refresh loading', disabled: 'disabled' }) : React.createElement('button', { className: 'limitIcon iconfont icon-delete', onClick: Actions(me).dele.bind(null, val) })
					)
				);
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				var me = this;
				var refs = me.refs;
				var input = refs.input;
	
				if (input) {};
				console.log(this.refs.input);
			}
		}]);
	
		return Tally;
	}(_component2.default);
	
	;
	
	module.exports = Tally;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(172);
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(21)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n  background: #FCFCFC;\n  color: #666;\n}\n.tally .tally-filter {\n  padding: 10px 0px;\n  margin: 0 10px;\n  border-bottom: 1px solid #CCC;\n}\n.tally .tally-table {\n  padding: 10px;\n}\n.tally .tally-table .tally-table-much {\n  text-align: right;\n}\n.tally .tally-table .tally-table-deficit {\n  color: #F00;\n}\n.tally .tally-table .tally-table-surplus {\n  color: #4285f4;\n}\n.tally .tally-table .tally-table-edit {\n  padding: 0;\n}\n.tally .tally-table .tally-table-shuozhi {\n  position: relative;\n  padding-left: 16px;\n  text-align: center;\n  line-height: 16px;\n}\n.tally .tally-table .tally-table-shuozhi i {\n  position: absolute;\n  font-style: normal;\n  height: 14px;\n  width: 14px;\n  line-height: 10px;\n  top: 1px;\n  color: #4285f4;\n  background: #FFF;\n  border-radius: 3px;\n  padding-top: 2px;\n}\n.tally .tally-table .tally-table-shuozhi i.active {\n  background: #4285f4;\n  color: #FFF;\n}\n.tally .tally-table .tally-table-shuozhi .tally-table-shuozhi-in {\n  left: 1px;\n}\n.tally .tally-table .tally-table-shuozhi .tally-table-shuozhi-out {\n  left: 1px;\n  top: 16px;\n  color: #F00;\n}\n.tally .tally-table .tally-table-shuozhi .tally-table-shuozhi-out.active {\n  background: #F00;\n  color: #FFF;\n}\n.tally .tally-table input {\n  width: 100%;\n  border: none;\n  height: 32px;\n  font-size: 12px;\n  color: #666;\n  padding: 0 10px;\n}\n.tally .tally-table td {\n  line-height: 22px;\n  padding: 5px 10px;\n  border: 1px solid #CCC;\n  vertical-align: middle;\n}\n.tally .tally-table tbody tr:hover,\n.tally .tally-table tbody tr:focus {\n  background: #FFF;\n}\n", ""]);
	
	// exports


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _control = __webpack_require__(38);
	
	var _control2 = _interopRequireDefault(_control);
	
	var _index = __webpack_require__(69);
	
	var _index2 = _interopRequireDefault(_index);
	
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
				list: [{
					name: '早饭',
					much: -4,
					time: '2017-07-17'
				}, {
					name: '中饭',
					much: 5,
					time: '2017-07-17'
				}, {
					name: '晚饭',
					much: 6,
					time: '2017-07-17'
				}]
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Controller, [{
			key: 'onEdit',
			value: function onEdit(val) {
				var me = this;
				var state = me.state;
				var list = state.list;
	
				list.forEach(function (val) {
					return val.isEdit = false;
				});
				val.isEdit = true;
				me.updateComponent();
			}
		}, {
			key: 'onDele',
			value: function onDele(val) {
				var me = this;
				var state = me.state;
				var list = state.list;
	
				val.isLoading = true;
				me.updateComponent().then(function () {
					return new _index2.default();
				}).then(function () {
					limit.remove(list, val);
					return me.updateComponent();
				});
			}
		}, {
			key: 'onChange',
			value: function onChange(val, key, e) {
				var me = this;
				val[key] = e.target.value;
				me.updateComponent();
			}
		}, {
			key: 'onSave',
			value: function onSave(val) {
				var me = this;
				val.isLoading = true;
				me.updateComponent().then(function () {
					return new _index2.default();
				}).then(function () {
					val.isLoading = false;
					val.isEdit = false;
					return me.updateComponent();
				});
			}
		}, {
			key: 'onAdd',
			value: function onAdd() {
				var me = this;
				var state = me.state;
				var list = state.list;
	
				list.forEach(function (val) {
					return val.isEdit = false;
				});
				list.push({
					name: '',
					much: null,
					time: '',
					isEdit: true
				});
				me.updateComponent();
			}
		}]);
	
		return Controller;
	}(_control2.default);
	
	;
	
	module.exports = Controller;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map