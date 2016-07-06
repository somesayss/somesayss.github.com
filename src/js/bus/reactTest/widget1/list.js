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
	var Actions = require('./controller').Actions;

	// 独立组件
	var Title = require('../widget2/main');

	var List = function (_React$Component) {
		_inherits(List, _React$Component);

		function List() {
			_classCallCheck(this, List);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
		}

		_createClass(List, [{
			key: 'render',
			value: function render() {
				var me = this,
				    props = me.props;
				return React.createElement(
					'div',
					null,
					React.createElement(
						'ul',
						null,
						props.list.map(function (val, key) {
							return React.createElement(
								'li',
								{ key: key },
								val,
								' ',
								React.createElement(
									'a',
									{ href: 'javascript:;', onClick: Actions.listChange.bind(me, key) },
									'改变'
								)
							);
						})
					)
				);
			}
		}]);

		return List;
	}(React.Component);

	;

	return List;
});