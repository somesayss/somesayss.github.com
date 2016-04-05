"use strict";
/**
 * 组件类
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

define(function (require, exports, module) {

	// 依赖
	var React = require('react'),
	    limit = require('limit'),
	    typeList = ['gray', 'red', 'orange'];

	// 特指方法
	function reWriteClassName(val, type) {
		var arr = [];
		limit.contains(typeList, type) ? arr.push('fn-button-' + type) : arr.push('fn-button');
		val && arr.push(val);
		return arr.join(' ');
	};

	// 类	
	var Button = React.createClass({
		displayName: 'Button',

		getDefaultProps: function getDefaultProps() {
			return {
				value: 'submit'
			};
		},
		render: function render() {
			var me = this,
			    props = limit.clone(me.props);
			// 重写属性
			props.className = reWriteClassName(props.className, props.type);
			// 渲染DOM
			return React.createElement('input', _extends({}, props, { type: 'button' }));
		}
	});

	// 接口
	module.exports = Button;
});
