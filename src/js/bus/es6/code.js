"use strict";
/**
 * 业务
 */

define(function (require, exports, module) {

	// 依赖
	var React = require('react');

	// 类
	var Code = React.createClass({
		displayName: "Code",

		render: function render() {
			var me = this,
			    props = me.props;
			return React.createElement(
				"div",
				{ className: "es-code" },
				React.createElement(
					"pre",
					{ className: "ch-seed" },
					props.children
				)
			);
		}
	});

	return Code;
});