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

	// 组件类

	var Page = function (_React$Component) {
		_inherits(Page, _React$Component);

		function Page() {
			_classCallCheck(this, Page);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));

			var me = _this,
			    props = me.props;
			//
			me.style = { overflow: 'hidden', position: 'relative' };
			me.style.width = props.width;
			me.style.height = props.height;
			//
			me.listWidth = props.width * props.imgList.length;
			return _this;
		}

		_createClass(Page, [{
			key: 'render',
			value: function render() {
				var me = this,
				    props = me.props;

				return React.createElement(
					'div',
					{ className: 'react-banner', style: me.style },
					React.createElement(
						'ul',
						{ style: { float: 'left', width: me.listWidth, position: 'relative', left: -props.index * props.width } },
						props.imgList.map(function (val, key) {
							return React.createElement(
								'li',
								{ key: key, style: { float: 'left' } },
								React.createElement('img', { src: val, width: props.width })
							);
						})
					),
					React.createElement(
						'div',
						{ className: 'ch-btn' },
						React.createElement(
							'span',
							null,
							'«'
						),
						props.imgList.map(function (val, key) {
							return React.createElement('span', { key: key, onClick: props.Actions.change.bind(me, key) });
						}),
						React.createElement(
							'span',
							null,
							'»'
						)
					)
				);
			}
		}]);

		return Page;
	}(React.Component);

	;

	return Page;
});