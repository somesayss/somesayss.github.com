"use strict";
/**
 * 业务
 */

define(function (require, exports, module) {

	// 依赖
	var React = require('react');

	// 变量
	var guid = {};

	// 类
	var Template = React.createClass({
		displayName: "Template",

		render: function render() {
			var me = this,
			    title,
			    end,
			    children,
			    props = me.props;
			// 遍历值
			if (!guid[props.title]) {
				guid[props.title] = 1;
				title = React.createElement(
					"h2",
					{ className: "fn-Co333 fn-MaTo10" },
					React.createElement(
						"span",
						{ className: "ec-title" },
						props.title
					)
				);
			};
			// 结束符
			if (props.end === 'true') {
				end = React.createElement("hr", null);
			};
			// 内容
			if (props.children) {
				children = React.createElement(
					"div",
					{ className: "ec-content" },
					props.children
				);
			};
			return React.createElement(
				"div",
				{ className: "fn-FoSiEm12 fn-LiHeEm15" },
				title,
				React.createElement(
					"h3",
					{ className: "fn-PaLe20 fn-MaTo5 " + (props.disabled === 'true' ? 'fn-CoCCC' : '') },
					guid[props.title]++,
					". ",
					React.createElement(
						"span",
						{ className: "ec-attr" },
						props.attr
					)
				),
				children,
				end
			);
		}
	});

	return Template;
});
