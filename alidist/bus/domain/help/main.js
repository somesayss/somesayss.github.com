"use strict";
/**
 * 业务：首页[domain/index]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//默认依赖一个全局都引用的业务模块
	require('bus/global/main');

	//依赖
	var $ = require('$'),
		WIN = window,
		SWIN = $(WIN),
		question = $('#question_1'),
		helpCenterMenu = $('#help-center-menu');
	
	//事件：滚动
	SWIN.on('scroll', function(e){
		var scrollY = WIN.scrollY,
			questionY = question.offset().top;
		if(scrollY > questionY){
			helpCenterMenu.addClass('child-fixed');
		}else{
			helpCenterMenu.removeClass('child-fixed');
		}	
	});
	SWIN.trigger('scroll');

});