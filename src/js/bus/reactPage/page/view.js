"use strict";
/**
 * 模型
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {

	// 依赖
	var React = require('react');
	var limit = require('common/limit2.0');
	// const Actions = require('./controller').Actions;

	var Page = function (_React$Component) {
		_inherits(Page, _React$Component);

		function Page() {
			_classCallCheck(this, Page);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));

			var me = _this,
			    props = me.props;
			me.diffList = me.getDiffList();
			return _this;
		}

		_createClass(Page, [{
			key: 'render',
			value: function render() {
				var me = this,
				    props = me.props,
				    length = ~ ~props.totle,
				    page = ~ ~props.page;
				// 如果length是0
				if (length <= 0) {
					return React.createElement('div', null);
				};
				if (page <= 0) {
					page = 1;
				};
				return React.createElement(
					'div',
					null,
					me.getAllList().map(function (val, key) {
						return val === '...' ? React.createElement(
							'span',
							{ key: key },
							val
						) : React.createElement(
							'a',
							{ key: key, href: 'javascript:;', className: page === val ? 'active' : null },
							val
						);
					})
				)

				/*
    onClick={me.Actions.change.bind(me, val)}
     */
				;
			}
		}, {
			key: 'getDiffList',
			value: function getDiffList() {
				var me = this,
				    props = me.props,
				    diff = ~ ~props.diff,
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
				    page = ~ ~props.page,
				    length = ~ ~props.totle,
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
				}).union().valueOf();
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

	return Page;
});