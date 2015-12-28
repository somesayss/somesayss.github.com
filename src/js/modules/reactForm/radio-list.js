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
	var Radio = React.createClass({displayName: "Radio",
		getDefaultProps: function(){
			return {
				name: 'defaultName',
				value: ''
			};
		},
		mixins: [Common],
		render: function(){
			var me = this,
				state = me.state,
				props = me.props;
			return (
				React.createElement("span", null, 
					limit.map(me.props.options, function(val, key){
						return (
							React.createElement(Input, {
								type: "radio", 
								key: val.key, 
								name: props.name, 
								className: "fn-MaRi10", 
								value: val.value, 
								title: val.key, 
								checked: val.value === state[props.name] && true, 
								onChange:  limit.cb(me.changeHandler) })
						);
					})
				)
			);
		}
	});

	// 接口
	module.exports = Radio;

});