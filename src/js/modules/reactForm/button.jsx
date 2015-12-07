"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		limit = require('limit'),
		typeList = ['gray', 'red', 'orange'];

	// 类	
	var Button = React.createClass({
		render: function(){
			var me = this,
				props = me.props,
				className = [];
			limit.contains(typeList, props.type) ? className.push('fn-button-' + props.type) : className.push('fn-button');
			props.className && className.push(props.className);
			props.small && className.push('fn-button-sm');
			return (
				<input type="button" className={ className.join(' ') } value={me.props.title} />
			);
		}
	});

	// 接口
	module.exports = Button;

});