"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖
	var $ = require('$');
	var Control = require('common/control');

	return Control({
		store: {
			title: '默认'
		},
		getInitialState: function getInitialState() {
			return this.store;
		}
	});
});