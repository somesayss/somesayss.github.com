"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		ReactDOM = require('reactDOM'),
		Template = require('./template'),
		Code = require('./code');

	var Es6 = React.createClass({displayName: "Es6",
		render: function(){
			return (
				React.createElement("div", null, 
					React.createElement("h1", {className: "fn-FoSi24"}, "Hello ECMAScript 6.0"), 
					React.createElement(Template, {title: "字符 String", attr: "codePointAt1()"}, 
						"你好", 
						React.createElement(Code, null, 
							"var a = ", '{}', ";", React.createElement("br", null), 
							"var b = [];"
						), 
						"你好"
					), 
					React.createElement(Template, {title: "字符 String", attr: "codePointAt2()", end: "true"}, 
						"123"
					), 
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