"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		ReactDOM = require('reactDOM'),
		EsString = require('./EsString'),
		EsNumber = require('./EsNumber'),
		EsArray = require('./EsArray');

	var Es6 = React.createClass({
		render: function(){
			var me = this,
				props = me.props;
			
			return (
				<div>
					<h1 className="fn-FoSi24">Hello ECMAScript 6.0 <span style={ {fontSize: "0.5em"} }>参考：<a href="http://es6.ruanyifeng.com/#docs/string" target="_blank" className="fn-link-blue">点这里</a></span></h1>
					<EsString title="字符 String" />
					<EsNumber title="数字 Number" />
					<EsArray title="数组 Array" />
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