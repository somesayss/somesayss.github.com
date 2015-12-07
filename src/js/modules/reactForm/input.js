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
		render: function(){
			var me = this;
			return (
				React.createElement("label", {className: 'fn-input-label '+me.props.className}, 
					React.createElement("input", {
						tabIndex: "0", 
						type: me.props.type, 
						name: me.props.name, 
						onChange:  limit.cb(me.props.onChange), 
						checked: me.props.checked, 
						value: me.props.value}), " ", me.props.title
				)
			);
		}
	});

	// 接口
	module.exports = InputSeed;

});