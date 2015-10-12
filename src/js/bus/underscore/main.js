"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {


	//依赖
	var $ = require('$'),
		Widget = require('widget'),
		limit = require('limit');

	$('#scroll').on('mousewheel', function(e){
		var top = this.scrollTop;
		// 向上滚 或者 向下滚
		if( (e.originalEvent.wheelDelta > 0 && top <= 0) || (e.originalEvent.wheelDelta < 0 && top >= 460) ){
			e.preventDefault();
		};
	});

	console.log('main');

	// console.log( limit.flatten([[1], [[0],2, [[3]]]]) );


	return;

	// limit.logClosed = true;
	// console.log( limit.isEqual([1,2,'3'], [1,2,3]) );
	// console.log( limit.isEqual('a1', 'a2') );
	// console.log( limit.isObject(1) );

	return;
	function main(a){
		return a + 'kiss';
	};

	var a = limit.except(0.1, -0.2, 0.5);

	console.log(a);

	return;
	var a = function(age, add){
		console.log(this , age , add);
		// return {'a': 'a1'};
	};
	a.prototype.name = 'aaa';
	var b = limit.bind(a, {name: 'kiss'}, 19);

	var c = new b('杭州');
	console.log( c instanceof b );
	return;

	var i = $('body');

	// console.log(Object.keys(i));
	// console.log( limit.lastIndexOf( ['a1', 'a2', 'a3', 'a2', 'a4', 'a5'], 'a2' ) );
	// ['a5', 'a4', 'a2', 'a3', 'a2', 'a1']
	var x = ['a'], y = {'a': 'b'};
	var a = [1,2,3,4,5,6,7,8,9,10,11,undefined,7,5,4,1,undefined,2,x,'a5',3,4,'a5',['b'],x, x, y, {'c': 'd'},y];
	var b = limit.union(a);
	var c = limit.union(a,1);

	// var c = limit.filter(a);
	
	console.log('--分割--');
	console.log('a=>', a);
	console.log('b=>', b);
	console.log('c=>', c);





});