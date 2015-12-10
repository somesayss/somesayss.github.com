"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		ReactDOM = require('reactDOM'),
		Template = require('./template'),
		Code = require('./code'),
		EsString = require('./EsString');

	var Es6 = React.createClass({displayName: "Es6",
		render: function(){
			return (
				React.createElement("div", null, 
					React.createElement("h1", {className: "fn-FoSi24"}, "Hello ECMAScript 6.0 ", React.createElement("span", {style:  {fontSize: "0.5em"} }, "参考：", React.createElement("a", {href: "http://es6.ruanyifeng.com/#docs/string", target: "_blank", className: "fn-link-blue"}, "点这里"))), 
					React.createElement(EsString, {title: "字符 String"}), 
					React.createElement(Template, {title: "数字 Number", attr: "codePointAt()", end: "true"}, 
						"1234"
					)
				)
			);
		}
	});

	// 置入文档
	ReactDOM.render(
		React.createElement(Es6, null),
	    document.getElementById('content')
  	);

});