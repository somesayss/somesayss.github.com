"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');

	// limit.limitFixed = true;

	// var a = limit.test('a1', 'a2')

	// console.log(limit.getProp());

	// limit.K = 123;

	function main(){this.a = 'a1'};
	main.prototype.b = 'b1';

	var a = new main;

	limit.each(['a1', 'a2'], function(val, key){
		console.log(val, key);
	})


});