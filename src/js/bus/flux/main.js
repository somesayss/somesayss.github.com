"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖

	var React = require('react');

	var ReactDOM = require('reactDOM');

	// 组件类


	var MySchool = require('modules/reactTab/main');

	// 置入文档
	ReactDOM.render(React.createElement(MySchool, null), document.getElementById('content'));
});