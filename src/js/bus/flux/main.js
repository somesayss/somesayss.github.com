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
	var $ = require('$'),
	    Reflux = require('reflux'),
	    React = require('react'),
	    ReactDOM = require('reactDOM'),
	    limit = require('limit'),
	    ReactForm = require('modules/reactForm/main');

	// 关闭limitJS log
	limit.logClosed = true;

	// 测试Refulx方法
	// require('./exReflux');

	// Action
	var SchoolActions = Reflux.createActions(['add', 'get', 'det', 'edit', 'save', 'input']);

	// Store
	var SchoolStore = Reflux.createStore({
		listenables: [SchoolActions],
		store: {
			nameList: ['张三', '李四'],
			personName: '',
			editorNum: null
		},
		getInitialState: function getInitialState() {
			return this.store;
		},
		onAdd: function onAdd() {
			var me = this,
			    store = me.store;
			store.nameList.push(store.personName);
			store.personName = '';
			me.trigger(store);
		},
		onGet: function onGet() {},
		onDet: function onDet(e) {
			var me = this,
			    store = me.store,
			    index = $(e.target).data('param');
			store.nameList.splice(index, 1);
			me.trigger(store);
		},
		onEdit: function onEdit(e) {
			var me = this,
			    store = me.store,
			    index = $(e.target).data('param');
			store.editorNum = index;
			store.personName = store.nameList[index];
			me.trigger(store);
		},
		onSave: function onSave() {
			var me = this,
			    store = me.store;
			store.nameList[store.editorNum] = store.personName;
			store.personName = '';
			store.editorNum = null;
			me.trigger(store);
		},
		onInput: function onInput(key) {
			var me = this,
			    store = me.store;
			store.personName = key.personName;
			me.trigger(store);
		}
	});

	var connect = Reflux.connect(SchoolStore);
	console.log(connect, connect.getInitialState());

	// View
	// mixins
	var PopupContainer = function PopupContainer(Wrapper, Controller) {
		var WrapperComponent = function (_React$Component) {
			_inherits(WrapperComponent, _React$Component);

			function WrapperComponent(props) {
				_classCallCheck(this, WrapperComponent);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(WrapperComponent).apply(this, arguments));
			}

			_createClass(WrapperComponent, [{
				key: 'componentDidMount',
				value: function componentDidMount() {
					console.log('HOC did mount');
				}
			}, {
				key: 'componentWillUnmount',
				value: function componentWillUnmount() {
					console.log('HOC will unmount');
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(Wrapper, this.props);
				}
			}]);

			return WrapperComponent;
		}(React.Component);

		;
		return WrapperComponent;
	};

	// 定义React类

	var School = function (_React$Component2) {
		_inherits(School, _React$Component2);

		function School(props) {
			_classCallCheck(this, School);

			// 相当于[getInitialState]

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(School).apply(this, arguments));

			_this2.state = {
				personName: 'aaa'
			};
			return _this2;
		}

		_createClass(School, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				console.log('componentWillMount');
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				console.log('componentDidMount');
			}
		}, {
			key: 'render',
			value: function render() {
				console.log('render');
				var me = this,
				    props = me.props,
				    state = me.state;
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
						React.createElement('tbody', null)
					),
					React.createElement(
						'h2',
						{ className: 'fn-MaTo10' },
						React.createElement(ReactForm.Text, { placeholder: '请输入姓名', value: props.title, name: 'personName' })
					)
				);
			}
		}]);

		return School;
	}(React.Component);

	;
	// 相当于[getDefaultProps]
	School.defaultProps = { a: 'a1' };

	var MySchool = PopupContainer(School);

	// 置入文档
	ReactDOM.render(React.createElement(MySchool, { title: 'aa' }), document.getElementById('content'));
});