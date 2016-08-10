"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖
	var React = require('react');
	var ReactDOM = require('reactDOM');

	// 组件类
	var Page = require('./banner/main');

	// 置入文档
	ReactDOM.render(React.createElement(Page, null), document.getElementById('container'));
});