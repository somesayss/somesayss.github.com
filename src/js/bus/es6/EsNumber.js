"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		Code = require('./code'),
		limit = require('limit'),
		Template = require('./template');

	// 类
	var EsNumber = React.createClass({displayName: "EsNumber",
		render: function(){
			var me = this,
				props = me.props;
			return (
				React.createElement("div", null, 
					React.createElement(Template, {title: props.title, attr: "二进制，八进制新的表示法"}, 
						React.createElement(Code, null, 
							"0b10100 //二进制：20 ", React.createElement("br", null), 
							"0o24 //八进制：20 ", React.createElement("br", null), 
							"0x14 // 十六进制：20"
						)
					), 
					React.createElement(Template, {title: props.title, attr: "Number.isFinite()"}, 
						"更准确的判断有限数，原本的isFinite不够准确", 
						React.createElement(Code, null
							
						)
					)
				)
			);
		}
	});


	return EsNumber;

});