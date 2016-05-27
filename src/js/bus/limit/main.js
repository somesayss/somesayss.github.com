"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');

	// limit.limitFixed = true;
	// limit.logClosed = false;

	// var a = limit.test('a1', 'a2')

	// console.log(limit.getProp());

	// limit.K = 123;

	// limit.each('abcd', (val, key) => {
	// 	console.log(val, key);
	// });
	
	var a = new Number(123);

	// console.log(a);
	// console.log(limit.isEmpty(a));

	var n = ['a1', 'b1'];
	// var n = {a: 'a1', b: 'b1'};

	// ['a1', 'b1']
	// {a: 'a1', b: 'b1'}

	var b = limit.every(n, function(val, key){
		console.log(val, key);
		return;
	});

	console.log(b);


});