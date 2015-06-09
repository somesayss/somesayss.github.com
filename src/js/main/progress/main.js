"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Progress = require('modules/progress/main');

	//组件的使用
	var p = new Progress({element: '#progress'});

	

	//开始
	p.jQuery('#start').on('click', function(){
		p.startPro().incPro(40);
	});

	//开始
	p.jQuery('#end').on('click', function(){
		p.donePro();
	});

	//开始
	p.jQuery('#next').on('click', function(){
		p.incPro();
	});

	console.log(p);


	var _ = require('_');

	var arr = [];

	_.each('abc', function(val){
		console.log(val);
	});

});