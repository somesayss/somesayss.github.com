"use strict";
/**
 * 业务
 */

define(function (require, exports, module) {

	// 依赖
	var $ = require('$'),
	    React = require('react'),
	    ReactDOM = require('reactDOM'),
	    Event = require('events'),
	    limit = require('limit');

	// React节点
	var Form = require('modules/reactForm/main');

	var MyForm = React.createClass({
		displayName: 'MyForm',

		getInitialState: function getInitialState() {
			return {
				diqu: "zhejiang",
				sex: "female",
				like: ["zhuqiu", "paiqiu"],
				jianjie: "我是简介777777"
			};
		},
		change: function change(state) {
			console.log(state, this.state, 'MyForm');
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'p',
					null,
					React.createElement(Form.Text, null)
				),
				React.createElement(
					'p',
					{ className: 'fn-MaTo10' },
					React.createElement(Form.Select, null)
				),
				React.createElement(
					'p',
					{ className: 'fn-MaTo10' },
					React.createElement(Form.RadioList, { name: 'sex', value: '', onChange: this.change, options: this.props.sex })
				),
				React.createElement(
					'p',
					{ className: 'fn-MaTo10' },
					React.createElement(Form.CheckboxList, { onChange: this.change, options: this.props.like })
				),
				React.createElement(
					'p',
					{ className: 'fn-MaTo10' },
					React.createElement(Form.Textarea, null)
				),
				React.createElement(
					'p',
					{ className: 'fn-MaTo10' },
					React.createElement(Form.Input, null)
				),
				React.createElement(
					'p',
					{ className: 'fn-MaTo10' },
					React.createElement(Form.Button, null),
					' ',
					React.createElement(Form.Link, null)
				)
			);
		}
	});

	var config = {
		diqu: [{ key: "上海", value: "shanghai" }, { key: "浙江", value: "zhejiang" }, { key: "江苏", value: "jiangshu" }],
		sex: [{ key: "男", value: "male" }, { key: "女", value: "female" }],
		like: [{ key: "足球", value: "zhuqiu" }, { key: "篮球", value: "lanqiu" }, { key: "排球", value: "paiqiu" }]
	};

	// 置入文档
	ReactDOM.render(React.createElement(MyForm, config), document.getElementById('search'));
});
