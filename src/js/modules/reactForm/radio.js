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
	var Radio = React.createClass({displayName: "Radio",
		mixins: [Common],
		render: function(){
			var me = this;
			return (
				React.createElement("span", null, 
					limit.map(me.props.options, function(val, key){
						return (
							React.createElement("label", {key: val.value, className: "fn-MaRi10"}, 
								React.createElement("input", {type: "radio", 
									name: me.props.name, 
									onChange: me.changeHandler, 
									checked: val.value === me.state[me.props.name] && true, 
									value: val.value}), " ", val.key
							)
						);
					})
				)
			);
		}
	});

	// 接口
	module.exports = Radio;

});