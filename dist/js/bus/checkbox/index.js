webpackJsonp([9],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(157);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(170);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(158);

var _index = __webpack_require__(19);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(9);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(20);

var _index6 = _interopRequireDefault(_index5);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

var _index7 = __webpack_require__(21);

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(14);

var _index10 = _interopRequireDefault(_index9);

var _index11 = __webpack_require__(160);

var _index12 = _interopRequireDefault(_index11);

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
				'div',
				{ className: me.getClassName('page-checkbox', 'fn-PA15') },
				React.createElement(
					'label',
					null,
					React.createElement(_index6["default"], { indeterminate: props.indeterminate, checked: props.checked, className: 'fn-MR5' }),
					'\u563B\u563B\u54C8\u54C8'
				),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement(
					'label',
					null,
					React.createElement(_index6["default"], { indeterminate: props.indeterminate, checked: props.checked, className: 'fn-MR5' }),
					'\u563B\u563B\u54C8\u54C8'
				),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement(_index4["default"], { value: '\u8BBE\u7F6E indeterminate', size: 'small', className: 'fn-MR5', onClick: Actions(me).setIndeterminate }),
				React.createElement(_index4["default"], { value: '\u8BBE\u7F6E checked', size: 'small', onClick: Actions(me).setChecked }),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement(
					'label',
					null,
					React.createElement(_index2["default"], { className: 'fn-MR5', name: 'memeda', onChange: Actions(me).changeCheck }),
					'\u563B\u563B\u54C8\u54C8'
				),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement(
					'label',
					null,
					React.createElement(_index2["default"], { className: 'fn-MR5', name: 'memeda' }),
					'\u563B\u563B\u54C8\u54C8'
				),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement(
					'label',
					null,
					React.createElement(_index2["default"], { className: 'fn-MR5', name: 'memeda' }),
					'\u563B\u563B\u54C8\u54C8'
				),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement(_index12["default"], {
					list: [{ key: 'a1' }, { key: 'a2' }, { key: 'a3' }, { key: 'a4' }, { key: 'a5' }] }),
				React.createElement(
					_index8["default"],
					null,
					React.createElement(
						'option',
						{ value: 'v1' },
						'a1'
					),
					React.createElement(
						'option',
						{ value: 'v2' },
						'a2'
					),
					React.createElement(
						'option',
						{ value: 'v3' },
						'a3'
					),
					React.createElement(
						'option',
						{ value: 'v4' },
						'a4'
					),
					React.createElement(
						'option',
						{ value: 'v5' },
						'a5'
					)
				),
				React.createElement(
					_index10["default"],
					{ type: 'multiple' },
					React.createElement(
						'option',
						{ value: '17' },
						'a17'
					),
					React.createElement(
						'option',
						{ value: '18' },
						'a18'
					),
					React.createElement(
						'option',
						{ value: '19' },
						'a19'
					),
					React.createElement(
						'option',
						{ value: '20' },
						'a20'
					),
					React.createElement(
						'option',
						{ value: '21' },
						'a21'
					)
				)
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

	return Checkbox;
}(_component2["default"]);

;

exports["default"] = Checkbox;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(159);
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

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".page-checkbox .abc:after{content:\"\\BB\"}", ""]);

// exports


