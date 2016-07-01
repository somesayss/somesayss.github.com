"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖
	var React = require('react');
	var ReactDOM = require('reactDOM');

	// 组件类
	var Widget1 = require('./widget1/main');

	// 置入文档
	ReactDOM.render(React.createElement(Widget1, null), document.getElementById('container'));
});