"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');
	var $ = require('$');
	var Class = require('class');

	window.limit = limit;

	// limit.limitFixed = true;
	limit.logClosed = false;

	var a = limit.compose(function(a){
		return a + 1;
	}, function(a, b){
		return a + 2 + b;
	}, function(a){
		return [a + 3, 4];
	})('1');

	console.log(a);


});





