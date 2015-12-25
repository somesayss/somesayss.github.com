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
	var InputSeed = React.createClass({
		getDefaultProps: function(){
			return {
				checked: false,
				name: 'defaultName',
				type: 'checkbox'
			};
		},
		render: function(){
			var me = this,
				props = me.props;
			return (
				<label className={'fn-input-label '+props.className} >
					<input
						tabIndex="0"
						type={props.type}
						name={props.name} 
						onChange={ limit.cb(props.onChange) }
						checked={props.checked}
						value={props.value} /> {props.title}
				</label>
			);
		}
	});

	// 接口
	module.exports = InputSeed;

});