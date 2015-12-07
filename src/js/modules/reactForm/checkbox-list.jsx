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
	var Checkbox = React.createClass({
		mixins: [Common],
		render: function(){
			var me = this;
			return (
				<span>
					{limit.map(me.props.options, function(val, key){
						return (
							<Input 
								type="checkbox"
								key={val.value}
								name={me.props.name}
								className="fn-MaRi10"
								value={val.value}
								title={val.key}
								onChange={ limit.cb(me.changeHandler) }
								checked={limit.contains(me.state[me.props.name], val.value)} />
						);
					})}
				</span>
			);
		}
	});

	// 接口
	module.exports = Checkbox;

});