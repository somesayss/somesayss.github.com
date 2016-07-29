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

	var Promise = limit.promise();

	// limit.limitFixed = true;

	// function main(val){
	// 	this.value = val;
	// };

	// main.prototype.map = function(){
	// 	this.value = limit.map.apply(null, [this.value].concat(limit.toArray(arguments)));
	// 	return this;
	// };

	// main.prototype.filter = function(){
	// 	this.value = limit.filter.apply(null, [this.value].concat(limit.toArray(arguments)));
	// 	return this;
	// };

	// var a = new main(['a1', 'a2', 'a3']).map(function(val){
	// 	return val + 4;
	// }).filter(function(val, key){
	// 	return !!key;
	// });

	// console.log(a.value);

	var length = 20;
	var diff = 2;

	/*
		1 [1,2,3,'...',100];
		2 [1,2,3,'...',100];
		3 [1,2,3,4,'...',100];
		4 [1,'...',3,4,5,'...',100];

	 */

	// function getDiffArr(diff){
	// 	var temp = -diff;
	// 	var arr = [];
	// 	do{
	// 		arr.push(temp);
	// 	}while(temp++ < diff);
	// 	return arr;
	// };

	// function main(target){
	// 	var arr = [];
	// 	// 拿到中间值
	// 	arr = limit.map( getDiffArr(diff), (val) => {
	// 		return target + val;
	// 	});
	// 	// 开头和结尾
	// 	arr.unshift(1);
	// 	arr.push(length);
	// 	// 去重
	// 	arr = limit(arr)
	// 			.filter( (val) => val > 0 && val < length + 1 )
	// 			.union()
	// 			.valueOf();
	// 	if(arr.length > 1){
	// 		// 如果补值
	// 		if(arr[1] - arr[0] !== 1){
	// 			arr.splice(1,0,'...');
	// 		};
	// 		if(arr[arr.length - 1] - arr[arr.length - 2] !== 1){
	// 			arr.splice(-1,0,'...');
	// 		};
	// 	};
	// 	return arr;
	// };

	// console.log( main(10) );


	// function main(){
	// 	return new Promise(function(resolve){
	// 		resolve()
	// 	});
	// };


	// main().then(function(){
	// 	console.log(arguments);
	// })

	// var a = [-3, -2, -1, 0, 0, -0, 0, 1, 1, 2, 3, 4, 5, 100].sort((a,b) => {
	// 	 if(a > b){ 
	// 	 	return 1;
	// 	 }else if(a === b){
	// 	 	if(a === 0 && b === 0){
	// 	 		return 1/a > 1/b;
	// 	 	};
	// 	 }else{ 
	// 	 	return -1; 
	// 	 }; 
	// });

console.log('aabc'.match(/(.)\1/).input);

	

});





