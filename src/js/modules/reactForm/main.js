"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 接口
	module.exports = {
		Input: 		require('./input'),
		Select: 	require('./select'),
		Radio: 		require('./radio'),
		Checkbox: 	require('./checkbox'),
		Textarea: 	require('./textarea')
	};

});