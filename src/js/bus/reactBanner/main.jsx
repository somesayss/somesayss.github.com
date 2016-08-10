"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const React = require('react');
	const ReactDOM = require('reactDOM');

	// 组件类
	const Page = require('./banner/main');

	// 置入文档
	ReactDOM.render(
		<Page />,
	   	document.getElementById('container')
 	);

});