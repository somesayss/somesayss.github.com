"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Common = require('./common'),
		limit = require('limit'),
		React = require('react');

	// 特殊处理的属性 width[style] className onChange onEnterPress value
	function reWriteClassName(className){
		return "fn-input " + className;
	};

	function reWriteStyle(style, width){
		return limit.extend({width: width - 20}, style);
	};

	// 类	
	var InputText = React.createClass({
		mixins: [Common],
		getDefaultProps: function(){
			return {
				width: 200,
				name: 'defaultName',
				value: '',
				className: ''
			};
		},
		render: function(){
			var me = this,
				props = limit.clone(me.props),
				state = me.state;
			// 重写属性
			props.className = reWriteClassName(props.className);
			props.style = reWriteStyle(props.style, props.width);
			props.value = state[props.name];
			props.onChange = me.changeHandler;
			props.onKeyPress = me.enterPress;
			return (
				<input {...props} type="text" />
			);
		}
	});

	// 接口
	module.exports = InputText;

});