"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		limit = require('limit'),
		typeList = ['blue'];

	// 特指方法
	function reWriteClassName(val, type){
		var arr = [];
		limit.contains(typeList, type) ? arr.push('fn-link-' + type) : arr.push('fn-link-blue');
		val && arr.push(val);
		return arr.join(' ');
	};

	// 类	
	var Link = React.createClass({
		getDefaultProps: function(){
			return {
				href: 'javascript:;',
				text: 'link'
			};
		},
		render: function(){
			var me = this,
				props = limit.clone(me.props);
			// 重写属性
			props.className = reWriteClassName(props.className, props.type);
			// 渲染DOM
			return (
				<a {...props}>{props.text}</a>
			);
		}
	});

	// 接口
	module.exports = Link;

});