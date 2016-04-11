"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖

	var Controller = require('./controller');

	var View = require('./view');

	var HOC = require('common/hoc');

	return HOC(View, Controller);
});