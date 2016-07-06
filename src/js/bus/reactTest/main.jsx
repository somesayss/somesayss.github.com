"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const React = require('react');
	const ReactDOM = require('reactDOM');

	// 组件类
	let Widget3 = require('./widget1/main');
 
	// 置入文档
	ReactDOM.render(
		<Widget3 />,
	   	document.getElementById('container')
 	);

});