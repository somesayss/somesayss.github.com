"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var $ = require('$'),
		React = require('react'),
		ReactDOM = require('reactDOM'),
		Event = require('events'),
		limit = require('limit');

	// React节点
	var Form = require('modules/reactForm/main');

	var MyForm = React.createClass({displayName: "MyForm",
		getInitialState: function(){
			return {
				diqu: "zhejiang",
				sex: "female",
				like: ["zhuqiu", "paiqiu"],
				jianjie: "我是简介6"
			}
		},
		change: function(state){
			// console.log(state);
		},
		render: function(){
			return (
				React.createElement("div", null, 
					React.createElement("p", null, 
						React.createElement(Form.Input, {width: "200", name: "name", value: "我是名称", onChange: this.change})
					), 
					React.createElement("p", {className: "fn-MaTo10"}, 
						React.createElement(Form.Select, {width: "200", name: "diqu", value: this.state.diqu, onChange: this.change, options: this.props.diqu})
					), 
					React.createElement("p", {className: "fn-MaTo10"}, 
						React.createElement(Form.Radio, {name: "sex", value: this.state.sex, onChange: this.change, options: this.props.sex})
					), 
					React.createElement("p", {className: "fn-MaTo10"}, 
						React.createElement(Form.Checkbox, {name: "like", value: this.state.like, onChange: this.change, options: this.props.like})
					), 
					React.createElement("p", {className: "fn-MaTo10"}, 
						React.createElement(Form.Textarea, {width: "200", height: "100", name: "jianjie", value: this.state.jianjie, onChange: this.change})
					)
				)
			);
		}
	});

	var config = {
		diqu: 	[{key: "上海", value: "shanghai"}, {key: "浙江", value: "zhejiang"}, {key: "江苏", value: "jiangshu"}],
		sex: 	[{key: "男", value: "male"}, {key: "女", value: "female"}],
		like: 	[{key: "足球", value: "zhuqiu"}, {key: "篮球", value: "lanqiu"}, {key: "排球", value: "paiqiu"}]
	};

	// 置入文档
	ReactDOM.render(
		React.createElement(MyForm, React.__spread({},  config)),
	    document.getElementById('search')
  	);

});