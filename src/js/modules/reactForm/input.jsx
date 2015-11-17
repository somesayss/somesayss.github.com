"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Common = require('./common'),
		React = require('react');

	// 类	
	var InputText = React.createClass({
		mixins: [Common],
		render: function(){
			return (
				<input type="text" 
					style={ {width:this.props.width - 20} }
					name={this.props.name} 
					className={"fn-input " + this.props.className} 
					value={this.state[this.props.name]} 
					onChange={this.changeHandler} />
			);
		}
	});

	// 接口
	module.exports = InputText;

});