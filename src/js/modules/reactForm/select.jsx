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
				props = me.props,
				state = me.state;
			return (
				<select 
					style={ {width:props.width} }
					name={props.name} 
					className={"fn-select " + props.className} 
					value={state[props.name]} 
					onChange={ limit.cb(me.changeHandler) }>
						{props.empty && <option value="">请选择</option>}
					{limit.map(props.options, function(val){
						return <option key={val.value} value={val.value}>{val.key}</option>;
					})}
				</select>
			);
		}
	});

	// 接口
	module.exports = Select;

});