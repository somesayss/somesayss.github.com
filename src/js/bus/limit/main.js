"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');

	limit.limitFixed = true;
	// limit.logClosed = false;

	// var a = limit.test('a1', 'a2')

	// console.log(limit.getProp());

	// limit.K = 123;

	// limit.each('abcd', (val, key) => {
	// 	console.log(val, key);
	// });
	
	var a = new Number(123)

	// console.log(a);
	// console.log(limit.isEmpty(a));


	var fn = JSON.stringify;

	JSON.stringify = function(json){
		return fn(json).replace(/(\\u\w{4})/g, function(a){
			return new Function('return "'+a+'"')();
		});
	};

	console.log(JSON.stringify(JSON.stringify({a: '啊𠮷西'})));


});