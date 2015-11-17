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
	var Radio = React.createClass({
		mixins: [Common],
		render: function(){
			var me = this;
			return (
				<span>
					{limit.map(me.props.options, function(val, key){
						return (
							<label key={val.value} className="fn-MaRi10" >
								<input type="radio"
									name={me.props.name} 
									onChange={me.changeHandler}
									checked={val.value === me.state[me.props.name] && true}
									value={val.value} /> {val.key}
							</label>
						);
					})}
				</span>
			);
		}
	});

	// 接口
	module.exports = Radio;

});