"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Progress = require('modules/progress/main');

	//组件的使用
	var p = new Progress().render().startPro().incPro().incPro().incPro();

	p.jQuery('body').on('click', function(){
		p.incPro();
	});

	console.log(p);


});