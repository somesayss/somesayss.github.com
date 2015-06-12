"use strict";
/**
 * 业务：首页[domain/index]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var $ = require('$'),
		delegate = require('common/delegate');
	
	//变量
	var noticCheckNext = $('#notic-check-next')


	//事件：已读
	delegate.on('click', '#trial-checked', function(){
		var node = $(this);
		//未勾选
		if(node.prop('checked')){
			noticCheckNext.removeClass('fn-input-button-disabled');
			noticCheckNext.addClass('fn-input-button');
		}else{
			noticCheckNext.removeClass('fn-input-button');
			noticCheckNext.addClass('fn-input-button-disabled');
		}
	});
	//事件：下一步
	delegate.on('click', '.JS-trigger-click-next', function(e){
		var node = $(this);
		if(node.hasClass('fn-input-button-disabled')){
			e.preventDefault();
		}
	});
	

});