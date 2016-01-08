"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		limit = require('limit'),
		typeList = ['gray', 'red', 'orange'];

	// 特指方法
	function reWriteClassName(val, type){
		var arr = [];
		limit.contains(typeList, type) ? arr.push('fn-button-' + type) : arr.push('fn-button');
		val && arr.push(val);
		return arr.join(' ');
	};

	// 类	
	var Button = React.createClass({displayName: "Button",
		getDefaultProps: function(){
			return {
				value: 'submit'
			};
		},
		render: function(){
			var me = this,
				props = limit.clone(me.props);
			// 重写属性
			props.className = reWriteClassName(props.className, props.type);
			// 渲染DOM
			return (
				React.createElement("input", React.__spread({},  props, {type: "button"}))
			);
		}
	});

	// 接口
	module.exports = Button;

});