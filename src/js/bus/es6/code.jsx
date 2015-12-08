"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react');

	// 类
	var Code = React.createClass({
		render: function(){
			var me = this,
				props = me.props;
			return (
				<div className="es-code">
					<div className="ch-seed">
						{props.children}
					</div>
				</div>
			);
		}
	});

	return Code;

});