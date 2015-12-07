"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Common = require('./common'),
		Input = require('./input'),
		limit = require('limit'),
		React = require('react');

	// 类	
	var Radio = React.createClass({
		mixins: [Common],
		render: function(){
			var me = this;
			return (
				<span>
					{limit.map(me.props.options, function(val, key){
						return (
							<Input 
								type="radio"
								key={val.value}
								name={me.props.name}
								className="fn-MaRi10"
								value={val.value}
								title={val.key}
								checked={val.value === me.state[me.props.name] && true}
								onChange={ limit.cb(me.changeHandler) } />
						);
					})}
				</span>
			);
		}
	});

	// 接口
	module.exports = Radio;

});