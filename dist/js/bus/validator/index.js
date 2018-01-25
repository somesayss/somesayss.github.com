webpackJsonp([10],{

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(263);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(273);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(264);

var _index = __webpack_require__(14);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(266);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 组件类
var View = function (_React$Component) {
	_inherits(View, _React$Component);

	function View() {
		_classCallCheck(this, View);

		return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
	}

	_createClass(View, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;
			var originData = props.originData;

			return React.createElement(
				'div',
				{ className: 'form fn-PA15' },
				React.createElement(
					_index4["default"],
					{ executeSuccess: Actions(me).success },
					React.createElement(_index2["default"], { type: 'text',
						onChange: Actions(me).change.bind(null, 'name'),
						value: originData.name,
						placeholder: '\u8BF7\u586B\u5199\u59D3\u540D',
						rule: 'required',
						errMessage: '\u59D3\u540D\u5FC5\u586B',
						name: 'name' }),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(_index2["default"], { type: 'number',
						onChange: Actions(me).change.bind(null, 'number'),
						value: originData.number,
						placeholder: '\u8BF7\u586B\u5199\u6570\u5B57',
						rule: 'required',
						errMessage: '\u6570\u5B57\u5FC5\u586B',
						name: 'number' }),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(_index2["default"], { type: 'password',
						onChange: Actions(me).change.bind(null, 'pwd'),
						value: originData.pwd,
						placeholder: '\u8BF7\u586B\u5199\u5BC6\u7801',
						rule: 'required,min(3),max(8)',
						errMessage: '\u5BC6\u7801\u5FC5\u586B,\u6700\u5C0F\u4E09\u4F4D,\u6700\u59278\u4F4D',
						name: 'pwd' }),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(_index2["default"], { type: 'password',
						placeholder: '\u8BF7\u586B\u5199\u76F8\u540C\u7684\u5BC6\u7801',
						rule: function rule(val) {
							if (val === '') {
								return '请填写密码';
							};if (val !== originData.pwd) {
								return '请填写相同的密码';
							}
						},
						name: 'pwd1' }),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(_index2["default"], { type: 'calendar',
						onChange: Actions(me).change.bind(null, 'time'),
						value: originData.time,
						placeholder: '\u8BF7\u9009\u62E9\u65E5\u671F',
						rule: 'required',
						errMessage: '\u65E5\u671F\u5FC5\u586B',
						name: 'time' }),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(_index2["default"], { type: 'calendarRange',
						onChange: Actions(me).change.bind(null, 'timeRange'),
						value: originData.timeRange,
						placeholder: '\u8BF7\u9009\u62E9\u65E5\u671F\u533A\u95F4',
						rule: 'required',
						errMessage: '\u65E5\u671F\u5FC5\u586B',
						name: 'timeRange' }),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						_index2["default"],
						{ type: 'select',
							onChange: Actions(me).change.bind(null, 'age'),
							value: originData.age,
							rule: 'required',
							errMessage: '\u8BF7\u9009\u62E9',
							name: 'age' },
						React.createElement(
							'option',
							{ value: '' },
							'\u8BF7\u9009\u62E9'
						),
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
						)
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						_index2["default"],
						{ type: 'multiple',
							onChange: Actions(me).change.bind(null, 'duoxuan'),
							value: originData.duoxuan,
							rule: 'required',
							errMessage: '\u8BF7\u9009\u62E9',
							placeholder: '\u8BF7\u9009\u62E9',
							name: 'duoxuan' },
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
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(_index2["default"], { type: 'file', name: 'file', value: '\u4E0A \u4F20' }),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(_index2["default"], { type: 'textarea',
						onChange: Actions(me).change.bind(null, 'content'),
						rule: 'required,max(11)',
						errMessage: '\u6587\u672C\u4E0D\u80FD\u4E3A\u7A7A,\u6700\u5927\u957F\u5EA611',
						placeholder: '\u8BF7\u586B\u5199\u6587\u672C',
						value: originData.content,
						name: 'content' }),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						'label',
						{ className: 'fn-MR5' },
						React.createElement(_index2["default"], { type: 'checkbox', name: 'a1', onChange: Actions(me).changeChecked, value: 'a1', defaultChecked: 'true', className: 'fn-MR5' }),
						'\u5929\u732B1'
					),
					React.createElement(
						'label',
						{ className: 'fn-MR5' },
						React.createElement(_index2["default"], { type: 'checkbox', name: 'a2', onChange: Actions(me).changeChecked, value: 'a2', className: 'fn-MR5' }),
						'\u5929\u732B2'
					),
					React.createElement(
						'label',
						{ className: 'fn-MR5' },
						React.createElement(_index2["default"], { type: 'checkbox', name: 'a3', onChange: Actions(me).changeChecked, value: 'a3', className: 'fn-MR5' }),
						'\u5929\u732B3'
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						'label',
						{ className: 'fn-MR5' },
						React.createElement(_index2["default"], { type: 'radio', name: 'a2', onChange: Actions(me).changeChecked, value: 'a4', defaultChecked: 'true', className: 'fn-MR5' }),
						'\u5929\u732B4'
					),
					React.createElement(
						'label',
						{ className: 'fn-MR5' },
						React.createElement(_index2["default"], { type: 'radio', name: 'a2', onChange: Actions(me).changeChecked, value: 'a5', className: 'fn-MR5' }),
						'\u5929\u732B5'
					),
					React.createElement(
						'label',
						{ className: 'fn-MR5' },
						React.createElement(_index2["default"], { type: 'radio', name: 'a2', onChange: Actions(me).changeChecked, value: 'a6', className: 'fn-MR5' }),
						'\u5929\u732B6'
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(_index2["default"], { type: 'submit', value: '\u786E \u5B9A' }),
					React.createElement(_index2["default"], { type: 'reset', className: 'fn-ML5', value: '\u91CD \u7F6E' }),
					React.createElement(_index2["default"], { type: 'button', className: 'fn-ML5', value: '\u70B9 \u51FB' })
				)
			);
		}
	}]);

	return View;
}(React.Component);

