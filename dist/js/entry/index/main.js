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
/******/ 		22: 0
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
/******/ 		script.src = __webpack_require__.p + "js/" + ({"0":"bus/notFound","1":"bus/noPermission","2":"bus/mobile/page3","3":"bus/mobile/page2","4":"bus/mobile/page1","5":"bus/login","6":"bus/foolui/inputText/index","7":"bus/tally/index","8":"bus/foolui/inputButton/index","9":"bus/checkbox/index","10":"bus/validator/index","11":"bus/antForm/index","12":"bus/showImg/index","13":"bus/foolui/index/index","14":"bus/videoCamera/index","15":"bus/test3/index","16":"bus/test2/index/index","17":"bus/test1/index","18":"bus/foolui/table/index","19":"bus/foolui/pre/index","20":"bus/foolui/logo/index","21":"bus/calendar/index"}[chunkId]||chunkId) + ".js";
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
/******/ 	__webpack_require__.p = "http://localhost:3000/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
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
/***/ (function(module, exports) {

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
	if(typeof DEBUG !== "undefined" && DEBUG) {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
			value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = __webpack_require__(6);

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
									me.state = limit.assign({}, __controller__.getInitialState(), clearProps);
									__controller__.props = me.getPerProps(clearProps);
									__controller__.state = me.getPerState(me.state);
									me.state.actionId = me.getActionId(Class);
									me.state.actionUUid = __controller__.Actions.actionUUid = "uuid" + limit.getUid();
									if (props.actionCid) {
												me.state.actionCid = __controller__.Actions.actionCid = props.actionCid;
									};
									_actions2["default"].set(me.state.actionId, __controller__.Actions);
									return _this;
						}

						_createClass(WrapperComponent, [{
									key: "getActionId",
									value: function getActionId(Class) {
												var me = this;
												return Class.defaultProps && Class.defaultProps.actionId || "uaid" + limit.getUid();
									}
						}, {
									key: "getPerProps",
									value: function getPerProps(props) {
												var me = this;
												var outProps = {};
												limit.each(me.clearProps(Class.defaultProps), function (val, key) {
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
												return newProps;
									}
						}, {
									key: "componentWillUpdate",
									value: function componentWillUpdate(props) {
												var me = this;
												var __controller__ = me.__controller__;
												// 如果是外部传入的属性全量更新
												// if( me.propsFromOther ){
												// 	me.nextState = limit.assign({}, me.state, me.clearProps(props));
												// 	limit.cb(__controller__.componentWillUpdate).call(__controller__, me.nextState);
												// 	__controller__.state = me.getPerState(me.nextState);
												// 	__controller__.props = me.getPerProps(me.nextState);
												// }else{
												// 	delete me.nextState;
												// };

												if (me.propsFromOther) {
															limit.assign(me.state, me.clearProps(props));
															__controller__.state = me.getPerState(me.state);
															__controller__.props = me.getPerProps(me.state);
															if (limit.isFunction(__controller__.componentWillUpdate)) {
																		__controller__.componentWillUpdate(me.state);
																		limit.assign(me.state, __controller__.state);
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
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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

var getStaticFun = domUtil.getStaticFun = function (className, method) {
	if (className) {
		var fn = className[method];
		if (fn) {
			return fn;
		} else {
			return getStaticFun(className.__proto__, method);
		};
	};
};

domUtil.setStaticProps = function (sub, par) {
	var obj = limit.assign({}, par);
	// 删除不应该在的
	['name', 'length', '__proto__', 'prototype'].forEach(function (val) {
		delete obj[val];
	});
	limit.assign(sub, obj);
};

exports["default"] = domUtil;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routerBase = __webpack_require__(8);

var _routerBase2 = _interopRequireDefault(_routerBase);

var _domUtil = __webpack_require__(5);

var _domUtil2 = _interopRequireDefault(_domUtil);

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
			// 全部地址
			linksList: [],
			// 默认地址
			defaultWhiteList: null,
			// 白名单[登陆后的]
			whiteList: null,
			// 404
			notFound: 'notFound',
			// 无权限
			noPermission: 'noPermission',
			// 登陆
			login: 'login'
		}, _temp);
		limit.assignSuper(me.state, me.props, config);
		me.bindHashChange();
		return _this;
	}

	_createClass(Router, [{
		key: 'checkHash',
		value: function checkHash(hash) {
			var me = this;
			var _me$state = me.state,
			    linksList = _me$state.linksList,
			    notFound = _me$state.notFound,
			    noPermission = _me$state.noPermission,
			    defaultWhiteList = _me$state.defaultWhiteList,
			    whiteList = _me$state.whiteList,
			    login = _me$state.login;
			// hasn在地址里面

			if (limit.contains(linksList, hash)) {
				// 未登陆
				if (whiteList === null) {
					if (defaultWhiteList === null) {
						return true;
					};
					// 如果在默认权限表里
					if (limit(defaultWhiteList).concat([notFound, noPermission, login]).contains(hash).val()) {
						return true;
					} else {
						return Router.setHash(login);
					};
				} else {
					// 如果在权限表里 
					if (limit(defaultWhiteList).concat(whiteList, [notFound, noPermission, login]).contains(hash).val()) {
						return true;
					} else {
						return Router.setHash(noPermission);
					};
				};
			} else {
				return Router.setHash(notFound);
			};
		}
	}]);

	return Router;
}(_routerBase2["default"]);

;

_domUtil2["default"].setStaticProps(Router, _routerBase2["default"]);

exports["default"] = Router;

/***/ }),
/* 8 */
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

	_createClass(Router, [{
		key: "setDefaultHash",
		value: function setDefaultHash() {
			var me = this;
			var state = me.state;

			var parseHash = Router.parseHash();
			if (!parseHash && state.defaultHash) {
				Router.setHash(state.defaultHash);
			};
		}
	}]);

	function Router(config) {
		var _temp, _this;

		_classCallCheck(this, Router);

		var me = (_temp = (_this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this)), _this), _this.props = {
			// 默认跳转的地址
			defaultHash: ''
		}, _temp);
		limit.assignSuper(me.state, me.props, config);
		limit.each(me.state.rule, function (val, key) {
			return me.on(key, val);
		});
		me.state.eventUid = "hashchange.router" + limit.getUid();
		return _this;
	}

	_createClass(Router, [{
		key: "checkHash",
		value: function checkHash(hash) {
			return hash;
		}
	}, {
		key: "bindHashChange",
		value: function bindHashChange() {
			var me = this;
			var state = me.state;

			WIN.on(state.eventUid, function (e) {
				var hashParse = Router.parseHash();
				if (hashParse) {
					me.checkHash(hashParse.hash) && me.emit(hashParse.hash, hashParse.search);
				} else {
					me.setDefaultHash();
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
		}
	}]);

	return Router;
}(Events);

;

exports["default"] = Router;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(43);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(46);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(12);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(60);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(35);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(38);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(58);

var _index = __webpack_require__(13);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
			new _index2["default"](e).on('move', function (e, diff) {
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
}(_component2["default"]);

;

exports["default"] = View;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(62);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(91);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _widget = __webpack_require__(17);

var _widget2 = _interopRequireDefault(_widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
			var dialogExp = _widget2["default"].loading();
			return me.jQuertAjax().then(function (val) {
				if (val.hasError) {
					throw val.errorMsg;
				} else {
					var content = val.content;
					if (content.isSuccess) {
						var retValue = content.retValue,
						    message = content.message;

						if (message) {
							retValue = retValue || {};
							retValue.successMsg = message;
						};
						return retValue;
					} else {
						throw content.message;
					};
				};
			}).then(function (val) {
				dialogExp.destroy();
				return val;
			}, function (e) {
				var eMsg = void 0;
				if (!limit.isString(e)) {
					eMsg = '请求数据错误，请稍后再试';
				};
				dialogExp.destroy();
				_widget2["default"].error(eMsg);
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

exports["default"] = Index;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(54);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(57);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = __webpack_require__(92);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(14);

var _index4 = _interopRequireDefault(_index3);

var _widget = __webpack_require__(104);

var _widget2 = _interopRequireDefault(_widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dialogLoop = window.dialogLoop = [];

var originWidget = function (_Widget) {
	_inherits(originWidget, _Widget);

	function originWidget() {
		var _ref;

		var _this;

		_classCallCheck(this, originWidget);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var me = (_this = _possibleConstructorReturn(this, (_ref = originWidget.__proto__ || Object.getPrototypeOf(originWidget)).call.apply(_ref, [this].concat(args))), _this);
		dialogLoop.push(me);
		return _this;
	}

	_createClass(originWidget, [{
		key: 'setCenter',
		value: function setCenter() {
			var me = this;
			Actions(me.componentExp).setCenter();
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			var me = this;
			_get(originWidget.prototype.__proto__ || Object.getPrototypeOf(originWidget.prototype), 'destroy', this).call(this);
			limit.remove(dialogLoop, me);
		}
	}], [{
		key: 'clearLoop',
		value: function clearLoop() {
			dialogLoop.forEach(function (exp) {
				exp.destroy();
			});
		}
	}, {
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
						React.createElement(_index4["default"], { type: 'button',
							value: '\u786E \u5B9A',
							focus: 'focus',
							onClick: function onClick() {
								resolve('sure');dialog.destroy();
							} }),
						React.createElement(_index4["default"], { type: 'button', value: '\u53D6 \u6D88', onClick: function onClick() {
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
						React.createElement(_index4["default"], { type: 'button',
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
}(_widget2["default"]);

originWidget.originClass = _index2["default"];
;

exports["default"] = originWidget;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
			var date = new Date('2017-01-01');
			date.setYear(year);
			date.setMonth(month);
			date.setDate(0);
			return date;
		}
		// 获取已知年月的第一天

	}, {
		key: 'getFirstDayInMonth',
		value: function getFirstDayInMonth(year, month) {
			var date = new Date('2017-01-01');
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
				return new CalendarCompute({ date: '2017-01-01' }).setYear(year).setMonth(month).setDate(++key).parseTarget();
			});
		}
		// 获取42天的所有天

	}, {
		key: 'getFullDayListInMonth',
		value: function getFullDayListInMonth(year, month) {
			var day = new CalendarCompute({ date: '2017-01-01' }).setYear(year).setMonth(month).setDate(1).getDay();
			var prevArr = day ? CalendarCompute.getDayListInMonth(year, month - 1) : [];
			var thisArr = CalendarCompute.getDayListInMonth(year, month);
			var nextArr = CalendarCompute.getDayListInMonth(year, month + 1);
			return [].concat(prevArr.slice(-day), thisArr, nextArr.slice(0, 42 - day - thisArr.length));
		}
	}]);

	return CalendarCompute;
}();

;

exports["default"] = CalendarCompute;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(39);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(42);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(47);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(50);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(51);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(61);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(65);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(68);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(30);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

ReactDOM.render(React.createElement(_index2["default"], null), document.getElementById('container'));

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(31);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(105);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(32);

var _routerMap = __webpack_require__(34);

var _routerMap2 = _interopRequireDefault(_routerMap);

var _index = __webpack_require__(15);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(7);

var _index4 = _interopRequireDefault(_index3);

var _component = __webpack_require__(4);

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
			var parseHash = _index4["default"].parseHash();
			return React.createElement(
				'div',
				{ className: me.getClassName('page-index') },
				Com ? React.createElement(Com, { hash: parseHash.hash, search: parseHash.search }) : null
			);
		}
	}, {
		key: 'createRouter',
		value: function createRouter(defaultWhiteList, whiteList) {
			var me = this;
			return new _index4["default"]({
				defaultHash: 'test1',
				defaultWhiteList: defaultWhiteList,
				whiteList: whiteList,
				linksList: _routerMap2["default"].linksList,
				rule: limit.map(_routerMap2["default"].rule, function (val) {
					return val.bind(me);
				})
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var me = this;
			return me.createRouter();
			// new Ajax({
			// 	url: '/mock/readLinks.json',
			// 	type: 'get'
			// }).then((val) => {
			// 	return me.createRouter(val.defaultWhiteList, val.whiteList);
			// });
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".page-index{background:none}", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var RouterMap = {
    linksList: ['antForm', 'calendar', 'checkbox', 'foolui/index', 'foolui/inputButton', 'foolui/inputText', 'foolui/logo', 'foolui/pre', 'foolui/table', 'login', 'mobile/page1', 'mobile/page2', 'mobile/page3', 'noPermission', 'notFound', 'showImg', 'tally', 'test1', 'test2/index', 'test3', 'validator', 'videoCamera'],
    rule: {
        'antForm': function antForm() {
            var _this = this;

            __webpack_require__.e/* require.ensure */(11).then((function (a) {
                var reactCom = __webpack_require__(115)['default'];
                Actions(_this).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'calendar': function calendar() {
            var _this2 = this;

            __webpack_require__.e/* require.ensure */(21).then((function (a) {
                var reactCom = __webpack_require__(116)['default'];
                Actions(_this2).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'checkbox': function checkbox() {
            var _this3 = this;

            __webpack_require__.e/* require.ensure */(9).then((function (a) {
                var reactCom = __webpack_require__(117)['default'];
                Actions(_this3).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'foolui/index': function fooluiIndex() {
            var _this4 = this;

            __webpack_require__.e/* require.ensure */(13).then((function (a) {
                var reactCom = __webpack_require__(118)['default'];
                Actions(_this4).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'foolui/inputButton': function fooluiInputButton() {
            var _this5 = this;

            __webpack_require__.e/* require.ensure */(8).then((function (a) {
                var reactCom = __webpack_require__(119)['default'];
                Actions(_this5).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'foolui/inputText': function fooluiInputText() {
            var _this6 = this;

            __webpack_require__.e/* require.ensure */(6).then((function (a) {
                var reactCom = __webpack_require__(120)['default'];
                Actions(_this6).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'foolui/logo': function fooluiLogo() {
            var _this7 = this;

            __webpack_require__.e/* require.ensure */(20).then((function (a) {
                var reactCom = __webpack_require__(113)['default'];
                Actions(_this7).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'foolui/pre': function fooluiPre() {
            var _this8 = this;

            __webpack_require__.e/* require.ensure */(19).then((function (a) {
                var reactCom = __webpack_require__(112)['default'];
                Actions(_this8).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'foolui/table': function fooluiTable() {
            var _this9 = this;

            __webpack_require__.e/* require.ensure */(18).then((function (a) {
                var reactCom = __webpack_require__(114)['default'];
                Actions(_this9).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'login': function login() {
            var _this10 = this;

            __webpack_require__.e/* require.ensure */(5/* duplicate */).then((function (a) {
                var reactCom = __webpack_require__(23)['default'];
                Actions(_this10).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'mobile/page1': function mobilePage1() {
            var _this11 = this;

            __webpack_require__.e/* require.ensure */(4/* duplicate */).then((function (a) {
                var reactCom = __webpack_require__(24)['default'];
                Actions(_this11).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'mobile/page2': function mobilePage2() {
            var _this12 = this;

            __webpack_require__.e/* require.ensure */(3/* duplicate */).then((function (a) {
                var reactCom = __webpack_require__(25)['default'];
                Actions(_this12).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'mobile/page3': function mobilePage3() {
            var _this13 = this;

            __webpack_require__.e/* require.ensure */(2/* duplicate */).then((function (a) {
                var reactCom = __webpack_require__(26)['default'];
                Actions(_this13).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'noPermission': function noPermission() {
            var _this14 = this;

            __webpack_require__.e/* require.ensure */(1/* duplicate */).then((function (a) {
                var reactCom = __webpack_require__(27)['default'];
                Actions(_this14).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'notFound': function notFound() {
            var _this15 = this;

            __webpack_require__.e/* require.ensure */(0/* duplicate */).then((function (a) {
                var reactCom = __webpack_require__(28)['default'];
                Actions(_this15).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'showImg': function showImg() {
            var _this16 = this;

            __webpack_require__.e/* require.ensure */(12).then((function (a) {
                var reactCom = __webpack_require__(121)['default'];
                Actions(_this16).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'tally': function tally() {
            var _this17 = this;

            __webpack_require__.e/* require.ensure */(7).then((function (a) {
                var reactCom = __webpack_require__(122)['default'];
                Actions(_this17).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'test1': function test1() {
            var _this18 = this;

            __webpack_require__.e/* require.ensure */(17).then((function (a) {
                var reactCom = __webpack_require__(123)['default'];
                Actions(_this18).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'test2/index': function test2Index() {
            var _this19 = this;

            __webpack_require__.e/* require.ensure */(16).then((function (a) {
                var reactCom = __webpack_require__(124)['default'];
                Actions(_this19).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'test3': function test3() {
            var _this20 = this;

            __webpack_require__.e/* require.ensure */(15).then((function (a) {
                var reactCom = __webpack_require__(125)['default'];
                Actions(_this20).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'validator': function validator() {
            var _this21 = this;

            __webpack_require__.e/* require.ensure */(10).then((function (a) {
                var reactCom = __webpack_require__(126)['default'];
                Actions(_this21).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        },
        'videoCamera': function videoCamera() {
            var _this22 = this;

            __webpack_require__.e/* require.ensure */(14).then((function (a) {
                var reactCom = __webpack_require__(127)['default'];
                Actions(_this22).changeCom(reactCom);
            }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
        }
    }
};

exports["default"] = RouterMap;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(36);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
					React.createElement(
						'a',
						{ href: 'javascript:;', tabIndex: '-1', onClick: Actions(me).changeYear.bind(null, 'prev') },
						'\xAB'
					)
				),
				React.createElement(
					'div',
					{ className: 'calendar-title-cell calendar-title-click' },
					React.createElement(
						'a',
						{ href: 'javascript:;', tabIndex: '-1', onClick: Actions(me).changeMonth.bind(null, 'prev') },
						'\u2039'
					)
				),
				React.createElement(
					'div',
					{ className: 'calendar-title-cell calendar-title-text' },
					props.yearMonthStr
				),
				React.createElement(
					'div',
					{ className: 'calendar-title-cell calendar-title-click' },
					React.createElement(
						'a',
						{ href: 'javascript:;', tabIndex: '-1', onClick: Actions(me).changeMonth.bind(null, 'next') },
						'\u203A'
					)
				),
				React.createElement(
					'div',
					{ className: 'calendar-title-cell calendar-title-click' },
					React.createElement(
						'a',
						{ href: 'javascript:;', tabIndex: '-1', onClick: Actions(me).changeYear.bind(null, 'next') },
						'\xBB'
					)
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
}(_component2["default"]);

;

module.exports = Calendar;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-calendar{display:inline-block;background:#fff;color:#666;border:1px solid #4285f4;padding:1px;box-shadow:0 1px 3px rgba(66,133,244,.5)}.mod-calendar .calendar-title .calendar-title-table{height:1em;display:table;width:100%}.mod-calendar .calendar-title .calendar-title-cell{font-size:.4em;vertical-align:middle;display:table-cell}.mod-calendar .calendar-title .calendar-title-click{width:20px;text-align:center;font-size:16px}.mod-calendar .calendar-title .calendar-title-click a{color:#4285f4}.mod-calendar .calendar-title .calendar-title-text{text-align:center}.mod-calendar .calendar-content li{width:1em;height:.8em;float:left;text-align:center}.mod-calendar .calendar-content .calendar-main-table{display:table;width:100%;height:100%}.mod-calendar .calendar-content .calendar-main-cell{display:table-cell;vertical-align:middle;font-size:.4em}.mod-calendar .calendar-main li{border:1px dashed #fff;cursor:pointer}.mod-calendar .calendar-main li.active,.mod-calendar .calendar-main li:hover{border:1px dashed #4285f4;color:#4285f4!important}.mod-calendar .calendar-main li.today{color:#4285f4!important;text-decoration:underline;text-underline-position:under}.mod-calendar .calendar-main li.active{background:#4285f4;color:#fff!important}.mod-calendar .calendar-main li.range{background:#ccc;color:#999!important;border-color:#ccc;cursor:not-allowed}", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

var _control2 = _interopRequireDefault(_control);

var _index = __webpack_require__(18);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

		var theDate = new _index2["default"]({ date: props.target });
		var year = state.year = theDate.getYear();
		var month = state.month = theDate.getMonth();
		me.setCalendarData();
		me.setYearMonthStr();
		state.target = theDate.parseTarget();
		state.today = new _index2["default"]().parseTarget();
		return _this;
	}

	_createClass(Controller, [{
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			var me = this;
			var state = me.state;

			var theDate = new _index2["default"]({ date: state.target });
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

			var arr = _index2["default"].getFullDayListInMonth(state.year, state.month);
			state.calendarData = arr;
		}
	}, {
		key: 'setYearMonthStr',
		value: function setYearMonthStr() {
			var me = this;
			var state = me.state;

			state.yearMonthStr = new _index2["default"]({ date: '2017-01-01' }).setYear(state.year).setMonth(state.month).parseTarget('yyyy-MM');
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'Calendar',
	width: 180,
	onSelect: limit.K,
	onChangeYM: limit.K
};
;

module.exports = Controller;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(40);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = function (_Component) {
	_inherits(Radio, _Component);

	function Radio() {
		_classCallCheck(this, Radio);

		return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
	}

	_createClass(Radio, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			return React.createElement(
				'label',
				{ className: me.getClassName('mod-radio', me.getRadioClassName()) },
				React.createElement('input', {
					onClick: Actions(me).click,
					onChange: Actions(me).change,
					onFocus: props.onFocus,
					onBlur: props.onBlur,
					checked: props.checked,
					disabled: props.disabled,
					defaultChecked: props.defaultChecked,
					name: props.name,
					value: props.value,
					type: 'radio',
					ref: 'input' }),
				React.createElement('span', { className: 'radio-mock' }),
				React.createElement('span', { className: 'radio-right' })
			);
		}
	}, {
		key: 'getRadioClassName',
		value: function getRadioClassName() {
			var me = this;
			var props = me.props;

			var arr = [];
			if (props.isClick) {
				arr.push('radio-clicked');
			};
			if (props.checked) {
				arr.push('radio-checked');
			};
			if (props.disabled) {
				arr.push('radio-disabled');
			};
			return arr.join(' ');
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

	return Radio;
}(_component2["default"]);

;

exports["default"] = Radio;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-radio{position:relative;display:inline-block;width:14px;height:14px;background:#fff;border:1px solid #ccc;border-radius:7px;cursor:pointer}.mod-radio input{opacity:0}.mod-radio:before{position:absolute;content:'';width:100%;height:100%;top:0;left:0;transform:scale(1);opacity:1;background:#4285f4;border-radius:7px}.mod-radio.radio-clicked:before{transition:all .3s ease-out 0s;transform:scale(1.7);opacity:0}.mod-radio .radio-right{transition:all .1s ease-out 0s;position:absolute;top:50%;left:50%;width:6px;height:6px;border-radius:3px;background:#4285f4;transform:scale(0) translate(-50%,-50%);transform-origin:0 0}.mod-radio .radio-mock{transition:all .3s ease-out 0s;position:absolute;height:100%;width:100%;background:#fff;border-radius:7px;top:0;left:0}.mod-radio.radio-checked{border:1px solid #4285f4;background:#fff}.mod-radio.radio-checked .radio-mock{background:#fff}.mod-radio.radio-checked .radio-right{transform:scale(1) translate(-50%,-50%)}.mod-radio.radio-disabled{border-color:#ccc;cursor:not-allowed}.mod-radio.radio-disabled .radio-mock{background:#f2f2f2}.mod-radio.radio-disabled .radio-right{background:#ccc}", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = function (_Control) {
	_inherits(Controller, _Control);

	function Controller(props) {
		var _temp, _this;

		_classCallCheck(this, Controller);

		var me = (_temp = (_this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this)), _this), _this.state = {
			checked: false,
			disabled: false
		}, _temp);
		if (props.defaultChecked) {
			me.state.checked = true;
		};
		return _this;
	}

	_createClass(Controller, [{
		key: 'onResetChecked',
		value: function onResetChecked() {
			var me = this;
			var state = me.state,
			    props = me.props;

			state.checked = false;
			if (props.defaultChecked) {
				me.state.checked = true;
			};
			return me.updateComponent();
		}
	}, {
		key: 'onChange',
		value: function onChange(e) {
			var me = this;
			var state = me.state,
			    props = me.props;
			var target = e.target;

			var isTriggerChange = !state.checked;
			state.checked = true;
			if (!state.isClick) {
				state.isClick = true;
			};
			return me.updateComponent().then(function () {
				setTimeout(function () {
					me.state.isClick = false;
					me.updateComponent();
				}, 300);
				if (isTriggerChange) {
					var name = me.props.name;

					return Actions('Radio').clearChecked(name, target);
				};
			}).then(function () {
				return isTriggerChange && props.onChange(e, props.value);
			});
		}
	}, {
		key: 'onClearChecked',
		value: function onClearChecked(name, input) {
			var me = this;
			var state = me.state,
			    props = me.props;

			if (name && me.isInTheSameForm(input)) {
				state.checked = false;
				return me.updateComponent();
			};
		}
	}, {
		key: 'isInTheSameForm',
		value: function isInTheSameForm(originInput) {
			var me = this;
			var input = me.com.refs.com.refs.input;

			return originInput !== input && originInput.form === input.form;
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'Radio',
	onChange: limit.K,
	defaultChecked: false,
	value: '',
	name: ''
};
;

exports["default"] = Controller;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(44);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
					className: me.getClassName('mod-button', props.isClick ? 'button-clicked' : null, me.getButtonColor(), me.getButtonSize()),
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
		key: 'getButtonSize',
		value: function getButtonSize() {
			var me = this;
			var props = me.props;

			return 'button-size-' + props.size;
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
}(_component2["default"]);

;

exports["default"] = Button;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
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

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-button{border:1px solid #bfbfbf;background:#f2f2f2;height:30px;line-height:30px;font-size:12px;color:#666;padding:0 10px;position:relative;border-radius:3px}.mod-button:focus{outline:none}.mod-button:active,.mod-button:active:before{background:#d9d9d9}.mod-button:before{position:absolute;content:'';width:100%;height:100%;top:0;left:0;transform:scale(1);opacity:1;background:#f2f2f2;border-radius:3px}.mod-button.button-clicked:before{transition:all .3s ease-out 0s;transform:scale(1.3);opacity:0}.mod-button span{position:relative}.mod-button.button-size-big{height:35px;line-height:34px}.mod-button.button-size-small{height:25px;line-height:24px}.mod-button.button-color-primary{border:1px solid #1266f1;background:#4285f4;color:#fff}.mod-button.button-color-primary:active,.mod-button.button-color-primary:active:before{background:#2a75f3}.mod-button.button-color-primary:before{background:#4285f4}.mod-button.button-color-warning{border:1px solid #cc7a00;background:#f90;color:#fff}.mod-button.button-color-warning:active,.mod-button.button-color-warning:active:before{background:#e68a00}.mod-button.button-color-warning:before{background:#f90}.mod-button.button-color-error{border:1px solid #c00;background:red;color:#fff}.mod-button.button-color-error:active,.mod-button.button-color-error:active:before{background:#e60000}.mod-button.button-color-error:before{background:red}.mod-button.button-color-disabled{cursor:not-allowed;color:#999}.mod-button.button-color-disabled:active,.mod-button.button-color-disabled:active:before{background:#f2f2f2}", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

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
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'Button',
	type: 'button',
	disabled: false,
	colorType: 'default', // 颜色类型 default[灰色#F2F2F2] primary[蓝色#4285f4] warning[橘黄#F90] error[红色#F00]
	size: 'default', // default[30] big[40] small[25]
	value: '按 钮',
	onClick: limit.K
};
;

exports["default"] = Controller;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(48);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Component) {
	_inherits(Checkbox, _Component);

	function Checkbox() {
		_classCallCheck(this, Checkbox);

		return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
	}

	_createClass(Checkbox, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			return React.createElement(
				'label',
				{ className: me.getClassName('mod-checkbox', me.getCheckBoxClassName()) },
				React.createElement('input', {
					onClick: Actions(me).click,
					onChange: Actions(me).change,
					onFocus: props.onFocus,
					onBlur: props.onBlur,
					checked: props.checked,
					disabled: props.disabled,
					name: props.name,
					value: props.value,
					type: 'checkbox',
					ref: 'input' }),
				React.createElement('span', { className: 'checkbox-mock' }),
				React.createElement('span', { className: 'checkbox-right' })
			);
		}
	}, {
		key: 'getCheckBoxClassName',
		value: function getCheckBoxClassName() {
			var me = this;
			var props = me.props;

			var arr = [];
			if (props.isClick) {
				arr.push('checkbox-clicked');
			};
			if (props.indeterminate) {
				arr.push('checkbox-indeterminate');
			} else {
				if (props.checked) {
					arr.push('checkbox-checked');
				};
			};
			if (props.disabled) {
				arr.push('checkbox-disabled');
			};
			return arr.join(' ');
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var me = this;
			var input = me.refs.input,
			    indeterminate = me.props.indeterminate;

			input.indeterminate = !!indeterminate;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var me = this;
			me.componentDidMount();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}]);

	return Checkbox;
}(_component2["default"]);

;

exports["default"] = Checkbox;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(49);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-checkbox{position:relative;display:inline-block;width:14px;height:14px;background:#fff;border:1px solid #ccc;border-radius:3px;cursor:pointer}.mod-checkbox input{opacity:0}.mod-checkbox:before{position:absolute;content:'';width:100%;height:100%;top:0;left:0;transform:scale(1);opacity:1;background:#4285f4;border-radius:3px}.mod-checkbox.checkbox-clicked:before{transition:all .3s ease-out 0s;transform:scale(1.7);opacity:0}.mod-checkbox .checkbox-right{transition:all .1s ease-out 0s;position:absolute;top:50%;left:50%;width:5px;height:8px;border:2px solid #fff;border-top:0;border-left:0;transform:rotate(45deg) scale(0) translate(-50%,-50%);transform-origin:25% 0}.mod-checkbox .checkbox-mock{transition:all .3s ease-out 0s;position:absolute;height:100%;width:100%;background:#fff;border-radius:2px;top:0;left:0}.mod-checkbox.checkbox-checked{border:1px solid #4285f4;background:#4285f4}.mod-checkbox.checkbox-checked .checkbox-mock{background:#4285f4}.mod-checkbox.checkbox-checked .checkbox-right{transform:rotate(45deg) scale(1) translate(-50%,-50%)}.mod-checkbox.checkbox-indeterminate{border:1px solid #4285f4;background:#4285f4}.mod-checkbox.checkbox-indeterminate .checkbox-mock{background:#4285f4}.mod-checkbox.checkbox-indeterminate .checkbox-right{transform:rotate(0deg) scale(1) translate(-50%,-50%);border-bottom:2px solid #fff;width:8px;height:0;background:#fff}.mod-checkbox.checkbox-disabled{border-color:#ccc;cursor:not-allowed}.mod-checkbox.checkbox-disabled .checkbox-mock{background:#f2f2f2}.mod-checkbox.checkbox-disabled .checkbox-right{border-color:#ccc}", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = function (_Control) {
	_inherits(Controller, _Control);

	function Controller(props) {
		var _temp, _this;

		_classCallCheck(this, Controller);

		var me = (_temp = (_this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this)), _this), _this.state = {
			checked: false,
			indeterminate: false,
			disabled: false
		}, _temp);
		if (props.defaultChecked) {
			me.state.checked = true;
		};
		return _this;
	}

	_createClass(Controller, [{
		key: 'onChange',
		value: function onChange(e) {
			var me = this;
			var state = me.state,
			    props = me.props;
			var checked = state.checked;

			state.checked = !checked;
			state.indeterminate = false;
			if (!state.isClick) {
				state.isClick = true;
			};
			return me.updateComponent().then(function () {
				setTimeout(function () {
					me.state.isClick = false;
					me.updateComponent();
				}, 300);
				return props.onChange(e, props.value, checked);
			});
		}
	}, {
		key: 'onResetChecked',
		value: function onResetChecked() {
			var me = this;
			var state = me.state,
			    props = me.props;

			state.checked = false;
			if (props.defaultChecked) {
				me.state.checked = true;
			};
			return me.updateComponent();
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'Checkbox',
	onChange: limit.K,
	defaultChecked: false,
	value: '',
	name: ''
};
;

exports["default"] = Controller;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(52);

var _index = __webpack_require__(16);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(10);

var _index4 = _interopRequireDefault(_index3);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
					React.createElement(_index2["default"], { type: 'text',
						ref: 'input',
						onFocus: me.focus.bind(me),
						onChange: Actions(me).change,
						onKeyDown: me.keyDown.bind(me),
						onBlur: function onBlur() {
							me.timeoutId = setTimeout(function () {
								Actions(me).focus(false);
							}, 200);
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
						_index4["default"],
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
}(_component2["default"]);

;

module.exports = Multiple;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-multiple{display:inline-block;position:relative}.mod-multiple .multiple-trigger{border:1px solid #ccc;height:100%}.mod-multiple .multiple-trigger input{border:none;line-height:16px;padding:6px 15px 6px 6px;font-size:12px;color:#666;width:100%;height:100%}.mod-multiple .multiple-trigger input[readOnly]{cursor:pointer}.mod-multiple .multiple-trigger .multiple-trigger-san{transition:all .3s ease-in-out 0s;position:absolute;width:0;height:0;border-top:6px solid #999;border-bottom:0;border-left:4px solid transparent;border-right:4px solid transparent;right:5px;top:50%;margin-top:-3px}.mod-multiple .multiple-content{color:#666;position:absolute;width:100%;border:1px solid #ccc;padding:1px;border-top:none;background:#fff}.mod-multiple .multiple-content li{padding:0 4px;line-height:28px;height:28px;cursor:pointer;border:1px solid #fff;position:relative}.mod-multiple .multiple-content li.focus{border:1px dashed #4285f4}.mod-multiple .multiple-content li.active{padding:0 20px 0 4px;background:#4285f4;border-color:#4285f4;color:#fff}.mod-multiple .multiple-content li.active:before{font-family:iconfont!important;content:\"\\E6AD\";position:absolute;width:16px;height:16px;right:2px;top:6px;border-radius:16px;line-height:18px;text-align:center;background:#fff;color:#4285f4;overflow:hidden}.mod-multiple .multiple-content li.active.focus{background:#1f5dc3;border-color:#1f5dc3}.mod-multiple.multiple-focus .multiple-trigger{border-color:#4285f4;box-shadow:0 1px 3px rgba(66,133,244,.5)}.mod-multiple.multiple-focus .multiple-trigger:before{content:'';position:absolute;width:100%;height:4px;bottom:0;left:0;background:#fff;border-left:1px solid #4285f4;border-right:1px solid #4285f4;z-index:1}.mod-multiple.multiple-focus .multiple-trigger .multiple-trigger-san{transform:rotate(180deg);border-top-color:#4285f4}.mod-multiple.multiple-focus .multiple-content{border-color:#4285f4;box-shadow:0 1px 3px rgba(66,133,244,.5)}", ""]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(55);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

			return props.type === 'textarea' ? React.createElement('textarea', _extends({}, props, { ref: 'input', onChange: me.change.bind(me) })) : React.createElement('input', _extends({}, props, { ref: 'input', onChange: me.change.bind(me) }));
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
}(_component2["default"]);

;

exports["default"] = View;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-input-text{background:red}", ""]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

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
			value: ''
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onChange',
		value: function onChange(val, compositionstart) {
			var me = this;
			me.state.value = val;
			return me.updateComponent().then(function () {
				me.props.onOriginChange(val);
				if (!compositionstart) {
					me.props.onChange(val);
				};
			});
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'InputText',
	onOriginChange: limit.K,
	onChange: limit.K
};
;

exports["default"] = Controller;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".limit-scroller{position:relative;overflow:hidden}.limit-scroller .ch-container-bar{position:absolute;right:0;top:0;width:17px;height:100%;background:#fff}.limit-scroller .ch-container-bar:hover .ch-bar{opacity:1!important}.limit-scroller .ch-bar{transition:opacity .5s ease-in-out 0s;position:absolute;width:6px;height:50px;border-top:2px solid #fff;border-bottom:2px solid #fff;top:0;right:3px;cursor:pointer;opacity:0}.limit-scroller .ch-bar:before{display:block;content:'';height:100%;width:100%;background:#666;border-radius:3px}.limit-scroller .ch-container{overflow:auto;height:100%}.limit-scroller ::-webkit-scrollbar,.limit-scroller ::-webkit-scrollbar-thumb{background:#fff}.limit-scroller ::-webkit-scrollbar-track{background:#fff}", ""]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _control = __webpack_require__(3);

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'limitScroller',
	height: 200,
	barHeight: 50
};
;

exports["default"] = Controller;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

		state.list = state.originList = me.parseListByChildren(props, 'init');
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
		value: function parseListByChildren(props, flag) {
			var me = this;
			var state = me.state;

			var propsValue = void 0;
			if (flag === 'init') {
				propsValue = limit.isArray(props.defaultValue) ? props.defaultValue : props.defaultValue.split(',');
			} else {
				propsValue = limit.isArray(props.value) ? props.value : props.value.split(',');
			};
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

			state.list = state.originList = me.parseListByChildren(nextState, 'update');
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
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'Multiple',
	scrollSize: 4,
	onChange: limit.K,
	onFocus: limit.K,
	onBlur: limit.K,
	defaultValue: '',
	width: 300,
	height: 30,
	readOnly: true
};
;

module.exports = Controller;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(63);

var _domUtil = __webpack_require__(5);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(19);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(9);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(22);

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(20);

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(69);

var _index10 = _interopRequireDefault(_index9);

var _index11 = __webpack_require__(21);

var _index12 = _interopRequireDefault(_index11);

var _index13 = __webpack_require__(74);

var _index14 = _interopRequireDefault(_index13);

var _index15 = __webpack_require__(81);

var _index16 = _interopRequireDefault(_index15);

var _index17 = __webpack_require__(86);

var _index18 = _interopRequireDefault(_index17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
		value: function doOriginFun(method, e, args) {
			var me = this;
			var props = me.props;

			var originFun = props[method];
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
			['onFocus', 'onBlur', 'onChange'].forEach(function (method) {
				newProps[method] = function (e) {
					var fun = Actions(me)['' + props.type + method.slice(2)];
					// 如果是事件对象，进入异步操作会被销毁，我们要保存一个下来
					var copyEvent = e && e.target && e.target.nodeType ? limit.assign({}, e) : e;

					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					if (fun) {
						fun.apply(undefined, [e].concat(args)).then(me.doOriginFun.bind(me, method, copyEvent, args));
					} else {
						var _Actions;

						(_Actions = Actions(me))['' + method.slice(2).toLowerCase()].apply(_Actions, [e].concat(args)).then(me.doOriginFun.bind(me, method, copyEvent, args));
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
				_index6["default"],
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
				React.createElement(_index14["default"], me.parseProps())
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
				React.createElement(_index4["default"], _extends({}, me.parseProps(), { ref: 'input' }))
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
				React.createElement(_index10["default"], me.parseProps())
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
					_index12["default"],
					_extends({}, me.parseProps(), { width: '100%', className: 'limit-form-' + props.type }),
					props.children
				)
			);
		}
	}, {
		key: 'checkboxRender',
		value: function checkboxRender() {
			var me = this;
			return React.createElement(_index8["default"], _extends({}, me.parseProps(), { ref: 'input' }));
		}
	}, {
		key: 'radioRender',
		value: function radioRender() {
			var me = this;
			return React.createElement(_index2["default"], _extends({}, me.parseProps(), { ref: 'input' }));
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
				React.createElement(_index16["default"], me.parseProps())
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
				React.createElement(_index18["default"], parseProps)
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
				return _domUtil2["default"].textSelect(input, length, length);
			} else if (limit.contains(['button', 'reset', 'submit'], props.type)) {
				input.refs.com.focus();
			};
		}
	}]);

	return View;
}(_component2["default"]);

;

exports["default"] = View;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".limit-form{display:inline-block;position:relative;background:#fff}.less-placeholder{position:absolute;width:100%;top:0;left:0;color:#999;line-height:16px;padding:7px;padding-right:16px}.less-clear{position:absolute;z-index:1;width:15px;height:16px;line-height:14px;text-align:center;right:1px;top:50%;margin-top:-8px;color:#ccc}.less-clear:hover{color:#666}.limit-form-text{border:1px solid #ccc;padding:6px;padding-right:15px;background:#fff}.limit-form-text input{border:0;height:16px;line-height:16px;color:#666;font-size:1em;width:100%;position:relative;z-index:2;background:none}.limit-form-text .ch-clear{position:absolute;z-index:1;width:15px;height:16px;line-height:14px;text-align:center;right:1px;top:50%;margin-top:-8px;color:#ccc}.limit-form-text .ch-clear:hover{color:#666}.limit-form-text .ch-placeholder{position:absolute;width:100%;top:0;left:0;color:#999;line-height:16px;padding:7px;padding-right:16px}.limit-form-password{border:1px solid #ccc;padding:6px;padding-right:15px;background:#fff;padding-right:28px}.limit-form-password input{border:0;height:16px;line-height:16px;color:#666;font-size:1em;width:100%;position:relative;z-index:2;background:none}.limit-form-password .ch-clear{position:absolute;z-index:1;width:15px;height:16px;line-height:14px;text-align:center;right:1px;top:50%;margin-top:-8px;color:#ccc}.limit-form-password .ch-clear:hover{color:#666}.limit-form-password .ch-placeholder{position:absolute;width:100%;top:0;left:0;color:#999;line-height:16px;padding:7px;padding-right:16px}.limit-form-password .ch-container-eye{position:absolute;z-index:2;width:10px;height:10px;top:50%;margin-top:-5px;right:15px;background:#fff;text-align:center;border:1px solid #ccc;border-radius:100px;cursor:pointer}.limit-form-password .ch-container-eye:hover .ch-eye{background:#666}.limit-form-password .ch-eye{display:inline-block;width:6px;height:6px;border-radius:6px;background:#ccc;margin-top:1px}.limit-form-textarea{border:1px solid #ccc;padding:6px;background:#fff}.limit-form-textarea .ch-placeholder{position:absolute;width:100%;top:0;left:0;color:#999;line-height:16px;padding:7px;padding-right:16px}.limit-form-textarea textarea{background:transparent}.limit-form-button input{border:1px solid #ccc;background:#f2f2f2;font-size:12px;padding:0 10px;height:30px;line-height:28px;width:100%;color:#666}.limit-form-button input:active{background:#ddd;border-color:#bbb}.limit-form-file input{border:1px solid #ccc;background:#f2f2f2;font-size:12px;padding:0 10px;height:30px;line-height:28px;width:100%;color:#666}.limit-form-file input:active{background:#ddd;border-color:#bbb}.limit-form-calendar .ch-placeholder{position:absolute;width:100%;top:0;left:0;color:#999;line-height:16px;padding:7px;padding-right:16px}.limit-form-calendar .ch-clear{position:absolute;z-index:1;width:15px;height:16px;line-height:14px;text-align:center;right:1px;top:50%;margin-top:-8px;color:#ccc}.limit-form-calendar .ch-clear:hover{color:#666}.limit-form .ch-placeholder{position:absolute;width:100%;top:0;left:0;color:#999;line-height:16px;padding:7px;padding-right:16px}.limit-form input[type=text]{background:transparent}.limit-form-disabled .limit-form-password,.limit-form-disabled .limit-form-text,.limit-form-disabled .limit-form-textarea{background:#f2f2f2}.limit-form-disabled .limit-form-password *,.limit-form-disabled .limit-form-text *,.limit-form-disabled .limit-form-textarea *{cursor:not-allowed}.limit-form-disabled .limit-form-button input,.limit-form-disabled .limit-form-reset input,.limit-form-disabled .limit-form-submit input{color:#999;cursor:not-allowed}.limit-form-disabled .limit-form-select{background:#f2f2f2;color:#999;cursor:not-allowed}.limit-form-focus.limit-form{z-index:2}.limit-form-focus .limit-form-password,.limit-form-focus .limit-form-text,.limit-form-focus .limit-form-textarea,.limit-form-focus .mod-calendar-input,.limit-form-focus .mod-calendar-range{border-color:#4285f4;box-shadow:0 0 3px rgba(66,133,244,.5)}.limit-form-focus .limit-form-password .ch-clear,.limit-form-focus .limit-form-text .ch-clear,.limit-form-focus .limit-form-textarea .ch-clear,.limit-form-focus .mod-calendar-input .ch-clear,.limit-form-focus .mod-calendar-range .ch-clear{color:#4285f4}.limit-form-focus .limit-form-password .ch-placeholder,.limit-form-focus .limit-form-text .ch-placeholder,.limit-form-focus .limit-form-textarea .ch-placeholder,.limit-form-focus .mod-calendar-input .ch-placeholder,.limit-form-focus .mod-calendar-range .ch-placeholder{display:none}.limit-form-focus .limit-form-password .ch-container-eye{border-color:#4285f4}.limit-form-focus .limit-form-password .ch-container-eye:hover .ch-eye,.limit-form-focus .limit-form-password .ch-eye{background:#4285f4}.limit-form-focus .limit-form-button button:after,.limit-form-focus .limit-form-file button:after{position:absolute;content:'';width:100%;height:100%;top:0;left:0;border-radius:2px;border:1px solid #fff}.limit-form-focus .limit-form-button .button-color-default:after,.limit-form-focus .limit-form-file .button-color-default:after{border-color:#666}.limit-form-focus .mod-checkbox{box-shadow:0 0 1px #333}.limit-form-focus .mod-checkbox.checkbox-checked,.limit-form-focus .mod-checkbox.checkbox-indeterminate{box-shadow:0 0 1px #0060ff}.limit-form-focus .mod-radio{box-shadow:0 0 1px #333}.limit-form-focus .mod-radio.radio-checked{box-shadow:0 0 1px #0060ff}.limit-form-error .limit-form-password,.limit-form-error .limit-form-text,.limit-form-error .limit-form-textarea,.limit-form-error .mod-calendar-input,.limit-form-error .mod-calendar-range{border-color:red;box-shadow:0 0 3px rgba(255,0,0,.5)}.limit-form-error .limit-form-calendar .ch-placeholder,.limit-form-error .limit-form-password .ch-clear,.limit-form-error .limit-form-password .ch-placeholder,.limit-form-error .limit-form-text .ch-clear,.limit-form-error .limit-form-text .ch-placeholder,.limit-form-error .limit-form-textarea .ch-clear,.limit-form-error .limit-form-textarea .ch-placeholder,.limit-form-error .mod-calendar-input .ch-clear,.limit-form-error .mod-calendar-input .ch-placeholder,.limit-form-error .mod-calendar-range .ch-clear,.limit-form-error .mod-calendar-range .ch-placeholder{color:red}.limit-form-error .limit-form-calendar .mod-calendar{border-color:red}.limit-form-error .limit-form-calendar .mod-calendar .limitIcon{color:red}.limit-form-error .limit-form-calendar .mod-calendar .limitIcon:focus,.limit-form-error .limit-form-calendar .mod-calendar .limitIcon:hover{text-shadow:0 0 3px rgba(255,0,0,.5)}.limit-form-error .limit-form-calendar .mod-calendar .calendar-main li.active,.limit-form-error .limit-form-calendar .mod-calendar .calendar-main li:hover{border-color:red;color:red!important}.limit-form-error .limit-form-calendar .mod-calendar .calendar-main li.today{color:red!important}.limit-form-error .limit-form-calendar .mod-calendar .calendar-main li.active{background:red;color:#fff!important}.limit-form-error .limit-form-password .ch-container-eye{border-color:red}.limit-form-error .limit-form-password .ch-container-eye:hover .ch-eye,.limit-form-error .limit-form-password .ch-eye{background:red}.limit-form-error .limit-form-select.mod-select .select-container,.limit-form-error .limit-form-select.mod-select .select-trigger{border-color:red;box-shadow:0 0 3px rgba(255,0,0,.5)}.limit-form-error .limit-form-select.mod-select:before{border-color:red}.limit-form-error .limit-form-select.mod-select li.active{background:red;border-color:red}.limit-form-error .limit-form-select.mod-select li:hover{border-color:red}.limit-form-error .limit-form-select.mod-select .select-trigger .select-trigger-san{border-top-color:red}.limit-form-error .limit-form-multiple .ch-placeholder{color:red}.limit-form-error .limit-form-multiple .mod-multiple .multiple-content,.limit-form-error .limit-form-multiple .mod-multiple .multiple-trigger{border-color:red;box-shadow:0 0 3px rgba(255,0,0,.5)}.limit-form-error .limit-form-multiple .mod-multiple .multiple-trigger .multiple-trigger-san{border-top-color:red}.limit-form-error .limit-form-multiple .mod-multiple:before{border-color:red}.limit-form-error .limit-form-multiple .mod-multiple li.active{background:red;border-color:red}.limit-form-error .limit-form-multiple .mod-multiple li.focus{border-color:red}.limit-form-error .ch-error-info{position:absolute;height:20px;line-height:18px;border:1px solid red;box-shadow:0 0 3px rgba(255,0,0,.5);top:-10px;right:3px;color:red;background:#fff;padding:0 5px;z-index:1}", ""]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(66);

var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
							}, 200);
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
						_index2["default"],
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
}(_component2["default"]);

;

module.exports = Select;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-select{display:inline-block;position:relative}.mod-select .select-trigger{border:1px solid #ccc;background:#fff;height:100%}.mod-select .select-trigger input{padding:0 6px;border:none;font-size:12px;color:#666;height:100%;width:100%;background:transparent;cursor:pointer;position:relative;line-height:16px}.mod-select .select-trigger .select-trigger-san{transition:all .3s ease-in-out 0s;position:absolute;width:0;height:0;border-top:6px solid #999;border-bottom:0;border-left:4px solid transparent;border-right:4px solid transparent;right:5px;top:50%;margin-top:-3px}.mod-select .select-container{position:absolute;border:1px solid #ccc;border-top:none;background:#fff;width:100%;left:0;padding:1px}.mod-select .select-container ul{margin-right:1px}.mod-select .select-container li{cursor:pointer;height:28px;line-height:28px;overflow:hidden;padding:0 4px;border:1px dashed #fff;color:#666}.mod-select .select-container li:hover{border:1px dashed #4285f4}.mod-select .select-container li.active{background:#4285f4;border:1px dashed #4285f4;color:#fff}.mod-select.mod-select-focus .select-trigger{border-color:#4285f4;box-shadow:0 1px 3px rgba(66,133,244,.5)}.mod-select.mod-select-focus .select-trigger .select-trigger-san{transform:rotate(180deg);border-top-color:#4285f4}.mod-select.mod-select-focus .select-container{border-color:#4285f4;box-shadow:0 1px 3px rgba(66,133,244,.5)}.mod-select.mod-select-focus:before{content:'';position:absolute;width:100%;height:4px;bottom:0;left:0;background:#fff;border-left:1px solid #4285f4;border-right:1px solid #4285f4;z-index:1}", ""]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
}(_control2["default"]);

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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(70);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(73);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(71);

var _index = __webpack_require__(13);

var _index2 = _interopRequireDefault(_index);

var _view = __webpack_require__(12);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
}(_view2["default"]);

;

exports["default"] = View;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".limit-textarea textarea{border:none;resize:none;color:#666;font-size:12px;width:100%;height:100%;line-height:16px}", ""]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

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
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'limitTextarea',
	height: null,
	barHeight: 50,
	rows: 10,
	onChange: limit.K
};
;

exports["default"] = Controller;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(75);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(80);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(76);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _domUtil = __webpack_require__(5);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _index3 = __webpack_require__(78);

var _index4 = _interopRequireDefault(_index3);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

			return React.createElement(_index2["default"], { type: 'button',
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
			return _domUtil2["default"].isIE8();
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

			return new _index4["default"]({
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
			_domUtil2["default"].clearDom(me.tempNode);
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
}(_component2["default"]);

;

exports["default"] = InputUpload;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-input-upload{border:1px solid #ccc;background:#f2f2f2;font-size:12px;padding:0 10px;height:30px;line-height:28px;color:#666;cursor:pointer}.mod-input-upload:active{background:#ddd;border-color:#bbb}.mod-input-upload[disabled]{cursor:not-allowed;color:#ccc}.mod-input-file{position:absolute;width:100px;height:100px;overflow:hidden;background:red;opacity:0;filter:alpha(opacity=0);top:-999px;left:-999px;font-size:200px}.mod-input-file input{position:absolute;right:0;top:0;cursor:pointer}", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domUtil = __webpack_require__(5);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _index = __webpack_require__(79);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
			_domUtil2["default"].clearDom(element);
		}
	}]);

	return Upload;
}(_index2["default"]);

module.exports = Upload;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

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

exports["default"] = ParseForm;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

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
}(_control2["default"]);

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

exports["default"] = Controller;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(82);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(85);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(83);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
						}, 200);
					},
					readOnly: 'readOnly',
					value: props.value }),
				props.calendarFocus ? React.createElement(
					'div',
					{ className: 'calendar-input-content', style: { transform: 'scale(' + me.setWidth() / 200 + ')' } },
					React.createElement(_index2["default"], { target: props.value, width: '200',
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
		value: function componentWillUnmount() {
			var me = this;
			clearTimeout(me.timeoutId);
		}
	}]);

	return CalendarInput;
}(_component2["default"]);

;

module.exports = CalendarInput;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-calendar-input{position:relative;border:1px solid #ccc}.mod-calendar-input input{border:0;height:28px;padding:6px;width:100%;cursor:pointer;font-size:12px;color:#666;background:transparent}.mod-calendar-input .calendar-input-content{position:absolute;top:31px;left:-1px;transform-origin:0 0}", ""]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

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
			console.log('select');
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
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'CalendarInput',
	onChange: limit.K,
	onFocus: limit.K,
	onBlur: limit.K
};
;

module.exports = Controller;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(87);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(90);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(88);

var _domUtil = __webpack_require__(5);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
						}, 200);
					},
					readOnly: 'readOnly',
					value: me.getValue() }),
				props.calendarFocus ? React.createElement(
					'div',
					{ className: 'calendar-input-content', style: { transform: 'scale(' + me.setWidth() / 200 + ')', width: 399 } },
					React.createElement(_index2["default"], {
						target: props.value[0],
						range: [null, props.value[1]],
						width: '200',
						className: 'calendar-input-le',
						onChangeYM: me.changeYM.bind(me),
						onSelect: me.select.bind(me, 'le') }),
					React.createElement(_index2["default"], {
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
}(_component2["default"]);

;

module.exports = CalendarRange;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(89);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-calendar-range{position:relative;border:1px solid #ccc}.mod-calendar-range input{border:0;height:28px;padding:6px;width:100%;cursor:pointer;font-size:12px;color:#666;background:transparent}.mod-calendar-range .calendar-input-content{position:absolute;top:31px;left:-1px;transform-origin:0 0;box-shadow:0 1px 3px rgba(66,133,244,.5)}.mod-calendar-range .calendar-input-content .mod-calendar{box-shadow:none}.mod-calendar-range .calendar-input-ri{margin-left:-1px}", ""]);

// exports


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

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
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'CalendarRange',
	onChange: limit.K,
	onFocus: limit.K,
	onBlur: limit.K
};
;

module.exports = Controller;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
			if (limit.contains(['file', 'radio', 'checkbox'], props.type)) {
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
				var originChecked = props.defaultChecked;
				validaor.on(props.name + 'Reset', function () {
					var validaorState = validaor.state;
					var originData = validaorState.originData;
					originData[props.name] = me.state.value = originVal;
					if (limit.contains(['radio', 'checkbox'], props.type)) {
						me.resetChecked();
					};
					me.state.validaorError = null;
					me.updateComponent().then(function () {
						me.props.onChange(originVal);
					});
				});
			};
		}
	}, {
		key: 'resetChecked',
		value: function resetChecked() {
			var me = this;
			var theCheckControl = me.com.refs.com.refs.input.__controller__;
			theCheckControl.onResetChecked();
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	validaor: null,
	name: '',
	type: 'text',
	rule: '',
	errMessage: '',
	defaultChecked: false,
	actionId: 'limitForm',
	onChange: limit.K
};
;

exports["default"] = Controller;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(93);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(103);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(94);

var _domUtil = __webpack_require__(5);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _index = __webpack_require__(96);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
				props.hasCover ? React.createElement(_index2["default"], { opacity: props.opacity, onClick: props.onClickCover }) : void 0
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
			    dialog = me.refs.dialog;

			dialog = $(dialog);
			var WIN = window;
			var scrollY = WIN.scrollY || document.documentElement.scrollTop;
			var winHeight = WIN.innerHeight || document.documentElement.offsetHeight;
			var height = props.height;
			var width = props.width;
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

exports["default"] = Dialog;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(95);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".react-dialog{position:absolute;background:#fff;top:0;left:50%;z-index:101;border-radius:3px;box-shadow:0 0 5px rgba(0,0,0,.5);max-height:calc(100vh - 10px);overflow:auto}.react-dialog .ch-close{position:absolute;right:5px;top:5px;width:12px;height:12px;line-height:10px;text-align:center;color:#999}.react-dialog .ch-close:hover{background:#999;color:#fff}@keyframes loading{0%{left:-20px}to{left:100%}}.widget-loading .react-cover,.widget-loading .react-dialog{cursor:progress}.widget-loading .react-dialog{overflow:hidden;box-shadow:none;background:none}.widget-loading .react-dialog .ch-close{display:none}.widget-loading .ch-load{position:absolute;width:20px;height:2px;background:#4285f4;opacity:.8;left:-20px;animation:loading 1.5s ease infinite}.widget-success{color:#666}.widget-success .ch-logo{position:absolute;width:25px;height:25px;line-height:25px;color:#4285f4;text-align:right;text-indent:-4px;top:50%;margin-top:-12px;left:10px;overflow:hidden;font-size:25px}.widget-success .ch-text{line-height:16px;padding:20px 20px 20px 40px}.widget-error{color:#666}.widget-error .ch-logo{position:absolute;width:25px;height:25px;line-height:25px;color:#4285f4;text-align:right;text-indent:-4px;top:50%;margin-top:-12px;left:10px;overflow:hidden;font-size:25px}.widget-error .ch-text{line-height:16px;padding:20px 20px 20px 40px}.widget-error .ch-logo{text-indent:0;color:#ea4335}.widget-confirm .ch-layout{color:#666;padding:0 15px 15px}.widget-confirm .ch-head{height:30px;line-height:30px;border-bottom:1px solid #ccc}.widget-confirm .ch-body{padding:10px}.widget-confirm .ch-foot{text-align:center}", ""]);

// exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(97);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(102);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(98);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 依赖
var React = __webpack_require__(100);
var limit = __webpack_require__(101);

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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(99);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "html{height:100%}body{min-height:100%;position:relative}.react-cover{position:absolute;width:100%;height:100%;background:red;top:0;left:0;z-index:100}", ""]);

// exports


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = limit;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _control = __webpack_require__(3);

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'Cover',
	opacity: .3,
	background: '#FFF'
};
;

exports["default"] = Controller;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _control = __webpack_require__(3);

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	width: 400,
	height: 200,
	actionId: 'dialog',
	onClose: limit.K,
	hasCover: true,
	hide: false,
	timeout: 0,
	useEsc: true
};
;

exports["default"] = Controller;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

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

exports["default"] = Widget;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

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

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map