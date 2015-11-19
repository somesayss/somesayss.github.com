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
			console.log(state);
		},
		render: function(){
			return (
				<div>
					<p>
						<Form.Input width="200" name="name" value="我是名称" onChange={this.change} />
					</p>
					<p className="fn-MaTo10">
						<Form.Select width="200" name="diqu" value={this.state.diqu} onChange={this.change} options={this.props.diqu}/>
					</p>
					<p className="fn-MaTo10">
						<Form.Radio name="sex" value={this.state.sex} onChange={this.change} options={this.props.sex}/>
					</p>
					<p className="fn-MaTo10">
						<Form.Checkbox name="like" value={this.state.like} onChange={this.change} options={this.props.like} />
					</p>
					<p className="fn-MaTo10">
						<Form.Textarea width="200" height="100" name="jianjie" value={this.state.jianjie} onChange={this.change}  />
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