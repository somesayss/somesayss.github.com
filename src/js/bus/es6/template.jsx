"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react');

	// 变量
	var guid = {};

	// 类
	var Template = React.createClass({
		render: function(){
			var me = this,
				title,
				end,
				props = me.props;
			// 遍历值
			if(!guid[props.title]){
				guid[props.title] = 1;
				title = <h2 className="fn-Co333 fn-MaTo10"><span className="ec-title">{props.title}</span></h2>;
			};
			// 结束符
			if(props.end === 'true'){
				end = <hr />;
			};
			return (
				<div className="fn-FoSiEm12 fn-LiHeEm15">
				 	{title}
				 	<h3 className="fn-PaLe20 fn-MaTo5">{guid[props.title]++}. <span className="ec-attr">{props.attr}</span></h3>
				 	<div className="ec-content">{props.children}</div>
				 	{end}
				</div>
			);
		}
	});

	return Template;

});