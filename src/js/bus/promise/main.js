"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');

	//
	var main = function main() {
		return new Promise(function (resolve, reject) {
			resolve();
		});
	};

	main().then(function () {
		console.log('1');
	}).then(function () {
		console.log('success1');
		return 'a';
	}, function (err) {
		console.log('error1', err);
	}).then(function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		console.log('success2', args);
		throw 'error bbb';
	}, function (err) {
		console.log('error2', err);
	}).catch(function () {
		console.log('error3');
	}).then(function () {
		console.log('error4');
	});

	console.log('2');
});