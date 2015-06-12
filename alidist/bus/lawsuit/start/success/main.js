"use strict";
/**
 * 业务：填写诉讼信息[lawsuit/start/prosecute]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//默认依赖一个全局都引用的业务模块
	require('bus/global/main');

	//依赖
	var $ = require('$');

	//变量
	var SBODY = $('body'),
		tpl = $('#tpl').html();
	//事件
	SBODY.on('click', '.JS-trigger-add', function(){
		var node = $(this),
			target = node.closest('.JS-target-tr');
		target.after('<tr class="JS-target-tr"><td align="right"> </td><td><input type="text" class="fn-input-text-small fn-W320" />&emsp;<a href="javascript:" class="global-link JS-trigger-det"><i class="icon-det fn-VA4D fn-MR5"></i>删除</a></td></tr>');
	});
	SBODY.on('click', '.JS-trigger-det', function(){
		var node = $(this),
			target = node.closest('.JS-target-tr');
		target.remove();
	});
	SBODY.on('change', '.JS-trigger-change', function(){
		var node = $(this),
			val = node.val(),
			target = node.closest('.JS-target-tr'),
			money = target.find('.JS-target-money'),
			otherMoney = target.find('.JS-target-other-money'),
			otherQuest = target.find('.JS-target-other-quest');
		money.hide();
		otherMoney.hide();
		otherQuest.hide();
		if(val === 'target-money'){
			money.show();
		}else if(val === 'target-other-money'){
			otherMoney.show();
		}else if(val === 'target-other-quest'){
			otherQuest.show();
		}
	});
	SBODY.on('click', '.JS-trigger-other-money-add', function(){
		var node = $(this),
			target = node.closest('.JS-target-tr');
		target.after(tpl);
	});
	SBODY.on('click', '.JS-trigger-other-money-det', function(){
		var node = $(this),
			target = node.closest('.JS-target-tr');
		target.remove();
	});

});