;

exports["default"] = View;

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(265);
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

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(267);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(270);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(268);

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
		key: 'cloneAllChild',
		value: function cloneAllChild(child) {
			var me = this;
			var props = me.props;

			var childProps = child.props;
			if (childProps) {
				if (childProps.actionId === 'limitForm') {
					return React.cloneElement(child, { validaor: props.validaor });
				};
				if (childProps.children) {
					return React.cloneElement(child, {}, React.Children.map(childProps.children, function (child) {
						return me.cloneAllChild(child);
					}));
				};
			};
			return child;
		}
	}, {
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			return React.createElement(
				'form',
				{ ref: 'form', action: props.action, onSubmit: Actions(me).submit, onReset: Actions(me).reset },
				React.Children.map(props.children, function (child) {
					return me.cloneAllChild(child);
				})
			);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var me = this;
			var props = me.props;

			props.validaor.destroy();
		}
	}]);

	return View;
}(_component2["default"]);

;

exports["default"] = View;

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(269);
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

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listener = __webpack_require__(271);

var _listener2 = _interopRequireDefault(_listener);

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
			validaor: new _listener2["default"]()
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onSubmit',
		value: function onSubmit(e) {
			var me = this;
			var state = me.state,
			    props = me.props;

			var hasErr = state.validaor.execute();
			if (hasErr) {
				e.preventDefault();
				props.executeError();
			} else {
				props.executeSuccess();
			};
		}
	}, {
		key: 'onReset',
		value: function onReset() {
			var me = this;
			var state = me.state,
			    props = me.props;

			state.validaor.reset();
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	action: 'javascript:;',
	executeSuccess: limit.K,
	executeError: limit.K
};
;

exports["default"] = Controller;

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = __webpack_require__(272);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var returnTrue = function returnTrue() {
	return true;
};

var REGRULE = /(\w+)(?:\((.*)?\))?/;

var Listener = function (_limit$Events) {
	_inherits(Listener, _limit$Events);

	function Listener(config) {
		var _temp, _this;

		_classCallCheck(this, Listener);

		var me = (_temp = (_this = _possibleConstructorReturn(this, (Listener.__proto__ || Object.getPrototypeOf(Listener)).call(this)), _this), _this.props = {
			// 原始数据
			originData: {},
			// 验证对象
			validatMap: {}
		}, _temp);
		limit.assign(me.state, me.props, config);
		return _this;
	}

	_createClass(Listener, [{
		key: 'removeData',
		value: function removeData(key) {
			var me = this;
			var state = me.state;

			delete state.originData[key];
		}
	}, {
		key: 'addData',
		value: function addData(key, val) {
			var me = this;
			var state = me.state;

			state.originData[key] = val;
		}
	}, {
		key: 'getData',
		value: function getData(key) {
			var me = this;
			var state = me.state;

			return state.originData[key];
		}
	}, {
		key: 'addMap',
		value: function addMap(key, rule, errMessage) {
			var me = this;
			var state = me.state;
			// 如果是函数直接入

			if (limit.isFunction(rule)) {
				state.validatMap[key] = rule;
			} else {
				var ruleList = rule.split(',');
				var errMessageList = errMessage.split(',');
				state.validatMap[key] = function (val) {
					var message = void 0;
					ruleList.filter(limit.K).every(function (rule, key) {
						var ruleMatch = rule.match(REGRULE);
						var ruleFun = me.getRuleFunByRule(ruleMatch[1]);
						var ruleArg = me.getRuleArgByRuleAndVal(ruleMatch[2], val);
						var rtv = ruleFun.apply(undefined, _toConsumableArray(ruleArg));
						if (!rtv) {
							message = errMessageList[key];
						};
						return rtv;
					});
					return message;
				};
			};
		}
	}, {
		key: 'getMap',
		value: function getMap(key) {
			var me = this;
			var state = me.state;

			return state.validatMap[key];
		}
		// 通过rule获取函数

	}, {
		key: 'getRuleFunByRule',
		value: function getRuleFunByRule(rule) {
			var fun = _map2["default"][rule];
			if (fun) {
				return fun;
			} else {
				return returnTrue;
			};
		}
		// 获取参数

	}, {
		key: 'getRuleArgByRuleAndVal',
		value: function getRuleArgByRuleAndVal(rule, val) {
			if (rule) {
				rule = rule.split(',').map(function (v) {
					return JSON.parse(v);
				});
				return [val].concat(_toConsumableArray(rule));
			} else {
				return [val];
			};
		}
		// 验证

	}, {
		key: 'executeData',
		value: function executeData() {
			var me = this;
			var state = me.state;
			var originData = state.originData,
			    validatMap = state.validatMap;

			var errBackArr = [];
			limit.each(validatMap, function (val, key) {
				var dataVal = originData[key];
				if (limit.isDefined(dataVal)) {
					var err = val(dataVal);
					if (err) {
						val = dataVal;
						errBackArr.push({ key: key, val: val, err: err });
					};
				};
			});
			var hasErr = errBackArr.length;
			if (errBackArr.length) {
				limit.war(errBackArr);
				me.emit('error', errBackArr);
			} else {
				me.emit('success');
			};
			return !!hasErr;
		}
		// 验证

	}, {
		key: 'execute',
		value: function execute() {
			var me = this;
			var state = me.state;
			var originData = state.originData,
			    validatMap = state.validatMap;
			// 验证表单

			limit.each(validatMap, function (val, key) {
				me.emit(key + 'Validat');
			});
			// 验证数据
			return me.executeData();
		}
		// 重置

	}, {
		key: 'reset',
		value: function reset(e) {
			var me = this;
			var state = me.state;
			var originData = state.originData,
			    validatMap = state.validatMap;
			// 验证表单

			limit.each(validatMap, function (val, key) {
				me.emit(key + 'Reset');
			});
		}
	}]);

	return Listener;
}(limit.Events);

exports["default"] = Listener;

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Map = {};

// 必填
Map.required = function (val) {
	return val !== '';
};
// 数字
Map.number = function (val) {
	return (/^\d*$/.test(val)
	);
};
// 最小几个数字
Map.min = function (val, num) {
	return val === '' || replaceEnter(val).length >= num;
};
// 最多几个数字
Map.max = function (val, num) {
	return val === '' || replaceEnter(val).length <= num;
};

// 帮组：IE8 textarea \r\n换行导致字数计算有差错
var REX_ENTER = /\r/g;
function replaceEnter(val) {
	return val.replace(REX_ENTER, '');
};

exports["default"] = Map;

/***/ }),

/***/ 273:
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
			originData: {
				name: '',
				age: '',
				pwd: '',
				content: '',
				number: '',
				time: '',
				timeRange: '',
				duoxuan: ''
			},
			isHideAge: false
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onHideAge',
		value: function onHideAge() {
			var me = this;
			me.state.isHideAge = !me.state.isHideAge;
			me.updateComponent();
		}
	}, {
		key: 'onSuccess',
		value: function onSuccess() {
			var me = this;
		}
	}, {
		key: 'onChange',
		value: function onChange(name, val, e) {
			var me = this;
			var originData = me.state.originData;
			// if( val.target ){
			// originData[name] = val.target.value;
			// }else{
			originData[name] = val;
			// };
			return me.updateComponent();
		}
	}]);

	return Controller;
}(_control2["default"]);

;

exports["default"] = Controller;

/***/ })

});
//# sourceMappingURL=index.js.map