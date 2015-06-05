"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Progress = require('modules/progress/main');

	//组件的使用
	var p = new Progress({element: '#a'}).startPro().setPro(40);

	p.jQuery('#next').on('click', function(){
		p.incPro();
	});

	console.log(p);


});