"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');

	limit.limitFixed = true;

	var Promise = limit.promise();

	// var A = limit.promise();

	var kiss = function kiss() {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve('kiss');
			}, 1000);
		});
	};

	var err1 = function err1() {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				reject('err1');
			}, 1000);
		});
	};

	var err2 = function err2() {
		return new Promise(function (resolve, reject) {
			// setTimeout(() => {
			reject('err2');
			// }, 800);
		});
	};

	var bbbbb = Promise.all([err2(), kiss()]);

	// bbbbb.then(list => {
	// 	console.log('success', list);
	// }, list => {
	// 	console.log('error', list);
	// });

	setTimeout(function () {
		console.log(bbbbb);
	}, 2000);

	// var aaa = err1();

	// aaa.Catch((v) => {
	// 	console.log('success', v);
	// 	return '123'
	// });

	// aaa.Catch((v) => {
	// 	console.log('success', v);
	// 	return '456'
	// })

	// setTimeout(() => {
	// 	console.log(aaa);
	// }, 1500);

	// kiss().then((arg) => {
	// 	console.log(arg);
	// 	throw 'aaaa'
	// }).Catch((e) => {
	// 	console.log(e);
	// 	return 'bbbb'
	// }).then((val) => {
	// 	console.log(val);
	// });

	// var aa = err1();

	// A.reject(aa).then((val) => {
	// 	console.log('success', val);
	// }, (val) => {
	// 	console.log('error', val);
	// });

	// var a = err2().then((val) => {
	// 	console.log('success', val);
	// }, (val) => {
	// 	console.log('error', val);
	// });
});