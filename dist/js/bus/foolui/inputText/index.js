webpackJsonp([6,18,19,20],{

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(131);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(134);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(128);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(135);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(136);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(139);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(184);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(197);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(129);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooluiLogo = function (_Component) {
	_inherits(FooluiLogo, _Component);

	function FooluiLogo() {
		_classCallCheck(this, FooluiLogo);

		return _possibleConstructorReturn(this, (FooluiLogo.__proto__ || Object.getPrototypeOf(FooluiLogo)).apply(this, arguments));
	}

	_createClass(FooluiLogo, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			return React.createElement(
				'div',
				{ className: me.getClassName('page-foolui-logo') },
				React.createElement(
					'h2',
					null,
					React.createElement(
						'span',
						{ className: 'fn-FS20 foolui-logo-title fn-MR5' },
						'FOOLUI'
					),
					React.createElement(
						'a',
						{ href: 'javascript:history.back();', className: 'fn-FS12 foolui-logo-back' },
						'\u8FD4\u56DE \xAB'
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

	return FooluiLogo;
}(_component2["default"]);

;

exports["default"] = FooluiLogo;

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(130);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".page-foolui-logo .foolui-logo-title{text-shadow:0 0 1px rgba(0,0,0,.5)}.page-foolui-logo .foolui-logo-back{display:inline-block;margin-top:7px;line-height:14px}.page-foolui-logo .foolui-logo-back:hover{text-decoration-skip:ink;text-decoration:underline}", ""]);

// exports


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(132);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooluiPre = function (_Component) {
	_inherits(FooluiPre, _Component);

	function FooluiPre() {
		_classCallCheck(this, FooluiPre);

		return _possibleConstructorReturn(this, (FooluiPre.__proto__ || Object.getPrototypeOf(FooluiPre)).apply(this, arguments));
	}

	_createClass(FooluiPre, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			return React.createElement(
				'div',
				{ className: me.getClassName('page-foolui-pre') },
				React.createElement(
					'pre',
					null,
					props.children
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

	return FooluiPre;
}(_component2["default"]);

;

exports["default"] = FooluiPre;

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(133);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".page-foolui-pre{font-size:12px;background:#f2f2f2;border:1px dashed #ccc;display:inline-block;border-radius:5px}.page-foolui-pre pre{padding:10px;font-family:Lucida Console,Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;display:inline-block;transform:scale(.882);transform-origin:0 0;margin-bottom:-15px}", ""]);

// exports


/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

;

exports["default"] = Controller;

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

;

exports["default"] = Controller;

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(137);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooluiTable = function (_Component) {
	_inherits(FooluiTable, _Component);

	function FooluiTable() {
		_classCallCheck(this, FooluiTable);

		return _possibleConstructorReturn(this, (FooluiTable.__proto__ || Object.getPrototypeOf(FooluiTable)).apply(this, arguments));
	}

	_createClass(FooluiTable, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			return React.createElement(
				'div',
				{ className: me.getClassName('page-foolui-table') },
				React.createElement(
					'table',
					null,
					React.createElement(
						'tbody',
						null,
						props.children
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

	return FooluiTable;
}(_component2["default"]);

;

exports["default"] = FooluiTable;

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(138);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".page-foolui-table{display:inline-block;border-radius:5px;border:1px dashed #ccc;overflow:hidden}.page-foolui-table table{margin:-1px}.page-foolui-table table td{border:1px dashed #ccc;padding:5px}", ""]);

// exports


/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

;

exports["default"] = Controller;

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(185);

var _index = __webpack_require__(112);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(113);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(114);

var _index6 = _interopRequireDefault(_index5);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

var _index7 = __webpack_require__(187);

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooluiInputText = function (_Component) {
	_inherits(FooluiInputText, _Component);

	function FooluiInputText() {
		_classCallCheck(this, FooluiInputText);

		return _possibleConstructorReturn(this, (FooluiInputText.__proto__ || Object.getPrototypeOf(FooluiInputText)).apply(this, arguments));
	}

	_createClass(FooluiInputText, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			return React.createElement(
				'div',
				{ className: me.getClassName('page-foolui-input-text', 'fn-PA10') },
				React.createElement(_index4["default"], null),
				React.createElement(
					'div',
					{ className: 'fn-PA10' },
					React.createElement(_index8["default"], { value: 'abc', isFocus: true, placeholder: '\u8BF7\u8F93\u5165' })
				),
				React.createElement(
					'div',
					{ className: 'fn-PA10' },
					React.createElement(
						_index2["default"],
						null,
						'\nimport InputText from \'modules/foolui/inputText/index\';\n\nrender(){\n\treturn (\n\t\t<InputText value="abc" isFocus={true} placeholder="\u8BF7\u8F93\u5165" />\n\t);\n}\n\t\t\t\t\t'
					)
				),
				React.createElement(
					'div',
					{ className: 'fn-PA10' },
					React.createElement(
						_index6["default"],
						{ className: 'fn-MR10' },
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'\u5C5E\u6027'
							),
							React.createElement(
								'td',
								null,
								'\u8BF4\u660E'
							),
							React.createElement(
								'td',
								null,
								'\u9ED8\u8BA4\u503C'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'type'
							),
							React.createElement(
								'td',
								null,
								'\u7C7B\u578B\uFF1A\'text\',\'number\',\'password\',\'enword\',\'cnword\' ',
								React.createElement('br', null),
								'\'number\'\uFF1A\u6570\u5B57 ',
								React.createElement('br', null),
								'\'enword\'\uFF1A\u6570\u5B57,_,\u5B57\u6BCD ',
								React.createElement('br', null),
								'\'cnword\'\uFF1A\u5E38\u7528\u4E2D\u6587'
							),
							React.createElement(
								'td',
								null,
								'\'text\''
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'value'
							),
							React.createElement(
								'td',
								null,
								'\u8D4B\u503C'
							),
							React.createElement(
								'td',
								null,
								'\'\''
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'width'
							),
							React.createElement(
								'td',
								null,
								'\u5BBD\u5EA6'
							),
							React.createElement(
								'td',
								null,
								'300'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'height'
							),
							React.createElement(
								'td',
								null,
								'\u9AD8\u5EA6'
							),
							React.createElement(
								'td',
								null,
								'30'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'defaultValue'
							),
							React.createElement(
								'td',
								null,
								'\u9ED8\u8BA4\u503C'
							),
							React.createElement(
								'td',
								null,
								'\'\''
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'placeholder'
							),
							React.createElement(
								'td',
								null,
								'\u5360\u4F4D\u7B26'
							),
							React.createElement(
								'td',
								null,
								'\'\''
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'placeholderSize'
							),
							React.createElement(
								'td',
								null,
								'\u5360\u4F4D\u7B26\u6700\u5927\u957F\u5EA6'
							),
							React.createElement(
								'td',
								null,
								'5'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'error'
							),
							React.createElement(
								'td',
								null,
								'\u9519\u8BEF\u4FE1\u606F'
							),
							React.createElement(
								'td',
								null,
								'\'\''
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'readOnly'
							),
							React.createElement(
								'td',
								null,
								'\u53EA\u8BFB'
							),
							React.createElement(
								'td',
								null,
								'false'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'disabled'
							),
							React.createElement(
								'td',
								null,
								'\u4E0D\u53EF\u7528'
							),
							React.createElement(
								'td',
								null,
								'false'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'isFocus'
							),
							React.createElement(
								'td',
								null,
								'\u662F\u5426\u843D\u7126\u70B9'
							),
							React.createElement(
								'td',
								null,
								'false'
							)
						)
					),
					React.createElement(
						_index6["default"],
						null,
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'\u65B9\u6CD5'
							),
							React.createElement(
								'td',
								null,
								'\u8BF4\u660E'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'onChange'
							),
							React.createElement(
								'td',
								null,
								'\u53C2\u65701\uFF1Avalue\uFF0C\u53C2\u65702\uFF1Aevent'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'onFocus'
							),
							React.createElement(
								'td',
								null,
								'\u53C2\u65701\uFF1Aevent'
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								'onBlur'
							),
							React.createElement(
								'td',
								null,
								'\u53C2\u65701\uFF1Aevent'
							)
						)
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

	return FooluiInputText;
}(_component2["default"]);

;

exports["default"] = FooluiInputText;

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(186);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(188);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(196);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(189);

var _domUtil = __webpack_require__(5);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(191);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooluiInputText = function (_Component) {
	_inherits(FooluiInputText, _Component);

	function FooluiInputText() {
		_classCallCheck(this, FooluiInputText);

		return _possibleConstructorReturn(this, (FooluiInputText.__proto__ || Object.getPrototypeOf(FooluiInputText)).apply(this, arguments));
	}

	_createClass(FooluiInputText, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;
			var isFocus = props.isFocus,
			    placeholderSize = props.placeholderSize,
			    disabled = props.disabled;

			var operateContent = me.getOperateContent();
			return React.createElement(
				'div',
				{
					style: { width: props.width, height: props.height },
					className: me.getClassName('mod-foolui-input-text', disabled ? 'foolui-input-text-disabled' : '', isFocus ? 'foolui-input-text-focus' : '', operateContent.key) },
				React.createElement(
					'div',
					{ className: 'foolui-input-text-table' },
					React.createElement(
						'div',
						{ className: 'foolui-input-text-tablecell' },
						React.createElement(_index2["default"], {
							ref: 'input',
							className: 'foolui-input-text-input',
							onFocus: Actions(me).focus.bind(null, true),
							onBlur: Actions(me).focus.bind(null, false),
							onChange: Actions(me).change,
							readOnly: props.readOnly,
							disabled: props.disabled,
							value: props.value })
					),
					React.createElement(
						'div',
						{ className: 'foolui-input-text-tablecell input-text-dosome' },
						React.createElement(
							'div',
							{ className: 'foolui-input-text-table' },
							React.createElement(
								'div',
								{
									className: 'foolui-input-text-tablecell foolui-input-text-content',
									title: operateContent.key && operateContent.value.length > placeholderSize ? operateContent.value : '' },
								operateContent.key ? limit.wordWrap(operateContent.value, placeholderSize) : operateContent.value
							)
						)
					)
				)
			);
		}
	}, {
		key: 'getDoSome',
		value: function getDoSome() {
			var me = this;
			var type = me.props.type;

			return React.createElement(
				'span',
				null,
				type === 'password' ? React.createElement('a', { className: 'foolui-input-text-eye', href: 'javascript:;', onClick: me.doSeePassword.bind(me), tabIndex: '-1' }) : void 0,
				React.createElement(
					'a',
					{ className: 'foolui-input-text-close', href: 'javascript:;', onClick: me.doClearValue.bind(me), tabIndex: '-1' },
					'\xd7'
				)
			);
		}
	}, {
		key: 'getOperateContent',
		value: function getOperateContent() {
			var me = this;
			var _me$props = me.props,
			    value = _me$props.value,
			    error = _me$props.error,
			    placeholder = _me$props.placeholder;

			if (error) {
				return { key: 'foolui-input-text-error', value: error };
			};
			if (!value && placeholder) {
				return { key: 'foolui-input-text-placeholder', value: placeholder };
			};
			if (value) {
				return { key: '', value: me.getDoSome() };
			};
			return { key: '', value: '' };
		}
	}, {
		key: 'getRealInput',
		value: function getRealInput() {
			var me = this;
			var input = me.refs.input.refs.com.refs.input;

			return input;
		}
	}, {
		key: 'doClearValue',
		value: function doClearValue() {
			var me = this;
			var input = me.getRealInput();
			return Actions(me).clearValue().then(function () {
				var length = input.value.length;
				return _domUtil2["default"].textSelect(input, length, length);
			});
		}
	}, {
		key: 'doSeePassword',
		value: function doSeePassword() {
			var me = this;
			var input = me.getRealInput();
			if (input.type === 'text') {
				input.type = 'password';
			} else {
				input.type = 'text';
			};
			var length = input.value.length;
			_domUtil2["default"].textSelect(input, length, length);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var me = this;
			var _me$props2 = me.props,
			    type = _me$props2.type,
			    isFocus = _me$props2.isFocus;

			if (type === 'password') {
				me.getRealInput().type = 'password';
			};
			if (isFocus) {
				var input = me.getRealInput();
				var length = input.value.length;
				return _domUtil2["default"].textSelect(input, length, length);
			};
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}]);

	return FooluiInputText;
}(_component2["default"]);

;

exports["default"] = FooluiInputText;

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-foolui-input-text{display:inline-block;border:1px solid #ccc;transition:all .2s ease 0s;border-radius:3px}.mod-foolui-input-text .foolui-input-text-table{display:table;height:100%;width:100%}.mod-foolui-input-text .foolui-input-text-tablecell{display:table-cell;height:100%;vertical-align:middle;text-align:center}.mod-foolui-input-text .foolui-input-text-input{width:100%;height:100%;border:none;font-size:12px;padding:0 0 0 5px;border-radius:5px;color:#666}.mod-foolui-input-text .foolui-input-text-close{font-size:14px;color:#666;display:inline-block;height:14px;overflow:hidden;line-height:14px}.mod-foolui-input-text .foolui-input-text-eye{display:inline-block;width:8px;height:8px;margin:3px 2px 0 0;background:#666;border-radius:50px;border:1px solid #666}.mod-foolui-input-text .foolui-input-text-content{padding:0 2px}.mod-foolui-input-text.foolui-input-text-placeholder .input-text-dosome{color:#fff;height:100%;padding:2px}.mod-foolui-input-text.foolui-input-text-placeholder .input-text-dosome .foolui-input-text-table{border-radius:3px;background:#666}.mod-foolui-input-text.foolui-input-text-focus{border:1px solid #4285f4;box-shadow:0 0 3px #a2c3fa}.mod-foolui-input-text.foolui-input-text-focus .foolui-input-text-close{color:#4285f4}.mod-foolui-input-text.foolui-input-text-focus .foolui-input-text-eye{background:#4285f4;border:1px solid #4285f4}.mod-foolui-input-text.foolui-input-text-focus.foolui-input-text-placeholder .input-text-dosome .foolui-input-text-table{background:#4285f4}.mod-foolui-input-text.foolui-input-text-error{border:1px solid red;box-shadow:0 0 3px #f66}.mod-foolui-input-text.foolui-input-text-error .input-text-dosome{color:#fff;height:100%;padding:2px}.mod-foolui-input-text.foolui-input-text-error .input-text-dosome .foolui-input-text-table{border-radius:3px;background:red}.mod-foolui-input-text.foolui-input-text-disabled,.mod-foolui-input-text.foolui-input-text-disabled .foolui-input-text-input{cursor:not-allowed}.mod-foolui-input-text.foolui-input-text-disabled .input-text-dosome .foolui-input-text-table{background:#b3b3b3}", ""]);

// exports


/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(192);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(195);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(193);

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
			return Actions(me).change(e.target.value, me.compositionstart, e);
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

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(194);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".mod-input-text{background:red}", ""]);

// exports


/***/ }),

/***/ 195:
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
		value: function onChange(val, compositionstart, e) {
			var me = this;
			var copyEvent = limit.assign({}, e);
			me.state.value = val;
			return me.updateComponent().then(function () {
				me.props.onOriginChange(val);
				if (!compositionstart) {
					me.props.onChange(val, copyEvent);
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

/***/ 196:
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
			value: '',
			isFocus: false
		}, _temp);
		if (props.value) {
			props.defaultValue = props.value;
		} else if (props.defaultValue) {
			me.state.value = props.defaultValue;
		};
		return _this;
	}

	_createClass(Controller, [{
		key: 'checkValue',
		value: function checkValue(val) {
			var me = this;
			var type = me.props.type;

			var checkMap = {
				'number': /^\d+$/,
				'enword': /^\w+$/,
				'cnword': /^[\u4E00-\u9FA5]+$/
			};
			var check = checkMap[type];
			if (val && check) {
				return check.test(val);
			};
			return true;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(isFocus, e) {
			var me = this;
			var state = me.state,
			    props = me.props;

			state.isFocus = isFocus;
			var copyEvent = limit.assign({}, e);
			return me.updateComponent().then(function () {
				if (isFocus) {
					props.onFocus(copyEvent);
				} else {
					props.onBlur(copyEvent);
				};
			});
		}
	}, {
		key: 'onChange',
		value: function onChange(val, e) {
			var me = this;
			var state = me.state,
			    props = me.props;

			if (me.checkValue(val)) {
				state.value = val;
				return me.updateComponent().then(function () {
					return props.onChange(val, e);
				});
			} else {
				return me.updateComponent();
			};
		}
	}, {
		key: 'onClearValue',
		value: function onClearValue() {
			var me = this;
			var state = me.state;

			state.value = '';
			return me.updateComponent();
		}
	}]);

	return Controller;
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'FooluiInputText',
	defaultValue: '',
	onChange: limit.K,
	onFocus: limit.K,
	onBlur: limit.K,
	placeholder: '',
	placeholderSize: 5,
	error: '',
	type: 'text',
	width: 300,
	height: 30,
	readOnly: false,
	disabled: false
};
;

exports["default"] = Controller;

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

;

exports["default"] = Controller;

/***/ })

});
//# sourceMappingURL=index.js.map