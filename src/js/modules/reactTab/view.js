"use strict";
/**
 * 模型
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {
	var React = require('react');

	var ReactDOM = require('reactDOM');

	var ReactForm = require('modules/reactForm/main');

	var limit = require('limit');

	var SchoolActions = require('./controller').Actions;

	limit.logClosed = true;

	var School = function (_React$Component) {
		_inherits(School, _React$Component);

		function School() {
			_classCallCheck(this, School);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(School).apply(this, arguments));
		}

		_createClass(School, [{
			key: 'enterPressHandle',
			value: function enterPressHandle() {
				var me = this,
				    props = me.props;
				if (props.editorNum === null) {
					SchoolActions.add();
				} else {
					SchoolActions.save();
				};
			}
		}, {
			key: 'editHandle',
			value: function editHandle(e) {
				var me = this;
				SchoolActions.edit(e);
				me.refs.input.refs.input.focus();
			}
		}, {
			key: 'render',
			value: function render() {
				var me = this,
				    props = me.props;
				return React.createElement(
					'div',
					{ className: 'fn-FoSiEm12' },
					React.createElement(
						'table',
						{ className: 'fn-table fn-table-data fn-LiHeEm20', width: '200' },
						React.createElement(
							'thead',
							null,
							React.createElement(
								'tr',
								null,
								React.createElement(
									'th',
									{ width: '30' },
									'序号'
								),
								React.createElement(
									'th',
									null,
									'姓名'
								),
								React.createElement(
									'th',
									{ width: '60' },
									'操作'
								)
							)
						),
						React.createElement(
							'tbody',
							null,
							props.nameList.map(function (val, key) {
								return React.createElement(
									'tr',
									{ key: key },
									React.createElement(
										'td',
										null,
										limit.padStart(key + 1, '0', 2)
									),
									React.createElement(
										'td',
										null,
										val
									),
									React.createElement(
										'td',
										null,
										React.createElement(ReactForm.Link, { className: 'fn-MaRi5', text: '删除', 'data-param': key, onClick: SchoolActions.det }),
										React.createElement(ReactForm.Link, { text: '编辑', 'data-param': key, onClick: limit.bind(me.editHandle, me) })
									)
								);
							})
						)
					),
					React.createElement(
						'h2',
						{ className: 'fn-MaTo10' },
						React.createElement(ReactForm.Text, { placeholder: '请输入姓名', ref: 'input', value: props.personName, name: 'personName',
							onChange: SchoolActions.input,
							onEnterPress: limit.bind(me.enterPressHandle, me) }),
						props.editorNum === null ? React.createElement(ReactForm.Button, { value: '新 增', className: 'fn-MaLe5', onClick: SchoolActions.add }) : React.createElement(ReactForm.Button, { value: '保 存', className: 'fn-MaLe5', onClick: SchoolActions.save })
					)
				);
			}
		}]);

		return School;
	}(React.Component);

	;

	return School;
});