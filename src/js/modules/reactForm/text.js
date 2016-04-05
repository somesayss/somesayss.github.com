"use strict";
/**
 * 组件类
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

define(function (require, exports, module) {

	// 依赖
	var Common = require('./common'),
	    limit = require('limit'),
	    React = require('react');

	// 特殊处理的属性 width[style] className onChange onEnterPress value
	function reWriteClassName(className) {
		return "fn-input " + className;
	};

	function reWriteStyle(style, width) {
		return limit.extend({ width: width - 20 }, style);
	};

	// 类	
	var InputText = React.createClass({
		displayName: 'InputText',

		mixins: [Common],
		getDefaultProps: function getDefaultProps() {
			return {
				width: 200,
				name: 'defaultName',
				value: '',
				className: ''
			};
		},
		render: function render() {
			var me = this,
			    props = limit.clone(me.props),
			    state = me.state;
			// 重写属性
			props.className = reWriteClassName(props.className);
			props.style = reWriteStyle(props.style, props.width);
			props.value = state[props.name];
			props.onChange = me.changeHandler;
			props.onKeyPress = me.enterPress;
			return React.createElement('input', _extends({}, props, { type: 'text' }));
		}
	});

	// 接口
	module.exports = InputText;
});