/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(161);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(169);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(162);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(164);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectSearch = function (_Component) {
	_inherits(SelectSearch, _Component);

	function SelectSearch() {
		_classCallCheck(this, SelectSearch);

		return _possibleConstructorReturn(this, (SelectSearch.__proto__ || Object.getPrototypeOf(SelectSearch)).apply(this, arguments));
	}

	_createClass(SelectSearch, [{
		key: 'render',
		value: function render() {
			var me = this;
			var _me$props = me.props,
			    list = _me$props.list,
			    originList = _me$props.originList,
			    selectSearchFocus = _me$props.selectSearchFocus,
			    width = _me$props.width,
			    focusNumber = _me$props.focusNumber,
			    value = _me$props.value,
			    scrollSize = _me$props.scrollSize;

			return React.createElement(
				'div',
				{
					className: me.getClassName('mod-select-search', selectSearchFocus ? 'select-search-focus' : null),
					style: { width: width } },
				React.createElement(
					'div',
					{ className: 'select-search-trigger', onClick: me.toFocusInput.bind(me) },
					originList.filter(function (val) {
						return val.selected;
					}).map(function (val, key) {
						return React.createElement(
							'span',
							{ className: 'select-search-box', key: key },
							val.key,
							React.createElement(
								'a',
								{ href: 'javascript:;', onClick: Actions(me).select.bind(null, val), className: 'select-search-delete' },
								'\xD7'
							)
						);
					}),
					React.createElement(_index4["default"], { ref: 'input',
						className: 'select-search-input',
						onFocus: me.focus.bind(me),
						onBlur: function onBlur() {
							me.timeoutId = setTimeout(function () {
								Actions(me).focus(false);
							}, 200);
						},
						onChange: Actions(me).change,
						onKeyDown: me.keyDown.bind(me),
						value: value,
						maxWidth: 292 }),
					React.createElement('span', { className: 'select-trigger-san' })
				),
				selectSearchFocus ? React.createElement(
					'div',
					{ className: 'select-search-container', onClick: me.toClearTimeout.bind(me) },
					list.length <= scrollSize ? me.renderList(list) : React.createElement(
						_index2["default"],
						{ height: scrollSize * 28, ref: 'scroller', barHeight: '50' },
						me.renderList(list)
					)
				) : void 0
			);
		}
	}, {
		key: 'renderList',
		value: function renderList(list) {
			var me = this;
			var _me$props2 = me.props,
			    focusNumber = _me$props2.focusNumber,
			    notFound = _me$props2.notFound;

			return React.createElement(
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
				}),
				!list.length ? React.createElement(
					'li',
					null,
					notFound
				) : void 0
			);
		}
	}, {
		key: 'toFocusInput',
		value: function toFocusInput() {
			var me = this;
			var input = me.refs.input,
			    props = me.props;

			var autoSizeInput = input.refs.com;
			autoSizeInput.focusInput();
			clearTimeout(me.timeoutId);
		}
	}, {
		key: 'toClearTimeout',
		value: function toClearTimeout() {
			var me = this;
			clearTimeout(me.timeoutId);
		}
	}, {
		key: 'scrollTo',
		value: function scrollTo(focusNumber) {
			var me = this;
			var scroller = me.refs.scroller,
			    props = me.props;

			if (scroller) {
				var num = (focusNumber ? focusNumber : me.props.focusNumber) - me.props.scrollSize + 1;
				scroller.refs.com.scrollTo(num * 28);
			};
		}
	}, {
		key: 'getFirstNumber',
		value: function getFirstNumber() {
			var me = this;
			var props = me.props;

			var firstNumber = void 0;
			props.list.some(function (val, key) {
				if (val.selected) {
					firstNumber = key;
					return true;
				};
			});
			return firstNumber;
		}
	}, {
		key: 'focus',
		value: function focus() {
			var me = this;
			!me.isChangeList && Actions(me).focus(true).then(me.scrollTo.bind(me, me.getFirstNumber()));
		}
	}, {
		key: 'keyDown',
		value: function keyDown(e) {
			var me = this;
			var _me$props3 = me.props,
			    list = _me$props3.list,
			    value = _me$props3.value,
			    focusNumber = _me$props3.focusNumber;

			if (!e.shiftKey && !e.altKey && list.length) {
				// 
				var keyMap = {
					38: 'up',
					40: 'down'
				};
				if (keyMap[e.keyCode]) {
					e.preventDefault();
					Actions(me).keyDown(keyMap[e.keyCode]).then(me.scrollTo.bind(me, null));
				} else if (e.keyCode === 13) {
					e.preventDefault();
					Actions(me).enterDown();
				} else if (e.keyCode === 8) {
					!e.target.value && Actions(me).deleteItem();
				}
			};
		}
	}, {
		key: 'select',
		value: function select(val) {
			var me = this;
			var input = me.refs.input.refs.com.refs.input;

			me.isChangeList = true;
			me.toFocusInput();
			me.isChangeList = false;
			return Actions(me).select(val);
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
			me.toClearTimeout();
		}
	}]);

	return SelectSearch;
}(_component2["default"]);

;

