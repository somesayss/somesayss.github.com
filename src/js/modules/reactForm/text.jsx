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
	var InputText = React.createClass({
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
				props = me.props,
				state = me.state;
			return (
				<input
					type="text"
					style={ {width:props.width - 20} }
					name={ props.name }
					className={ "fn-input " + props.className }
					value={ state[props.name] }
					maxLength={ props.maxlength }
					onChange={ limit.cb(me.changeHandler) }
					placeholder={props.placeholder}
				/>
			);
		}
	});

	// 接口
	module.exports = InputText;

});