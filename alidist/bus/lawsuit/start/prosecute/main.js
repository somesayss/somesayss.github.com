"use strict";
/**
 * 业务：填写诉讼信息[lawsuit/start/prosecute]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//默认依赖一个全局都引用的业务模块
	require('bus/global/main');

	//依赖
	var $ = require('$'),
		util = require('common/util'),
		delegate = require('common/delegate'),
		Handlebars = require('common/handlerbars');

	//变量
	var tpl = Handlebars.compile($('#tpl').html());

	//函数：诉讼请求的数据过滤
	function filterClaims(){
		var list = [],
			originData = {
			'target-money-one': '十倍赔偿',
			'target-money-two': '退一赔三',
			'target-money-three': '退一赔十',
			'target-other-money': '其他费用',
			'target-other-quest': '其他诉讼请求'
		};
		$('.JS-trigger-change').each(function(){
			var node = $(this);
			list.push(node.val());
		});
		console.log(list);
		util.breakEach(list, function(val, index){
			console.log(val);
			if(val === 'target-money-one' || val === 'target-money-two' || val === 'target-money-three'){
				delete originData[val]
			}
		});
		return originData;
	}

	//事件：增加被告名称
	delegate.on('click', '.JS-trigger-add', function(){
		var node = $(this),
			target = node.closest('.JS-target-tr');
		target.after('<tr class="JS-target-tr"><td align="right"> </td><td><input type="text" class="fn-input-text-small fn-W320" />&emsp;<a href="javascript:" class="global-link JS-trigger-det"><i class="icon-det fn-VA4D fn-MR5"></i>删除</a></td></tr>');
	});
	//事件：删除被告名称
	delegate.on('click', '.JS-trigger-det', function(){
		var node = $(this),
			target = node.closest('.JS-target-tr');
		target.remove();
	});
	//事件：变更诉讼请求
	delegate.on('change', '.JS-trigger-change', function(){
		var node = $(this),
			val = node.val(),
			target = node.closest('.JS-target-tr-claims'),
			money = target.find('.JS-target-money'),
			otherMoney = target.find('.JS-target-other-money'),
			otherQuest = target.find('.JS-target-other-quest');
		//隐藏
		money.hide();
		otherMoney.hide();
		otherQuest.hide();
		//显示
		if(val.indexOf('target-money') !== -1){
			money.show();
		}else if(val === 'target-other-money'){
			otherMoney.show();
		}else if(val === 'target-other-quest'){
			otherQuest.show();
		}
	});
	//事件：增加诉讼请求
	delegate.on('click', '.JS-trigger-other-money-add', function(){
		var node = $(this),
			target = $('.JS-target-tr-claims').last(),
			newDom = $(tpl( filterClaims() ));
		target.after(newDom);
		newDom.find('.JS-trigger-change').trigger('change')
	});
	//事件：删除诉讼请求
	delegate.on('click', '.JS-trigger-other-money-det', function(){
		var node = $(this),
			target = node.closest('.JS-target-tr-claims');
		target.remove();
	});
	delegate.on('change', '#legalBaseCaseSelect', function(){
		var id = $("#legalBaseCaseSelect option:selected").val();
	    $("td.global-legal-base-case div").addClass("hiddendiv");
	    $("#legalcase_"+id).removeClass("hiddendiv");
	});


});