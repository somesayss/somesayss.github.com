"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Common = require('./common'),
		limit = require('limit'),
		React = require('react');

	// 类	
	var InputSeed = React.createClass({displayName: "InputSeed",
		getDefaultProps: function(){
			return {
				name: 'defaultName',
				type: 'checkbox',
				title: '',
				value: ''
			};
		},
		render: function(){
			var me = this,
				props = me.props;
			return (
				React.createElement("label", {className: 'fn-input-label '+props.className}, 
					React.createElement("input", {
						tabIndex: "0", 
						type: props.type, 
						name: props.name, 
						onChange:  limit.cb(props.onChange), 
						checked: props.checked, 
						value: props.value}), " ", props.title
				)
			);
		}
	});

	// 接口
	module.exports = InputSeed;

});