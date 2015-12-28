"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Common = require('./common'),
		Input = require('./input'),
		limit = require('limit'),
		React = require('react');

	// 类	
	var Checkbox = React.createClass({displayName: "Checkbox",
		getDefaultProps: function(){
			return {
				name: 'defaultName',
				value: []
			};
		},
		mixins: [Common],
		render: function(){
			var me = this,
				state = me.state,
				props = me.props,
				check = state[props.name];
			// 如果check不是数组转化为数组
			if(!limit.isArray(check)){
				check = state[props.name] = limit.of(check);
			};
			return (
				React.createElement("span", null, 
					limit.map(me.props.options, function(val, key){
						return (
							React.createElement(Input, {
								type: "checkbox", 
								key: val.key, 
								name: props.name, 
								className: "fn-MaRi10", 
								value: val.value, 
								title: val.key, 
								onChange:  limit.cb(me.changeHandler), 
								checked: limit.contains(check, val.value)})
						);
					})
				)
			);
		}
	});

	// 接口
	module.exports = Checkbox;

});