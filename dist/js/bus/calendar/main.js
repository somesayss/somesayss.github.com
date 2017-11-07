webpackJsonp([2],{

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(113);

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(21);

var _index2 = _interopRequireDefault(_index);

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

			return React.createElement(
				'div',
				{ className: me.getClassName('page-calendar') },
				React.createElement(_index2["default"], null),
				React.createElement(
					'button',
					{ onClick: Actions(me).change },
					'\u5207 \u6362'
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

	return Calendar;
}(_component2["default"]);

;

module.exports = Calendar;

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(2);

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
			time: '2017-08-01'
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onChange',
		value: function onChange() {
			var me = this;
			var state = me.state;

			state.time = '2017-10-01';
			return me.updateComponent();
		}
	}]);

	return Controller;
}(_control2["default"]);

;

module.exports = Controller;

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(112);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(114);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(28);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(30);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),

/***/ 23:
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

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(29);

var _component = __webpack_require__(3);

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

			console.log(yearMonthStr);
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

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(2);

var _control2 = _interopRequireDefault(_control);

var _index = __webpack_require__(23);

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

/***/ })

});
//# sourceMappingURL=main.js.map