"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');

	var Class = require('class');

	

	window.limit = limit;

	limit.limitFixed = true;
	limit.logClosed = false;

	function main(a, b){
		a = a || 1.8;
		b = b || 9;
		var arr = limit.from(new Array(b), function(val, key){
			return limit['*']( a, Math.pow(2, key) );
		});
		limit['!!!'](arr);
		return limit.reduce( arr , function(res, val){
			return limit['+']( res, val );
		});
	};

	console.log( main(180, 9) );
	

});

















