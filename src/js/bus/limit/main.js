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

	// function main(){this.a = 'a1'};
	// main.prototype.b = 'b1';

	// var a = new main;

	// limit.each(['a1', 'a2'], function(val, key){
	// 	console.log(val, key);
	// });
	
	function main(end){
		var start = .4,
			all = 0,
			guid = 0;
		while(all < end){
			guid++;
			start *= 2;
			all += start;
			all = +all.toFixed(2);
			console.log(start, all);
		};
		return [guid, all]
	};

	function kiss(num, start){
		start = start || 8;
		var guid = 0,
			all = 0;
		all += start;
		while(++guid < num){
			start *= 2;
			all += start;
		};
		return all.toFixed(2);
	};

	console.log(kiss(10, .8));

	// console.log( main(1000) );

	// 0369
	;(function(){
		var arr = [];
		$('#chartTable tr').each(function(){ var val = $(this).find('td').eq(1).html(); val && (val = val.trim()) && /^\d{5}$/.test(val) && arr.push(val) })
		
		var newArr = new Array(5).fill('');
		arr.forEach(function(val){
			Array.prototype.forEach.call(val, function(num, key){
				newArr[key] += num;
			});
		});

		function main(str){
			var guid = 0,
				step = 0;
			Array.prototype.forEach.call(str, function(val){
				if('0369'.indexOf(val) !== -1){
					step = 0;
				}else{
					step++;
				};	
				step > guid && (guid = step);
			});
			return guid;
		};

		console.log(newArr.map(function(val){
			return ('00'+main(val)).slice(-2);
		}));

	})();

















});