webpackJsonp([11],{

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(143);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(152);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(148);
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

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(144);

var _custom = __webpack_require__(146);

var _custom2 = _interopRequireDefault(_custom);

var _form = __webpack_require__(147);

var _form2 = _interopRequireDefault(_form);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

var _formItem = __webpack_require__(149);

var _formItem2 = _interopRequireDefault(_formItem);

var _abc = __webpack_require__(151);

var _abc2 = _interopRequireDefault(_abc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _antd = antd,
    Input = _antd.Input,
    Button = _antd.Button,
    Select = _antd.Select,
    Checkbox = _antd.Checkbox;
var Option = Select.Option;
var CheckboxGroup = Checkbox.Group;

var AntFormView = function (_Component) {
	_inherits(AntFormView, _Component);

	function AntFormView() {
		_classCallCheck(this, AntFormView);

		return _possibleConstructorReturn(this, (AntFormView.__proto__ || Object.getPrototypeOf(AntFormView)).apply(this, arguments));
	}

	_createClass(AntFormView, [{
		key: 'changeHideValue',
		value: function changeHideValue() {
			var me = this;
			var AntFormABC = me.refs.AntFormABC;

			AntFormABC.setFieldsValue({ a5: 'a1' });
		}
	}, {
		key: 'seleceXinqu',
		value: function seleceXinqu(val) {
			var me = this;
			var AntFormABC = me.refs.AntFormABC;

			AntFormABC.setFieldsValue({ a7: val });
			AntFormABC.validateFields(['a7']);
		}
	}, {
		key: 'render',
		value: function render() {
			var me = this;
			var _me$props = me.props,
			    show = _me$props.show,
			    theValue = _me$props.theValue;

			return React.createElement(
				'div',
				{ className: me.getClassName('page-ant-form', 'fn-PA10') },
				React.createElement(
					_form2["default"],
					{ ref: 'AntFormABC', onSuccess: function onSuccess() {
							console.log('success');
						}, onError: function onError() {
							console.log('error');
						}, onChange: function onChange(val) {
							console.log(val, 'xixi');
						} },
					show ? React.createElement(
						'div',
						null,
						React.createElement(
							_formItem2["default"],
							{ name: 'a1',
								rules: [{ required: true, message: '请输入姓名!' }] },
							React.createElement(Input, { style: { width: 200 }, placeholder: '\u8BF7\u8F93\u5165\u59D3\u540D' })
						),
						React.createElement('br', null),
						React.createElement('br', null)
					) : void 0,
					React.createElement(
						_formItem2["default"],
						{ name: 'a2',
							rules: [{ required: true, len: 6, message: '请输入6个数字' }] },
						React.createElement(Input, { style: { width: 200 }, placeholder: '\u8BF7\u9009\u62E9\u6027\u522B' })
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						_formItem2["default"],
						{ name: 'a3',
							rules: [{ required: true, message: '请选择数字' }, { superRule: 'number', message: '请输入纯数字' }] },
						React.createElement(Input, { style: { width: 200 }, placeholder: '\u8BF7\u8F93\u5165\u7EAF\u6570\u5B57' })
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						_formItem2["default"],
						{ name: 'a4',
							initialValue: '',
							rules: [{ required: true, message: '请输入姓名!' }] },
						React.createElement(
							Select,
							{ style: { width: 200 }, placeholder: '\u8BF7\u9009\u62E9' },
							React.createElement(
								Option,
								{ value: '' },
								'\u8BF7\u9009\u62E9'
							),
							React.createElement(
								Option,
								{ value: 'v1' },
								'v11'
							),
							React.createElement(
								Option,
								{ value: 'v2' },
								'v22'
							)
						)
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						_formItem2["default"],
						{ name: 'a5',
							initialValue: '',
							superNowarp: 'true',
							rules: [{ required: true, message: '请输入姓名!' }] },
						React.createElement(
							'div',
							{ style: { width: 200 } },
							'\u9690\u85CF\u57DF',
							React.createElement(
								Button,
								{ className: 'fn-ML10', onClick: me.changeHideValue.bind(me) },
								'\u6539\u53D8\u9690\u85CF\u57DF\u7684\u503C'
							)
						)
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						_formItem2["default"],
						{ name: 'a7',
							trigger: '',
							superNowarp: 'true',
							rules: [{ required: true, message: '请选择兴趣!' }] },
						React.createElement(
							'div',
							{ style: { width: 200 } },
							React.createElement(CheckboxGroup, { options: ['兴趣1', '兴趣2', '兴趣3'], onChange: me.seleceXinqu.bind(me) })
						)
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						_formItem2["default"],
						{ name: 'a8',
							trigger: '',
							rules: [{ required: true, message: '请选择兴趣!' }] },
						React.createElement(_abc2["default"], null)
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						Button,
						{ htmlType: 'submit', className: 'fn-MR10' },
						'\u786E \u5B9A'
					),
					React.createElement(
						Button,
						{ onClick: Actions(me).show, className: 'fn-MR10' },
						'\u9690 \u85CF'
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

	return AntFormView;
}(_component2["default"]);

;

exports["default"] = AntFormView;

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(145);
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

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _antd = antd,
    Button = _antd.Button,
    Input = _antd.Input;

var Custom = function (_Component) {
	_inherits(Custom, _Component);

	function Custom() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Custom);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Custom.__proto__ || Object.getPrototypeOf(Custom)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			value: ''
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Custom, [{
		key: 'render',
		value: function render() {
			var me = this;
			var state = me.state;

			return React.createElement(
				'div',
				null,
				React.createElement(
					Button,
					{ onClick: me.clickChangeValue.bind(me) },
					'\u6539\u53D8\u503C'
				),
				React.createElement(Input, { value: state.value, onChange: me.changeValue.bind(me) })
			);
		}
	}, {
		key: 'clickChangeValue',
		value: function clickChangeValue() {
			var me = this;
			me.setState({ value: 'abc' });
		}
	}, {
		key: 'changeValue',
		value: function changeValue(e) {
			var me = this;
			var state = me.state;

			me.setState({ value: e.target.value });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var me = this;
			console.log(me);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}]);

	return Custom;
}(_component2["default"]);

;

exports["default"] = Custom;

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(140);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _antd = antd,
    Form = _antd.Form;

var AntForm = function (_Component) {
	_inherits(AntForm, _Component);

	function AntForm() {
		_classCallCheck(this, AntForm);

		return _possibleConstructorReturn(this, (AntForm.__proto__ || Object.getPrototypeOf(AntForm)).apply(this, arguments));
	}

	_createClass(AntForm, [{
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			var me = this;
			var _me$props = me.props,
			    onError = _me$props.onError,
			    onSuccess = _me$props.onSuccess;

			e.preventDefault();
			me.props.form.validateFields(function (err, values) {
				if (err) {
					limit.war('验证失败', err);
					onError(err, values);
				} else {
					limit.log('验证成功', values);
					onSuccess(values);
				};
			});
		}
	}, {
		key: 'cloneAllChild',
		value: function cloneAllChild(child) {
			var me = this;
			var props = me.props;
			var getFieldDecorator = props.form.getFieldDecorator;

			var childProps = child.props;
			if (childProps) {
				if (childProps.formItemKey === 'antd') {
					return React.cloneElement(child, { getFieldDecorator: getFieldDecorator });
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
			var getFieldDecorator = props.form.getFieldDecorator;

			return React.createElement(
				Form,
				{ onSubmit: me.handleSubmit.bind(me), layout: 'inline' },
				React.Children.map(props.children, function (child) {
					if (child) {
						return me.cloneAllChild(child);
					};
				})
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

	return AntForm;
}(_component2["default"]);

AntForm.defaultProps = {
	onChange: limit.K,
	onSuccess: limit.K,
	onError: limit.K
};
;

var WrappedNormalLoginForm = Form.create({
	onValuesChange: function onValuesChange(props, val) {
		props.onChange(val, props);
	}
})(AntForm);

exports["default"] = WrappedNormalLoginForm;

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".ant-form-item.ant-form-auto{margin-right:0;width:100%}.ant-form-item.ant-form-auto .ant-form-item-control-wrapper{vertical-align:top;width:100%}.ant-form-item.ant-form-auto.ant-form-item-with-help{margin-bottom:18px}", ""]);

// exports


/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(140);

var _formRules = __webpack_require__(150);

var _formRules2 = _interopRequireDefault(_formRules);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _antd = antd,
    FormItem = _antd.Form.Item;

var AntFormItem = function (_Component) {
	_inherits(AntFormItem, _Component);

	function AntFormItem(props) {
		var _temp, _this;

		_classCallCheck(this, AntFormItem);

		var me = (_temp = (_this = _possibleConstructorReturn(this, (AntFormItem.__proto__ || Object.getPrototypeOf(AntFormItem)).call(this)), _this), _this.state = {
			formItemUid: 'FID' + limit.getTimeUid()
		}, _temp);
		var name = props.name;

		if (!name) {
			limit.war('表单没有"name"属性，请在"AntFormItem"组件上设置name属性');
		};
		return _this;
	}

	_createClass(AntFormItem, [{
		key: 'getSuperRule',
		value: function getSuperRule() {
			var me = this;
			var rules = me.props.rules;

			return limit(rules).map(function (val) {
				var superRule = val.superRule;
				var rule = superRule && _formRules2["default"][superRule];
				if (rule) {
					return { validator: rule, message: val.message };
				} else {
					return val;
				};
			}).filter(limit.K).val();
		}
	}, {
		key: 'render',
		value: function render() {
			var me = this;
			var _me$props = me.props,
			    getFieldDecorator = _me$props.getFieldDecorator,
			    children = _me$props.children,
			    name = _me$props.name,
			    initialValue = _me$props.initialValue,
			    trigger = _me$props.trigger,
			    superNowarp = _me$props.superNowarp,
			    superClassName = _me$props.superClassName,
			    formItemUid = me.state.formItemUid;

			var rules = me.getSuperRule();
			return React.createElement(
				FormItem,
				{ className: superClassName },
				getFieldDecorator(name || formItemUid, {
					rules: rules,
					initialValue: initialValue,
					trigger: trigger || 'onChange'
				})(!superNowarp ? children : React.createElement('span', null)),
				superNowarp ? children : null
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}]);

	return AntFormItem;
}(_component2["default"]);

AntFormItem.defaultProps = {
	formItemKey: 'antd',
	superClassName: 'ant-form-auto'
};
;

exports["default"] = AntFormItem;

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var FormRules = {
	// 纯数字
	number: function number(rule, value, success) {
		if (/^\d+$/.test(value)) {
			success();
		} else {
			success(false);
		};
	}
};

exports["default"] = FormRules;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _antd = antd,
    Input = _antd.Input,
    Button = _antd.Button,
    Select = _antd.Select,
    Checkbox = _antd.Checkbox;

var AntFormView = function (_Component) {
	_inherits(AntFormView, _Component);

	function AntFormView() {
		_classCallCheck(this, AntFormView);

		return _possibleConstructorReturn(this, (AntFormView.__proto__ || Object.getPrototypeOf(AntFormView)).apply(this, arguments));
	}

	_createClass(AntFormView, [{
		key: 'render',
		value: function render() {
			var me = this;
			return React.createElement(Input, { onChange: me.props.onChange });
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

	return AntFormView;
}(_component2["default"]);

AntFormView.defaultProps = {
	onChange: limit.K
};
;

exports["default"] = AntFormView;

/***/ }),

/***/ 152:
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
			show: true,
			theValue: 'abc'
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onShow',
		value: function onShow() {
			var me = this;
			var state = me.state;

			state.show = !state.show;
			return me.updateComponent();
		}
	}, {
		key: 'onChangeValue',
		value: function onChangeValue() {
			var me = this;
			var state = me.state;

			state.theValue = '';
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