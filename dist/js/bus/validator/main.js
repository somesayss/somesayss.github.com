webpackJsonp([1],Array(18).concat([
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(103);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(111);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 19 */,
/* 20 */
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

exports["default"] = domUtil;

/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(26);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(42);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(33);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(69);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(36);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(38);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(41);

var _index = __webpack_require__(27);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(3);

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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 30 */
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

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(39);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(43);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(51);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(53);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(34);

var _checkbox = __webpack_require__(35);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _domUtil = __webpack_require__(20);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(25);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(31);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(44);

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(48);

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(55);

var _index10 = _interopRequireDefault(_index9);

var _index11 = __webpack_require__(61);

var _index12 = _interopRequireDefault(_index11);

var _index13 = __webpack_require__(65);

var _index14 = _interopRequireDefault(_index13);

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
		value: function doOriginFun(val, e, args) {
			var me = this;
			var props = me.props;

			var originFun = props[val];
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
			['onFocus', 'onBlur', 'onChange'].forEach(function (val) {
				newProps[val] = function (e) {
					var fun = Actions(me)['' + props.type + val.slice(2)];

					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					if (fun) {
						fun.apply(undefined, [e].concat(args)).then(me.doOriginFun.bind(me, val, e, args));
					} else {
						var _Actions;

						(_Actions = Actions(me))['' + val.slice(2).toLowerCase()].apply(_Actions, [e].concat(args)).then(me.doOriginFun.bind(me, val, e, args));
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
				_index4["default"],
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
				React.createElement(_index10["default"], me.parseProps())
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
				React.createElement(_index2["default"], _extends({}, me.parseProps(), { ref: 'input' }))
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
				React.createElement(_index6["default"], me.parseProps())
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
					_index8["default"],
					_extends({}, me.parseProps(), { width: '100%', className: 'limit-form-' + props.type }),
					props.children
				)
			);
		}
	}, {
		key: 'checkboxRender',
		value: function checkboxRender() {
			var me = this;
			return React.createElement(_checkbox2["default"], me.parseProps());
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
				React.createElement(_index12["default"], me.parseProps())
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
				React.createElement(_index14["default"], parseProps)
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 组件类
var Checkbox = function (_React$Component) {
	_inherits(Checkbox, _React$Component);

	function Checkbox() {
		_classCallCheck(this, Checkbox);

		return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
	}

	_createClass(Checkbox, [{
		key: "render",
		value: function render() {
			var me = this;
			return React.createElement("input", _extends({ ref: "input" }, me.props, { type: "Checkbox" }));
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var me = this;
			var input = me.refs.input,
			    indeterminate = me.props.indeterminate;

			input.indeterminate = !!indeterminate;
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			var me = this;
			me.componentDidMount();
		}
	}]);

	return Checkbox;
}(React.Component);

;

exports["default"] = Checkbox;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(37);

var _component = __webpack_require__(3);

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
					className: me.getClassName('mod-button', props.isClick ? 'button-clicked' : null, me.getButtonColor()),
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

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
	value: '按 钮',
	onClick: limit.K
};
;

exports["default"] = Controller;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(40);

var _index = __webpack_require__(22);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(3);

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
							}, 100);
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
/* 43 */
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(47);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(46);

var _index = __webpack_require__(27);

var _index2 = _interopRequireDefault(_index);

var _view = __webpack_require__(26);

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(49);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(54);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(50);

var _index = __webpack_require__(32);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(22);

var _index4 = _interopRequireDefault(_index3);

var _component = __webpack_require__(3);

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
							}, 100);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(52);

var _component = __webpack_require__(3);

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

	return View;
}(_component2["default"]);

;

exports["default"] = View;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

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
}(_control2["default"]);

Controller.defaultProps = {
	actionId: 'InputText',
	onChange: limit.K
};
;

exports["default"] = Controller;

/***/ }),
/* 54 */
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

		state.list = state.originList = me.parseListByChildren(props);
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
		value: function parseListByChildren(props) {
			var me = this;
			var state = me.state;

			var propsValue = limit.isArray(props.value) ? props.value : props.value.split(',');
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

			state.list = state.originList = me.parseListByChildren(nextState);
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
	width: 300,
	height: 30,
	readOnly: true
};
;

module.exports = Controller;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(56);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(60);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(57);

var _index = __webpack_require__(25);

var _index2 = _interopRequireDefault(_index);

var _domUtil = __webpack_require__(20);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _index3 = __webpack_require__(58);

var _index4 = _interopRequireDefault(_index3);

var _component = __webpack_require__(3);

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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domUtil = __webpack_require__(20);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _index = __webpack_require__(59);

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
/* 59 */
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(62);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(64);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(63);

var _index = __webpack_require__(21);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(3);

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
						}, 100);
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
		value: function componentWillUnmount() {}
	}]);

	return CalendarInput;
}(_component2["default"]);

;

module.exports = CalendarInput;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 64 */
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _view = __webpack_require__(66);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(68);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(67);

var _domUtil = __webpack_require__(20);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _index = __webpack_require__(21);

var _index2 = _interopRequireDefault(_index);

var _component = __webpack_require__(3);

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
						}, _domUtil2["default"].isIEOld(100, 200));
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(2);

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
			if (props.type === 'file') {
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
				validaor.on(props.name + 'Reset', function () {
					var validaorState = validaor.state;
					var originData = validaorState.originData;
					originData[props.name] = me.state.value = originVal;
					me.state.validaorError = null;
					me.updateComponent().then(function () {
						me.props.onChange(originVal);
					});
				});
			};
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
	actionId: 'limitForm',
	onChange: limit.K
};
;

exports["default"] = Controller;

/***/ }),
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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(104);

var _index = __webpack_require__(24);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(105);

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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(106);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(1);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(108);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(107);

var _component = __webpack_require__(3);

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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, , ""]);

// exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listener = __webpack_require__(109);

var _listener2 = _interopRequireDefault(_listener);

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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = __webpack_require__(110);

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
/* 110 */
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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 依赖

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
]));
//# sourceMappingURL=main.js.map