exports["default"] = SelectSearch;

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(163);
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

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-select-search{display:inline-block;position:relative;color:#666}.mod-select-search .select-search-trigger{position:relative;z-index:1;cursor:text;border:1px solid #ccc;background:#fff;padding:0 15px 3px 6px}.mod-select-search .select-search-trigger .select-trigger-san{transition:all .3s ease-in-out 0s;position:absolute;width:0;height:0;border-top:6px solid #999;border-bottom:0;border-left:4px solid transparent;border-right:4px solid transparent;right:5px;margin-top:11px;top:0}.mod-select-search .select-search-trigger .select-search-box{display:inline-block;padding:3px;height:22px;line-height:16px;background:#f2f2f2;margin-right:5px;border-radius:3px;margin-top:3px}.mod-select-search .select-search-trigger .select-search-delete{color:#666;margin-left:5px}.mod-select-search .select-search-trigger .select-search-delete:hover{color:#4285f4}.mod-select-search .select-search-trigger .select-search-input{margin-top:5px;margin-bottom:2px}.mod-select-search .select-search-container{position:absolute;z-index:2;width:100%;border:1px solid #ccc;border-top-color:#fff;margin-top:-1px;padding:1px;background:#fff}.mod-select-search .select-search-container li{padding:0 4px;line-height:26px;height:28px;cursor:pointer;border:1px solid #fff;border-radius:3px;position:relative}.mod-select-search .select-search-container li.focus{border:1px dashed #4285f4}.mod-select-search .select-search-container li.active{padding:0 20px 0 4px;background:#4285f4;border-color:#4285f4;color:#fff}.mod-select-search .select-search-container li.active:before{font-family:iconfont!important;content:\"\\E6AD\";position:absolute;width:16px;height:16px;right:2px;top:6px;border-radius:16px;line-height:18px;text-align:center;background:#fff;color:#4285f4;overflow:hidden}.mod-select-search .select-search-container li.active.focus{background:#1f5dc3;border-color:#1f5dc3}.mod-select-search.select-search-focus .select-search-trigger{border-color:#4285f4;border-bottom-color:#fff;box-shadow:0 0 3px rgba(66,133,244,.5)}.mod-select-search.select-search-focus .select-search-container{border-color:#4285f4;box-shadow:0 0 3px rgba(66,133,244,.5)}.mod-select-search.select-search-focus .select-trigger-san{transform:rotate(180deg);border-top-color:#4285f4}.mod-select-search.select-search-focus:before{content:'';position:absolute;width:100%;height:4px;bottom:0;left:0;background:#fff;border-left:1px solid #4285f4;border-right:1px solid #4285f4;z-index:3}", ""]);

// exports


/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(165);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(168);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(166);

var _domUtil = __webpack_require__(5);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _index = __webpack_require__(16);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoSizeInput = function (_Component) {
	_inherits(AutoSizeInput, _Component);

	function AutoSizeInput() {
		_classCallCheck(this, AutoSizeInput);

		return _possibleConstructorReturn(this, (AutoSizeInput.__proto__ || Object.getPrototypeOf(AutoSizeInput)).apply(this, arguments));
	}

	_createClass(AutoSizeInput, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			var style = void 0,
			    originChange = void 0;
			if (props.type === 'textarea') {
				style = { height: me.getRealHeight() };
				originChange = me.changeHeightValue.bind(me);
			} else {
				style = { width: me.getRealWidth() };
				originChange = me.changeWidthValue.bind(me);
			};
			return React.createElement(_index2["default"], {
				id: 'abc',
				type: props.type,
				onChange: props.onChange,
				onFocus: props.onFocus,
				onBlur: props.onBlur,
				onOriginChange: originChange,
				onKeyDown: props.onKeyDown,
				onKeyUp: props.onKeyUp,
				ref: 'input', style: style,
				value: props.value,
				className: me.getClassName('mod-auto-size-input') });
		}
	}, {
		key: 'changeHeightValue',
		value: function changeHeightValue() {
			var me = this;
			var minHeight = me.props.minHeight;

			var input = me.refs.input.refs.com.refs.input;
			Actions(me).changeHeight(minHeight).then(function () {
				Actions(me).changeHeight(input.scrollHeight);
			});
		}
	}, {
		key: 'getRealHeight',
		value: function getRealHeight() {
			var me = this;
			var _me$props = me.props,
			    height = _me$props.height,
			    minHeight = _me$props.minHeight,
			    maxHeight = _me$props.maxHeight;

			if (height) {
				if (height <= minHeight) {
					return minHeight;
				};
				if (height >= maxHeight) {
					return maxHeight;
				};
				return height;
			} else {
				return minHeight;
			};
		}
	}, {
		key: 'changeWidthValue',
		value: function changeWidthValue() {
			var me = this;
			var minWidth = me.props.minWidth;

			var input = me.refs.input.refs.com.refs.input;
			Actions(me).changeWidth(minWidth).then(function () {
				Actions(me).changeWidth(input.scrollWidth);
			});
		}
	}, {
		key: 'getRealWidth',
		value: function getRealWidth() {
			var me = this;
			var _me$props2 = me.props,
			    width = _me$props2.width,
			    minWidth = _me$props2.minWidth,
			    maxWidth = _me$props2.maxWidth;

			if (width) {
				if (width <= minWidth) {
					return minWidth;
				};
				if (width >= maxWidth) {
					return maxWidth;
				};
				return width;
			} else {
				return minWidth;
			};
		}
	}, {
		key: 'focusInput',
		value: function focusInput() {
			var me = this;
			var input = me.refs.input.refs.com.refs.input;
			var leg = input.value.length;
			_domUtil2["default"].textSelect(input, leg, leg);
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

	return AutoSizeInput;
}(_component2["default"]);

;

exports["default"] = AutoSizeInput;

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(167);
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

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-auto-size-input{background:#fff;border:none;font-size:12px;color:#666}input.mod-auto-size-input,textarea.mod-auto-size-input{height:1.5em;line-height:1.5em}textarea.mod-auto-size-input{resize:none}", ""]);

// exports


/***/ }),

/***/ 168:
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
			width: null,
			height: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onChangeWidth',
		value: function onChangeWidth(width) {
			var me = this;
			var state = me.state;

			state.width = width;
			return me.updateComponent();
		}
	}, {
		key: 'onChangeHeight',
		value: function onChangeHeight(height) {
			var me = this;
			var state = me.state;

			state.height = height;
			return me.updateComponent();
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'AutoSizeInput',
	type: 'input',
	minWidth: 13,
	minHeight: 18,
	maxWidth: 300,
	maxHeight: 180
};
;

exports["default"] = Controller;

/***/ }),

