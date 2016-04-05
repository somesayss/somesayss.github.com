"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');

	// var a = limit.test('a1', 'a2')

	// console.log(limit.getProp());

	// limit.K = 123;

	function main(){this.a = 'a1'};
	main.prototype.b = 'b1';

	var a = new main;

	var b = Object.assign({}, a, {'c': 'c1'});

	console.log(a, b);


});