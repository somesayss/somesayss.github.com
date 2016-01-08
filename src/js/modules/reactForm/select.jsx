"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Common = require('./common'),
		limit = require('limit'),
		React = require('react');

	// 特殊处理的属性 width[style] className onChange value
	function reWriteClassName(className){
		return "fn-select " + className;
	};

	function reWriteStyle(style, width){
		return limit.extend({width: width}, style);
	};

	// 类	
	var Select = React.createClass({
		mixins: [Common],
		getDefaultProps: function(){
			return {
				width: 200,
				name: 'defaultName',
				value: ''
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
			return (
				<select {...props}>
					{props.children}
					{limit.map(props.options, function(val, key){
						return <option key={key} value={val.value}>{val.key}</option>;
					})}
				</select>
			);
		}
	});

	// 接口
	module.exports = Select;

});