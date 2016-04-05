"use strict";
/**
 * 业务
 */

define(function (require, exports, module) {

	// 依赖
	var $ = require('$'),
	    Event = require('events'),
	    limit = require('limit');

	// 全局性事件
	var myEvent = new Event();

	// 构建参数类
	var Param = React.createClass({
		displayName: 'Param',

		change: function change() {
			myEvent.trigger('changeHandler');
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'param' },
				React.createElement(
					'div',
					null,
					React.createElement('input', { name: 'name', type: 'text', className: 'fn-input fn-Wi180', defaultValue: this.props.name, onChange: this.change })
				),
				React.createElement(
					'div',
					{ className: 'fn-MaTo10' },
					React.createElement(
						'select',
						{ name: 'sex', className: 'fn-select fn-Wi200', onChange: this.change },
						limit.map(this.props.results, function (val) {
							return React.createElement(
								'option',
								{ key: val.key, value: val.value },
								val.key
							);
						})
					)
				)
			);
		}
	});

	// 构建列表类
	var List = React.createClass({
		displayName: 'List',

		// 初始化的时候执行的方法
		componentDidMount: function componentDidMount() {
			var me = this;
			myEvent.on('changeHandler', function () {
				me.setState({
					a: me.props.list.push({
						"name": "小黄",
						"sex": "男",
						"age": 19
					})
				});
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'fn-Wi500 fn-MaTo10' },
				React.createElement(
					'table',
					{ className: 'fn-table fn-table-ho', width: '100%' },
					React.createElement(
						'thead',
						null,
						React.createElement(
							'tr',
							null,
							React.createElement(
								'th',
								null,
								'姓名'
							),
							React.createElement(
								'th',
								null,
								'性别'
							),
							React.createElement(
								'th',
								null,
								'年龄'
							)
						)
					),
					React.createElement(
						'tbody',
						null,
						limit.map(this.props.list, function (val) {
							return React.createElement(
								'tr',
								{ key: val.name },
								React.createElement(
									'td',
									null,
									val.name
								),
								React.createElement(
									'td',
									null,
									val.sex
								),
								React.createElement(
									'td',
									null,
									val.age
								)
							);
						})
					)
				)
			);
		}
	});

	// 主体
	var SearchList = React.createClass({
		displayName: 'SearchList',

		render: function render() {
			return(
				// 这是必要的包含，我晕
				React.createElement(
					'div',
					null,
					React.createElement(Param, this.props),
					React.createElement(List, this.props)
				)
			);
		}
	});

	// 初始化
	var config = {
		name: "小明",
		results: [{ key: "男", value: "male" }, { key: "女", value: "female" }],
		list: [{
			"name": "小明",
			"sex": "男",
			"age": 19
		}, {
			"name": "小红",
			"sex": "女",
			"age": 18
		}]
	};

	// 置入文档
	ReactDOM.render(React.createElement(SearchList, config), document.getElementById('search'));
});
