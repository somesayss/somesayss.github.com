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
		util = require('common/util'),
		delegate = require('common/delegate');

	//函数
	function toggleTable(node){
		var list = node.closest('.JS-target-list');
		list.find('.JS-target-info').removeClass('fn-hide');
		list.find('.JS-target-input').addClass('fn-hide');
	}

	//事件：编辑之后触发表单
	delegate.on('click', '.JS-trigger-click-editor', function(){
		var node = $(this),
			type = node.data('type');
		//显示和隐藏
		$('.JS-target-'+type+'-info').addClass('fn-hide');
		$('.JS-target-'+type+'-input ').removeClass('fn-hide');
	});
	//事件：提交修改
	delegate.on('click', '.JS-trigger-click-submit', function(){
		toggleTable($(this));
	});
	//事件：点击返回
	delegate.on('click', '.JS-trigger-click-back', function(){
		toggleTable($(this));
		
	});


});