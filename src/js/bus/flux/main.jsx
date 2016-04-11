"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const [React, ReactDOM] = [require('react'), require('reactDOM')];

	// 组件类
	let MySchool = require('modules/reactTab/main');

	// 置入文档
	ReactDOM.render(
		<MySchool />,
	   	document.getElementById('content')
 	);

});