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

	var MyForm = React.createClass({
		getInitialState: function(){
			return {
				diqu: "zhejiang",
				sex: "female",
				like: ["zhuqiu", "paiqiu"],
				jianjie: "我是简介777777"
			}
		},
		change: function(state){
			console.log(state, this.state, 'MyForm');
		},
		render: function(){
			return (
				<div>
					<p>
						<Form.Text />
					</p>
					<p className="fn-MaTo10">
						<Form.Select></Form.Select>
					</p>
					<p className="fn-MaTo10">
						<Form.RadioList name="sex" value="" onChange={this.change} options={this.props.sex}/>
					</p>
					<p className="fn-MaTo10">
						<Form.CheckboxList onChange={this.change}  options={this.props.like} />
					</p>
					<p className="fn-MaTo10">
						<Form.Textarea />
					</p>
					<p className="fn-MaTo10">
						<Form.Input />
					</p>
					<p className="fn-MaTo10">
						<Form.Button /> <Form.Link />
					</p>
				</div>
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
		<MyForm {...config} />,
	    document.getElementById('search')
  	);

});