"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		limit = require('limit'),
		typeList = ['blue'];

	// 类	
	var Link = React.createClass({displayName: "Link",
		render: function(){
			var me = this,
				props = me.props,
				className = [];
			limit.contains(typeList, props.type) ? className.push('fn-link-' + props.type) : className.push('fn-link-blue');
			props.className && className.push(props.className);
			return (
				React.createElement("a", {href:  props.href ? props.href : 'javascript:;', className:  className.join(' '), onClick: limit.cb(props.onClick), "data-param": props.param}, props.title)
			);
		}
	});

	// 接口
	module.exports = Link;

});