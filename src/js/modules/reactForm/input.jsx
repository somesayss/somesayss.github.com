"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Common = require('./common'),
		limit = require('limit'),
		React = require('react');

	// 过滤出Radio checkbox 的特质属性 name value onChange disabled checked
	var filterPropsList = ['name', 'value', 'onChange', 'disabled', 'checked', 'type'];

	function filterProps(props){
		var obj = {};
		limit.each(props, function(val, key){
			if( limit.contains(filterPropsList, key) ){
				obj[key] = val;
				delete props[key];
			};
		});
		return obj;
	}; 

	// 类	
	var InputSeed = React.createClass({
		getDefaultProps: function(){
			return {
				name: 'defaultName',
				type: 'checkbox'
			};
		},
		render: function(){
			var me = this,
				props = limit.clone(me.props),
				labelProps = filterProps(props);
			return (
				<label {...props}>
					<input {...labelProps} style={ {marginTop: "2px"} } /> {props.text}
				</label>
			);
		}
	});

	// 接口
	module.exports = InputSeed;

});