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

	var Es6 = React.createClass({
		render: function(){
			return (
				<div>
					<h1 className="fn-FoSi24">Hello ECMAScript 6.0</h1>
					<Template title="字符 String" attr="codePointAt1()">
						你好
						<Code>
							var a = {'{}'};<br />
							var b = [];
						</Code>
						你好
					</Template>
					<Template title="字符 String" attr="codePointAt2()" end="true">
						123
					</Template>
					<Template title="数字 Number" attr="codePointAt()" end="true">
						1234
					</Template>
				</div>
			);
		}
	});

	// 置入文档
	ReactDOM.render(
		<Es6 />,
	    document.getElementById('content')
  	);

});