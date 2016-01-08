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
		getDefaultProps: function(){
			return {
				name: 'defaultName',
				value: ''
			};
		},
		mixins: [Common],
		render: function(){
			var me = this,
				state = me.state,
				props = me.props;
			return (
				<span>
					{limit.map(me.props.options, function(val, key){
						return (
							<Input 
								type="radio"
								key={val.key}
								name={props.name}
								className="fn-MaRi10"
								value={val.value}
								text={val.key}
								checked={val.value === state[props.name] && true}
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