/***/ 169:
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
			selectSearchFocus: false,
			focusNumber: -1,
			value: '',
			list: [],
			originList: []
		}, _temp);
		var state = me.state;

		state.list = state.originList = props.list;
		return _this;
	}

	_createClass(Controller, [{
		key: 'onFocus',
		value: function onFocus(flag) {
			var me = this;
			var state = me.state,
			    props = me.props;

			state.selectSearchFocus = flag;
			// 失去焦点后重置focus
			if (!flag) {
				state.focusNumber = -1;
				state.value = '';
				state.list = state.originList;
			};
			return me.updateComponent().then(function () {
				if (flag) {
					return props.onFocus();
				} else {
					return props.onBlur();
				};
			});
		}
	}, {
		key: 'onDeleteItem',
		value: function onDeleteItem() {
			var me = this;
			var originList = me.state.originList;

			limit.reverse(originList).some(function (val) {
				if (val.selected) {
					val.selected = false;
					return true;
				};
			});
			return me.updateComponent();
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
		key: 'doSelect',
		value: function doSelect() {
			var me = this;
			var state = me.state,
			    props = me.props;

			state.value = '';
			state.list = state.originList;
			var list = state.originList.filter(function (val) {
				return val.selected;
			}).map(function (val) {
				return { key: val.key, value: val.value };
			});
			return me.updateComponent().then(function () {
				return props.onChange(list);
			});
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
	}, {
		key: 'onSelect',
		value: function onSelect(val) {
			var me = this;
			var state = me.state;

			val.selected = !val.selected;
			return me.updateComponent().then(me.doSelect.bind(me));
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'SelectSearch',
	scrollSize: 4,
	onChange: limit.K,
	onFocus: limit.K,
	onBlur: limit.K,
	width: 300,
	notFound: '未找到匹配项'
};
;

exports["default"] = Controller;

/***/ }),

/***/ 170:
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
			indeterminate: false,
			checked: false
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onSetIndeterminate',
		value: function onSetIndeterminate() {
			var me = this;
			var state = me.state;

			state.indeterminate = !state.indeterminate;
			return me.updateComponent();
		}
	}, {
		key: 'onSetChecked',
		value: function onSetChecked() {
			var me = this;
			var state = me.state;

			state.checked = !state.checked;
			return me.updateComponent();
		}
	}, {
		key: 'onClick',
		value: function onClick() {
			var me = this;
			var state = me.state;

			state.indeterminate = true;
			return me.updateComponent();
		}
	}, {
		key: 'onChangeRadio',
		value: function onChangeRadio(e) {
			console.log(e.target.value);
		}
	}, {
		key: 'onChangeCheck',
		value: function onChangeCheck(val, e) {
			console.log(val, e.target);
		}
	}]);

	return Controller;
}(_control2["default"]);

;

exports["default"] = Controller;

/***/ })

});
//# sourceMappingURL=index.js.map